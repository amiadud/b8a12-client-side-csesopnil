import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ProgressBar from "@ramonak/react-progress-bar";

const TestTable = () => {
  const [donations, setDonations] = useState([
    {
      petName: 'Sparky',
      maxDonationAmount: 100,
      donatedAmount: 50,
      paused: false,
    },
    {
      petName: 'Fluffy',
      maxDonationAmount: 200,
      donatedAmount: 120,
      paused: true,
    },
  ]);

  const handlePauseDonation = (donation) => {
    const updatedDonations = donations.map((d) => {
      if (d.petName === donation.petName) {
        return {
          ...d,
          paused: !d.paused,
        };
      } else {
        return d;
      }
    });
    setDonations(updatedDonations);
  };

  const handleEditDonation = (donation) => {
    // Redirect user to edit donation page
    console.log(`Editing donation: ${donation.petName}`);
  };

  const handleViewDonators = (donation) => {
    // Open modal with list of donators and their donation amounts
    console.log(`Viewing donators for donation: ${donation.petName}`);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Pet Name</th>
            <th>Maximum Donation Amount</th>
            <th>Progress</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation.petName}>
              <td>{donation.petName}</td>
              <td>${donation.maxDonationAmount}</td>
              <td>
              <ProgressBar completed={donation.donatedAmount} maxCompleted={donation.maxDonationAmount} />
              </td>
              <td>
                <Button onClick={() => handlePauseDonation(donation)}>
                  {donation.paused ? 'Unpause' : 'Pause'}
                </Button>
                <Button onClick={() => handleEditDonation(donation)}>Edit</Button>
                <Button onClick={() => handleViewDonators(donation)}>View Donators</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestTable;
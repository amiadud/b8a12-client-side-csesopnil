import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = () => {

    const [Error, setError] = useState('')
    const [ClientSecret, setClientSecret] = useState('')
    const [TransactionId, setTransactionId] = useState('')
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const axiosOpen = useAxiosPublic();
    const { user } = useAuth();


    const { refetch ,data: campaign_details = [] } = useQuery({
        queryKey: ['campaign-details'],
        queryFn: async()=>{
            const res = await axiosOpen.get(`/campaign-details?email=${user?.email}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            return res.data;
        }
    })
    console.log(campaign_details.DonateAmount)
    
    const donateAmount = campaign_details.DonateAmount
    const petName = campaign_details.petName
    const petImage = campaign_details.image

    useEffect(() => {
        if (donateAmount > 0) {
            axiosSecure.post('/create-payment-intent', { donateAmount: donateAmount })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
            })
        }

    }, [ axiosSecure, donateAmount])

    const handleSubmit = async event => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const {paymentMethod, error} = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            console.log('[error]', error);
            setError(error)

        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(ClientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if(confirmError) {
            console.log('confirm error', confirmError);
        }
        else{
            console.log('Payment Intent',paymentIntent);
            if(paymentIntent.status === 'succeeded') {
                console.log('transaction id:', paymentIntent.id);
                setTransactionId(paymentIntent.id)

                // now save the transaction info to database
                const payment = {
                    email: user?.email,
                    petName: petName,
                    petImage: petImage,
                    donateAmount: donateAmount,
                    TransactionId: paymentIntent.id,
                    date: new Date(), // use utc timestamp

                }
                const res = await axiosSecure.post('/payments', payment)
                console.log("Payment saved", res.data);
                refetch();
                if(res.data?.paymentResult.insertedId){
                    Swal.fire({
                        icon: "success",
                        title: "Donate Success!!",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/dashboard/my-donations/')
                }

            }
               
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <CardElement className='my-5 border py-4  '>
                    options={{
                    style: {
                        base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                        },
                        invalid: {
                        color: '#9e2146',
                        },
                    },
                    }}
                </CardElement>
                <button className=' inline-block rounded dark:bg-cyan-500 bg-lime-600 my-4 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-green-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]' type='submit' disabled={!stripe || !ClientSecret }>Pay</button>
                <p className='text-red-500'>{Error.message}</p>
                {TransactionId && <p>Your Transaction Id: {TransactionId}</p>}
            </form>
            
        </div>
    );
};

export default CheckoutForm;
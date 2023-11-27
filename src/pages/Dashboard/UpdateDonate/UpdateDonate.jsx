import React from 'react';
import { useFormik, Field } from 'formik';
import * as Yup from 'yup';

const image_hosting_key = '0dc2a07f0d8d82d6024cfcd663e086fa'
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}` 
console.log(image_hosting_key);
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';


const UpdateDonate = () => {




    const {petName, longDescription,maxDonation,DonateAmount, shortDescription, lastDate ,_id } = useLoaderData()

  const {user} = useAuth();
  const axiosOpen = useAxiosPublic();
  const axiosSecure = useAxiosSecure();


  const validationSchema = Yup.object({
    petName: Yup.string(),
    petImage: Yup.mixed(),
    maxDonation: Yup.string(),
    DonateAmount: Yup.string(),
    lastDate: Yup.date(),
    longDescription: Yup.string(),
    shortDescription: Yup.string(),
  });


  const onSubmit = async(values, options) => {
    formik.resetForm();


    console.log(values);
    const {petImage} = values;
  //    // // image upload to imgbb and then get an url
  const imageFile = {image: petImage}
  console.log(imageFile);
  const res = await axiosOpen.post(image_hosting_api,imageFile, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  })



  if (res.data.success){
    const PetData = {
      petName: values.petName,
      image: res.data.data.display_url,
      longDescription: values.longDescription,
      maxDonation: parseInt(values.maxDonation),
      DonateAmount:  parseInt(values.DonateAmount),
      shortDescription: values.shortDescription,
      lastDate: values.lastDate,
  }
  console.log(PetData);
  
  
  axiosSecure.patch(`/donation-campaign/${_id}`, PetData)
            .then(res => {
                
                console.log(res.data.modifiedCount > 0);
               if(res.data){
                Swal.fire({
                    title: "Your Donate Campaign Update successfully!",
                    icon: "success"
                  });
               }
            })
  }
  };

  const formik = useFormik({
    initialValues: {
      petName: petName,
      petImage: null,
      longDescription: longDescription,
      maxDonation: maxDonation,
      DonateAmount: DonateAmount,
      lastDate: lastDate,
      shortDescription: shortDescription,
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className='space-y-3 '>
         <div >
        <label htmlFor="maxDonation">Pet Name:</label>
        <input
          type="text"
          id="petName"
          className='w-full'
          name="petName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.petName}
        />
      </div>
      <div>
        <label htmlFor="petImage">Pet Image:</label>
        <input
          type="file"
          className='outline w-full rounded'
          id="petImage"
          as="select"
          name="petImage"
          onChange={(event) => formik.setFieldValue('petImage', event.currentTarget.files[0])}
          onBlur={formik.handleBlur}
        />
      </div>
        <div >
        <label htmlFor="maxDonation">Maximum Donation Amount:</label>
        <input
          type="text"
          id="maxDonation"
          className='w-full'
          name="maxDonation"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.maxDonation}
        />
      </div>

      <div>
        <label htmlFor="petAge">Donated Amount:</label>
        <input
          type="text"
          id="DonateAmount"
          className='rounded w-full'
          name="DonateAmount"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.DonateAmount}
        />
      </div>
      <div>
        <label htmlFor="petAge">Last Date of Donation:</label>
        <input
          type="date"
          id="lastDate"
          className='rounded w-full'
          name="lastDate"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastDate}
        />
      </div>


       <div>
        <label htmlFor="petLocation">Short Description:</label>
        <input
          type="text"
          id="shortDescription"
          className='rounded w-full'
          name="shortDescription"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.shortDescription}
        />
      </div>


      <div>
        <label htmlFor="longDescription">Long Description</label>
        <textarea type="text" className=' w-full rounded' onChange={formik.handleChange} value={formik.values.longDescription} name="longDescription" id="longDescription" cols="30" rows="10"></textarea>
      </div>

      {/* Repeat similar blocks for other fields */}

      <div>
        <button className='bg-green-500 py-2 px-4 hover:bg-slate-600 text-white rounded-md my-3' type="submit">Submit</button>
      </div>
    </form>
  );
};

export default UpdateDonate;

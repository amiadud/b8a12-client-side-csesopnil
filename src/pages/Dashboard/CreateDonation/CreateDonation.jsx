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
import { useNavigate } from 'react-router-dom';


const CreateDonation = () => {
  
  const navigate = useNavigate();


  const {user} = useAuth();
  const axiosOpen = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const {data:result = []} = useQuery({
    queryKey: ['pet-category'],
    queryFn: async() => {
        const res = await axiosOpen('/pet-category')
        return res.data;
    }
})





  const validationSchema = Yup.object({
    petName: Yup.string().required('Pet Name is required'),
    petImage: Yup.mixed().required('Pet Image is required'),
    maxDonation: Yup.string().required(' Max Donation is required'),
    DonateAmount:Yup.string().required(' Max Donation is required'),
    lastDate: Yup.date(),
    longDescription: Yup.string().required('Long Description is required'),
    shortDescription: Yup.string().required('Short Description is required'),
  });

  const options = result.map((data) => {
    return {value: data.pet_name, label: data.pet_name }
   })

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
      DonateAmount: parseInt(values.DonateAmount),
      shortDescription: values.shortDescription,
      lastDate: values.lastDate,
      email: user.email,
  }
  console.log(PetData);
  
  
  axiosSecure.post('/donation-campaign', PetData)
            .then(res => {
                
                console.log(res.data);
               if(res.data.insertedId){
                Swal.fire({
                  icon: "success",
                  title: "Your Donation campaign Data has been saved",
                  showConfirmButton: false,
                  timer: 1500
                });
                navigate('/dashboard/my-donation-campaign/')
               }
            })
  }
  };

  const formik = useFormik({
    initialValues: {
      petName: '',
      petImage: null,
      longDescription: '',
      maxDonation: '',
      DonateAmount: '',
      lastDate: '',
      shortDescription: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className='space-y-3 '>
         <div >
        <label className='dark:text-white' htmlFor="maxDonation">Pet Name:</label>
        <input
          type="text"
          id="petName"
          className='w-full rounded dark:bg-slate-800 dark:text-white '
          name="petName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.petName}
        />
        {formik.touched.petName && formik.errors.petName ? (
          <div className='text-red-500'>{formik.errors.petName}</div>
        ) : null}
      </div>
      <div>
        <label className='dark:text-white' htmlFor="petImage">Pet Image:</label>
        <input
          type="file"
          className='w-full rounded border dark:bg-slate-800 dark:text-white '
          id="petImage"
          as="select"
          name="petImage"
          onChange={(event) => formik.setFieldValue('petImage', event.currentTarget.files[0])}
          onBlur={formik.handleBlur}
        />
        {formik.touched.petImage && formik.errors.petImage ? (
          <div className='text-red-500'>{formik.errors.petImage}</div>
        ) : null}
      </div>
        <div >
        <label className='dark:text-white' htmlFor="maxDonation">Maximum Donation Amount:</label>
        <input
          type="text"
          id="maxDonation"
          className='w-full rounded border dark:bg-slate-800 dark:text-white '
          name="maxDonation"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.maxDonation}
        />
        {formik.touched.maxDonation && formik.errors.maxDonation ? (
          <div className='text-red-500'>{formik.errors.maxDonation}</div>
        ) : null}
      </div>
      <div >
        <label className='dark:text-white' htmlFor="maxDonation"> Donated Amount:</label>
        <input
          type="text"
          id="DonateAmount"
          className='w-full rounded border dark:bg-slate-800 dark:text-white '
          name="DonateAmount"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.DonateAmount}
        />
        {formik.touched.DonateAmount && formik.errors.DonateAmount ? (
          <div className='text-red-500'>{formik.errors.DonateAmount}</div>
        ) : null}
      </div>

      <div>
        <label className='dark:text-white' htmlFor="petAge">Last Date of Donation:</label>
        <input
          type="date"
          id="lastDate"
          className='w-full rounded border dark:bg-slate-800 dark:text-white '
          name="lastDate"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastDate}
        />
        {formik.touched.lastDate && formik.errors.lastDate ? (
          <div  className='text-red-500'>{formik.errors.lastDate}</div>
        ) : null}
      </div>


       <div>
        <label className='dark:text-white' htmlFor="petLocation">Short Description:</label>
        <input
          type="text"
          id="shortDescription"
          className='w-full rounded border dark:bg-slate-800 dark:text-white '
          name="shortDescription"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.shortDescription}
        />
        {formik.touched.shortDescription && formik.errors.shortDescription ? (
          <div  className='text-red-500'>{formik.errors.shortDescription}</div>
        ) : null}
      </div>


      <div>
        <label className='dark:text-white' htmlFor="longDescription">Long Description</label>
        <textarea type="text" className='w-full rounded border dark:bg-slate-800 dark:text-white ' onChange={formik.handleChange} value={formik.values.longDescription} name="longDescription" id="longDescription" cols="30" rows="10"></textarea>
        {formik.touched.longDescription && formik.errors.longDescription ? (
          <div className='text-red-500'>{formik.errors.longDescription}</div>
        ) : null}
      </div>

      {/* Repeat similar blocks for other fields */}

      <div>
        <button className='bg-green-500 py-2 px-4 hover:bg-slate-600 text-white rounded-md my-3' type="submit">Submit</button>
      </div>
    </form>
  );
};

export default CreateDonation;

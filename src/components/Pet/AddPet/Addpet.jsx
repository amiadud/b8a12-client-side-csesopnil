import React from 'react';
import { useFormik, Field } from 'formik';
import * as Yup from 'yup';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const image_hosting_key = '0dc2a07f0d8d82d6024cfcd663e086fa'
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}` 
console.log(image_hosting_key);


import Select from 'react-select'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';


const Addpet = () => {

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
    petAge: Yup.string().required('Pet Age is required'),
    petImage: Yup.mixed().required('Pet Image is required'),
    petLocation: Yup.string().required('Pet Location is required'),
    petCategory: Yup.object().shape({
      value: Yup.string(),
      label: Yup.string(),
    }),
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

  const currentDate = new Date();
  const date = currentDate.toDateString();

  if (res.data.success){
    const PetData = {
      petName: values.petName,
      petAge: parseInt(values.petAge),
      petLocation: values.petLocation,
      image: res.data.data.display_url,
      longDescription: values.longDescription,
      shortDescription: values.shortDescription,
      petCategory: values.petCategory.value,
      email: user.email,
      date: date,
      adopted: false
  }
  
  
  axiosSecure.post('/petitem', PetData)
            .then(res => {
                console.log(res.data);
               if(res.data.insertedId){
                Swal.fire({
                  icon: "success",
                  title: "Your Pet has been saved",
                  showConfirmButton: false,
                  timer: 1500
                });
                navigate('/dashboard/my-added-pets/')
               }
            })
  }
  };

  const formik = useFormik({
    initialValues: {
      petName: '',
      petAge: '',
      petImage: null,
      petLocation: '',
      petCategory: null,
      longDescription: '',
      shortDescription: '',
      date: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <>
    <Helmet>
      <title>
        Add Pet Data || Pet Adoption
      </title>
    </Helmet>
    <form onSubmit={formik.handleSubmit} className='space-y-3 '>
        <div >
        <label className='dark:text-white' htmlFor="petName">Pet Name:</label>
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
        <label className='dark:text-white' htmlFor="petAge">Pet Age:</label>
        <input
          type="text"
          id="petAge"
          className='w-full rounded dark:bg-slate-800 dark:text-white '
          name="petAge"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.petAge}
        />
        {formik.touched.petAge && formik.errors.petAge ? (
          <div  className='text-red-500'>{formik.errors.petAge}</div>
        ) : null}
      </div>


       <div>
        <label className='dark:text-white' htmlFor="petLocation">Pet Location:</label>
        <input
          type="text"
          id="petLocation"
          className='w-full rounded dark:bg-slate-800 dark:text-white '
          name="petLocation"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.petLocation}
        />
        {formik.touched.petLocation && formik.errors.petLocation ? (
          <div  className='text-red-500'>{formik.errors.petLocation}</div>
        ) : null}
      </div>

      <div>
      <label>
      <label className='dark:text-white'  htmlFor="petCategory">Pet Category:</label>
        <Select
          options={options}
          className='w-full rounded dark:bg-slate-800 dark:text-white '
          name="petCategory"
          value={formik.values.petCategory}
          onChange={(selectedOption) =>
            formik.setFieldValue('petCategory', selectedOption)
          }
          onBlur={formik.handleBlur}
        />
        {formik.touched.petCategory && formik.errors.petCategory && (
          <div className='text-red-500'>{formik.errors.petCategory.label}</div>
        )}
      </label>
      </div>

      <div>
        <label className='dark:text-white' htmlFor="petImage">Pet Image:</label>
        <input
          type="file"
          className='outline w-full dark:text-white dark:outline-slate-300 rounded'
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

      <div>
        <label className='dark:text-white' htmlFor="longDescription">Long Description</label>
        <textarea type="text" className='w-full rounded dark:bg-slate-800 dark:text-white ' onChange={formik.handleChange} value={formik.values.longDescription} name="longDescription" id="longDescription" cols="30" rows="10"></textarea>
        {formik.touched.longDescription && formik.errors.longDescription ? (
          <div className='text-red-500'>{formik.errors.longDescription}</div>
        ) : null}
      </div>

      <div>
        <label className='dark:text-white' htmlFor="shortDescription">Short Description:</label>
        <input
          type="text"
          id="shortDescription"
          className='w-full rounded dark:bg-slate-800 dark:text-white '
          name="shortDescription"
          value={formik.values.shortDescription}
          onChange={formik.handleChange}
        />
        {formik.touched.shortDescription && formik.errors.shortDescription ? (
          <div className='text-red-500 '>{formik.errors.shortDescription}</div>
        ) : null}
      </div>

      {/* Repeat similar blocks for other fields */}

      <div>
        <button className='bg-green-500 py-2 px-4 hover:bg-slate-600 text-white rounded-md my-3' type="submit">Submit</button>
      </div>
    </form>
    </>
  );
};

export default Addpet;

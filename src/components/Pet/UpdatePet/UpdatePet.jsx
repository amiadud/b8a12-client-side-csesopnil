import React from 'react';
import { useFormik, Field } from 'formik';
import * as Yup from 'yup';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const image_hosting_key = '2612f83a5aa1bfb40bf092f401a59a8c'
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}` 
console.log(image_hosting_key);


import Select from 'react-select'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const UpdatePet = () => {

    const { petName, _id, image, petAge, petCategory, petLocation, shortDescription, longDescription } = useLoaderData()
    console.log(_id);


  const axiosOpen = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const {data:result = [], refetch} = useQuery({
    queryKey: ['pet-category'],
    queryFn: async() => {
        const res = await axiosOpen('/pet-category')
        return res.data;
    }
})




  const validationSchema = Yup.object({
    petName: Yup.string(),
    petAge: Yup.string(),
    petImage: Yup.mixed(),
    petLocation: Yup.string(),
    petCategory: Yup.object().shape({
      value: Yup.string(),
      label: Yup.string(),
    }),
    longDescription: Yup.string(),
    shortDescription: Yup.string(),
  });

  const options = result.map((data) => {
    return {value: data.pet_name, label: data.pet_name }
   })
  
   

  const onSubmit = async(values, options) => {
    refetch();

    console.log(values);
    const {petImage} = values;
  //    // // image upload to imgbb and then get an url
  const imageFile = {image: petImage}
  const res = await axiosOpen.post(image_hosting_api,imageFile, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  })
  if (res.data.success){
    const PetData = {
      petName: values.petName,
      petAge: values.petAge,
      petLocation: values.petLocation,
      image: res.data.data.display_url,
      longDescription: values.longDescription,
      shortDescription: values.shortDescription,
      petCategory: values.petCategory.value,
  }
  console.log(PetData);
  
  axiosSecure.patch(`/petitem/${_id}`, PetData)
            .then(res => {
                
                console.log(res.data.modifiedCount > 0);
               if(res.data){
                Swal.fire({
                    title: "Your Pet Update successfully!",
                    icon: "success"
                  });
               }
            })
  }
  };

  const formik = useFormik({
    initialValues: {
      petName: petName || "",
      petAge: petAge,
      petImage: image || null,
      petLocation: petLocation || '',
      petCategory: petCategory,
      longDescription: longDescription || '',
      shortDescription:  shortDescription || '',
      date: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <>
    <Helmet>
      <title> {petName} {petCategory} Update Form | Pet Adoption</title>
    </Helmet>
    <form onSubmit={formik.handleSubmit} className='space-y-3'>

        <div>
        <label htmlFor="petName">Pet Name:</label>
        <input
          type="text"
          id="petName"
          className=' w-full rounded'
          name="petName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.petName}
        />
      </div>

      <div>
        <label htmlFor="petAge">Pet Age:</label>
        <input
          type="text"
          id="petAge"
          className='rounded w-full'
          name="petAge"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.petAge}
        />
      </div>


       <div>
        <label htmlFor="petLocation">Pet Location:</label>
        <input
          type="text"
          id="petLocation"
          className='rounded w-full'
          name="petLocation"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.petLocation}
        />
      </div>

      <div>
      <label>
      <label htmlFor="petCategory">Pet Category:</label>
        <Select
          options={options}
          name="petCategory"
          className='rounded w-full'
          value={formik.values.petCategory}
          onChange={(selectedOption) =>
            formik.setFieldValue('petCategory', selectedOption)
          }
          onBlur={formik.handleBlur}
        />
      </label>
      </div>

      <div>
        <label htmlFor="petImage">Pet Image:</label>
        <input
          type="file"
          className='outline w-full mt-2 rounded'
          id="petImage"
          
          as="select"
          name="petImage"
          onChange={(event) => formik.setFieldValue('petImage', event.currentTarget.files[0])}
          onBlur={formik.handleBlur}
        />
      </div>

      <div>
        <label htmlFor="longDescription">Long Description</label>
        <textarea className=' w-full mt-2 rounded' type="text" onChange={formik.handleChange} value={formik.values.longDescription} name="longDescription" id="longDescription" cols="30" rows="10"></textarea>
      </div>

      <div>
        <label htmlFor="shortDescription">Short Description:</label>
        <input
          type="text"
          id="shortDescription"
          className=' w-full mt-2 rounded' 
          name="shortDescription"
          value={formik.values.shortDescription}
          onChange={formik.handleChange}
        />
      </div>

      {/* Repeat similar blocks for other fields */}

      <div>
        <button className='bg-green-500 py-2 px-4 hover:bg-slate-600 text-white rounded-md my-3' type="submit">Update</button>
      </div>
    </form>
    </>
  );
};

export default UpdatePet;

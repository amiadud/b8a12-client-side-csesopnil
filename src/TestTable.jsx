import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const image_hosting_key = '80fd26d461aa4b2ae1c1ca7dda2f47ec'
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}` 

const UpdateItem = () => {

  const navigate = useNavigate();


    
  const { register, formState: { errors }, handleSubmit } = useForm();

    
  const onSubmit = async (data) => {



    const menuData = {
      name: data.name,
      category: data.item_category,
      price: parseInt(data.item_price),
      recipe: data.item_recipe,
      image: data.item_image[0].name
  }

  console.log(menuData);
        
    };
    return (
        <div className='w-10/12 mx-auto'>
        <div className=" hero ">
<div className="hero-content flex-col lg:flex-row-reverse">
<div className="card shrink-0 w-full shadow-2xl bg-base-100">
  <form onSubmit={handleSubmit(onSubmit)} className="card-body">
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold">Recipe name*</span>
      </label>
      <input {...register("name", { required: true })} type='text' placeholder="Recipe name"  />
      {errors.name?.type === 'required' && <p className='text-red-400' role="alert">Name is required</p>}
    </div>
    <div className='flex gap-4'>
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold">Price*</span>
      </label>
      <input  {...register("item_price", { required: true })} type="number" placeholder="Price"  />
      {errors.item_price?.type === 'required' && <p className='text-red-400' role="alert">Price is required</p>}
    </div>
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold">Recipe Details...</span>
      </label>
    
     <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold">Item Image</span>
      </label>
      <input {...register("item_image")} type="file" className="file-input file-input-bordered w-full max-w-xs" />
    </div>
    </div>
    <div className="form-control mt-6">
      <button className="btn btn-primary">Update Item</button>
    </div>
  </form>
</div>
</div>
</div>
    </div>
    );
};

export default UpdateItem;
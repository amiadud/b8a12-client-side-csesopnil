import React from 'react';
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';

const ContactUs = () => {
    return (
        <div class=" w-full  flex  flex-row  flex-wrap  bg-gray-600  p-10  py-20  justify-center" >
  <div class=" w-full  text-center">
    <div class=" text-3xl  text-center text-white  antialiased">Get Updates</div>
    <div class="text-xl   text-center  text-white antialiased">Find out about events and other news</div>
  </div>
  
  <div class=" mt-3  flex   flex-row   flex-wrap" >
	      <div class="text-gray-600  w-2/3">
	        <input type="text" name="email" class="  w-full  p-2   rounded-l-lg" placeholder="john@mail.com"/>
	      </div>
	     	<div class=" w-1/3">
	     	  <button class=" w-full text-white  p-2  bg-indigo-400  rounded-r-lg text-center hover: bg-indigo-300" type="submit">Subscribe</button>
	     	</div>
	 </div>
</div>
    );
};

export default ContactUs;
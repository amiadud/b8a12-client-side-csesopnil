import { Link, Navigate, useNavigate } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const image_hosting_key = '0dc2a07f0d8d82d6024cfcd663e086fa'
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Register = () => {
    const navigate = useNavigate();

    const {userSingup, updateUserProfile} = useAuth()

    const axiosOpen = useAxiosPublic();

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {

      if (data.password.length < 6 ){
        return toast.error("Password should be at least 6 characters or longer..");
      }
      else if (!/[A-Z]/.test(data.password)){
        return toast.error('Do not have a capital letter');
      }
      else if (!/[>!#@$%&?"<]/.test(data.password))
      {
        return toast.error('Do not have a special character');
      }
      else if(!data.terms){
          return toast.warning('Please accept terms before registering')
      }

      const imageFile = {image: data.user_image[0]}
      console.log(imageFile);

      const res = await axiosOpen.post(image_hosting_api,imageFile, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    console.log(res.data.success)
    if(res.data.success){

      const email = data.email;
      const password = data.password
      const user_image = res.data.data.display_url
      const name = data.name

      console.log(email, name, user_image);

      userSingup(email,password)
      .then(res => {
        updateUserProfile( name, user_image )
        .then( res => {
          const userInfo = {
            name: name,
            email: email
          }
          axiosOpen.post('/users',userInfo)
            .then(res => {
              if(res.data.insertedId){
              // FormData.reset();
              Swal.fire({
              title: "Register Success",
              showConfirmButton: false,
              timer: 1500
            });
                navigate('/');
              }
            })
        })
      })


    }

          
      };

    return (
        <>
<div className='max-w-7xl mx-auto'>
<div className="h-full">
        {/* <!-- Left column container with background--> */}
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Sample image"
            />
          </div>

          {/* <!-- Right column container --> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <!-- Username input --> */}
              <h2 className="text-4xl my-3 font-semibold dark:text-white">Registration Now !!</h2>
              <TEInput
                type="text"
                {...register("name", { required: true })}
                label="Username"
                size="lg"
                className="mb-6"
              >
              </TEInput>
              {/* <!-- User Image input --> */}
              <TEInput
                type="file"
                {...register("user_image", { required: true })}
                size="small"
                className="mb-6"
              ></TEInput>
              {/* <!-- Email input --> */}
              <TEInput
                type="email"
                {...register("email", { required: true })}
                label="Email address"
                size="lg"
                className="mb-6"
              ></TEInput>

              {/* <!--Password input--> */}
              <TEInput
                type="password"
                {...register("password", { required: true })}
                label="Password"
                className="mb-6"
                size="lg"
              ></TEInput>

              <div className="mb-6 flex items-center justify-between">
                {/* <!-- Remember me checkbox --> */}
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    value=""
                    {...register("terms", { required: true })}
                    id="terms"
                  />
                  <label
                    className="inline-block dark:text-white font-semibold pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="terms"
                  >
                    Terms and conditions
                  </label>
                </div>
              </div>

              {/* <!-- Login button --> */}
              <div className="text-center lg:text-left">
                <TERipple rippleColor="light">
                  <button
                    type="submit"
                    className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Register
                  </button>
                </TERipple>

                {/* <!-- Register link --> */}
                <p className="mb-0 mt-2 pt-1 dark:text-white text-sm font-semibold">
                  Have an account?{" "}
                  <Link to='/login' className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
</div>
            
        </>
    );
};

export default Register;
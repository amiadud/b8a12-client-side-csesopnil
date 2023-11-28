import { useLocation, useNavigate } from 'react-router-dom';
import { TERipple } from "tw-elements-react";
import { FaGithub } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SocialLogin = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const {googleLogin, githubLogin} = useAuth()
    const axiosOpen = useAxiosPublic();

    const from = location?.state?.from?.pathname || "/"

    const handleSocialLogin = (media) => {
      media()
      .then(res => {
          console.log(res.user);
          const userInfo = {
              email: res.user?.email,
              name: res.user?.displayName,
              photo: res.user?.photoURL
          }
          axiosOpen.post('/users', userInfo)
          .then(res => {
              console.log(res.data);
              Swal.fire({
                  title: "User Login SuccessFull",
                  showConfirmButton: false,
                  icon: "success"
                });
              navigate(from, {replace: true})
          })
          
      })
  }


    return (
        <>
        {/* <div className='flex justify-between gap-4'>
            <button onClick={()=> handleSocialLogin(googleSignIn)} className='btn btn-neutral btn-sm'>Google</button>
            <button onClick={()=> handleSocialLogin(githubSignIn)} className='btn btn-secondary btn-sm'>Github</button>
        </div> */}
        <div className="flex flex-col items-center justify-center lg:justify-start  ">

                {/* <!-- Google button--> */}
                <TERipple rippleColor="light" className="w-full   ">
                <button
                type='button'
                onClick={()=> handleSocialLogin(googleLogin)}
                className="mb-3 border flex w-full items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-black  transition duration-150 ease-in-out hover:bg-info-600 focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
                style={{ backgroundColor: "white" }}
                >
                  {/* <!-- Twitter --> */}
                  <img className='mr-2 h-3.5 w-3.5' src="https://imgdb.net/storage/uploads/211d852a18a9fe0f80616a1c3623bb84cd49d2325143f7448f59d0c511d3fbe6.png" alt="" />
                  Login with Google
                </button>
              </TERipple>
                {/* <!-- Github button --> */}
                <TERipple rippleColor="light" className="w-full">
                <button
                onClick={()=> handleSocialLogin(githubLogin)}
                  className="mb-3 border flex w-full items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-black  transition duration-150 ease-in-out hover:bg-info-600 focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
                  style={{ backgroundColor: "white" }}
                  type='button'
                >
                  {/* <!-- Twitter --> */}
                  <FaGithub className="mr-2 h-3.5 w-3.5">
                  </FaGithub>
                  Login with Github
                </button>
              </TERipple>
              </div>
        </>
        
    );
};

export default SocialLogin;
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import Addpet from '../components/Pet/AddPet/Addpet';
import MyPets from '../components/Pet/mypets/MyPets'
import Dashboard from '../Layout/Dashboard';
import TestTable from '../TestTable';
import UpdatePet from '../components/Pet/UpdatePet/UpdatePet';
import AllUser from '../pages/Dashboard/AllUsers/AllUser';
import SinglePet from '../components/Pet/SinglePet/SinglePet';
import PetDetails from '../components/Pet/PetDetails/PetDetails';
import PrivateRoutes from './PrivateRoutes';
import PetList from '../components/Pet/PetList/PetList';
import AllPets from '../pages/Dashboard/AllPets/AllPets';
import AdoptRequest from '../components/Pet/AdoptRequest/AdoptRequest';
import ErrorPage from '../pages/404Page/ErrorPage';
import CreateDonation from '../pages/Dashboard/CreateDonation/CreateDonation';
import MyDonateCampaign from '../pages/Dashboard/MyDonateCampaign/MyDonateCampaign';
import DonateCampaign from '../pages/Dashboard/DonateCampaign/DonateCampaign';
import DonateCampaignDetails from '../pages/Dashboard/DonateCampaignDetails/DonateCampaignDetails';
import Payments from '../pages/Dashboard/Payments/Payments';
import MyDonation from '../pages/Dashboard/MyDonation/MyDonation';
import AllDonation from '../pages/Dashboard/AllDonation/AllDonation';
import UpdateDonate from '../pages/Dashboard/UpdateDonate/UpdateDonate';

const Routes = createBrowserRouter([


    {
        path: "/",
        element: <MainLayout/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                path: "/",
                element:<Home/>,
            },
            {
                path: "/login",
                element:<Login/>,
            },
            {
                path: "/register",
                element:<Register/>
            },
            {
                path: "/pet-list",
                element:<PetList/>,
            },
            {
                path: "/pet-category/:cname",
                element:<SinglePet/>,
                loader: ({params})=> fetch(`https://pet-adoption-server-rho.vercel.app/petcategory/${params.cname}`)
                
            },
            {
                path: "/pet-details/:id",
                element:<PetDetails/>,
                loader: ({params})=> fetch(`https://pet-adoption-server-rho.vercel.app/pet-details/${params.id}`)
                
            },
            {
                path: '/donation-campaign-list',
                element:<DonateCampaign/>
            },
            {
                path: '/donation-campaign-details/:id',
                element:<DonateCampaignDetails/>,
                loader: ({params})=> fetch(`https://pet-adoption-server-rho.vercel.app/campaign-details/${params.id}`)

            },
            {
                path: '/payment',
                element:<Payments/>
            }

        ]
    },
    {
        path:'/dashboard/',
        element:<Dashboard/>,
        errorElement:<ErrorPage/>,
        children: [
            {
                path: "add-pet/",
                element:<PrivateRoutes><Addpet/></PrivateRoutes>
            },
            {
                path: "my-added-pets/",
                element:<PrivateRoutes><MyPets/></PrivateRoutes>
            },
            {
                path: "adopt-request/",
                element:<PrivateRoutes><AdoptRequest/></PrivateRoutes>
            },
            {
                path:'update-pet/:id',
                element:<PrivateRoutes><UpdatePet/></PrivateRoutes>,
                loader: ({params}) => fetch(`https://pet-adoption-server-rho.vercel.app/pet-details/${params.id}`)
            },
            {
                path: "create-donation-campaign/",
                element:<PrivateRoutes><CreateDonation/></PrivateRoutes>
            },
            {
                path: "my-donation-campaign/",
                element:<PrivateRoutes><MyDonateCampaign/></PrivateRoutes>
            },
            {
                path: "update-donation-campaign/:id",
                element:<UpdateDonate/>,
                loader: ({params}) => fetch(`https://pet-adoption-server-rho.vercel.app/campaign-detail/${params.id}`)
            },
            {
                path:'my-donations/',
                element:<MyDonation/>
            },
            //admin routes
            {
                path: "users",
                element:<PrivateRoutes><AllUser/></PrivateRoutes>
            },
            {
                path:"all-pets/",
                element:<PrivateRoutes><AllPets/></PrivateRoutes>
            },
            {
                path:"all-donation/",
                element:<PrivateRoutes><AllDonation/></PrivateRoutes>
            }
        ]
    },
    {
        path:'/test',
        element:<TestTable/>
    }
])

export default Routes;
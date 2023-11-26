import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/404Page/ErrorPage';
import MainLayout from '../Layout/MainLayout';
import Home from '../pages/Home/Home';
import App from '../App';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import Addpet from '../components/Pet/AddPet/Addpet';
import MyPets from '../components/Pet/mypets/MyPets'
import Dashboard from '../Layout/Dashboard';
import TestTable from '../TestTable';
import UpdatePet from '../components/Pet/UpdatePet/UpdatePet';
import AllUser from '../pages/Dashboard/AllUsers/AllUser';

const Routes = createBrowserRouter([


    {
        path: "/",
        element: <MainLayout/>,
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
                element:<div>pet-list</div>
            }
        ]
    },
    {
        path:'/dashboard/',
        element:<Dashboard/>,
        children: [
            {
                path: "add-pet/",
                element:<Addpet/>
            },
            {
                path: "my-added-pets/",
                element:<MyPets/>
            },
            {
                path:'update-pet/:id',
                element:<UpdatePet/>,
                loader: ({params}) => fetch(`https://pet-adoption-server-rho.vercel.app/petitem/${params.id}`)
            },
            //admin routes
            {
                path: "users",
                element:<AllUser/>
            }
        ]
    }
])

export default Routes;
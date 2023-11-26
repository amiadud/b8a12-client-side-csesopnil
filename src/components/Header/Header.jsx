import React, { useState } from 'react';
import 'flowbite';
import { Link, NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

import './style.css'

const Header = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {user, userLogout} = useAuth();

  const handleLogout = ()=> {
    userLogout()
    .then( () => {
      setTimeout(() => {
        Swal.fire({
          title: "Logout Success!",
          icon: "success"
        });
      }, 200);
      navigate('/login') 
    })
    .catch(error => console.error(error))
  }

    return (
        <>


<nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://imgdb.net/storage/uploads/1b84490de33e95c4f3c8f73943e63cb73b74216111d346d36d379cd561df7f68.png" alt="Flowbite Logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
  </a>
  <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
  <div>
      {
        user ? <><Button
        id="basic-button"
        // className=' text-sm  bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img class="w-10 h-10 border rounded-md" src={user?.photoURL} alt="user photo"/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        
        <div class="px-4 py-3">
          <span class="block text-sm text-gray-900 dark:text-white">{user?.displayName}</span>
          <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{user?.email}</span>
        </div>
        <hr />
        <MenuItem onClick={handleClose}><Link to={'/dashboard'}>Dashboard</Link></MenuItem>
        <MenuItem onClick={handleLogout} onBlur={handleClose}>Logout</MenuItem>
      </Menu></> : ""
      }
    </div>
      <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <NavLink to={'/'} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</NavLink>
      </li>
      <li>
        <NavLink  to={'/pet-list'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pet Listing</NavLink>
      </li>
      <li>
        <NavLink  to={'/donation-campaign'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Donation Campaigns</NavLink>
      </li>
      <li>
        <NavLink to={'/add-pet'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Add Pet</NavLink>
      </li>
      {
        user ? ""
      :<li>
      <NavLink  to={'/login'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</NavLink>
    </li>
      }
    </ul>
  </div>
  </div>
</nav>

        </>

    );
};

export default Header;
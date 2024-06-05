/* eslint-disable react/jsx-no-undef */
import {useState} from 'react'
// import { TiPlus } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Logout from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import { FaShieldAlt } from 'react-icons/fa';

import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';



export default function Navbar({ toggleSidebar }) { // Destructure toggleSidebar from props
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
       <div className=' w-full'>
        <nav className=' flex justify-between px-10 h-[1.5cm] shadow-md bg-white items-center'>
          <div className='flex gap-6 items-center'>
            <GiHamburgerMenu onClick={toggleSidebar} className='block lg:hidden cursor-pointer' /> {/* Call toggleSidebar */}
            {/* <div className='flex items-center gap-1'>
              <TiPlus />
              <p>New</p>
            </div> */}
          </div>
          <div className='flex gap-8 items-center'>
            <div className='flex rounded overflow-hidden'>
              <form>
                <input type="text" name="" id="" className='border border-gray-300 focus:outline-none leading-8 px-2' placeholder='Search...' />
              </form>
              <div className='border border-gray-300 flex items-center justify-center'>
                <FaSearch size={15} className='text-gray-700 w-[35px] cursor-pointer' />
              </div>
            </div>
            <div>
            <button  onClick={handleClick} > <FaUserCircle size={30} className='text-gray-500' /></button>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                My Account
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <FaShieldAlt fontSize="large" />
                </ListItemIcon>
                Reset Password
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" className="text-red-500" />
                </ListItemIcon>
                <h4 className="text-red-500">Logout</h4>
              </MenuItem>
            </Menu>
            </div>
           
          </div>
        </nav>
      </div>
  )
}

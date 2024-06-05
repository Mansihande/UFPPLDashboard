import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { MdFeaturedPlayList } from "react-icons/md";
import { FaServicestack, FaBlog } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { GiVerticalBanner } from "react-icons/gi";
import { GrGallery } from "react-icons/gr";
import { FaNewspaper, FaPager } from "react-icons/fa6";
import { RiLayoutBottom2Fill } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import Navbar from "./Navbar";

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState({});
  const sidebarRef = useRef(null);
  const location = useLocation();

  const sidebarData = [
    {
      title: "Dashboard",
      icon: <BiSolidDashboard size={20} />,
      path: "/dashboard",
      submenu: [],
    },
    {
      title: "Cateogry",
      icon: <FaServicestack size={20} />,
      path: "/category",
    },
    {
      title: "Products",
      icon: <MdFeaturedPlayList size={20} />,
      path: "#", // Set to "#" to prevent immediate navigation
      submenu: [
        { title: "Categories of Products", path: "/products/categories" },
        { title: "Products", path: "/products/products" },
      ],
    },
    // { title: "Features", icon: <MdFeaturedPlayList size={20} />, path: "/features", submenu: [] },
    // { title: "Footer", icon: <RiLayoutBottom2Fill size={20} />, path: "/footer", submenu: [] },
    // { title: "Logo", icon: <CgWebsite size={20} />, path: "/logo", submenu: [] },
    {
      title: "Banner",
      icon: <GiVerticalBanner size={20} />,
      path: "/banner",
      submenu: [],
    },
    {
      title: "Gallery",
      icon: <GrGallery size={20} />,
      path: "/gallery",
      submenu: [],
    },
    {
      title: "Blog",
      icon: <FaBlog size={20} />,
      path: "#", // Set to "#" to prevent immediate navigation
      submenu: [
        { title: "Categories of Blogs", path: "/blog/categories" },
        { title: "Blogs", path: "/blog/blogs" },
      ],
    },
    {
      title: "News",
      icon: <FaNewspaper size={20} />,
      path: "/news",
      submenu: [],
    },
    {
      title: "Testimonials",
      icon: <FaPager size={20} />,
      path: "/testimonials",
      submenu: [],
    },
    { title: "FAQ", icon: <FaPager size={20} />, path: "/faq", submenu: [] },
    {
      title: "Our Staff",
      icon: <FaPager size={20} />,
      path: "/ourStaff",
      submenu: [],
    },
  ];

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleSidebar = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = (e, index) => {
    e.preventDefault(); // Prevent default link behavior
    setIsSubMenuOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="flex ">
      <aside
        ref={sidebarRef}
        className={`bg-slate-700 min-h-screen fixed lg:relative z-10 w-52 ${
          isMenuOpen
            ? "translate-x-0 transform transition-transform duration-500"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="font-bold text-white text-center pt-4 text-[20px]">
          LOGO
        </div>
        <div className="mt-4">
          <ul>
            {sidebarData.map((item, i) => (
              <div key={i}>
                <div>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 hover:bg-slate-800 py-2 pl-4 pr-16 hover:cursor-pointer ${
                      location.pathname === item.path ? "bg-slate-800" : ""
                    }`}
                    onClick={(e) => {
                      if (item.submenu && item.submenu.length > 0) {
                        toggleSubMenu(e, i);
                      }
                    }}
                  >
                    <p className="text-white">{item.icon}</p>
                    <p className="text-gray-400 font-semibold">{item.title}</p>
                    {item.submenu && item.submenu.length > 0 && (
                      <span
                        className="ml-auto"
                        onClick={(e) => toggleSubMenu(e, i)}
                      >
                        {isSubMenuOpen[i] ? (
                          <IoIosArrowUp className="text-white" />
                        ) : (
                          <IoIosArrowDown className="text-white" />
                        )}
                      </span>
                    )}
                  </Link>
                  {item.submenu &&
                    item.submenu.length > 0 &&
                    isSubMenuOpen[i] && (
                      <ul>
                        {item.submenu.map((subItem, j) => (
                          <Link
                            key={j}
                            to={subItem.path}
                            className={`flex items-center gap-2 hover:bg-slate-800 py-2 pl-8 pr-16 hover:cursor-pointer ${
                              location.pathname === subItem.path
                                ? "bg-slate-800"
                                : ""
                            }`}
                          >
                            <p className="text-white">{subItem.title}</p>
                          </Link>
                        ))}
                      </ul>
                    )}
                </div>
              </div>
            ))}
          </ul>
        </div>
      </aside>

      <div className="flex flex-col h-screen w-full">
        <Navbar className="fixed w-full z-10 bg-white shadow" toggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

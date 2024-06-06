import React, { useState, useEffect } from "react";
import axios from 'axios';
import { IconContext } from "react-icons";
import { useNavigate, useParams } from 'react-router-dom';
import * as AllIcons from "react-icons/fa";

const iconComponents = Object.entries(AllIcons).map(([key, value]) => ({
  name: key,
  icon: value,
}));

const EditCategory = () => {
  const { categoryId, subCategoryId, subSubCategoryId } = useParams();
  const navigate = useNavigate(); 
  const [category, setCategory] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [showIconContainer, setShowIconContainer] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      let url = '';
      if (categoryId && subCategoryId && subSubCategoryId) {
        url = `http://localhost:3009/product/getSpecificSubSubcategory?categoryId=${categoryId}&subCategoryId=${subCategoryId}&subSubCategoryId=${subSubCategoryId}`;
      } else if (categoryId && subCategoryId) {
        url = `http://localhost:3009/product/getSpecificSubcategory?categoryId=${categoryId}&subCategoryId=${subCategoryId}`;
      } else if (categoryId) {
        url = `http://localhost:3009/product/getSpecificCategory?categoryId=${categoryId}`;
      }
      
      try {
        const response = await axios.get(url);
        const { category, icons } = response.data;

        // Set the category and selectedIcon states with the fetched data
        setCategory(category);
        setSelectedIcon(icons);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, [categoryId, subCategoryId, subSubCategoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = '';
    const data = {
      category,
      icons: selectedIcon,
    };
    
    if (categoryId && subCategoryId && subSubCategoryId) {
      url = `http://localhost:3009/product/updatesubsubcategory?categoryId=${categoryId}&subCategoryId=${subCategoryId}&subSubCategoryId=${subSubCategoryId}`;
    } else if (categoryId && subCategoryId) {
      url = `http://localhost:3009/product/updateSubCategory?categoryId=${categoryId}&subCategoryId=${subCategoryId}`;
    } else if (categoryId) {
      url = `http://localhost:3009/product/updateCategory?categoryId=${categoryId}`;
    }
    
    try {
      await axios.put(url, data);
      navigate("/products/categories");
    } catch (error) {
      console.error(error);
    }
  };

  const filteredIcons = iconComponents.filter((icon) =>
    icon.name.toLowerCase().includes(selectedIcon.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label htmlFor="category" className="block font-semibold mb-2">
          Category
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mb-4 relative">
        <label htmlFor="icon" className="block font-semibold mb-2">
          Icon
        </label>
        <input
          type="text"
          id="icon"
          value={selectedIcon}
          onChange={(e) => setSelectedIcon(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          onFocus={() => setShowIconContainer(true)}
          onBlur={() => setTimeout(() => setShowIconContainer(false), 200)}
          required
        />
        {showIconContainer && (
          <div className="absolute left-0 top-full max-h-48 overflow-y-auto w-52 bg-white rounded border border-gray-300 shadow-lg grid grid-cols-5">
            {filteredIcons.map((icon, index) => (
              <div
                key={index}
                className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSelectedIcon(icon.name);
                  setShowIconContainer(false);
                }}
              >
                <IconContext.Provider value={{ size: "1.5em" }}>
                  {React.createElement(icon.icon)}
                </IconContext.Provider>
              </div>
            ))}
          </div>
        )}
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Update Category
      </button>
    </form>
  );
};

export default EditCategory;

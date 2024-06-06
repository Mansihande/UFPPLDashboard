import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import * as ReactIcons from 'react-icons';

const InsertCategory = () => {
  const [formData, setFormData] = useState({
    category: '',
    icons: '',
    subCategories: []
  });

  const [categoryList, setCategoryList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({
    category: '',
    icons: ''
  });

  const [showIconOptions, setShowIconOptions] = useState(false);
  const [filteredIcons, setFilteredIcons] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const handleCategorySelect = (e) => {
    setFormData(JSON.parse(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = { ...currentCategory, subCategories: [] };

    if (!formData.category) {
      // Adding a main category
      setFormData(newCategory);
      setCategoryList([...categoryList, newCategory]);
    } else {
      // Adding a subcategory
      const updatedFormData = { ...formData };
      updatedFormData.subCategories.push(newCategory);
      setFormData(updatedFormData);

      const updatedCategoryList = categoryList.map(category =>
        category.category === formData.category ? updatedFormData : category
      );
      setCategoryList(updatedCategoryList);
    }

    // Reset currentCategory form
    setCurrentCategory({ category: '', icons: '' });
  };

  const handleIconFocus = () => {
    setShowIconOptions(true);
    setFilteredIcons([]);
  };

  const handleIconBlur = () => {
    setShowIconOptions(false);
  };

  const handleIconSelect = (iconName) => {
    setCurrentCategory({ ...currentCategory, icons: iconName });
    setShowIconOptions(false);
  };

  const handleIconFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = Object.keys(ReactIcons).filter(iconName =>
      iconName.toLowerCase().includes(searchValue)
    );
    setFilteredIcons(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded">
        <h1 className="text-2xl font-bold mb-4">Add Categories</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="existing-category" className="block text-sm font-medium text-gray-700">
              Existing Categories
            </label>
            <select
              id="existing-category"
              onChange={handleCategorySelect}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select a category to add subcategory</option>
              {categoryList.map((category, index) => (
                <option key={index} value={JSON.stringify(category)}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={currentCategory.category}
              onChange={handleChange}
              placeholder="Enter category name"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>

          <div className="form-group relative">
            <label htmlFor="icons" className="block text-sm font-medium text-gray-700">
              Icon
            </label>
            <input
              type="text"
              id="icons"
              name="icons"
              value={currentCategory.icons}
              onChange={handleChange}
              onFocus={handleIconFocus}
              onBlur={handleIconBlur}
              placeholder="Enter icon name"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
            {showIconOptions && (
              <div className="absolute top-10 bg-white border border-gray-300 rounded-md shadow-md w-full max-h-40 overflow-auto">
                <input
                  type="text"
                  placeholder="Search icon"
                  onChange={handleIconFilter}
                  className="block w-full px-3 py-2 border-b border-gray-300 focus:outline-none"
                />
                <div className="px-3 py-2">
                {filteredIcons.length === 0 ? Object.keys(ReactIcons).map((iconName, index) => {
  const Icon = ReactIcons[iconName];
  console.log('Icon:', Icon); // Log the Icon
  return (
    <div key={index} onClick={() => handleIconSelect(iconName)} className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">
      <Icon size={24} className="mr-2" />
      <span>{iconName}</span>
    </div>
  );
}) : (
  filteredIcons.map((iconName, index) => {
    const Icon = ReactIcons[iconName];
    console.log('Icon:', Icon); // Log the Icon
    return (
      <div key={index} onClick={() => handleIconSelect(iconName)} className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">
        <Icon size={24} className="mr-2" />
        <span>{iconName}</span>
      </div>
    );
  })
)}

                </div>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InsertCategory;

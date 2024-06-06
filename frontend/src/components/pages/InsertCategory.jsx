import React, { useState, useEffect } from "react";
import axios from 'axios';
import { IconContext } from "react-icons";
import * as AllIcons from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const iconComponents = Object.entries(AllIcons).map(([key, value]) => ({
    name: key,
    icon: value,
}));

const NewCategoryForm = () => {
    const [category, setCategory] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");
    const [parentCategoryId, setParentCategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [showIconContainer, setShowIconContainer] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3009/product/getall');
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let url = 'http://localhost:3009/product/insertCategory';
            const categoryData = {
                category,
                icons: selectedIcon,
            };

            if (parentCategoryId && !subCategoryId) {
                url = `http://localhost:3009/product/insertSubCategory?categoryId=${parentCategoryId}`;
            } else if (parentCategoryId && subCategoryId) {
                url = `http://localhost:3009/product/insertSubSubCategory?categoryId=${parentCategoryId}&subCategoryId=${subCategoryId}`;
            }

            const response = await axios.post(url, categoryData);

            console.log(response.data);

            setCategory("");
            setSelectedIcon("");
            setParentCategoryId("");
            setSubCategoryId("");
            navigate('/categories');
        } catch (error) {
            console.error(error);
        }
    };

    const filteredIcons = iconComponents.filter((icon) =>
        icon.name.toLowerCase().includes(selectedIcon.toLowerCase())
    );

    const renderCategoryOptions = (category) => (
        <>
            <option key={category._id} value={category._id}>
                {category.category}
            </option>
        </>
    );

    const handleParentCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        setParentCategoryId(selectedCategoryId);
        setSubCategoryId("");
    };

    const handleSubCategoryChange = (e) => {
        const selectedSubCategoryId = e.target.value;
        setSubCategoryId(selectedSubCategoryId);
    };

    const findCategoryById = (categories, id) => {
        for (const category of categories) {
            if (category._id === id) return category;
            if (category.subCategories) {
                const subCategory = findCategoryById(category.subCategories, id);
                if (subCategory) return subCategory;
            }
        }
        return null;
    };

    const findSubCategories = (categories, parentCategoryId) => {
        const parentCategory = findCategoryById(categories, parentCategoryId);
        return parentCategory ? parentCategory.subCategories : [];
    };

    const subCategories = findSubCategories(categories, parentCategoryId);

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
                <label htmlFor="parentCategory" className="block font-semibold mb-2">
                    Parent Category
                </label>
                <select
                    id="parentCategory"
                    value={parentCategoryId}
                    onChange={handleParentCategoryChange}
                    className="w-full p-2 border rounded focus:outline-none"
                >
                    <option value="">Select Parent Category</option>
                    {categories.map(renderCategoryOptions)}
                </select>
            </div>
            {parentCategoryId && (
                <div className="mb-4">
                    <label htmlFor="subCategory" className="block font-semibold mb-2">
                        Subcategory (optional)
                    </label>
                    <select
                        id="subCategory"
                        value={subCategoryId}
                        onChange={handleSubCategoryChange}
                        className="w-full p-2 border rounded focus:outline-none"
                    >
                        <option value="">Select Subcategory</option>
                        {subCategories.map((subCategory) => (
                            <option key={subCategory._id} value={subCategory._id}>
                                {subCategory.category}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <div className="mb-4">
                <label htmlFor="title" className="block font-semibold mb-2">
                    Category
                </label>
                <input
                    type="text"
                    id="title"
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
                    value={selectedIcon}
                    onChange={(e) => setSelectedIcon(e.target.value)}
                    onClick={() => setShowIconContainer(true)}
                    className="w-full p-2 border rounded focus:outline-none"
                    placeholder="Search for an icon..."
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
                Add Category
            </button>
        </form>
    );
};

export default NewCategoryForm;

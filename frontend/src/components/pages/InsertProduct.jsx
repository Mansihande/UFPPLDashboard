import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const NewProductForm = () => {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [photos, setPhotos] = useState([]);
    const [brand, setBrand] = useState("");
    const [width, setWidth] = useState("");
    const [thickness, setThickness] = useState("");
    const [status, setStatus] = useState(false);
    const [categories, setCategories] = useState([]);
    const [parentCategoryId, setParentCategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");
    const [subSubCategoryId, setSubSubCategoryId] = useState("");
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
            const formData = new FormData();
            formData.append('title', title);
            formData.append('details', details);
            formData.append('brand', brand);
            formData.append('width', width);
            formData.append('thickness', thickness);
            formData.append('status', status);
            formData.append('categories', parentCategoryId);
            formData.append('subcategories', subCategoryId);
            formData.append('subSubcategories', subSubCategoryId);
            photos.forEach(photo => {
                formData.append('photo', photo);
            });

            const response = await axios.post('http://localhost:3009/product/insertProduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);

            setTitle("");
            setDetails("");
            setPhotos([]);
            setBrand("");
            setWidth("");
            setThickness("");
            setStatus(false);
            setParentCategoryId("");
            setSubCategoryId("");
            setSubSubCategoryId("");
            navigate('/products/addProduct');
        } catch (error) {
            console.error(error);
        }
    };

    const handleFileChange = (e) => {
        setPhotos([...photos, ...Array.from(e.target.files)]);
    };

    const renderCategoryOptions = (category) => (
        <option key={category._id} value={category._id}>
            {category.category}
        </option>
    );

    const handleParentCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        setParentCategoryId(selectedCategoryId);
        setSubCategoryId("");
        setSubSubCategoryId("");
    };

    const handleSubCategoryChange = (e) => {
        const selectedSubCategoryId = e.target.value;
        setSubCategoryId(selectedSubCategoryId);
        setSubSubCategoryId("");
    };

    const handleSubSubCategoryChange = (e) => {
        const selectedSubSubCategoryId = e.target.value;
        setSubSubCategoryId(selectedSubSubCategoryId);
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
        return parentCategory ? parentCategory.subCategories || [] : [];
    };

    const findSubSubCategories = (categories, parentCategoryId, subCategoryId) => {
        const parentCategory = findCategoryById(categories, parentCategoryId);
        if (parentCategory && parentCategory.subCategories) {
            const subCategory = findCategoryById(parentCategory.subCategories, subCategoryId);
            return subCategory ? subCategory.subSubCategories || [] : [];
        }
        return [];
    };

    const subCategories = parentCategoryId ? findSubCategories(categories, parentCategoryId) : [];
    const subSubCategories = (parentCategoryId && subCategoryId) ? findSubSubCategories(categories, parentCategoryId, subCategoryId) : [];

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
            {subCategoryId && (
                <div className="mb-4">
                    <label htmlFor="subSubCategory" className="block font-semibold mb-2">
                        Sub-Subcategory (optional)
                    </label>
                    <select
                        id="subSubCategory"
                        value={subSubCategoryId}
                        onChange={handleSubSubCategoryChange}
                        className="w-full p-2 border rounded focus:outline-none"
                    >
                        <option value="">Select Sub-Subcategory</option>
                        {subSubCategories.map((subSubCategory) => (
                            <option key={subSubCategory._id} value={subSubCategory._id}>
                                {subSubCategory.category}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <div className="mb-4">
                <label htmlFor="title" className="block font-semibold mb-2">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="details" className="block font-semibold mb-2">
                    Details
                </label>
                <textarea
                    id="details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="photo" className="block font-semibold mb-2">
                    Photos
                </label>
                <input
                    type="file"
                    id="photo"
                    multiple
                    onChange={handleFileChange}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="brand" className="block font-semibold mb-2">
                    Brand
                </label>
                <input
                    type="text"
                    id="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="width" className="block font-semibold mb-2">
                    Width
                </label>
                <input
                    type="text"
                    id="width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="thickness" className="block font-semibold mb-2">
                    Thickness
                </label>
                <input
                    type="text"
                    id="thickness"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="status" className="block font-semibold mb-2">
                    Status
                </label>
                <input
                    type="checkbox"
                    id="status"
                    checked={status}
                    onChange={(e) => setStatus(e.target.checked)}
                    className="focus:outline-none"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Add Product
            </button>
        </form>
    );
};

export default NewProductForm;

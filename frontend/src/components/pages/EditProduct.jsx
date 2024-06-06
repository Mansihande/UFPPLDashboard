import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate(); 
  const [product, setProduct] = useState({
    title: "",
    details: "",
    photo: [],
    brand: "",
    width: "",
    thickness: "",
    status: false,
    categories: [],
    subcategories: [],
    subSubcategories: [],
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`{{path}}/product/getProduct?productId=${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.put(`{{path}}/product/updateProduct?productId=${productId}`, product);
      navigate("/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label htmlFor="title" className="block font-semibold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
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
          value={product.details}
          onChange={(e) => setProduct({ ...product, details: e.target.value })}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      {/* Add other input fields for the remaining product properties */}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Update Product
      </button>
    </form>
  );
};

export default EditProduct;

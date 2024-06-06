import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import { FaEdit, FaTrashAlt, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { BsArrowReturnRight } from "react-icons/bs";
import { Link } from 'react-router-dom';
import axios from 'axios';
import DynamicFaIcon from './DynamicFaIcon.jsx'; // Import the DynamicFaIcon component

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "autoIncrementId", // Display the auto-incremental ID
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <DynamicFaIcon name={row.original.icons} />
            <span>{row.original.category}</span>
          </div>
        ),
      },
      {
        Header: "Options",
        Cell: ({ row }) => (
          <div className="flex gap-4">
            <button className="text-blue-500 hover:text-blue-700 transition">
              <Link to={`/editCategory/${row.original._id}`}>
                <FaEdit />
              </Link>
            </button>
            <button
              className="text-red-500 hover:text-red-700 transition"
              onClick={() => deleteCategory({ id: row.original._id })}
            >
              <FaTrashAlt />
            </button>
          </div>
        ),
        disableSortBy: true,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: categories,
    },
    useSortBy
  );

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3009/product/getall`);
      const categoriesWithAutoIncrementId = response.data.map((category, index) => ({
        ...category,
        autoIncrementId: index + 1,
      }));
      setCategories(categoriesWithAutoIncrementId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async ({ id, categoryId, subCategoryId, subSubCategoryId }) => {
    let url = '';
    if (categoryId && subCategoryId && subSubCategoryId) {
      url = `http://localhost:3009/product/deletesubsubcategory?categoryId=${categoryId}&subCategoryId=${subCategoryId}&subSubCategoryId=${subSubCategoryId}`;
    } else if (categoryId && subCategoryId) {
      url = `http://localhost:3009/product/deletesubcategory?categoryId=${categoryId}&subCategoryId=${subCategoryId}`;
    } else {
      url = `http://localhost:3009/product/deletecategory?id=${id}`;
    }

    try {
      await axios.delete(url);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Categories</h1>
        <button className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300">
          <Link to="/products/categories/addCategory">New Category</Link>
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full mt-4 border-collapse" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="py-2 px-4 border-b border-gray-300 cursor-pointer uppercase font-serif"
                  >
                    <div className="flex items-center gap-2 ">
                      <span>{column.render("Header")}</span>
                      {column.canSort && (
                        <span className="ml-1">
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FaArrowDown />
                            ) : (
                              <FaArrowUp />
                            )
                          ) : (
                            <FaArrowDown className="text-gray-400" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <>
                  <tr {...row.getRowProps()} className="border-b border-gray-300 hover:bg-gray-100 transition duration-150 ">
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="py-2 px-4 ">
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                  {row.original.subCategories && row.original.subCategories.length > 0 && (
                    row.original.subCategories.map((subcategory, index) => (
                      <>
                        <tr key={index} className="border-b border-gray-300 hover:bg-gray-100 transition duration-150 ">
                          <td></td>
                          <td className="py-2 px-8 flex gap-2"><BsArrowReturnRight/><DynamicFaIcon name={subcategory.icons}/><span>{subcategory.category}</span></td>
                          <td className="py-2 px-4">
                            <div className="flex gap-4">
                              <button className="text-blue-500 hover:text-blue-700 transition">
                                <Link to={`/editCategory/${row.original._id}/${subcategory._id}`}>
                                  <FaEdit />
                                </Link>
                              </button>
                              <button
                                className="text-red-500 hover:text-red-700 transition"
                                onClick={() => deleteCategory({ 
                                  categoryId: row.original._id, 
                                  subCategoryId: subcategory._id 
                                })}
                              >
                                <FaTrashAlt />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {subcategory.subSubCategory && subcategory.subSubCategory.length > 0 && (
                          subcategory.subSubCategory.map((subSubcategory, subIndex) => (
                            <tr key={`${index}-${subIndex}`} className="border-b border-gray-300 hover:bg-gray-100 transition duration-150 ">
                              <td></td>
                              <td className="py-2 px-12 flex gap-2"><BsArrowReturnRight/><DynamicFaIcon name={subSubcategory.icons}/><span>{subSubcategory.category}</span></td>
                              <td className="py-2 px-4">
                                <div className="flex gap-4">
                                  <button className="text-blue-500 hover:text-blue-700 transition">
                                    <Link to={`/editCategory/${row.original._id}/${subcategory._id}/${subSubcategory._id}`}>
                                      <FaEdit />
                                    </Link>
                                  </button>
                                  <button
                                    className="text-red-500 hover:text-red-700 transition"
                                    onClick={() => deleteCategory({ 
                                      categoryId: row.original._id, 
                                      subCategoryId: subcategory._id, 
                                      subSubCategoryId: subSubcategory._id 
                                    })}
                                  >
                                    <FaTrashAlt />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </>
                    ))
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoryTable;


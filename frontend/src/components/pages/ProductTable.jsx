import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "autoIncrementId", // Display the auto-incremental ID
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Details",
        accessor: "details",
      },
      {
        Header: "Brand",
        accessor: "brand",
      },
      {
        Header: "Width",
        accessor: "width",
      },
      {
        Header: "Thickness",
        accessor: "thickness",
      },
      {
        Header: "Category",
        accessor: "categoryName", // Use the categoryName instead of category
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (value ? "Active" : "Inactive"),
      },
      {
        Header: "Photo",
        accessor: "photo",
        Cell: ({ value }) => {
          const firstImage = Array.isArray(value) && value.length > 0 ? value[0] : null;
          return firstImage ? <img src={`http://localhost:3009/image/download/${firstImage}`} alt="Banner" className=" w-fit h-20"/> : null;
        },
        disableSortBy: true,
      },
      {
        Header: "Options",
        Cell: ({ row }) => (
          <div className="flex gap-4">
            <button className="text-blue-500 hover:text-blue-700 transition">
              <Link to={`/editProduct/${row.original._id}`}>
                <FaEdit />
              </Link>
            </button>
            <button
              className="text-red-500 hover:text-red-700 transition"
              onClick={() => deleteProduct(row.original._id)}
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
      data: products,
    },
    useSortBy
  );

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3009/product/getAllProducts`); // Call the specified endpoint
      const productsWithAutoIncrementId = response.data.map((product, index) => ({
        ...product,
        autoIncrementId: index + 1,
      }));
      setProducts(productsWithAutoIncrementId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3009/product/deleteProduct?productId=${productId}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Products</h1>
        <button className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300">
          <Link to="/products/addProduct">New Product</Link>
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
                    <div className="flex items-center gap-2">
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
                <tr
                  {...row.getRowProps()}
                  className="border-b border-gray-300 hover:bg-gray-100 transition duration-150"
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="py-2 px-4">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsTable;

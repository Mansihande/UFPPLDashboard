// src/components/CategoryTable.js
import React from 'react';

const categories = [
  {
    id: 9,
    title: 'Educational books',
    contents: 0,
    visits: 9,
    status: true,
    subCategories: [
      {
        id: 15,
        title: 'Kids books',
        contents: 1,
        visits: 9,
        status: true,
        subCategories: [
          {
            id: 18,
            title: 'School Books',
            contents: 12,
            visits: 4,
            status: true,
          },
          {
            id: 19,
            title: 'Activities Books',
            contents: 2,
            visits: 2,
            status: true,
          },
        ],
      },
      {
        id: 16,
        title: 'Information Science',
        contents: 2,
        visits: 0,
        status: true,
      },
      {
        id: 17,
        title: 'Self Education',
        contents: 2,
        visits: 0,
        status: true,
      },
    ],
  },
  {
    id: 10,
    title: 'Language books',
    contents: 0,
    visits: 0,
    status: true,
  },
  {
    id: 11,
    title: 'Business books',
    contents: 0,
    visits: 0,
    status: true,
  },
  {
    id: 12,
    title: 'Crafts books',
    contents: 1,
    visits: 1,
    status: true,
  },
  {
    id: 13,
    title: 'Health & Fitness',
    contents: 2,
    visits: 0,
    status: true,
  },
];

const CategoryTable = () => {
  return (
    <div className="container mx-auto mt-8">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Category Title</th>
              <th className="py-2 px-4 border-b text-left">Contents</th>
              <th className="py-2 px-4 border-b text-left">Visits</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Options</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <React.Fragment key={category.id}>
                <TableRow category={category} level={1} />
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableRow = ({ category, level }) => {
  const getIcon = (level) => {
    switch (level) {
      case 1:
        return '→';
      case 2:
        return '↳';
      case 3:
        return '↪';
      default:
        return '→';
    }
  };

  return (
    <>
      <tr>
        <td className="py-2 px-4 border-b text-left">{category.id}</td>
        <td className={`py-2 px-4 border-b text-left  indent-${level}`}>
          <span className="mr-2">{getIcon(level)}</span>
          {category.title}
        </td>
        <td className="py-2 px-4 border-b text-left">{category.contents}</td>
        <td className="py-2 px-4 border-b text-left">{category.visits}</td>
        <td className="py-2 px-4 border-b text-left">
          {category.status ? '✔' : '✘'}
        </td>
        <td className="py-2 px-4 border-b text-left">
          <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">View</button>
          <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">Edit</button>
          <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </td>
      </tr>
      {category.subCategories && category.subCategories.length > 0 && (
        category.subCategories.map((subCategory) => (
          <TableRow key={subCategory.id} category={subCategory} level={level + 1} />
        ))
      )}
    </>
  );
};

export default CategoryTable;

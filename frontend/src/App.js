import ExampleWithProviders from "./components/pages/EditTable";
import CategoryTable from "./components/pages/CategoryTable";
import InsertCategory from "./components/pages/InsertCategory";
import EditCategory from "./components/pages/EditCategory"
import ProductTable from "./components/pages/ProductTable"
import InsertProduct from "./components/pages/InsertProduct"
import EditProduct from "./components/pages/EditProduct"
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";

function App() {
  const router = createBrowserRouter(
    createRoutesFromChildren(
    <>
    <Route path="/" element={<Sidebar />} >
    <Route path="/dashboard" element={<ExampleWithProviders />}/>
    <Route path="/products/categories" element={<CategoryTable />}/>
    <Route path="/editCategory/:categoryId/:subCategoryId?/:subSubCategoryId?" element={<EditCategory/>} />
    <Route path="/products/categories/addCategory" element={<InsertCategory />}/>
    <Route path="/products/products" element={<ProductTable/>}/>
    <Route path="/products/addProduct"  element={<InsertProduct/>}/>
    <Route path="/editProduct/:productId"  element={<EditProduct/>}/>

    </Route>
    </>
  
  )
  );
  return <RouterProvider router={router} />;
}

export default App;

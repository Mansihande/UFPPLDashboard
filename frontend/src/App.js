import ExampleWithProviders from "./components/pages/EditTable";
import CategoryTable from "./components/pages/CategoryTable";
import InsertCategory from "./components/pages/InsertCategory"
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
    <Route path="/products/categories/addCategory" element={<InsertCategory />}/>
    </Route>
    </>
  
  )
  );
  return <RouterProvider router={router} />;
}

export default App;

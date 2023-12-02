import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import Login from './components/Login';
import axios from "axios";
import ProfilePage from "./pages/ProfilePage.jsx";
import ManageInvitation from "./pages/ManageInvitation.jsx";
import CreateInvitation from "./pages/CreateInvitation.jsx";
import AllCards from "./pages/AllCards.jsx";
import AccountSettings from "./pages/AccountSettings";
import Category from "./pages/Category.jsx";
import NoRoute from "./pages/NoRoute.jsx";
import AddCategory from "./admin/AddCategory.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Blog from "./pages/Blog.jsx";
import Careers from "./pages/Careers.jsx";
import AddSubCategory from "./admin/AddSubCategory";
import AddCards from "./admin/AddCards";
import Editor from "./pages/editor/Editor";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/account" element={<ProfilePage />} />
        <Route path="/account/settings" element={<AccountSettings />} />
        <Route path="/manage" element={<ManageInvitation />} />
        <Route path="/create" element={<CreateInvitation />} />
        <Route path="/cards" element={<AllCards />} />
        <Route path="/customize/:id" element={<Editor />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/admin/addcategory" element={<AddCategory />} />
        <Route path="/admin/addcards" element={<AddCards/>} />
        <Route path="/admin/managesubcategory" element={<AddSubCategory />} />
        <Route path="*" element={<NoRoute />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/Login/login";
import Signup from "./components/Authentication/Signup/Signup";
import RequireRole from "../src/utils/RequireRole";
import RequireAuth from "../src/utils/RequireAuth";
import NotFoundView from "./FallbackComponents/NotFound/Error404";
import Unauthorized from "./FallbackComponents/Unauthorized/Unauthorized";
import Items from "./components/Items/Index";
import NavBar from "./components/Navbar/navIndex";
import About from "./components/About/About";
import CreateItemForm from "./components/Items/CreateItems/CreateItemForm";
import PersistLogin from "./utils/PersistLogin";
import UpdateItemForm from "./components/Items/UpdateItems/UpdateItemForm";
import CartPage from "./components/Cart/Index";
import UserProfile from "./components/UserProfile/UserProfile";
import AdminSignUp from "./components/Authentication/AdminSignup/AdminSignup";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireRole roleName={[]} />}>
            <Route path="/" element={<Items />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/user-profile" element={<UserProfile />} />
          </Route>
          <Route element={<RequireRole roleName={["isAdmin"]} />}></Route>
          <Route element={<RequireRole roleName={["isSuperAdmin"]} />}>
            <Route path="/add-admin" element={<AdminSignUp />} />
          </Route>
          <Route
            element={<RequireRole roleName={["isAdmin", "isSuperAdmin"]} />}
          >
            <Route path="/create-item" element={<CreateItemForm />} />
            <Route path="/update-item/:itemUUID" element={<UpdateItemForm />} />
          </Route>
        </Route>

        {/* Fallback components */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </Router>
  );
}

export default App;

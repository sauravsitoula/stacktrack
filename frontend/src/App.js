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

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/" element={<Items />} />

        {/* Components needing authorization */}
        <Route element={<RequireAuth />}>
          <Route path="/about" element={<About />} />
        </Route>

        {/* Fallback components */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </Router>
  );
}

export default App;

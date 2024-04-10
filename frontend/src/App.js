import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/Login/login";
import Signup from "./components/Authentication/Signup/Signup";
import RequireRole from "../src/utils/RequireRole";
import RequireAuth from "../src/utils/RequireAuth";
import NotFoundView from "./FallbackComponents/NotFound/Error404";
import Unauthorized from "./FallbackComponents/Unauthorized/Unauthorized";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />

        {/* Components needing authorization */}
        <Route element={<RequireAuth />}></Route>

        {/* Fallback components */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </Router>
  );
}

export default App;

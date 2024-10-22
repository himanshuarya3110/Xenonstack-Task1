import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login"
import PrivateOutlet from "./components/shared/PrivateOutlet";
import Profile from "./components/Profle";
import Home from "./components/Home";
import PropertyDetail from "./components/PropertyDetail";
import { ProtectedLogin } from "./components/Auth/ProtectedLogin";

import Register from "./components/Auth/Register";
import Properties from "./components/Properties";
function App() {


  return (

    <Router>
      <Routes>

        <Route path='/login' element={
          <ProtectedLogin>
            <Login />
          </ProtectedLogin>



        } />
        <Route path='/register' element={
          <ProtectedLogin>
            <Register />
          </ProtectedLogin>



        } />
        <Route element={<PrivateOutlet />} >
          <Route path="/" element={<Home />} >
            <Route path="" element={<Properties />} />
          </Route>
          <Route path="/profile" element={<Profile/>} />
            <Route path="/property/:id" element={<PropertyDetail />} />

        </Route>


        {/* <Route path="*" element={<NotFound />} /> */}




      </Routes>

    </Router>


  )
}

export default App

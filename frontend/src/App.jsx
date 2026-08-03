import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Policies from "./pages/Policies";
import Claims from "./pages/Claims";
import Premiums from "./pages/Premiums";
import Reports from "./pages/Reports";
import Documents from "./pages/Documents";
import Login from "./pages/Login";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login Page */}
        <Route
          path="/login"
          element={<Login />}
        />


        {/* Main Application */}
        <Route

          path="/*"

          element={

            <div className="d-flex">


              <Sidebar />


              <div style={{ flex: 1 }}>


                <Navbar />


                <div className="container-fluid p-4">


                  <Routes>


                    <Route
                      path="/"
                      element={<Dashboard />}
                    />


                    <Route
                      path="/customers"
                      element={<Customers />}
                    />


                    <Route
                      path="/policies"
                      element={<Policies />}
                    />


                    <Route
                      path="/claims"
                      element={<Claims />}
                    />


                    <Route
                      path="/premiums"
                      element={<Premiums />}
                    />


                    <Route
                      path="/reports"
                      element={<Reports />}
                    />


                    <Route
                      path="/documents"
                      element={<Documents />}
                    />


                  </Routes>


                </div>


              </div>


            </div>

          }

        />


      </Routes>


    </BrowserRouter>

  );

}


export default App;
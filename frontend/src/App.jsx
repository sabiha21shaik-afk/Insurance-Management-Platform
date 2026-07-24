import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Policies from "./pages/Policies";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex">
        <Sidebar />

        <div style={{ flex: 1 }}>
          <Navbar />

          <div className="container-fluid p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/policies" element={<Policies />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
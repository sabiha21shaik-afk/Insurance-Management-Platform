import { useEffect, useState } from "react";
import axios from "axios";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
  });

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const customersPerPage = 5;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  const addCustomer = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://127.0.0.1:5000/customers",
        formData
      );

      setFormData({
        name: "",
        dob: "",
        phone: "",
        email: "",
      });

      fetchCustomers();
    } catch (err) {
      console.error("Error adding customer:", err);
    }
  };

  // Search Filter
  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name?.toLowerCase().includes(search.toLowerCase()) ||
      customer.email?.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone?.includes(search)
    );
  });

  // Pagination
  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;

  const currentCustomers = filteredCustomers.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredCustomers.length / customersPerPage
  );

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">

        <h2 className="text-primary mb-4">
          👥 Customer Management
        </h2>

        {/* Add Customer Form */}

        <form onSubmit={addCustomer} className="mb-4">

          <div className="row g-3">

            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dob: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="col-md-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>

          </div>

          <button className="btn btn-success mt-3">
            ➕ Add Customer
          </button>

        </form>

        {/* Search */}

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by Name, Email or Phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Table */}

        <table className="table table-hover table-bordered">

          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>

            {currentCustomers.length > 0 ? (
              currentCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.dob}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No customers found
                </td>
              </tr>
            )}

          </tbody>

        </table>

        {/* Pagination */}

        <div className="d-flex justify-content-between align-items-center mt-3">

          <button
            className="btn btn-outline-primary"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
          >
            ⬅ Previous
          </button>

          <span className="fw-bold">
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            className="btn btn-outline-primary"
            disabled={
              currentPage === totalPages ||
              totalPages === 0
            }
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
          >
            Next ➡
          </button>

        </div>

      </div>
    </div>
  );
}

export default Customers;
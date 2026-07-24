import { useEffect, useState } from "react";
import axios from "axios";

function Customers() {

  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    email: ""
  });

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
        email: ""
      });

      fetchCustomers();

    } catch (err) {
      console.error("Error adding customer:", err);
    }
  };


  return (
    <div className="container mt-4">

      <div className="card shadow-lg p-4">

        <h2 className="text-primary mb-4">
          👥 Customer Management
        </h2>


        <form onSubmit={addCustomer} className="mb-5">

          <div className="row">

            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Name"
                value={formData.name}
                onChange={(e)=>setFormData({...formData,name:e.target.value})}
              />
            </div>


            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                value={formData.dob}
                onChange={(e)=>setFormData({...formData,dob:e.target.value})}
              />
            </div>


            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e)=>setFormData({...formData,phone:e.target.value})}
              />
            </div>


            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={(e)=>setFormData({...formData,email:e.target.value})}
              />
            </div>

          </div>


          <button className="btn btn-success mt-3">
            ➕ Add Customer
          </button>

        </form>



        <table className="table table-hover">

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

            {customers.map((customer)=>(
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.dob}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}


export default Customers;
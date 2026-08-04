import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:5000/register", form);

      alert("Registration Successful");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration Failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f7fc",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#fff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2 className="text-center mb-4">Register</h2>

        <form onSubmit={register}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control mb-3"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-3"
            value={form.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="form-control mb-3"
            value={form.role}
            onChange={handleChange}
          >
            <option value="Admin">Admin</option>
            <option value="Agent">Agent</option>
            <option value="Customer">Customer</option>
          </select>

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
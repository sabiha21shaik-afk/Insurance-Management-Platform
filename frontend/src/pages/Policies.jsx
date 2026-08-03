import { useEffect, useState } from "react";
import axios from "axios";

function Policies() {
  const [policies, setPolicies] = useState([]);

  const [formData, setFormData] = useState({
    customer_id: "",
    policy_type: "",
    policy_number: "",
    premium_amount: "",
    start_date: "",
    end_date: "",
    status: "Active",
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/policies");
      setPolicies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addPolicy = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://127.0.0.1:5000/policies",
        formData
      );

      setFormData({
        customer_id: "",
        policy_type: "",
        policy_number: "",
        premium_amount: "",
        start_date: "",
        end_date: "",
        status: "Active",
      });

      fetchPolicies();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredPolicies = policies.filter((policy) =>
    (policy.policy_type || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">

      <div className="card shadow-lg p-4">

        <h2 className="text-success mb-4">
          📜 Policy Management
        </h2>

        <form onSubmit={addPolicy}>

          <div className="row g-3">

            <div className="col-md-2">
              <input
                className="form-control"
                placeholder="Customer ID"
                value={formData.customer_id}
                onChange={(e)=>
                  setFormData({
                    ...formData,
                    customer_id:e.target.value
                  })
                }
                required
              />
            </div>

            <div className="col-md-2">
              <input
                className="form-control"
                placeholder="Policy Type"
                value={formData.policy_type}
                onChange={(e)=>
                  setFormData({
                    ...formData,
                    policy_type:e.target.value
                  })
                }
                required
              />
            </div>

            <div className="col-md-2">
              <input
                className="form-control"
                placeholder="Policy Number"
                value={formData.policy_number}
                onChange={(e)=>
                  setFormData({
                    ...formData,
                    policy_number:e.target.value
                  })
                }
                required
              />
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Premium"
                value={formData.premium_amount}
                onChange={(e)=>
                  setFormData({
                    ...formData,
                    premium_amount:e.target.value
                  })
                }
                required
              />
            </div>

            <div className="col-md-2">
              <input
                type="date"
                className="form-control"
                value={formData.start_date}
                onChange={(e)=>
                  setFormData({
                    ...formData,
                    start_date:e.target.value
                  })
                }
                required
              />
            </div>

            <div className="col-md-2">
              <input
                type="date"
                className="form-control"
                value={formData.end_date}
                onChange={(e)=>
                  setFormData({
                    ...formData,
                    end_date:e.target.value
                  })
                }
                required
              />
            </div>

          </div>

          <button className="btn btn-success mt-3">
            ➕ Add Policy
          </button>

        </form>

        <div className="mt-4 mb-3">

          <input
            className="form-control"
            placeholder="🔍 Search Policy Type..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>

        <table className="table table-hover table-bordered">

          <thead className="table-success">

            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Type</th>
              <th>Number</th>
              <th>Premium</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {filteredPolicies.map((policy)=>(
              <tr key={policy.id}>
                <td>{policy.id}</td>
                <td>{policy.customer_id}</td>
                <td>{policy.policy_type}</td>
                <td>{policy.policy_number}</td>
                <td>₹ {policy.premium_amount}</td>
                <td>{policy.status}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Policies;
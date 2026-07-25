import { useEffect, useState } from "react";
import axios from "axios";

function Claims() {
  const [claims, setClaims] = useState([]);

  const [formData, setFormData] = useState({
    policy_id: "",
    claim_amount: "",
    reason: "",
    status: "Pending",
    submission_date: "",
  });

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/claims");
      setClaims(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addClaim = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:5000/claims", formData);

      setFormData({
        policy_id: "",
        claim_amount: "",
        reason: "",
        status: "Pending",
        submission_date: "",
      });

      fetchClaims();
      alert("Claim added successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to add claim!");
    }
  };

  const deleteClaim = async (id) => {
    if (!window.confirm("Delete this claim?")) return;

    try {
      await axios.delete(`http://127.0.0.1:5000/claims/${id}`);
      fetchClaims();
      alert("Claim deleted successfully!");
    } catch (err) {
      console.log(err);
      alert("Delete failed!");
    }
  };

  return (
    <div className="container-fluid mt-4">

      {/* Add Claim */}
      <div className="card shadow-lg border-0 mb-4">
        <div className="card-header bg-success text-white">
          <h3 className="mb-0">➕ Add New Claim</h3>
        </div>

        <div className="card-body">
          <form onSubmit={addClaim}>
            <div className="row g-3">

              <div className="col-md-4">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Policy ID"
                  name="policy_id"
                  value={formData.policy_id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Claim Amount"
                  name="claim_amount"
                  value={formData.claim_amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </div>

              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control"
                  name="submission_date"
                  value={formData.submission_date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <button className="btn btn-success w-100">
                  ➕ Add Claim
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>

      {/* Claims Table */}

      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">📋 Claims Management</h3>
        </div>

        <div className="card-body">

          <table className="table table-hover table-bordered align-middle">

            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Policy ID</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Date</th>
                <th width="170">Actions</th>
              </tr>
            </thead>

            <tbody>

              {claims.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No Claims Available
                  </td>
                </tr>
              ) : (
                claims.map((claim) => (
                  <tr key={claim.id}>
                    <td>{claim.id}</td>

                    <td>{claim.policy_id}</td>

                    <td>₹ {claim.claim_amount}</td>

                    <td>{claim.reason}</td>

                    <td>
                      <span
                        className={
                          claim.status === "Approved"
                            ? "badge bg-success"
                            : claim.status === "Rejected"
                            ? "badge bg-danger"
                            : "badge bg-warning text-dark"
                        }
                      >
                        {claim.status}
                      </span>
                    </td>

                    <td>{claim.submission_date}</td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteClaim(claim.id)}
                      >
                        🗑 Delete
                      </button>

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}

export default Claims;
import { useState } from "react";
import axios from "axios";

function AddPaymentModal({ show, onClose, fetchPayments }) {
  const [policyId, setPolicyId] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Paid");

  if (!show) return null;

  const handleSave = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/payments", {
        policy_id: parseInt(policyId),
        payment_date: paymentDate,
        amount: parseFloat(amount),
        status: status,
      });

      alert("Payment Added Successfully!");

      setPolicyId("");
      setPaymentDate("");
      setAmount("");
      setStatus("Paid");

      if (fetchPayments) {
        fetchPayments();
      }

      onClose();
    } catch (error) {
      console.error(error);
      alert("Error saving payment");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "500px",
          borderRadius: "15px",
          padding: "25px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold">💰 Add Premium Payment</h4>

          <button
            className="btn btn-light"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">Policy ID</label>
          <input
            type="number"
            className="form-control"
            value={policyId}
            onChange={(e) => setPolicyId(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Payment Date</label>
          <input
            type="date"
            className="form-control"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={handleSave}
          >
            💾 Save Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPaymentModal;
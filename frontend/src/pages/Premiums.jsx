import { useEffect, useState } from "react";
import axios from "axios";
import AddPaymentModal from "../components/payments/AddPaymentModal";

function Premiums() {
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/payments");
      setPayments(res.data);
    } catch (err) {
      console.error("Error fetching payments:", err);
    }
  };

  const totalAmount = payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0
  );

  const paidCount = payments.filter(
    (payment) => payment.status === "Paid"
  ).length;

  const pendingCount = payments.filter(
    (payment) => payment.status === "Pending"
  ).length;

  const overdueCount = payments.filter(
    (payment) => payment.status === "Overdue"
  ).length;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">💰 Premium Payments</h2>
          <p className="text-muted">
            Manage customer premium payments
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Add Payment
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6>Total Amount</h6>
              <h3 className="text-primary">₹{totalAmount}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6>Paid</h6>
              <h3 className="text-success">{paidCount}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6>Pending</h6>
              <h3 className="text-warning">{pendingCount}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6>Overdue</h6>
              <h3 className="text-danger">{overdueCount}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow border-0">
        <div className="card-body">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Policy ID</th>
                <th>Payment Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{payment.policy_id}</td>
                    <td>{payment.payment_date}</td>
                    <td>₹{payment.amount}</td>
                    <td>
                      <span
                        className={`badge ${
                          payment.status === "Paid"
                            ? "bg-success"
                            : payment.status === "Pending"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No premium payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddPaymentModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default Premiums;
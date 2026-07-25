import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "linear-gradient(180deg,#4f46e5,#06b6d4,#22c55e)",
      }}
    >
      <h3 className="text-white text-center py-4">
        🚀 Insurance Hub
      </h3>

      <div className="list-group list-group-flush">
        <Link
          className="list-group-item list-group-item-action"
          to="/"
        >
          🏠 Dashboard
        </Link>

        <Link
          className="list-group-item list-group-item-action"
          to="/customers"
        >
          👥 Customers
        </Link>

        <Link
          className="list-group-item list-group-item-action"
          to="/policies"
        >
          📜 Policies
        </Link>

        <Link
          className="list-group-item list-group-item-action"
          to="/claims"
        >
          📝 Claims
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
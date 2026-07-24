import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  return (
    <div>
      <h2 className="fw-bold mb-4">
        👋 Welcome to Insurance Management Platform
      </h2>

      <div className="row">

        <div className="col-md-3 mb-4">
          <DashboardCard
            title="Customers"
            value="120"
            color="#2563eb"
            icon="👥"
          />
        </div>

        <div className="col-md-3 mb-4">
          <DashboardCard
            title="Policies"
            value="85"
            color="#7c3aed"
            icon="📜"
          />
        </div>

        <div className="col-md-3 mb-4">
          <DashboardCard
            title="Claims"
            value="15"
            color="#22c55e"
            icon="💰"
          />
        </div>

        <div className="col-md-3 mb-4">
          <DashboardCard
            title="Revenue"
            value="₹5,20,000"
            color="#f59e0b"
            icon="💵"
          />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
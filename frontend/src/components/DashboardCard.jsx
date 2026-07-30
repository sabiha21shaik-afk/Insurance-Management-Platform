import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  return (
    <div>
      {/* Welcome Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #4F7CFF, #7AA6FF)",
          borderRadius: "24px",
          padding: "35px",
          color: "white",
          marginBottom: "30px",
          boxShadow: "0 15px 35px rgba(79,124,255,.25)",
        }}
      >
        <h2 className="fw-bold mb-2">
          Welcome Back 👋
        </h2>

        <p
          style={{
            opacity: 0.9,
            fontSize: "16px",
            marginBottom: 0,
          }}
        >
          Monitor your insurance business, customers, policies, claims and
          premium payments from one centralized dashboard.
        </p>
      </div>

      {/* Statistics Cards */}

      <div className="row">

        <div className="col-lg-3 col-md-6 mb-4">
          <DashboardCard
            title="Customers"
            value="120"
            color="#4F7CFF"
            icon="👥"
          />
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <DashboardCard
            title="Policies"
            value="85"
            color="#8B5CF6"
            icon="📜"
          />
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <DashboardCard
            title="Claims"
            value="15"
            color="#22C55E"
            icon="📝"
          />
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <DashboardCard
            title="Revenue"
            value="₹5,20,000"
            color="#F59E0B"
            icon="💰"
          />
        </div>

      </div>

      {/* Bottom Section */}

      <div className="row">

        {/* Business Overview */}

        <div className="col-lg-8 mb-4">
          <div
            className="card"
            style={{
              borderRadius: "22px",
              padding: "28px",
              minHeight: "340px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>
                <h4 className="fw-bold">
                  Business Overview
                </h4>

                <small className="text-muted">
                  Insurance Performance
                </small>
              </div>

              <button className="btn btn-primary">
                View Report
              </button>

            </div>

            <div
              style={{
                height: "180px",
                borderRadius: "18px",
                background:
                  "linear-gradient(135deg,#EEF4FF,#F9FBFF)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                color: "#4F7CFF",
                fontWeight: "600",
              }}
            >
              📈 Analytics Chart
            </div>

            <div className="row mt-4">

              <div className="col-md-4 text-center">
                <h3 className="fw-bold">92%</h3>
                <small className="text-muted">
                  Policy Renewal
                </small>
              </div>

              <div className="col-md-4 text-center">
                <h3 className="fw-bold">85%</h3>
                <small className="text-muted">
                  Claim Approval
                </small>
              </div>

              <div className="col-md-4 text-center">
                <h3 className="fw-bold">98%</h3>
                <small className="text-muted">
                  Customer Satisfaction
                </small>
              </div>

            </div>

          </div>
        </div>

        {/* Recent Activity */}

        <div className="col-lg-4 mb-4">

          <div
            className="card"
            style={{
              borderRadius: "22px",
              padding: "28px",
              minHeight: "340px",
            }}
          >

            <h4 className="fw-bold mb-4">
              Recent Activity
            </h4>

            <div className="mb-4">
              <h6>👤 New Customer Added</h6>
              <small className="text-muted">
                5 minutes ago
              </small>
            </div>

            <div className="mb-4">
              <h6>📜 Policy Approved</h6>
              <small className="text-muted">
                18 minutes ago
              </small>
            </div>

            <div className="mb-4">
              <h6>💰 Premium Payment Received</h6>
              <small className="text-muted">
                1 hour ago
              </small>
            </div>

            <div>
              <h6>📝 New Claim Submitted</h6>
              <small className="text-muted">
                Today
              </small>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
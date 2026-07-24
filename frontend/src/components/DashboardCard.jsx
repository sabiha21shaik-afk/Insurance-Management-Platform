function DashboardCard({ title, value, color, icon }) {
  return (
    <div
      className="card shadow-lg border-0"
      style={{
        borderRadius: "20px",
        background: color,
        color: "white",
        transition: "0.3s",
      }}
    >
      <div className="card-body text-center p-4">
        <h1>{icon}</h1>

        <h5>{title}</h5>

        <h2 className="fw-bold">
          {value}
        </h2>
      </div>
    </div>
  );
}

export default DashboardCard;
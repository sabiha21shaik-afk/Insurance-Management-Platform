function Navbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        height: "80px",
        background: "#fff",
        borderRadius: "20px",
        padding: "0 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 10px 25px rgba(15,23,42,.06)",
        marginBottom: "28px",
      }}
    >
      <div>
        <h3
          style={{
            margin: 0,
            color: "#183B6B",
            fontWeight: "700",
          }}
        >
          Welcome Back 👋
        </h3>

        <small style={{ color: "#64748B" }}>
          {today}
        </small>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          style={{
            width: "260px",
            border: "1px solid #E8EDF5",
            borderRadius: "12px",
            padding: "10px 16px",
            outline: "none",
            background: "#F8FAFC",
          }}
        />

        <button
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "12px",
            border: "none",
            background: "#F3F6FD",
            cursor: "pointer",
          }}
        >
          🔔
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              background: "#4F7CFF",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700",
            }}
          >
            S
          </div>

          <div>
            <div style={{ fontWeight: "600" }}>
              Sabiroon
            </div>

            <small style={{ color: "#64748B" }}>
              Administrator
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", icon: "📊", path: "/" },
    { name: "Customers", icon: "👥", path: "/customers" },
    { name: "Policies", icon: "📜", path: "/policies" },
    { name: "Premiums", icon: "💳", path: "/premiums" },
    { name: "Claims", icon: "📝", path: "/claims" },
  ];

  return (
    <div
      style={{
        width: "270px",
        minHeight: "100vh",
        background: "#183B6B",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "24px 18px",
        boxShadow: "8px 0 30px rgba(15,23,42,.08)",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "rgba(255,255,255,.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            🛡️
          </div>

          <div>
            <h4
              style={{
                margin: 0,
                fontWeight: "700",
              }}
            >
              Insurance
            </h4>

            <small
              style={{
                color: "#BFD4FF",
              }}
            >
              Management Platform
            </small>
          </div>
        </div>

        {menus.map((menu) => {
          const active = location.pathname === menu.path;

          return (
            <Link
              key={menu.path}
              to={menu.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                textDecoration: "none",
                marginBottom: "10px",
                padding: "14px 18px",
                borderRadius: "14px",
                transition: ".3s",
                background: active ? "#FFFFFF" : "transparent",
                color: active ? "#183B6B" : "#E8F1FF",
                fontWeight: active ? "600" : "500",
              }}
            >
              <span style={{ fontSize: "22px" }}>
                {menu.icon}
              </span>

              {menu.name}
            </Link>
          );
        })}
      </div>

      <div
        style={{
          background: "rgba(255,255,255,.08)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: "18px",
          padding: "18px",
        }}
      >
        <h6
          style={{
            marginBottom: "8px",
            fontWeight: "600",
          }}
        >
          Enterprise Edition
        </h6>

        <small
          style={{
            color: "#DCE8FF",
          }}
        >
          Secure insurance management with premium analytics and reporting.
        </small>
      </div>
    </div>
  );
}

export default Sidebar;
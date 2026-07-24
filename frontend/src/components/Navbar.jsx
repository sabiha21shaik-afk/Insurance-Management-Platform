function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "linear-gradient(90deg,#2563eb,#7c3aed)",
        color: "white",
      }}
    >
      <div className="container-fluid">
        <span className="navbar-brand text-white fw-bold fs-4">
          🛡️ Insurance Management Platform
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
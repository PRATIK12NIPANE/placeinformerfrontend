import React, { useState, useEffect } from "react";
import { Link, useNavigate,useLocation  } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { getUserProfile } from "../api/api";

function AppNavbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const location = useLocation(); // ✅ Correct way to use location

  useEffect(() => {
 

    if (!token) {
        // Redirect to login ONLY if user is trying to access restricted pages
        if (location.pathname === "/") {
          navigate("/");
        }else if(location.pathname === "/register"){
            navigate("/register");
        }
        else{
            navigate("/login");
            return;
        }
        return;
    }



    getUserProfile(token)
      .then(({ data }) => setUser(data))
      .catch(() => navigate("/"));
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload(); // 🔄 Reloads page to update navbar
  };

  return (
    <Navbar expand="lg" style={{ background: "linear-gradient(90deg, #1E3A8A, #3B82F6)", position: "sticky", top: 0, zIndex: 1000 }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: "#fff", fontWeight: "bold", fontSize: "1.5rem" }}>
          Hidden Gems Traveler
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: "#fff" }} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" style={{ color: "#fff", fontSize: "1.1rem" }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/destinations" style={{ color: "#fff", fontSize: "1.1rem" }}>Destinations</Nav.Link>
            <Nav.Link as={Link} to="/favorites" style={{ color: "#fff", fontSize: "1.1rem" }}>Favorites</Nav.Link>

            {/* User Profile Section */}
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle as="div" style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt="Profile"
                      style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", border: "2px solid #fff" }}
                    />
                  ) : (
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      color: "#1E3A8A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "1.2rem"
                    }}>
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link as={Link} to="/login" style={{ color: "#fff", fontSize: "1.1rem", display: "flex", alignItems: "center" }}>
                <FaUserCircle size={28} style={{ marginRight: "5px" }} /> Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;

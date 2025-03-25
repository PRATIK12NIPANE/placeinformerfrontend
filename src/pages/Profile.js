import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile, createUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import "../styles/Profile.css";
import { FaUserCircle } from "react-icons/fa"; // Import user icon



const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    email: "",
    phone: "",
    city: "",
    password: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    getUserProfile()
      .then(({ data }) => setUpdatedUser(data))
      .catch(() => navigate("/"));
  }, [navigate]);

  const handleSave = async () => {
    try {
      if (updatedUser._id) {
        await updateUserProfile(updatedUser);
      } else {
        await createUser(updatedUser);
      }
      setIsEditing(false);
    } catch (error) {
      alert("Failed to save profile.");
    }
  };

  return (
    <Container className="profile-container">
      <Card className="profile-card">
        <div className="profile-header">
        <div className="profile-pic">
            <FaUserCircle className="user-icon" />
        </div>
          <h2 className="profile-name">{updatedUser.username || "User Name"}</h2>
          <p className="profile-email">{updatedUser.email || "user@example.com"}</p>
        </div>

        <div className="profile-details">
          {["phone", "city"].map((field) => (
            <Row className="profile-row" key={field}>
              <Col xs={4} className="profile-label">{field.charAt(0).toUpperCase() + field.slice(1)}</Col>
              <Col xs={8}>
                {isEditing ? (
                  <input
                    type="text"
                    value={updatedUser[field] || ""}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, [field]: e.target.value })}
                    className="profile-input"
                  />
                ) : (
                  <span className="profile-value">{updatedUser[field] || "N/A"}</span>
                )}
              </Col>
            </Row>
          ))}
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <Button className="btn-save" onClick={handleSave}>
              Save Changes
            </Button>
          ) : (
            <Button className="btn-edit" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}

          <Button className="btn-logout" onClick={() => { localStorage.removeItem("token"); navigate("/"); }}>
            Logout
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default Profile;

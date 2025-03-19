import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Form, InputGroup } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    getUserProfile(token)
      .then(({ data }) => {
        setUser(data);
        setUpdatedUser(data);
      })
      .catch(() => navigate("/"));
  }, [navigate]);

  const handleSave = async () => {
    try {
      await updateUserProfile(updatedUser);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="shadow-lg p-4" style={{ width: "400px", borderRadius: "10px" }}>
        <Card.Body>
          <h2 className="text-center text-primary fw-bold mb-3">Profile</h2>

          {/* Profile Fields */}
          <Form>
            {["username", "email","password", "phone", "city"].map((field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label className="fw-semibold text-capitalize">{field}</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    value={updatedUser[field] || ""}
                    disabled={!isEditing}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, [field]: e.target.value })}
                  />
                  {field === "username" && (
                    <Button variant="outline-secondary" onClick={() => setIsEditing(!isEditing)}>
                      <FaEdit />
                    </Button>
                  )}
                </InputGroup>
              </Form.Group>
            ))}
          </Form>

          {/* Action Buttons */}
          {isEditing ? (
            <Button variant="success" className="w-100 fw-bold mb-2" onClick={handleSave}>
              Save Changes
            </Button>
          ) : (
            <Button variant="outline-primary" className="w-100 fw-bold mb-2" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}

          <Button variant="danger" className="w-100 fw-bold" onClick={() => { localStorage.removeItem("token"); navigate("/"); }}>
            Logout
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;

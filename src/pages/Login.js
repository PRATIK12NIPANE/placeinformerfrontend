import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/api";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); // Store user details
      navigate("/profile");
      window.location.reload(); // Reload to update navbar
    } catch (error) {
      setError("Invalid email or password.");
    }
    setLoading(false);
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="p-4 shadow-lg border border-primary" style={{ width: "400px", borderRadius: "10px" }}>
        <Card.Body>
          <h2 className="text-center text-primary fw-bold mb-4">Login</h2>

          {error && <Alert variant="danger" className="text-center">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100 fw-bold"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>

          {/* Forgot Password & Register Links */}
          <div className="text-center mt-3">
            <Link to="/forgot-password" className="text-decoration-none text-primary fw-semibold">
              Forgot Password?
            </Link>
          </div>
          <div className="text-center mt-2">
            <span>Not registered? </span>
            <Link to="/register" className="text-decoration-none text-primary fw-semibold">
              Create an account
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;

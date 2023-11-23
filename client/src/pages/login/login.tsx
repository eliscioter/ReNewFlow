import { useNavigate } from "react-router";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, password });
  };

  return (
    <div className="container-fluid vh-100 bg-primary">
      <div className="h-100 d-flex flex-column justify-content-center align-items-center">
        <div className="col-lg-6 col-md-10 bg-transparent rounded-3 p-5">
          <h1 className="text-center text-white">Admin Login</h1>
          <form className="p-3" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="usernameInput"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="usernameInput">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="passwordInput">Password</label>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-dark px-5 fs-5 fw-medium"  onClick={() => navigate("/dashboard")}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

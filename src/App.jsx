import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Dashboard from "./dashboard";

function App() {
  const navigate = useNavigate();
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="w-100 h-screen flex justify-center items-center flex-col">
              <h1 className="mb-2 font-bold text-xl">Admin Login</h1>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const credentialResponseDecoded = jwtDecode(
                    credentialResponse.credential
                  );
                  console.log(credentialResponseDecoded);
                  navigate("/dashboard");
                }}
                onError={() => {
                  alert("Login Failed");
                  console.log("Login Failed");
                }}
              />
            </div>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

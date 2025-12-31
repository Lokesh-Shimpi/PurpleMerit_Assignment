import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import "../styles/profile.css";

const Profile = () => {
  const { user, login } = useAuth();
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const updateProfile = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");

    if (!fullName || !email) {
      setErr("All fields are required");
      return;
    }

    try {
      const res = await api.put("/users/profile", { fullName, email });

      login({
        token: localStorage.getItem("token"),
        user: res.data.user,
      });

      setMsg("Profile updated successfully");
    } catch (error) {
      setErr(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2>Edit Profile</h2>

        {err && <p className="profile-error">{err}</p>}
        {msg && <p className="profile-success">{msg}</p>}

        <form onSubmit={updateProfile}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

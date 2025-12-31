import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

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
      // refresh auth context
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
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h2>Edit Profile</h2>

      {err && <p style={{ color: "red" }}>{err}</p>}
      {msg && <p style={{ color: "green" }}>{msg}</p>}

      <form onSubmit={updateProfile}>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;

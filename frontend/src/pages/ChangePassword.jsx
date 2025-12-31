import { useState } from "react";
import api from "../api/axios";
import "../styles/profile.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");

    if (!currentPassword || !newPassword || !confirm) {
      setErr("All fields are required");
      return;
    }

    if (newPassword.length < 6) {
      setErr("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirm) {
      setErr("Passwords do not match");
      return;
    }

    try {
      await api.put("/users/change-password", {
        currentPassword,
        newPassword,
      });

      setMsg("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    } catch (error) {
      setErr(error.response?.data?.message || "Password update failed");
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2>Change Password</h2>

        {err && <p className="profile-error">{err}</p>}
        {msg && <p className="profile-success">{msg}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

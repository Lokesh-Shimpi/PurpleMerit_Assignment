import { useState } from "react";
import api from "../api/axios";

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
      setMsg("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    } catch (error) {
      setErr(error.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h2>Change Password</h2>

      {err && <p style={{ color: "red" }}>{err}</p>}
      {msg && <p style={{ color: "green" }}>{msg}</p>}

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

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;

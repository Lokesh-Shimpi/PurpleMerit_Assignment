import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/admin.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await api.get("/admin/users?page=1");
    setUsers(res.data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateStatus = async (id, action) => {
    await api.patch(`/admin/users/${id}/${action}`);
    fetchUsers();
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.email}</td>
              <td>{u.fullName}</td>
              <td>{u.role}</td>
              <td className={u.status === "active" ? "status-active" : "status-inactive"}>
                {u.status}
              </td>
              <td>
                {u.status === "active" ? (
                  <button
                    className="btn-deactivate"
                    onClick={() => updateStatus(u._id, "deactivate")}
                  >
                    Deactivate
                  </button>
                ) : (
                  <button
                    className="btn-activate"
                    onClick={() => updateStatus(u._id, "activate")}
                  >
                    Activate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;

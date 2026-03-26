import React, { useEffect, useState } from "react";
import { getUsers } from "./api";
import UserTable from "./UserTable";
import "./dashboard.css";

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  return (
    <div className="dashboard">
      <h2 className="title">User Directory Dashboard</h2>
      <UserTable users={users} />
    </div>
  );
}

export default Dashboard;
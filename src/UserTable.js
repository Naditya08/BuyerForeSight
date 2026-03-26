import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./usertable.css";

function UserTable({ users }) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [ascending, setAscending] = useState(true);
  const navigate = useNavigate();

  // Filter users
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Sort users
  const sorted = [...filtered].sort((a, b) => {
    const valA =
      sortField === "company" ? a.company.name : a.name;
    const valB =
      sortField === "company" ? b.company.name : b.name;

    return ascending
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });
   const formatmob = (mob) => {
    return mob
    .replace(/\x/g,",")
    .replace(/\./g,"-");
  };


  return (
    <div className="container">
      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search by name or email"
        className="search"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Buttons */}
      <div className="buttons">
        <button onClick={() => setSortField("name")}>
          Sort Name
        </button>

        <button onClick={() => setSortField("company")}>
          Sort Company
        </button>

        <button onClick={() => setAscending(!ascending)}>
          Toggle Order
        </button>
      </div>

      {/* Card Layout */}
      <div className="card-container">
        {sorted.map((user) => (
          <div
            key={user.id}
            className="card"
            onClick={() => navigate(`/user/${user.id}`)}
          >
            <h3>{user.name}</h3>

            <p><b>Email:</b> {user.email}</p>
            <p><b>Phone:</b> {formatmob(user.phone)}</p>
            <p><b>Company:</b> {user.company.name}</p>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {sorted.length === 0 && (
        <p className="no-data">No users found</p>
      )}
    </div>
  );
}

export default UserTable;
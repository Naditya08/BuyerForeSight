

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "./api";
import "./userdetail.css"

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById(id).then((data) => setUser(data));
  }, [id]);
  const formatPhone = (phone) => {
    return phone
    .replace(/\x/g,",")
    .replace(/\./g,"-");
  };


  if (!user) return <p className="loading">Loading...</p>;

  return (
    <div className="detail-container">
      <div className="profile-card">

        {/* Avatar */}
        <div className="avatar">
          {user.name.charAt(0)}
        </div>

        <h2>{user.name}</h2>
        <p className="email">{user.email}</p>

        {/* Info Section */}
        <div className="info-grid">
          <div className="info-box">
            <span>📞 Phone</span>
            <p>{formatPhone(user.phone)}</p>
          </div>

          <div className="info-box">
            <span>🌐 Website</span>
            <p>{user.website}</p>
          </div>

          <div className="info-box">
            <span>🏢 Company</span>
            <p>{user.company.name}</p>
          </div>

          <div className="info-box">
            <span>📍 Address</span>
            <p>
              {user.address.street}, {user.address.city}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserDetail;
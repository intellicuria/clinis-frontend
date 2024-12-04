import Button from "@/ui/Button/Button";
import React, { useState } from "react";


const Patient = () => {
  const [activeTab, setActiveTab] = useState("in-clinic");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Select User</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
       
      </div>
      <div
        style={{
          border: "1px solid #E0E0E0",
          borderRadius: "8px",
          padding: "15px",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      >
        <h3 style={{ margin: "0", fontWeight: "bold", color: "#6C63FF" }}>
          Patient Details
        </h3>
        <p style={{ margin: "5px 0", color: "#6C757D" }}>
          202, Rudra Business Park, Opp. Kashinath Park, Vastral Road, opp. Metro Pillar Number 125,...
        </p>
      </div>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#F9FAFB",
          padding: "30px",
          borderRadius: "8px",
        }}
      >
       <Button>Guest Login</Button>
      </div>
    </div>
  );
};

export default Patient;

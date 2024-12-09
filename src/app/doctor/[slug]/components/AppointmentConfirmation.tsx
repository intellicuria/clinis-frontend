import React from 'react';

const AppointmentConfirmation = () => {
  const patientDetails = {
    patientName: 'Aditya',
    doctorName: 'Dr. Ankit Panchmatia',
    specialization: 'Psychiatrist',
    appointmentDate: '19th Nov 2024',
    appointmentTime: '10:00 AM',
    clinicName: 'Samarpan Neuropsychiatry Clinic',
    clinicAddress:
      '202, Rudra Business Park, Opp. Kashinath Park, Vastral Road, opp. Metro Pillar Number 125, Mahadev Nagar Tekra, Ahmedabad, Gujarat, India - 382418',
  };

  return (
    <div
      style={{
        backgroundColor: '#f8f9fc',
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <div
          style={{
            backgroundColor: '#6c63ff',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            fontSize: '30px',
          }}
        >
          ✅
        </div>
        <h1 style={{ fontSize: '1.5rem', color: '#333', margin: '20px 0 10px' }}>
          Appointment Confirmed for
        </h1>
        <button
          style={{
            backgroundColor: '#e8e8fc',
            color: '#6c63ff',
            border: 'none',
            borderRadius: '15px',
            padding: '5px 10px',
            cursor: 'default',
            fontWeight: 'bold',
          }}
        >
          {patientDetails.patientName}
        </button>
      </div>

      {/* Appointment Details */}
      <div
        style={{
          backgroundColor: '#fff',
          margin: '20px auto',
          width: '90%',
          maxWidth: '600px',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', color: '#6c63ff' }}>
          Tomorrow, {patientDetails.appointmentTime}
        </h2>
        <p style={{ color: '#888', marginTop: '10px', fontSize: '1rem' }}>
          {patientDetails.appointmentDate}
        </p>
        <hr
          style={{
            margin: '20px 0',
            border: 'none',
            borderTop: '1px solid #eee',
          }}
        />
        <div style={{ textAlign: 'left' }}>
          <h3 style={{ margin: '10px 0', fontSize: '1.2rem', color: '#333' }}>
            {patientDetails.clinicName}
          </h3>
          <p style={{ color: '#555', fontSize: '0.9rem' }}>
            {patientDetails.clinicAddress}
          </p>
        </div>
      </div>

      {/* Footer Buttons */}
      <div
        style={{
          backgroundColor: '#f8f9fc',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <button
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#6c63ff',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
          onClick={() => console.log('Manage Appointment clicked')}
        >
          Manage Appointment
        </button>
        <button
          style={{
            backgroundColor: '#6c63ff',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
          onClick={() => console.log('Back to Home clicked')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;

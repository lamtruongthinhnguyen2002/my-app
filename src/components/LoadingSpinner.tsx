import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div style={styles.spinnerContainer}>
      <div style={styles.spinner}></div>
      <p style={styles.spinnerText}>Đang tải...</p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    margin: '20px auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  spinner: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeftColor: '#3498db',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  },
  spinnerText: {
    marginTop: '10px',
    color: '#555',
    fontSize: '1.1em',
  },
  // Keyframes cho animation (cần được thêm vào file CSS chung hoặc sử dụng CSS-in-JS library)
  // Nếu bạn sử dụng styles.css, hãy thêm đoạn này vào đó:
  // @keyframes spin {
  //   0% { transform: rotate(0deg); }
  //   100% { transform: rotate(360deg); }
  // }
};

export default LoadingSpinner;
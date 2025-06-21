import React from "react";

interface ConfirmationPopupProps {
    isOpen: boolean;
    message?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
    isOpen,
    message = 'Are you sure ?',
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) {
        return null;
    }

    return(
        <div style={styles.overlay}>
            <div style={styles.popup}>
        <p style={styles.message}>{message}</p>
        <div style={styles.buttonsContainer}>
          <button onClick={onConfirm} style={styles.confirmButton}>
            OK
          </button>
          <button onClick={onCancel} style={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Nền mờ
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Đảm bảo popup nằm trên cùng
  },
  popup: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '90%',
  },
  message: {
    fontSize: '1.1em',
    marginBottom: '20px',
    color: '#333',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px', // Khoảng cách giữa các nút
  },
  confirmButton: {
    backgroundColor: '#dc3545', // Màu đỏ cho nút xóa/xác nhận
    color: 'white',
    padding: '12px 25px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  confirmButtonHover: { // Có thể thêm hiệu ứng hover nếu bạn dùng styled-components hoặc CSS modules
    backgroundColor: '#c82333',
  },
  cancelButton: {
    backgroundColor: '#6c757d', // Màu xám cho nút hủy
    color: 'white',
    padding: '12px 25px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  cancelButtonHover: { // Có thể thêm hiệu ứng hover
    backgroundColor: '#5a6268',
  },
};

export default ConfirmationPopup;
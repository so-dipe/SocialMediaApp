import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { logoutUser } from '../../redux/slices/sessionSlice';
import './css/Logout.css'; 

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div>
      <button className="logout-button" onClick={() => setModalIsOpen(true)}>Logout</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Logout Confirmation"
        className="modal-content" // Add this line
        overlayClassName="modal-overlay" // Add this line
      >
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to logout?</p>
        <div className="modal-buttons"> {/* Add this line */}
          <button className="confirm-logout-button" onClick={handleLogout}>Yes, Logout</button>
          <button className="cancel-logout-button" onClick={() => setModalIsOpen(false)}>No, Stay Logged In</button>
        </div>
      </Modal>
    </div>
  );
};

export default Logout;
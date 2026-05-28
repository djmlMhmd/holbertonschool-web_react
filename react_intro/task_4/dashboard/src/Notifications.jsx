import React from 'react';
import './Notifications.css';
import closeButton from './assets/close-button.png';
import { getLatestNotification } from './utils';

function Notifications() {
  function handleClose() {
    console.log('Close button has been clicked');
  }

  return (
    <div className="Notifications">
      <p>Here is the list of notifications</p>
      <ul>
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li dangerouslySetInnerHTML={{ __html: getLatestNotification() }}></li>
      </ul>
      <button onClick={handleClose} aria-label="Close">
        <img src={closeButton} alt="close icon" />
      </button>
    </div>
  );
}

export default Notifications;

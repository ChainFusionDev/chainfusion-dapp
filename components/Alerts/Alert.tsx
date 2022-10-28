import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

type AlertProps = {
  alertType: string;
  icon: string;
  title: string;
  message: string;
};

const Alert = ({ alertType, icon, title, message }: AlertProps) => {
  return (
    <div className={`alertMsg ${alertType}`}>
      <div className="icon">
        <i className={`fa-regular ${icon}`}></i>
      </div>
      <div className="alertMsgContent">
        <div className="titleAlert">{title}</div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Alert;

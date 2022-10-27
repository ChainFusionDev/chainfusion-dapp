import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type AlertProps = {
  typeAlerts: string;
  icon: string;
  title: string;
  message: string;
};

const Alerts = ({ typeAlerts, icon, title, message }: AlertProps) => {
  return (
    <div className={`alertMsg ${typeAlerts}`}>
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

<ToastContainer
  position="top-right"
  autoClose={4000}
  hideProgressBar
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>;

export default Alerts;

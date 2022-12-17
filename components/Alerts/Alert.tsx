import { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';

type AlertProps = {
  alertType: string;
  icon: string;
  title: string;
  children?: ReactNode;
};

const Alert = ({ alertType, icon, title, children }: AlertProps) => {
  return (
    <div className={`alertMsg ${alertType}`}>
      <div className="icon">
        <i className={`fa-regular ${icon}`}></i>
      </div>
      <div className="alertMsgContent">
        <div className="titleAlert">{title}</div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Alert;

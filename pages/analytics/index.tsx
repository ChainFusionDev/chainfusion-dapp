import Layout from '@components/Layout';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* Alerts */
const MsgSuccess = () => (
  <div className="alertMsg success">
    <div className="icon">
      <i className="fa-regular fa-circle-check"></i>
    </div>
    <div className="alertMsgContent">
      <div className="titleAlert">Success</div>
      <p>You have successfully increased liquidity</p>
    </div>
  </div>
);

const MsgInfo = () => (
  <div className="alertMsg info">
    <div className="icon">
      <i className="fa-regular fa-circle-info"></i>
    </div>
    <div className="alertMsgContent">
      <div className="titleAlert">Info</div>
      <p>You do not have enough tokens to increase liquidity</p>
    </div>
  </div>
);

const MsgWarning = () => (
  <div className="alertMsg warning">
    <div className="icon">
      <i className="fa-regular fa-circle-exclamation"></i>
    </div>
    <div className="alertMsgContent">
      <div className="titleAlert">Warning</div>
      <p>You have a limit on increasing liquidity</p>
    </div>
  </div>
);

const MsgError = () => (
  <div className="alertMsg error">
    <div className="icon">
      <i className="fa-regular fa-circle-xmark"></i>
    </div>
    <div className="alertMsgContent">
      <div className="titleAlert">Error</div>
      <p>There was an error adding liquidity</p>
    </div>
  </div>
);

const MsgDeleted = () => (
  <div className="alertMsg deleted">
    <div className="icon">
      <i className="fa-regular fa-circle-trash"></i>
    </div>
    <div className="alertMsgContent">
      <div className="titleAlert">Deleted</div>
      <p>You have successfully removed liquidity</p>
    </div>
  </div>
);

const Analytics = () => {
  const alertSuccess = () => {
    toast(<MsgSuccess />);
  };

  const alertInfo = () => {
    toast(<MsgInfo />);
  };

  const alertWarning = () => {
    toast(<MsgWarning />);
  };

  const alertError = () => {
    toast(<MsgError />);
  };

  const alertDeleted = () => {
    toast(<MsgDeleted />);
  };

  return (
    <Layout module="analytics" title="Analytics" description="Bridge stats and analytics">
      <section className="section-page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="title-page">Example toasts</div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-6 col-md-3 d-block mx-auto">
              <button onClick={alertSuccess} className="btn-success-light mt-1 mb-2">
                Success
              </button>
            </div>
            <div className="col-12 col-sm-6 col-md-3 d-block mx-auto">
              <button onClick={alertInfo} className="btn-info-light mt-1 mb-2">
                Info
              </button>
            </div>
            <div className="col-12 col-sm-6 col-md-3 d-block mx-auto">
              <button onClick={alertWarning} className="btn-warning-light mt-1 mb-2">
                Warning
              </button>
            </div>
            <div className="col-12 col-sm-6 col-md-3 d-block mx-auto">
              <button onClick={alertError} className="btn-error-light mt-1 mb-2">
                Error
              </button>
            </div>
            <div className="col-12 col-sm-6 col-md-3 d-block mx-sm-none">
              <button onClick={alertDeleted} className="btn-info-light mt-1 mb-2">
                Deleted
              </button>
            </div>
          </div>
        </div>
      </section>

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
      />
    </Layout>
  );
};

export default Analytics;

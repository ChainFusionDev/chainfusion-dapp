import Alert from '@components/Alerts/Alert';
import AlertContainer from '@components/Alerts/AlertContainer';
import Layout from '@components/Layout';
import React from 'react';
import { toast } from 'react-toastify';

const MsgSuccess = () => (
  <Alert
    alertType="success"
    icon="fa-circle-check"
    title="Success"
    message="You have successfully increased liquidity"
  />
);

const MsgInfo = () => (
  <Alert
    alertType="info"
    icon="fa-circle-info"
    title="Info"
    message="You do not have enough tokens to increase liquidity"
  />
);

const MsgWarning = () => (
  <Alert
    alertType="warning"
    icon="fa-circle-exclamation"
    title="Warning"
    message="You have a limit on increasing liquidity"
  />
);

const MsgError = () => (
  <Alert alertType="error" icon="fa-circle-xmark" title="Error" message="There was an error adding liquidity" />
);

const MsgDeleted = () => (
  <Alert alertType="deleted" icon="fa-circle-trash" title="Deleted" message="You have successfully removed liquidity" />
);

const Analytics = () => {
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
              <button onClick={() => toast(<MsgSuccess />)} className="btn-success-light mt-1 mb-2">
                Success
              </button>
            </div>
            <div className="col-12 col-sm-6 col-md-3 d-block mx-auto">
              <button onClick={() => toast(<MsgInfo />)} className="btn-info-light mt-1 mb-2">
                Info
              </button>
            </div>
            <div className="col-12 col-sm-6 col-md-3 d-block mx-auto">
              <button onClick={() => toast(<MsgWarning />)} className="btn-warning-light mt-1 mb-2">
                Warning
              </button>
            </div>
            <div className="col-12 col-sm-6 col-md-3 d-block mx-auto">
              <button onClick={() => toast(<MsgError />)} className="btn-error-light mt-1 mb-2">
                Error
              </button>
            </div>
            <div className="col-12 col-sm-6 col-md-3 d-block mx-sm-none">
              <button onClick={() => toast(<MsgDeleted />)} className="btn-info-light mt-1 mb-2">
                Deleted
              </button>
            </div>
          </div>
        </div>
      </section>

      <AlertContainer />
    </Layout>
  );
};

export default Analytics;

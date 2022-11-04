import Layout from '@components/Layout';
import TransactionHistory from '@components/Bridge/TransactionHistory';
import BridgeWidget from '@components/Bridge/BridgeWidget';

const Bridge = () => {
  return (
    <Layout
      module="bridge"
      title="Bridge"
      description="Bridge allows you to transfer assets between different blockchain in a safe and decentralized way"
    >
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <BridgeWidget />
          </div>
          <TransactionHistory />
        </div>
      </div>
    </Layout>
  );
};

export default Bridge;

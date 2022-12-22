import Layout from '@components/Layout';
import TransferHistory from '@components/Bridge/TransferHistory';
import BridgeWidget from '@components/Bridge/BridgeWidget';
import { motion, AnimatePresence } from 'framer-motion';

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
          <TransferHistory />
        </div>
      </div>
    </Layout>
  );
};

export default Bridge;

import Alert from '@components/Alerts/Alert';

interface MsgApproveSuccessProps {
  chain: string;
  token: string;
  amount: string;
}

export const MsgApproveSuccess = ({ chain, token, amount }: MsgApproveSuccessProps) => (
  <Alert alertType="success" icon="fa-circle-check" title="Success">
    <p>Successfully approved token spending</p>
    <p>
      {amount} {token} on {chain}
    </p>
  </Alert>
);

export const MsgApproveCanceled = () => (
  <Alert alertType="info" icon="fa-circle-info" title="Info">
    Token approval was canceled
  </Alert>
);

interface MsgTransferSuccessProps {
  chain: string;
  token: string;
  amount: string;
}

export const MsgTransferSuccess = ({ chain, token, amount }: MsgTransferSuccessProps) => (
  <Alert alertType="success" icon="fa-circle-check" title="Success">
    <p>Successfully transferred</p>
    <p>
      {amount} {token} to {chain}
    </p>
  </Alert>
);

export const MsgTransferCanceled = () => (
  <Alert alertType="info" icon="fa-circle-info" title="Info">
    Transfer was canceled
  </Alert>
);

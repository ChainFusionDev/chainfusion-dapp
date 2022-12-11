import { useEffect, useState } from 'react';
import TransactionItem, { ChainHistoryItem } from '@components/Bridge/TransactionItem';
import { getChainById, getTokenByChainIdentifierAndAddress } from '@src/config';
import { useChainContext } from '@src/context/ChainContext';
import { BigNumber, utils } from 'ethers';
import { Chain } from '@src/types';

const decodeSentData = (
  hash: string,
  data: utils.BytesLike,
  fromChain: Chain,
  toChain: Chain
): ChainHistoryItem | undefined => {
  try {
    const result = utils.defaultAbiCoder.decode(
      ['uint256', 'address', 'address', 'uint256', 'address', 'uint256', 'uint256'],
      data
    );

    const token = getTokenByChainIdentifierAndAddress(fromChain.identifier, result[2] as string);
    if (token === undefined) {
      return undefined;
    }

    const sentData: ChainHistoryItem = {
      hash: hash,
      sender: result[1] as string,
      receiver: result[4] as string,
      fromChain: fromChain,
      toChain: toChain,
      token: token,
      amount: result[5] as BigNumber,
      fee: result[6] as BigNumber,
      status: 'Success',
    };

    return sentData;
  } catch (e) {
    return undefined;
  }
};

const TransactionHistory = () => {
  const defaultItemsCount = 5;

  const [history, setHistory] = useState<ChainHistoryItem[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  const { nativeContainer, networkContainer, addressContainer } = useChainContext();

  useEffect(() => {
    if (nativeContainer === undefined || addressContainer === undefined) {
      return;
    }

    const loadHistory = async () => {
      const currentBlock = await nativeContainer.provider.getBlockNumber();
      const filter = nativeContainer.eventRegistry.filters.EventRegistered();
      const events = await nativeContainer.eventRegistry.queryFilter(filter, currentBlock - 100000, currentBlock);

      let eventHistory: ChainHistoryItem[] = [];
      for (const event of events) {
        const fromChain = getChainById(event.args._sourceChain.toNumber());
        const toChain = getChainById(event.args._destinationChain.toNumber());

        if (fromChain === undefined || toChain === undefined) {
          continue;
        }

        const fromNetwork = networkContainer[fromChain.identifier];
        const toNetwork = networkContainer[toChain.identifier];

        if (
          fromNetwork?.contracts === undefined ||
          toNetwork?.contracts === undefined ||
          event.args._appContract !== fromNetwork.contracts.erc20Bridge.address
        ) {
          continue;
        }

        eventHistory.push({
          hash: event.args._hash,
          sender: '0x0',
          receiver: '0x0',
          fromChain: fromChain,
          toChain: toChain,
          token: {
            identifier: 'cfn',
            name: 'Loading...',
            symbol: 'Loading..',
            decimals: 18,
            chains: {},
          },
          amount: BigNumber.from(0),
          fee: BigNumber.from(0),
          status: 'Loading',
        });
      }

      eventHistory = eventHistory.reverse();
      eventHistory = eventHistory.slice(0, 10);
      setHistory([...eventHistory]);
      setHistoryLoaded(true);

      const loadedHistory = [...eventHistory];
      for (const index in loadedHistory) {
        const item = loadedHistory[index];
        const fromNetwork = networkContainer[item.fromChain.identifier];

        if (fromNetwork?.contracts === undefined) {
          continue;
        }

        const data = await fromNetwork.contracts.relayBridge.sentData(item.hash);
        const sentData = decodeSentData(item.hash, data, item.fromChain, item.toChain);
        if (sentData !== undefined) {
          loadedHistory[index] = sentData;
          setHistory([...loadedHistory]);
        }
      }
    };

    loadHistory();
  }, [nativeContainer, networkContainer, addressContainer]);

  const transactionItems = history
    .map((item: ChainHistoryItem, index: number) => {
      return showAll || index < defaultItemsCount ? <TransactionItem key={index} item={item} /> : null;
    })
    .filter((element) => element !== null);

  if (!historyLoaded) {
    return (
      <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mb-5">
        <div className="title-block">Previous Transfers</div>
        <div className="transfer-block-loading mb-2">
          <div className="skeleton mt-2 mt-md-0">
            <div className="line-skeleton"></div>
            <div className="line-skeleton"></div>
          </div>
        </div>
        <div className="transfer-block-loading mb-2">
          <div className="skeleton mt-2 mt-md-0">
            <div className="line-skeleton"></div>
            <div className="line-skeleton"></div>
          </div>
        </div>
        <div className="transfer-block-loading mb-2">
          <div className="skeleton mt-2 mt-md-0">
            <div className="line-skeleton"></div>
            <div className="line-skeleton"></div>
          </div>
        </div>
        <div className="transfer-block-loading mb-2">
          <div className="skeleton mt-2 mt-md-0">
            <div className="line-skeleton"></div>
            <div className="line-skeleton"></div>
          </div>
        </div>
        <div className="transfer-block-loading mb-2">
          <div className="skeleton mt-2 mt-md-0">
            <div className="line-skeleton"></div>
            <div className="line-skeleton"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!transactionItems.length) {
    return <></>;
  }

  return (
    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mb-5">
      <div className="title-block">Previous Transfers</div>
      {transactionItems}
      {!showAll && transactionItems.length > defaultItemsCount && (
        <div className="text-center mt-4 mb-2">
          <a onClick={() => setShowAll(true)} className="show-more-btn">
            Show More
          </a>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;

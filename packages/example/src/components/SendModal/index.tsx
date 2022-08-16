import { Modal } from 'semantic-ui-react';
import React, { FunctionComponent, useEffect, useMemo } from 'react';

import './index.css';
import '../Account/Account.css';
import { observer } from 'mobx-react-lite';
import SendViewModel from './model';
import { BitcoinNetwork, Utxo } from '../../interface';
import { SendInfo } from '../../lib';
import Initial from './Initial';
import Result from './Result';
import { useFeeRate } from '../../hook/useBitcoinTx';
import Send from "../Account/image/send.svg";

type ContainerProps = {
  utxos: Utxo[];
  network: BitcoinNetwork;
  sendInfo?: SendInfo;
};

const SendContainer: FunctionComponent<ContainerProps> = props => {
  const { feeRate } = useFeeRate(props.network);

  const model = useMemo(() => {
    return new SendViewModel(
      props.utxos,
      feeRate,
      props.network,
      props.sendInfo,
    );
  }, []);
  useEffect(() => {
    model.setUtxos(props.utxos);
    model.setFeeRate(feeRate);
    if (props.sendInfo) {
      model.setSendInfo(props.sendInfo);
    }
  }, [props.utxos, feeRate, props.sendInfo]);
  return <SendModal model={model} />;
};

const SendModal = observer((props: { model: SendViewModel }) => {
  const { model } = props;
  return (
    <Modal
      className={'modal-container'}
      onOpen={() => model.setSendOpen(true)}
      onClose={() => model.setSendOpen(false)}
      open={model.sendOpen}
      trigger={
        <div className="Action-button-container">
          <img src={Send} alt="Send" />
        </div>
      }>
      {model.status === 'initial' && <Initial model={model} />}
      {model.status !== 'initial' && <Result model={model} />}
    </Modal>
  );
});

export default SendContainer;

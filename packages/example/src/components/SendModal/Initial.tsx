import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Divider } from 'semantic-ui-react';
import SendViewModel from './model';

import './index.css';
import send from '../../assets/send.png';
import close from '../../assets/close.png';
import ConfirmModal from "./ConfirmModal";

export type InitialProps = {
  model: SendViewModel;
};

const Initial: FunctionComponent<InitialProps> = observer(({ model }) => {
  return (
    <div>
      <Container className={'modal-content-container colored-container'}>
        <div className={'modal-header'}>
          <span
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <img src={send} width={24} alt={'send transaction'} />
            <span>SEND</span>
          </span>
          <img
            style={{ cursor: 'pointer' }}
            src={close}
            width={12}
            alt={'close'}
            onClick={() => model.setSendOpen(false)}
          />
        </div>
        <div className={'modal-section'}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#9095A3' }}>
            Amount
          </span>
          <div className={'amount-input-box'}>
            <label style={{ fontSize: 16, color: '#F58300' }}>
              <input
                className={'amount-input'}
                size={model.amountLength}
                value={model.amountText}
                onChange={e => {
                  model.handleSendInput(e.target.value);
                }}
                placeholder="0"
              />
              BTC
            </label>
          </div>
          {!model.amountValid && (
            <div className={'text-error'} style={{ marginTop: 8 }}>
              Insufficient Funds
            </div>
          )}
          <div className={'fee'}>
            <span className={'text-secondary text-weight-bold'}>Fee</span>
            <span className={'text-secondary'}>
              <span>{model.feeText}</span>
              <span style={{ marginLeft: '1ch' }}>BTC</span>
            </span>
          </div>
        </div>
        <Divider />
        <div className={'modal-section available-btc'}>
          <span className={'text-secondary text-weight-bold'}>Available</span>
          <span className={'text-secondary'}>
            <span>{model.availableBtc}</span>
            <span style={{ marginLeft: '1ch' }}>BTC</span>
          </span>
        </div>
      </Container>
      <Container className={'modal-content-container'}>
        <div className={'to-container'}>
          <span className={'text-secondary text-weight-bold'}>To</span>
          <input
            className={'to-input'}
            placeholder="Paste or scan the destination address"
            value={model.to}
            onChange={e => {
              model.setTo(e.target.value);
            }}
          />
        </div>
        <Divider />
        {!model.toValid && (
          <div className={'text-error'}>Enter a Valid Wallet Address</div>
        )}
        <div className={'actions-container'}>
          <button
            className={'action-button action-button-secondary'}
            onClick={() => model.setSendOpen(false)}>
            Cancel
          </button>
          <ConfirmModal model={model} />
        </div>
      </Container>
    </div>
  );
});

export default Initial;

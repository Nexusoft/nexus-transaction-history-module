import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Panel, Button, Icon } from 'nexus-module';

import { GetUserAccounts } from 'Shared/Libraries/user';
import { OpenModal } from 'actions/actionCreators';

import Overview from './Overview';

const spin = keyframes`
  from { transform:rotate(360deg); }
    to { transform:rotate(0deg); }
`;

const SpinIcon = styled(Icon)(({ spinning }) => {
  return {
    animation: spinning ? `${spin} 1s linear infinite` : 'none',
  };
});

export default function Main() {
  const isLoggedIn = useSelector((state) => state.ui.user?.info);
  const isBusy = useSelector(
    (state) => state.ui.main.busyGatheringInfo || !state.ui.user.transactions
  );
  const childRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUserAccounts());
  }, []);

  const refreshButton = (isActive) => (
    <Button
      onClick={() => {}}
      disabled={!isActive || isBusy}
      icon={{
        url: !isBusy ? 'icons/recovery.svg' : 'icons/download.svg',
        id: 'icon',
      }}
    >
      {' '}
      <SpinIcon
        icon={{
          url: isBusy ? 'icons/recovery.svg' : 'icons/download.svg',
          id: 'icon',
        }}
        spinning={isBusy}
      />
      {isBusy ? (
        'Gathering Data'
      ) : (
        <a
          download={'NEXUS_HISTORY_DATA.csv'}
          href={childRef.current?.refs.csvLink.link}
        >
          Download CSV
        </a>
      )}
    </Button>
  );

  const settingButton = () => (
    <Button
      onClick={() => {
        dispatch(OpenModal({ name: 'Settings', props: {} }));
      }}
    >
      <Icon icon={{ url: 'icons/gear.svg', id: 'icon' }} />
    </Button>
  );

  return (
    <Panel
      title={<>{'History Module'}</>}
      icon={{ url: 'icons/History.svg', id: 'icon' }}
      controls={
        <div
          style={{
            display: 'grid',
            gridAutoFlow: 'column',
            columnGap: '1em',
          }}
        >
          {refreshButton(isLoggedIn && childRef.current?.refs)}
          {settingButton()}
        </div>
      }
    >
      {isLoggedIn ? (
        <Overview childRef={(ref) => (childRef.current = ref)} />
      ) : (
        <div>Please Log In!</div>
      )}
    </Panel>
  );
}

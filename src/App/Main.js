import { GetUserAccounts } from 'Shared/Libraries/user';
import { SetBusyGatheringInfo } from 'Shared/Libraries/ui';
import { OpenModal } from 'actions/actionCreators';

import Overview from './Overview';
import History from 'Shared/Images/History.svg';
import Spin from 'Shared/Images/recovery.svg';
import Download from 'Shared/Images/download.svg';
import SettingsIcon from 'Shared/Images/gear.svg';

import { connect } from 'react-redux';

const {
  libraries: {
    React,
    emotion: { styled, react },
  },
  components: { GlobalStyles, Panel, Button, Icon },
} = NEXUS;

const spin = react.keyframes`
  from { transform:rotate(360deg); }
    to { transform:rotate(0deg); }
`;

const SpinIcon = styled(Icon)(({ spinning }) => {
  return {
    animation: spinning ? `${spin} 1s linear infinite` : 'none',
  };
});

@connect(
  (state) => ({
    isLoggedIn: state.user.info,
    isBusy: state.ui.busyGatheringInfo || !state.user.transactions,
  }),
  { OpenModal, GetUserAccounts, SetBusyGatheringInfo }
)
class Main extends React.Component {
  componentDidMount() {
    this.props.GetUserAccounts();
  }

  refreshButton(isActive) {
    const { isBusy } = this.props;
    return (
      <Button
        onClick={() => {}}
        disabled={!isActive || isBusy}
        icon={!isBusy ? Spin : Download}
      >
        {' '}
        <SpinIcon icon={isBusy ? Spin : Download} spinning={isBusy} />
        {isBusy ? (
          'Gathering Data'
        ) : (
          <a
            download={'NEXUS_HISTORY_DATA.csv'}
            href={this.child.refs.csvLink.link}
          >
            Download CSV
          </a>
        )}
      </Button>
    );
  }

  settingButton() {
    return (
      <Button
        onClick={() => {
          this.props.OpenModal({ name: 'Settings', props: {} });
        }}
      >
        <Icon icon={SettingsIcon} />
      </Button>
    );
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Panel
        title={<>{'History Module'}</>}
        icon={History}
        controls={
          <div
            style={{
              display: 'grid',
              gridAutoFlow: 'column',
              columnGap: '1em',
            }}
          >
            {this.refreshButton(isLoggedIn && this.child && this.child.refs)}
            {this.settingButton()}
          </div>
        }
      >
        <GlobalStyles />
        {isLoggedIn ? (
          <Overview childRef={(ref) => (this.child = ref)} />
        ) : (
          <div>Please Log In!</div>
        )}
      </Panel>
    );
  }
}

export default Main;

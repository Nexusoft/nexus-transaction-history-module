import { GetUserAccounts } from 'Shared/Libraries/user';
import { SetBusyGatheringInfo, OpenPopUp } from 'Shared/Libraries/ui';

import Overview from './Overview';
import History from 'Shared/Images/History.svg';
import Spin from 'Shared/Images/recovery.svg';
import Download from 'Shared/Images/download.svg';
import SettingsIcon from 'Shared/Images/gear.svg';

import Settings from './Overview/Settings';

const {
  libraries: {
    React,
    ReactRedux: { connect },
    emotion: { styled, core },
  },
  components: { GlobalStyles, Panel, Button, Icon },
} = NEXUS;

const spin = core.keyframes`
  from { transform:rotate(360deg); }
    to { transform:rotate(0deg); }
`;

const SpinIcon = styled(Icon)(({ spinning }) => {
  console.log(spinning);
  return {
    animation: spinning ? `${spin} 1s linear infinite` : 'none',
  };
});

@connect(
  (state) => ({
    isLoggedIn: state.user.info,
    isBusy: state.ui.busyGatheringInfo || !state.user.transactions,
  }),
  { OpenPopUp, GetUserAccounts, SetBusyGatheringInfo }
)
class Main extends React.Component {
  componentDidMount() {
    this.props.GetUserAccounts();
  }

  refreshButton() {
    const { isBusy } = this.props;
    try {
      const test = this.child.refs.csvLink.link;
    } catch (error) {
      return <></>;
    }
    return (
      <Button
        onClick={() => {}}
        disabled={isBusy}
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
          this.props.OpenPopUp(Settings);
        }}
        icon={SettingsIcon}
      ></Button>
    );
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Panel
        title={
          <>
            {'History Module'}{' '}
            <a style={{ marginLeft: '.25em', fontSize: '10pt' }}>{'  BETA'}</a>{' '}
          </>
        }
        icon={History}
        controls={
          <>
            {isLoggedIn &&
              this.child &&
              this.child.refs &&
              this.refreshButton()}
            {this.settingButton()}
          </>
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

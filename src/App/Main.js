import { GetUserAccounts } from 'Shared/Libraries/user';
import { SetBusyGatheringInfo } from 'Shared/Libraries/ui';

import Overview from './Overview';
import History from 'Shared/Images/History.svg';
import Spin from 'Shared/Images/recovery.svg';
import Download from 'Shared/Images/download.svg';

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
    isBusy: state.ui.busyGatheringInfo,
  }),
  { GetUserAccounts, SetBusyGatheringInfo }
)
class Main extends React.Component {
  componentDidMount() {
    this.props.GetUserAccounts();
  }

  refreshButton() {
    const { isBusy } = this.props;
    console.error(this.child);
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

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Panel
        title="History Module"
        icon={History}
        controls={
          isLoggedIn && this.child && this.child.refs && this.refreshButton()
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

import { GetUserAccounts } from 'Shared/Libraries/user';
import { SetBusyGatheringInfo } from 'Shared/Libraries/ui';

import Overview from './Overview';
import History from 'Shared/Images/History.svg';
import Spin from 'Shared/Images/recovery.svg';

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
    isLoggedIn: true,
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
    return (
      <Button
        onClick={() => {
          this.props.SetBusyGatheringInfo(!isBusy);
        }}
        disabled={isBusy}
        icon={Spin}
      >
        {' '}
        <SpinIcon icon={Spin} spinning={isBusy} />
        {isBusy ? 'Gathering Data' : 'Refresh'}
      </Button>
    );
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Panel
        title="History Module"
        icon={History}
        controls={this.refreshButton()}
      >
        <GlobalStyles />
        {isLoggedIn ? <Overview /> : <div></div>}
      </Panel>
    );
  }
}

export default Main;

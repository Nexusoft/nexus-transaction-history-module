import { GetUserAccounts } from 'Shared/Libraries/user';

import Overview from './Overview';
import History from 'Shared/Images/History.svg';

const {
  libraries: {
    React,
    ReactRedux: { connect },
    emotion: { styled },
  },
  components: { GlobalStyles, Panel },
} = NEXUS;

@connect(
  (state) => ({
    isLoggedIn: true,
  }),
  { GetUserAccounts }
)
class Main extends React.Component {
  componentDidMount() {
    this.props.GetUserAccounts();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Panel title="History Module" icon={History}>
        <GlobalStyles />
        {isLoggedIn ? <Overview /> : <div></div>}
      </Panel>
    );
  }
}

export default Main;

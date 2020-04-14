import Table from './Table';
import { CSVLink } from 'react-csv';

import Filters from './Filters';
import { GetUserAccounts, GetAccountTransactions } from 'Shared/Libraries/user';
import { getTransactionDataPacket } from 'Shared/Libraries/transactions';

const {
  libraries: {
    React,
    ReactRedux: { connect },
    emotion: { styled },
  },
  components: { GlobalStyles, Panel, Switch, Tooltip, TextField, Button },
  utilities: {
    confirm,
    rpcCall,
    onceRpcReturn,
    showErrorDialog,
    showSuccessDialog,
  },
} = NEXUS;

const columns = [
  {
    id: 'op',
    Header: 'Operation',
    accessor: 'OP',
  },
  {
    id: 'from',
    Header: 'From',
    accessor: 'from',
  },
  {
    id: 'to',
    Header: 'To',
    accessor: 'to',
  },
  {
    id: 'time',
    Header: 'Date Time',
    accessor: 'time',
  },
  {
    id: 'amount',
    Header: 'Amount',
    accessor: 'amount',
  },
];

const Header = styled.div({});

const Footer = styled.div({});

const mapStateToProps = (state) => {
  const userInfo = state.user.info;

  return {
    accounts: state.user.accounts,
    state: state,
    userInfo: userInfo,
    transactions: state.user.transactions,
    txTotal: userInfo && state.user.info.transactions,
  };
};

const mapDispatchToProps = {
  GetUserAccounts,
  GetAccountTransactions,
  getTransactionDataPacket,
};
class Overview extends React.Component {
  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (!this.props.userInfo || !prevProps.userInfo) {
      //Not Logged in
      return;
    }
    if (this.props.accounts && prevProps.accounts != this.props.accounts) {
      console.log(this.props);
      this.props.GetAccountTransactions(this.props.accounts);
    }

    if (
      this.props.transactions &&
      prevProps.transactions != this.props.transactions
    ) {
      this.getTransactionHistory();
    }
    if (this.props.txTotal && this.props.txTotal != prevProps.txTotal) {
      this.props.GetUserAccounts();
      this.props.GetAccountTransactions(this.props.accounts);
    }
  }

  getTransactionHistory() {
    this.props.getTransactionDataPacket(
      this.props.transactions,
      '000000',
      'usd'
    );
  }

  render() {
    const data = [
      ['time', 'Amount'],
      ['July', '100'],
      ['March', '20'],
    ];

    const { userInfo, transactions } = this.props;
    if (!userInfo) {
      return <div>Please Sign in!</div>;
    }
    return (
      <div>
        <Header>
          <h1>Filters</h1>
          <Filters />
        </Header>

        <Table
          defaultSortingColumnIndex={0}
          data={transactions || []}
          columns={columns}
        />
        <Footer>
          <Button>
            <CSVLink data={data} filename={'Nexus_Transaction_History.csv'}>
              Save CSV
            </CSVLink>
          </Button>
        </Footer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview);

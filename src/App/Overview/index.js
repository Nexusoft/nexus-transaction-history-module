import Table from './Table';
import { CSVLink } from 'react-csv';

import Filters from './Filters';
import { GetUserAccounts, GetAccountTransactions } from 'Shared/Libraries/user';
import { getTransactionDataPacket } from 'Shared/Libraries/transactions';
import { GetFilteredTransactions } from './selectors';

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
    id: 'timestamp',
    Header: 'Date Time',
    accessor: 'timestamp',
  },
  {
    id: 'amount',
    Header: 'NXS Amount',
    accessor: 'amount',
  },
  {
    id: 'fiatAmount',
    Header: 'Fiat Amount',
    accessor: 'fiatAmount',
  },
  {
    id: 'txid',
    Header: 'TX ID',
    accessor: 'txid',
  },
];

const Header = styled.div({});

const Footer = styled.div({});

const mapStateToProps = (state) => {
  const userInfo = state.user.info;
  const { operation, fromQuery, toQuery, timeSpan } = state.ui;
  return {
    accounts: state.user.accounts,
    state: state,
    userInfo: userInfo,
    history: state.history,
    transactions: state.user.transactions,
    txTotal: userInfo && state.user.info.transactions,
    operation,
    fromQuery,
    toQuery,
    timeSpan,
  };
};

const mapDispatchToProps = {
  GetUserAccounts,
  GetAccountTransactions,
  getTransactionDataPacket,
};
class Overview extends React.Component {
  componentDidMount() {
    const { childRef } = this.props;
    childRef(this);
  }

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

  transformTransactionData() {
    const { transactions } = this.props;
    if (!transactions) return [];
    return transactions.map((e) =>
      this.props.history.transactions[e.txid]
        ? {
            ...e,
            timestamp: this.props.history.transactions[e.txid].timestamp,
            fiatAmount: this.props.history.transactions[e.txid].fiat.totalValue,
          }
        : { OP: 'Loading' }
    );
  }

  render() {
    const { fromQuery, toQuery, timeSpan, operation } = this.props;
    const data = GetFilteredTransactions(
      this.transformTransactionData(),
      fromQuery,
      toQuery,
      timeSpan,
      operation
    );
    console.log(data);
    return (
      <div>
        <Header>
          <h3>Filters</h3>
          <Filters />
        </Header>

        <Table
          defaultSortingColumnIndex={0}
          data={data}
          columns={columns}
          defaultSortingColumnIndex={3}
          defaultPageSize={10}
        />
        <Footer>
          <CSVLink
            data={data}
            ref={'csvLink'}
            filename={'Nexus_Transaction_History.csv'}
          ></CSVLink>
        </Footer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview);

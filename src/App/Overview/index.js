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

const columns = (locale, unixTime) => [
  {
    id: 'op',
    Header: 'Operation',
    accessor: 'OP',
    width: '6em',
    maxWidth: '6em',
  },
  {
    id: 'from',
    Header: 'From',
    accessor: 'from',
    width: '25em',
  },
  {
    id: 'to',
    Header: 'To',
    accessor: 'to',
    width: '25em',
  },
  {
    id: 'timestamp',
    Header: 'Date Time',
    Cell: (cell) =>
      cell.value
        ? unixTime
          ? cell.value
          : Intl.DateTimeFormat(locale, {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            }).format(cell.value * 1000)
        : '',
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
    Cell: (cell) => {
      const dislength = 4;
      return cell.value ? (
        <Tooltip.Trigger position={'left'} tooltip={cell.value}>
          <a onClick={() => {}}>
            {`${cell.value.substring(0, dislength)}.....${cell.value.substring(
              cell.value.length - dislength,
              cell.value.length
            )}
            `}
          </a>
        </Tooltip.Trigger>
      ) : (
        ''
      );
    },
  },
];

const Header = styled.div({});

const Footer = styled.div({});

const mapStateToProps = (state) => {
  const userInfo = state.user.info;
  const { operation, fromQuery, toQuery, timeSpan } = state.ui;
  return {
    accounts: state.user.accounts,
    settings: state.settings,
    userInfo: userInfo,
    history: state.history,
    transactions: state.user.transactions,
    txTotal: userInfo && state.user.info.transactions,
    operation,
    fromQuery,
    toQuery,
    timeSpan,
    unixTime: state.settings.unixTime,
    pageSize: state.settings.transactionsPerPage,
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

    //TODO: Redo all of this
    if (this.props.accounts && prevProps.accounts != this.props.accounts) {
      this.props.GetAccountTransactions(
        this.props.accounts,
        this.props.settings.nexusApiLimit
      );
    }

    if (
      this.props.transactions &&
      prevProps.transactions != this.props.transactions
    ) {
      this.getTransactionHistory();
    }

    if (this.props.txTotal && this.props.txTotal != prevProps.txTotal) {
      this.props.GetUserAccounts();
      this.props.GetAccountTransactions(
        this.props.accounts,
        this.props.settings.nexusApiLimit
      );
    }
    if (this.props.txTotal !== 0 && !this.props.transactions) {
      this.props.GetAccountTransactions(
        this.props.accounts,
        this.props.settings.nexusApiLimit
      );
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
            to:
              e.to ||
              (e.OP === 'FEE' && 'Fee Reserve') ||
              (e.O === 'TRUST' && 'Trust Reward'),
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
    return (
      <div>
        <Header>
          <Filters />
        </Header>
        <Table
          data={data}
          columns={columns(this.props.settings.locale, this.props.unixTime)}
          defaultSortingColumnId={'timestamp'}
          pageSize={this.props.pageSize}
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

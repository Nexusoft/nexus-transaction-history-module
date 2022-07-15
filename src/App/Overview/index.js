// External
import Table from './Table';
import { CSVLink } from 'react-csv';
import { connect } from 'react-redux';

// Internal
import Filters from './Filters';
import { GetUserAccounts, GetAccountTransactions } from 'Shared/Libraries/user';
import { getTransactionDataPacket } from 'Shared/Libraries/transactions';
import { GetFilteredTransactions } from './selectors';

const {
  libraries: {
    React,
    emotion: { styled },
  },
  components: { Tooltip },
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
  const { operation, fromQuery, toQuery, timeSpan } = state.ui.main;
  const { unixTime, transactionsPerPage, locale, nexusApiLimit } =
    state.settings;
  const { transactions, info, accounts } = state.ui.user;
  const { history } = state.ui;
  const txTotal = info && state.ui.user.info.transactions;
  return {
    accounts,
    userInfo: info,
    history,
    transactions,
    txTotal,
    operation,
    fromQuery,
    toQuery,
    timeSpan,
    unixTime,
    pageSize: transactionsPerPage,
    locale,
    nexusApiLimit,
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
    const {
      userInfo,
      nexusApiLimit,
      accounts,
      transactions,
      txTotal,
      GetAccountTransactions,
      GetUserAccounts,
    } = this.props;

    if (!userInfo || !prevProps.userInfo) {
      //Not Logged in
      return;
    }

    //TODO: Redo all of this
    if (accounts && prevProps.accounts != accounts) {
      GetAccountTransactions(accounts, nexusApiLimit);
    }

    if (transactions && prevProps.transactions != transactions) {
      this.getTransactionHistory();
    }

    if (txTotal && txTotal != prevProps.txTotal) {
      GetUserAccounts();
      GetAccountTransactions(accounts, nexusApiLimit);
    }
    if (txTotal !== 0 && !transactions) {
      GetAccountTransactions(accounts, nexusApiLimit);
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
    const { transactions, history } = this.props;
    if (!transactions) return [];
    return transactions.map((e) =>
      history.transactions[e.txid]
        ? {
            ...e,
            to:
              e.to ||
              (e.OP === 'FEE' && 'Fee Reserve') ||
              (e.OP === 'TRUST' && 'Trust Reward'),
            from: e.from || (e.OP === 'TRUST' && 'Trust Mint'),
            timestamp: history.transactions[e.txid].timestamp,
            fiatAmount: history.transactions[e.txid].fiat.totalValue,
          }
        : { OP: 'Loading' }
    );
  }

  render() {
    const {
      fromQuery,
      toQuery,
      timeSpan,
      operation,
      locale,
      unixTime,
      pageSize,
    } = this.props;
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
          columns={columns(locale, unixTime)}
          defaultSortingColumnId={'timestamp'}
          pageSize={pageSize}
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

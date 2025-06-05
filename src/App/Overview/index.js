// External
import { useEffect, useRef, useCallback } from 'react';
import Table from './Table';
import { CSVLink } from 'react-csv';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { Tooltip } from 'nexus-module';

// Internal
import Filters from './Filters';
import { GetUserAccounts, GetAccountTransactions } from 'Shared/Libraries/user';
import { getTransactionDataPacket } from 'Shared/Libraries/transactions';
import { GetFilteredTransactions } from './selectors';

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
  const { transactions, accounts } = state.ui.user;
  const { history } = state.ui;
  const info = state.nexus.userStatus;
  const txTotal = (info && transactions?.length) || 0;
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

const Overview = (props) => {
  const csvLinkRef = useRef(null);

  // Regarding childRef: If childRef was intended to expose component instance methods
  // to a parent, this pattern needs rethinking with functional components.
  // Common alternatives include forwardRef with useImperativeHandle, or lifting state up.
  // For now, I'll comment out the childRef logic. If it's critical, we'll need to discuss
  // its purpose and find a suitable hooks-based solution.
  /*
  useEffect(() => {
    const { childRef } = props;
    if (childRef) {
      // This part needs to be adapted based on what childRef expects.
      // If it expects the instance, useImperativeHandle might be needed.
      // childRef(???); 
    }
  }, [props.childRef]);
  */

  const memoizedGetTransactionHistory = useCallback(() => {
    if (props.transactions) {
      props.getTransactionDataPacket(props.transactions, '000000', 'usd');
    }
  }, [props.transactions, props.getTransactionDataPacket]);

  // Effect 1: GetAccountTransactions when accounts or nexusApiLimit changes (corresponds to former accounts change check)
  useEffect(() => {
    if (props.userInfo && props.accounts) {
      props.GetAccountTransactions(props.accounts, props.nexusApiLimit);
    }
  }, [
    props.userInfo,
    props.accounts,
    props.nexusApiLimit,
    props.GetAccountTransactions,
  ]);

  // Effect 2: Get transaction history when transactions change
  useEffect(() => {
    if (props.userInfo && props.transactions) {
      memoizedGetTransactionHistory();
    }
  }, [props.userInfo, props.transactions, memoizedGetTransactionHistory]);

  // Effect 3: Handle GetUserAccounts based on txTotal, and subsequently GetAccountTransactions if needed.
  // Covers original logic:
  // - if (txTotal && txTotal != prevProps.txTotal) { GetUserAccounts(); GetAccountTransactions(...); }
  // - if (txTotal !== 0 && !transactions) { GetAccountTransactions(...); }
  useEffect(() => {
    if (props.userInfo) {
      let shouldTriggerGetAccountTransactions = false;

      // If txTotal is defined (i.e., has a value, including 0), it implies a potential change or an initial state to react to.
      if (typeof props.txTotal === 'number') {
        props.GetUserAccounts();
        // If accounts are present after GetUserAccounts or were already there, flag to get transactions.
        if (props.accounts) {
          shouldTriggerGetAccountTransactions = true;
        }
      }

      // Also trigger if txTotal is non-zero, transactions are missing, and accounts are present.
      if (props.txTotal !== 0 && !props.transactions && props.accounts) {
        shouldTriggerGetAccountTransactions = true;
      }

      if (shouldTriggerGetAccountTransactions && props.accounts) {
        props.GetAccountTransactions(props.accounts, props.nexusApiLimit);
      }
    }
  }, [
    props.userInfo,
    props.txTotal,
    props.accounts, // accounts can change after GetUserAccounts or be an initial condition
    props.transactions, // for the !props.transactions condition
    props.GetUserAccounts,
    props.GetAccountTransactions,
    props.nexusApiLimit,
  ]);

  // The large useEffect that was here previously is now replaced by the more specific ones above.
  // Original start of the large useEffect was here:
  // useEffect(() => {

  const transformTransactionData = useCallback(() => {
    const { transactions, history } = props;
    if (!transactions) return [];
    return transactions.map((e) =>
      history.transactions[e.txid]
        ? {
            ...e,
            to:
              e.to?.address ||
              (e.OP === 'FEE' && 'Fee Reserve') ||
              (e.OP === 'TRUST' && 'Trust Reward'),
            from: e.from?.address || (e.OP === 'TRUST' && 'Trust Mint'),
            timestamp: history.transactions[e.txid].timestamp,
            fiatAmount: history.transactions[e.txid].fiat.totalValue,
          }
        : { OP: 'Loading' }
    );
  }, [props.transactions, props.history]);

  // Destructure props needed for rendering
  const {
    fromQuery,
    toQuery,
    timeSpan,
    operation,
    locale,
    unixTime,
    pageSize,
  } = props;

  const data = GetFilteredTransactions(
    transformTransactionData(),
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
          ref={csvLinkRef}
          filename={'Nexus_Transaction_History.csv'}
        ></CSVLink>
      </Footer>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);

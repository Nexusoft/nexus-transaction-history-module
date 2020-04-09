import Table from './Table';
import { CSVLink } from 'react-csv';

import Filters from './Filters';
import { GetUserAccounts, GetAccountTransactions } from 'Shared/Libraries/user';

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
  return {
    accounts: state.user.accounts,
    state: state,
    transactions: state.user.transactions,
  };
};

const mapDispatchToProps = { GetUserAccounts, GetAccountTransactions };
class Overview extends React.Component {
  componentDidMount() {
    console.log('Mounting');
    //this.props.GetUserAccounts();
    //setTimeout(console.log(this.props), 5000);
    //setTimeout(this.props.GetAccountTransactions(this.props.accounts), 1000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.accounts && prevProps.accounts != this.props.accounts) {
      console.log(this.props);
      this.props.GetAccountTransactions(this.props.accounts);
    }
  }

  render() {
    const data = [
      ['time', 'Amount'],
      ['July', '100'],
      ['March', '20'],
    ];

    const { transactions } = this.props;
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

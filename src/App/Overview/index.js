import Table from './Table';
import { CSVLink } from 'react-csv';

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

class Overview extends React.Component {
  render() {
    const data = [
      ['time', 'Amount'],
      ['July', '100'],
      ['March', '20'],
    ];
    return (
      <div>
        <Header>
          <h1>Filters</h1>
        </Header>

        <Table defaultSortingColumnIndex={0} data={[]} columns={columns} />
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

export default Overview;

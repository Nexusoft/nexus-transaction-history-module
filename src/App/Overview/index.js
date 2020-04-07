import Table from './Table';

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
    id: 'reference',
    Header: 'Reference',
    accessor: 'reference',
  },
];

class Overview extends React.Component {
  asdfgh() {
    return <Table defaultSortingColumnIndex={0} data={[]} columns={columns} />;
  }
  render() {
    console.log(this.asdfgh());
    return (
      <div>
        Overview
        <Table defaultSortingColumnIndex={0} data={[]} columns={columns} />
      </div>
    );
  }
}

export default Overview;

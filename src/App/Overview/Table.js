import { useTable, useSortBy } from 'react-table';

const {
  libraries: {
    React,
    emotion: { styled },
  },
} = NEXUS;

/*
const Table = ({ data, columns, defaultSortingColumnIndex, ...rest }) => (
  <ReactTable
    noDataText={'No Rows Found'}
    minRows={5}
    PropTypes={PropTypes}
    data={data}
    pageText={'Page'}
    columns={columns}
    defaultSorted={[{ ...columns[defaultSortingColumnIndex], desc: true }]}
    rowsText={'rows'}
    previousText={'< ' + 'Previous'}
    getTbodyProps={() => {
      return { style: { overflow: 'hidden' } };
    }}
    nextText={'Next' + ' >'}
    {...rest}
    className={`-striped -highlight ${rest.className}`}
  />
);

*/

const TD = styled.td(({ theme, index }) => ({
  padding: '0 0 0 0',
  fontSize: '75%',
  textAlign: 'center',
  background: index % 2 === 1 ? theme.mixer(0.3) : theme.mixer(0.25),
}));

const TR = styled.tr(({ theme }) => ({
  background: theme.mixer(0.9),
}));

const TH = styled.th(({ theme }) => ({
  color: theme.mixer(0.05),
  background: theme.mixer(0.9),
}));

const TBody = styled.tbody(({ theme }) => ({
  background: theme.primary,
}));

const THead = styled.thead(({ theme }) => ({}));

function Table({ columns, data, defaultSortingColumnId, ...rest }) {
  // Use the state and functions returned from useTable to build your UI
  const defaultSort = [{ id: defaultSortingColumnId, desc: true }];
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: {
          sortBy: defaultSort,
        },
      },
      useSortBy
    );

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <THead>
        {headerGroups.map((headerGroup) => (
          <TR {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TH
                {...column.getHeaderProps({
                  ...column.getSortByToggleProps(),
                  title: 'Sort',
                  style: {
                    cursor: 'pointer',
                    width: column.width,
                    maxWidth: column.maxWidth,
                  },
                })}
              >
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''}
                </span>
              </TH>
            ))}
          </TR>
        ))}
      </THead>
      <TBody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <TR {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TD {...cell.getCellProps()} {...{ index }}>
                    {cell.render('Cell')}
                  </TD>
                );
              })}
            </TR>
          );
        })}
      </TBody>
    </table>
  );
}

export default Table;

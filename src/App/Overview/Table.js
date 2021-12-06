import { useTable, useSortBy, usePagination } from 'react-table';

const {
  libraries: {
    React,
    React: { useState, Fragment },
    emotion: { styled },
  },
  components: { Button, Select },
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

const Pagination = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '25% 15% 25%',
  justifyContent: 'space-between',
}));

const PageSelection = styled.div(({ theme }) => ({
  marginLeft: 'auto',
  marginRight: 'auto',
}));

function Table({ columns, data, defaultSortingColumnId, pageSize, ...rest }) {
  // Use the state and functions returned from useTable to build your UI
  const defaultSort = [{ id: defaultSortingColumnId, desc: true }];
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageOptions,
    page,
    state,
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: pageSize || 10,
        sortBy: defaultSort,
      },
    },
    useSortBy,
    usePagination
  );
  const availablePages = Array.apply(
    null,
    Array(Math.ceil(data.length / state.pageSize))
  ).map((e, i) => ({
    value: i,
    display: i + 1,
  }));

  const [pageSelect, setPageSelect] = useState(0);

  // Render the UI for your table
  return (
    <Fragment>
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
          {page.map((row, index) => {
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
      <Pagination>
        <Button
          onClick={() => {
            setPageSelect(pageSelect - 1);
            previousPage();
          }}
          disabled={!canPreviousPage}
        >
          Previous
        </Button>
        <PageSelection>
          <label>Page:</label>
          <Select
            style={{ paddingLeft: '1em', display: 'inline-flex' }}
            value={pageSelect}
            options={availablePages}
            onChange={(e) => {
              setPageSelect(e);
              gotoPage(e);
            }}
          />
        </PageSelection>
        <Button
          onClick={() => {
            setPageSelect(pageSelect + 1);
            nextPage();
          }}
          disabled={!canNextPage}
        >
          Next
        </Button>
      </Pagination>
    </Fragment>
  );
}

export default Table;

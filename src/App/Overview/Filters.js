import {
  setFromQuery,
  setToQuery,
  setTimeSpan,
  setOperation,
} from 'Shared/Libraries/ui';

const {
  libraries: {
    React,
    ReactRedux: { connect },
    emotion: { styled },
  },
  components: { Select, TextField, FormField },
} = NEXUS;

const __ = (input) => input;

const operations = ['LEGACY', 'TRUST', 'DEBIT', 'CREDIT', 'FEE', 'GENISIS'];

const opOptions = [
  {
    value: null,
    display: __('All'),
  },
  ...operations.map((op) => ({
    value: op,
    display: op,
  })),
];

const timeFrames = [
  {
    value: null,
    display: __('All'),
  },
  {
    value: 'year',
    display: __('Past Year'),
  },
  {
    value: 'month',
    display: __('Past Month'),
  },
  {
    value: 'week',
    display: __('Past Week'),
  },
];

const FiltersWrapper = styled.div(({ morePadding }) => ({
  gridArea: 'filters',
  display: 'grid',
  gridTemplateAreas: '"reference timeFrame operation"',
  gridTemplateColumns: '3fr 2fr 100px auto',
  gridRowStart: 1,
  gridRowEnd: 1,
  columnGap: '.75em',
  alignItems: 'end',
  fontSize: 15,
  padding: `0 0 10px 0`,
}));

const MoreOptions = styled.div({
  paddingLeft: '1em',
  display: 'grid',
  gridTemplateColumns: 'auto auto auto auto',
  gridRowStart: 2,
  gridColumnStart: 1,
  gridColumnEnd: 4,
  columnGap: '.75em',
  alignItems: 'end',
});

const Filters = ({
  operation,
  fromQuery,
  toQuery,
  timeSpan,
  morePadding,
  children,
  optionsOpen,
  setFromQuery,
  setToQuery,
  setTimeSpan,
  setOperation,
  ...rest
}) => (
  <FiltersWrapper>
    <FormField connectLabel label={__('From')}>
      <TextField
        type="search"
        placeholder="From Search"
        value={fromQuery}
        onChange={(evt) => setFromQuery(evt.target.value)}
      />
    </FormField>
    <FormField connectLabel label={__('To')}>
      <TextField
        type="search"
        placeholder="To Search"
        value={toQuery}
        onChange={(evt) => setToQuery(evt.target.value)}
      />
    </FormField>
    <FormField label={__('Time span')}>
      <Select value={timeSpan} onChange={setTimeSpan} options={timeFrames} />
    </FormField>
    <FormField label={__('Operation')}>
      <Select value={operation} onChange={setOperation} options={opOptions} />
    </FormField>
    {children}
  </FiltersWrapper>
);

const mapStateToProps = ({
  ui: { operation, fromQuery, toQuery, timeSpan },
}) => ({
  operation,
  fromQuery,
  toQuery,
  timeSpan,
});

export default connect(mapStateToProps, {
  setFromQuery,
  setToQuery,
  setTimeSpan,
  setOperation,
})(Filters);

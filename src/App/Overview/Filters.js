import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Select, TextField, FormField } from 'nexus-module';

import {
  setFromQuery,
  setToQuery,
  setTimeSpan,
  setOperation,
} from 'Shared/Libraries/ui';

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

export default function Filters({ children }) {
  const { operation, fromQuery, toQuery, timeSpan } = useSelector(
    (state) => state.ui.main
  );
  const dispatch = useDispatch();
  return (
    <FiltersWrapper>
      <FormField connectLabel label={__('From')}>
        <TextField
          type="search"
          placeholder="From Search"
          value={fromQuery}
          onChange={(evt) => dispatch(setFromQuery(evt.target.value))}
        />
      </FormField>
      <FormField connectLabel label={__('To')}>
        <TextField
          type="search"
          placeholder="To Search"
          value={toQuery}
          onChange={(evt) => dispatch(setToQuery(evt.target.value))}
        />
      </FormField>
      <FormField label={__('Time span')}>
        <Select
          value={timeSpan}
          onChange={(value) => dispatch(setTimeSpan(value))}
          options={timeFrames}
        />
      </FormField>
      <FormField label={__('Operation')}>
        <Select
          value={operation}
          onChange={(value) => dispatch(setOperation(value))}
          options={opOptions}
        />
      </FormField>
      {children}
    </FiltersWrapper>
  );
}

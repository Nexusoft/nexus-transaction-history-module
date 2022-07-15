// External
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { FieldSet, Switch, Modal, TextField, Button } from 'nexus-module';

// Internal Global
import { RemoveSaveData, SetSettings } from 'Shared/Libraries/settings';

const Field = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const CCLink = styled.a(({ theme }) => ({
  color: theme.primary,
  fontSize: '75%',
  opacity: '50%',
  textDecoration: 'underline',
}));

/**
 * The Internal Send Form in the Send Page
 *
 * @class SendForm
 * @extends {Component}
 */
export default function Settings({ removeModal }) {
  const { nexusApiLimit, transactionsPerPage, unixTime } = useSelector(
    (state) => state.settings
  );
  const dispatch = useDispatch();
  return (
    <Modal
      visible={true}
      removeModal={removeModal}
      style={{
        width: '50%',
        maxHeight: '90%',
        minHeight: '10%',
      }}
    >
      <Modal.Body>
        <FieldSet legend={'Settings'}>
          <div
            style={{
              justifyContent: 'space-between',
              alignItems: 'stretch',
              flex: 1,
              minHeight: '10em',
              flexDirection: 'column',
              display: 'flex',
            }}
          >
            <Field>
              <strong>{'Nexus Api Call Limit'}</strong>
              <TextField
                type={'number'}
                min={100}
                value={nexusApiLimit}
                onChange={(ele) =>
                  dispatch(
                    SetSettings({ nexusApiLimit: parseInt(ele.target.value) })
                  )
                }
              ></TextField>
            </Field>
            <Field>
              <strong>{'Transactions Per Page'}</strong>
              <TextField
                type={'number'}
                min={1}
                value={transactionsPerPage}
                onChange={(ele) =>
                  dispatch(
                    SetSettings({
                      transactionsPerPage: parseInt(ele.target.value),
                    })
                  )
                }
              ></TextField>
            </Field>
            <Field>
              <strong>{'Unix Time Display'}</strong>
              <Switch
                checked={unixTime}
                onChange={(ele) =>
                  dispatch(SetSettings({ unixTime: ele.target.checked }))
                }
              />
            </Field>
            <Field>
              <strong>{'Delete Saved Data'}</strong>
              <Button
                style={{ width: '50%', maxWidth: '20em' }}
                onClick={() => dispatch(RemoveSaveData())}
              >
                Delete
              </Button>
            </Field>
          </div>
          <CCLink href="https://cryptocompare.com">
            Powered by cryptocompare.com
          </CCLink>
        </FieldSet>
      </Modal.Body>
      <Modal.Footer style={{ display: 'grid', paddingTop: 0 }}>
        <Button onClick={removeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

// External
import { connect } from 'react-redux';

// Internal Global
import { RemoveSaveData, SetSettings } from 'Shared/Libraries/settings';

const {
  libraries: {
    React,
    React: { Component },
    emotion: { styled },
  },
  components: { FieldSet, Switch, Modal, TextField, Button },
} = NEXUS;

const Field = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

/**
 * The Internal Send Form in the Send Page
 *
 * @class SendForm
 * @extends {Component}
 */
@connect((state) => ({ settings: state.settings }), {
  SetSettings,
  RemoveSaveData,
})
class Settings extends Component {
  render() {
    const { settings, SetSettings, RemoveSaveData } = this.props;
    const { nexusApiLimit, transactionsPerPage, unixTime } = settings;
    return (
      <Modal
        visible={true}
        removeModal={this.props.removeModal}
        assignClose={(closeModal) => (this.closeModal = closeModal)}
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
                    SetSettings({ nexusApiLimit: parseInt(ele.target.value) })
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
                    SetSettings({
                      transactionsPerPage: parseInt(ele.target.value),
                    })
                  }
                ></TextField>
              </Field>
              <Field>
                <strong>{'Unix Time Display'}</strong>
                <Switch
                  checked={unixTime}
                  onChange={(ele) =>
                    SetSettings({ unixTime: ele.target.checked })
                  }
                />
              </Field>
              <Field>
                <strong>{'Delete Saved Data'}</strong>
                <Button
                  style={{ width: '50%', maxWidth: '20em' }}
                  onClick={() => RemoveSaveData()}
                >
                  Delete
                </Button>
              </Field>
            </div>
          </FieldSet>
        </Modal.Body>
        <Modal.Footer style={{ display: 'grid', paddingTop: 0 }}>
          <Button onClick={this.props.removeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Settings;

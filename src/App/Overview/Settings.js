// External

// Internal Global
import { RemoveSaveData, SetSettings } from 'Shared/Libraries/settings';

const {
  libraries: {
    React,
    React: { Component },
    ReactRedux: { connect },
    emotion: { styled },
  },
  components: {
    Icon,
    FieldSet,
    Switch,
    Modal,
    Select,
    DateTime,
    TextField,
    FormField,
    Button,
  },
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
    const { SetSettings, RemoveSaveData } = this.props;
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
                  value={this.props.settings.nexusApiLimit}
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
                  value={this.props.settings.transactionsPerPage}
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
                  checked={this.props.settings.unixTime}
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

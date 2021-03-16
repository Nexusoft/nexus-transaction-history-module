// External

// Internal Global
import { ClosePopUp } from 'Shared/Libraries/ui';
import { SetSettings } from 'Shared/Libraries/settings';

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
  display: 'contents',
});

/**
 * The Internal Send Form in the Send Page
 *
 * @class SendForm
 * @extends {Component}
 */
@connect((state) => ({ settings: state.settings }), {
  ClosePopUp,
  SetSettings,
})
class Settings extends Component {
  render() {
    const { SetSettings } = this.props;
    return (
      <Modal
        removeModal={this.props.removeModal}
        style={{
          width: '50%',
          maxHeight: '90%',
          minHeight: '10%',
        }}
      >
        <Modal.Body>
          <FieldSet legend={'Settings'}>
            <div className="flex space-between">
              <Field>
                <strong>{'Nexus Api Call Limit'}</strong>
                <TextField
                  type={'number'}
                  min={100}
                  value={this.props.settings.nexusApiLimit}
                  onChange={(ele) =>
                    SetSettings({ nexusApiLimit: ele.target.value })
                  }
                ></TextField>
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

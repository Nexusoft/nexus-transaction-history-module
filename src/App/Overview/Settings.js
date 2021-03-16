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
    Panel,
    AutoSuggest,
    FieldSet,
    Field,
    Switch,
    Modal,
    Tooltip,
    Select,
    DateTime,
    TextField,
    FormField,
    Button,
  },
  utilities: { updateStorage },
} = NEXUS;

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
class SettingsModal extends Component {
  //constructor(props) {
  //  super(props);
  //}
  componentDidMount() {}

  render() {
    const { SetSettings } = this.props;

    console.log(this.props);
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
              <div className="text-center">
                <div>
                  <strong>{'Nexus Api Call Limit'}</strong>
                  <TextField
                    type={'number'}
                    min={100}
                    value={this.props.settings.nexusApiLimit}
                    onChange={(ele) =>
                      SetSettings({ nexusApiLimit: ele.target.value })
                    }
                  ></TextField>
                </div>
              </div>
            </div>
          </FieldSet>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.removeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default SettingsModal;

import Main from './Main';
import { CloseModal } from 'actions/actionCreators';
import Settings from './Overview/Settings';
import { connect } from 'react-redux';

const {
  libraries: {
    React,
    emotion: {
      cache,
      react: { CacheProvider },
    },
  },
  utilities: { color },
  components: { ThemeController },
} = NEXUS;

const emotionCache = cache({
  key: 'nexus-history-module',
  container: document.head,
});

const modalList = {
  Settings: Settings,
};

@connect(
  (state) => ({
    initialized: state.initialized,
    theme: state.theme,
    modal: state.modal,
  }),
  { CloseModal }
)
class App extends React.Component {
  render() {
    const { initialized, theme, modal } = this.props;
    if (!initialized) return null;
    const Modal = modal && modalList[modal.name];

    return (
      <CacheProvider value={emotionCache}>
        <ThemeController theme={theme}>
          {Modal && (
            <Modal {...modal.props} removeModal={this.props.CloseModal} />
          )}
          <Main history={history} />
        </ThemeController>
      </CacheProvider>
    );
  }
}

export default App;

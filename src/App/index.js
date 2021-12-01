import Main from './Main';

const {
  libraries: {
    React,
    ReactRedux: { connect },
    emotion: {
      createCache,
      core: { CacheProvider },
    },
  },
  utilities: { color },
  components: { ThemeController },
} = NEXUS;

const emotionCache = createCache({
  key: 'nexus-history-module',
  container: document.head,
});

const modalList = {};

@connect(
  (state) => ({
    initialized: state.initialized,
    theme: state.theme,
    PopUp: state.popUps,
  }),
  {}
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
            <Modal {...modal.props} removeModal={() => dispatch(CloseModal)} />
          )}
          <Main history={history} />
        </ThemeController>
      </CacheProvider>
    );
  }
}

export default App;

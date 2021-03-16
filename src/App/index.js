import Main from './Main';
import PopupResolver from './PopupResolver';

const {
  libraries: {
    React,
    ReactRedux: { connect },
    emotion: {
      createCache,
      core: { CacheProvider },
      theming: { ThemeProvider },
    },
  },
  utilities: { color },
} = NEXUS;

const emotionCache = createCache({
  key: 'nexus-history-module',
  container: document.head,
});

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
    const { initialized, theme } = this.props;
    if (!initialized) return null;

    const themeWithMixer = {
      ...theme,
      mixer: color.getMixer(theme.background, theme.foreground),
    };

    const { PopUp } = this.props;

    return (
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={themeWithMixer}>
          <PopupResolver popUps={PopUp} />
          <Main />
        </ThemeProvider>
      </CacheProvider>
    );
  }
}

export default App;

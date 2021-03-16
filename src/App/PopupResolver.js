import { ClosePopUp } from 'Shared/Libraries/ui';

import Settings from './Overview/Settings';

const {
  libraries: {
    React,
    ReactRedux: { connect },
  },
} = NEXUS;

const available = [Settings];

@connect((state) => ({}), { ClosePopUp })
class Popups extends React.Component {
  returnClasses = (popUpList) =>
    popUpList.map((e) => ({
      div: available.find((d) => d.displayName.includes(e.name)),
      props: e.props,
      id: e.id,
    }));

  render() {
    const popUpList = this.props.popUps;
    const pops = this.returnClasses(popUpList).map((E) => (
      <E.div
        key={E.id}
        {...E.props}
        removeModal={() => this.props.ClosePopUp()}
      />
    ));
    console.log(pops);
    return <>{pops}</>;
  }
}

export default Popups;

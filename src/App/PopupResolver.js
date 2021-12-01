import { ClosePopUp } from 'Shared/Libraries/ui';

import { CloseModal } from 'actions/actionCreators';

import Settings from './Overview/Settings';

const {
  libraries: {
    React,
    ReactRedux: { connect },
  },
} = NEXUS;

const available = { Settings: Settings };

@connect((state) => ({}), { CloseModal })
class Popups extends React.Component {
  returnClasses = (popUpList) =>
    popUpList.map((e) => ({
      div: available[e.name],
      props: e.props,
      id: e.id,
    }));

  render() {
    const popUpList = this.props.popUps;
    const pops = this.returnClasses(popUpList).map((E) => (
      <E.div key={E.id} {...E.props} removeModal={CloseModal} />
    ));
    console.log(pops);
    return <>{pops}</>;
  }
}

export default Popups;

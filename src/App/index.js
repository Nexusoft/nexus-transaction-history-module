import { useSelector, useDispatch } from 'react-redux';
import { ModuleWrapper } from 'nexus-module';

import { CloseModal } from 'actions/actionCreators';

import Main from './Main';
import Settings from './Overview/Settings';

const modalList = {
  Settings: Settings,
};

export default function App() {
  const initialized = useSelector((state) => state.nexus.initialized);
  const theme = useSelector((state) => state.nexus.theme);
  const modal = useSelector((state) => state.ui.modal);
  const Modal = modal && modalList[modal.name];
  const dispatch = useDispatch();

  return (
    <ModuleWrapper initialized={initialized} theme={theme}>
      {Modal && (
        <Modal
          {...modal.props}
          removeModal={() => {
            dispatch(CloseModal());
          }}
        />
      )}
      <Main />
    </ModuleWrapper>
  );
}

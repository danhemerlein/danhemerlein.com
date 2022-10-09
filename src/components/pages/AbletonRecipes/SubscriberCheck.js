import FullScreenHeight from 'components/other/FullScreenHeight/index.js';
import { useContext } from 'react';
import { P } from 'styles/elements';
import { UserContext } from './context';

const AdminCheck = ({ children, fallback }) => {
  const { user } = useContext(UserContext);

  const subscriber = user?.roles?.subscriber;

  return subscriber
    ? children
    : fallback || (
        <FullScreenHeight>
          <P>you must be signed in to view this page</P>
        </FullScreenHeight>
      );
};

export default AdminCheck;

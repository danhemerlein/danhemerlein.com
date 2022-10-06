import FullScreenHeight from 'components/other/FullScreenHeight/index.js';
import { useContext } from 'react';
import { P } from 'styles/elements';
import { UserContext } from './context';

const AdminCheck = ({ children, fallback }) => {
  const { user } = useContext(UserContext);

  const admin = user?.roles?.admin;

  return admin
    ? children
    : fallback || (
        <FullScreenHeight>
          <P>admin access denied</P>
        </FullScreenHeight>
      );
};

export default AdminCheck;

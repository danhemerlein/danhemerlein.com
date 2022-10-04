import { createContext } from 'react';
import { auth } from 'utils/firestore';

export const UserContext = createContext({
  user: auth.currentUser || null,
  setUser: () => {}
});

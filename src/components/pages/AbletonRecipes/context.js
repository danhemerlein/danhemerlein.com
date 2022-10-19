import { createContext } from 'react';

export const UserContext = createContext({
  uid: '',
  email: '',
  name: '',
  roles: {
    subscriber: false,
    admin: false
  }
});

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useContext } from 'react';

import Button from 'components/base/Button';
import { auth, provider } from 'utils/firestore';
import { UserContext } from './context.js';

const SignInWithGoogleButton = () => {
  const { setUser } = useContext(UserContext);

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const { user } = result;
        setUser(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const { email } = error.customData;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return <Button clickHandler={signInWithGoogle}>sign in with google</Button>;
};

export default SignInWithGoogleButton;

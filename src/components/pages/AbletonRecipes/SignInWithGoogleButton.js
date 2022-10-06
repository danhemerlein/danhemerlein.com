import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import Button from 'components/base/Button';
import {
  addDocument,
  checkDocumentExistenceById
} from 'utils/firebaseHelpers.js';
import { auth, provider } from 'utils/firestore';

const SignInWithGoogleButton = () => {
  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const { user } = result;

        // if the user doesn't exist in the database, create a record
        const userDocumentExists = await checkDocumentExistenceById(
          'users',
          user.uid
        );
        if (userDocumentExists === false) {
          const data = {
            id: user.uid,
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            roles: {
              subscriber: true,
              admin: false
            }
          };
          addDocument('users', data);
        }
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

import { P } from 'styles/elements';
import SignInWithGoogleButton from '../SignInWithGoogleButton.js';
import SignOutButton from '../SignOutButton.js';
import * as styles from './HeaderLinks.styles';

const HeaderLinks = ({ user, buyMeACoffeeWidgetToggle }) => {
  return (
    <>
      <styles.HeaderButton link to="/ableton-recipes/about">
        <P>wtf is ableton recipes?</P>
      </styles.HeaderButton>

      {user?.uid?.length > 0 ? (
        <styles.HeaderButton
          link
          to={`/ableton-recipes/subscriber/${user.uid}`}
        >
          <P as="span">dashboard</P>
        </styles.HeaderButton>
      ) : null}

      <styles.HeaderButton clickHandler={buyMeACoffeeWidgetToggle}>
        <P as="span">buy me a coffee</P>
      </styles.HeaderButton>

      {user?.uid?.length > 0 ? <SignOutButton /> : <SignInWithGoogleButton />}
    </>
  );
};

HeaderLinks.propTypes = {};

export default HeaderLinks;

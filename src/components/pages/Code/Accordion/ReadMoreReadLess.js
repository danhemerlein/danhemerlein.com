import { bool } from 'prop-types';

const ReadMoreReadLess = ({ expanded }) => {
  return <span>{expanded ? 'read less' : 'read more'}</span>;
};

ReadMoreReadLess.propTypes = {
  expanded: bool.isRequired,
};

export default ReadMoreReadLess;

import { string } from 'prop-types';

const YouTube = ({ height, width, className }) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      xmlSpace="preserve"
      className={className}
      height={height}
      width={width}
    >
      <g id="XMLID_2_">
        <path
          id="XMLID_6_"
          className="st0"
          fill="#000"
          d="M424.9,161.6c-4.2-15.8-16.6-28.3-32.3-32.5c-28.5-7.7-142.6-7.7-142.6-7.7s-114.1,0-142.6,7.7
        c-15.7,4.2-28.1,16.7-32.3,32.5c-7.6,28.6-7.6,88.4-7.6,88.4s0,59.8,7.6,88.4c4.2,15.8,16.6,28.3,32.3,32.5
        c28.5,7.7,142.6,7.7,142.6,7.7s114.1,0,142.6-7.7c15.7-4.2,28.1-16.7,32.3-32.5c7.6-28.6,7.6-88.4,7.6-88.4
        S432.5,190.2,424.9,161.6z"
        />
        <polygon
          id="XMLID_7_"
          className="st1"
          fill="#FFF"
          points="212.7,304.3 308.1,250 212.7,195.7"
        />
      </g>
    </svg>
  );
};

YouTube.propTypes = {
  height: string,
  width: string,
  className: string
};

YouTube.defaultProps = {
  height: '2.4rem',
  width: '2.4rem',
  className: ''
};

export default YouTube;

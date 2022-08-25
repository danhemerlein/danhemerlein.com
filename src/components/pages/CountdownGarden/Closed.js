import styled from 'styled-components';

const P = styled.p`
  text-align: center;
`;

const Closed = () => {
  return (
    <div>
      <P>
        <em>countdown garden is closed 7AM - 9PM</em>
      </P>
      <P>
        <em>touch some grass and check back later</em>
      </P>
    </div>
  );
};

export default Closed;

import styled from 'styled-components';
import { P } from 'styles/elements';
import { above, anchorColor } from 'styles/utilities';
import { remHelper } from 'utils';

const Banner = styled.a`
  padding: ${remHelper[4]} 0;
  text-align: center;
  transition: background 0.25s ease-in-out;
  border-top: 1px solid;
  border-left: 1px solid;
  border-right: 1px solid;
  background-color: ${({ theme }) => theme.yan.background};
  border-color: ${({ theme }) => theme.yan.background};
  ${({ desktop }) => desktop && `display: none;`}

  ${({ mobile }) =>
    mobile &&
    `
      display: flex;
      align-items: center;
      height: 200px;
      border-bottom: 1px solid;

      span {
        width: 100%;
      }
    `}

    ${({ theme }) => {
    return anchorColor({
      color: theme.yan.background,
    });
  }}


  ${above.desktop`
    ${({ mobile }) => mobile && `display: none;`}
    ${({ desktop }) => desktop && `display: block;`}
  `}
`;

const Span = styled(P)`
  font-family: 'lack_regular';
  color: ${({ theme }) => theme.yan.foreground};
`;

const HomePageBanner = ({ mobile, desktop }) => {
  return (
    <Banner
      href="https://www.youngandnauseo.us/"
      target="_blank"
      rel="noopener noreferrer"
      mobile={mobile}
      desktop={desktop}
    >
      <Span as="span" textCenter>
        young and nauseous
      </Span>
    </Banner>
  );
};

export default HomePageBanner;

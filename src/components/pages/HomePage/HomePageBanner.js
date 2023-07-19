import { bool, string } from 'prop-types'
import styled from 'styled-components'
import { P } from 'styles/elements'
import { above } from 'styles/utilities/breakpoints'
import { anchorColor } from 'styles/utilities/mixins'
import { remHelper } from 'utils/remHelper'

const Banner = styled.a`
  padding: ${remHelper[4]} 0;
  text-align: center;

  ${({ theme, fontFamily }) => {
    if (fontFamily === 'lack') {
      return `
        border: 1px solid;
        background-color: ${theme.yan.background};
        border-color: ${theme.border};
      `
    }
    return 'background: linear-gradient(to left, #c23b22 0%, #b848a5 100%);'
  }};

  ${({ desktop }) => {
    return desktop && `display: none;`
  }}

  ${({ mobile }) => {
    return (
      mobile &&
      `
      display: flex;
      align-items: center;
      height: 200px;

      span {
        width: 100%;
      }
    `
    )
  }}

  ${({ theme }) => {
    return anchorColor({
      color: theme.yan.background
    })
  }}

  &:hover {
    text-decoration: none;
  }

  ${above.desktop`
    ${({ mobile }) => {
      return mobile && `display: none;`
    }}
    ${({ desktop }) => {
      return desktop && `display: block;`
    }}
  `}
`

const Span = styled(P)`
  font-family: ${({ fontFamily }) => {
    if (fontFamily === 'lack') {
      return 'lack_regular'
    }
    return 'custom_serif'
  }};

  'lack_regular';
  color: ${({ theme }) => {
    return theme.yan.foreground
  }};
`

const HomePageBanner = ({
  mobile,
  desktop,
  text,
  href,
  targetBlank,
  fontFamily
}) => {
  return (
    <Banner
      href={href}
      target={targetBlank ? '_blank' : ''}
      rel="noopener noreferrer"
      mobile={mobile}
      desktop={desktop}
      fontFamily={fontFamily}
    >
      <Span as="span" textCenter fontFamily={fontFamily}>
        {text}
      </Span>
    </Banner>
  )
}

HomePageBanner.propTypes = {
  mobile: bool.isRequired,
  desktop: bool.isRequired,
  text: string.isRequired,
  href: string,
  targetBlank: bool
}

export default HomePageBanner

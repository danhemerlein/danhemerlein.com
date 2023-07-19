import { string } from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { P } from 'styles/elements'
import theme from 'styles/theme'
import { above, anchorColor } from 'styles/utilities'
import { remHelper } from 'utils/remHelper'

const Details = styled.div`
  margin-top: ${remHelper[16]};

  ${above.desktop`
    display: none;
  `}

  p {
    line-height: 1.25;
  }

  p:last-of-type {
    font-style: italic;
    text-transform: lowercase;
  }
`

const StyledLink = styled(Link)`
  ${anchorColor({
    color: theme.light.foreground
  })};
`

const MobileDetails = ({ handle, title, artist, role }) => {
  return (
    <Details>
      <P>
        <StyledLink to={`/music/${handle}`}>
          {title} <br /> by {artist}
        </StyledLink>
      </P>
      <P>{role}</P>
    </Details>
  )
}

MobileDetails.propTypes = {
  handle: string.isRequired,
  title: string.isRequired,
  artist: string.isRequired,
  role: string.isRequired
}

export default MobileDetails

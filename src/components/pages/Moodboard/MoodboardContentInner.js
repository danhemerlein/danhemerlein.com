import styled from 'styled-components'
import { usePalette } from 'react-palette'
import ReactContentfulImage from 'react-contentful-image'
import { above } from 'styles/utilities/breakpoints'

const Content = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  scroll-snap-align: start;

  picture {
    width: 100%;
  }

  img {
    width: 100%;
    display: block;
  }

  ${({ lightMuted, muted }) => {
    return (
      lightMuted &&
      muted &&
      `background-image: linear-gradient(45deg, ${lightMuted}, ${muted})`
    )
  }};

  ${above.tablet`
    scroll-snap-align: unset;
  `}
`

const MoodboardContentInner = ({ src, alt, loading }) => {
  const pallete = usePalette(`https:${src}`)

  const { data } = pallete

  const imageSizes = [
    {
      mediaQuery: 'xs',
      params: { w: 687 }
    },
    {
      mediaQuery: 'sm',
      params: { w: 488 }
    },
    {
      mediaQuery: 'md',
      params: { w: 696 }
    },
    {
      mediaQuery: 'lg',
      params: { w: 1196 }
    }
  ]

  return (
    <Content lightMuted={data.lightMuted} muted={data.muted}>
      <ReactContentfulImage
        src={src}
        alt={alt}
        height=""
        width=""
        sizes={imageSizes}
        loading={loading}
      />
    </Content>
  )
}

export default MoodboardContentInner

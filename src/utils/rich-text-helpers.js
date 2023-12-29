/* eslint-disable react/destructuring-assignment */
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import ReactContentfulImage from 'react-contentful-image'
import { A } from 'styles/elements'
import * as styles from 'styles/elements/richTextStyles.js'
import { altTextHelper, reactContentfulImageURLHelper } from 'utils/lib'

const imageSizes = [
  {
    mediaQuery: 'xs',
    params: { w: 288 }
  },
  {
    mediaQuery: 'sm',
    params: { w: 640 }
  },
  {
    mediaQuery: 'md',
    params: { w: 640 }
  },
  {
    mediaQuery: 'lg',
    params: { w: 640 }
  }
]

export const embededAsset = (node, chilren, content) => {
  const img = content.content.links.assets.block.find((i) => {
    return i.sys.id === node.data.target.sys.id
  })

  const url = reactContentfulImageURLHelper(img.url)

  return (
    <styles.ImageContainer>
      <ReactContentfulImage
        src={url.replace(window.location.origin, '')}
        alt={altTextHelper(img?.title)}
        sizes={imageSizes}
        loading="lazy"
      />
    </styles.ImageContainer>
  )
}

export const generateRichTextParserOptions = (content, isBlog) => {
  return {
    renderMark: {
      [MARKS.BOLD]: (text) => {
        return <styles.B>{text}</styles.B>
      },
      [MARKS.ITALIC]: (text) => {
        return <styles.EM>{text}</styles.EM>
      }
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        const isFigCaption =
          (typeof children[0] === 'string' && children[0]?.includes('<<<')) ||
          (children[children.length - 1] === 'string' &&
            children[children.length - 1]?.includes('>>>'))

        if (isFigCaption) {
          children[0] = children[0].replaceAll('<<<', '').replaceAll('>>>', '')
          children[children.length - 1] = children[children.length - 1]
            .replaceAll('<<<', '')
            .replaceAll('>>>', '')
        }

        return (
          <styles.Paragraph isFigCaption={isFigCaption}>
            {children}
          </styles.Paragraph>
        )
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return isBlog ? (
          <styles.BlogHeadlineThree>{children}</styles.BlogHeadlineThree>
        ) : (
          <styles.HeadlineThree>{children}</styles.HeadlineThree>
        )
      },
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        return embededAsset(node, children, content)
      },
      [INLINES.HYPERLINK]: ({ data }, children) => {
        return (
          <A href={data.uri} target="_blank" rel="noopener noreferrer">
            {children}
          </A>
        )
      }
    }
  }
}

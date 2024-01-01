import Loading from 'components/other/Loading'
import { contentfulRequest } from 'contentfulClient'
import { useCallback, useEffect, useState, useRef } from 'react'
import { basePageTitle } from 'utils/constants/lib'
import { altTextHelper, reactContentfulImageURLHelper } from 'utils/lib'
import useScreenWidth from 'hooks/useScreenWidth'
import MoodboardContentInner from './MoodboardContentInner'
import * as styles from './Moodboard.styles'
import { getMoodboardContent, getMoodboardContentPage } from './queries'

const Moodboard = () => {
  const [content, setContent] = useState([])
  const [skip, setSkip] = useState(10)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    document.title = `${basePageTitle} - moodboard`

    const fetchData = async () => {
      const content = await contentfulRequest(getMoodboardContent)

      setTotal(content.moodboard.imagesCollection.total)
      setContent(content.moodboard.imagesCollection.items)
    }

    fetchData()
  }, [])

  const observerTarget = useRef(null)

  const fetchMoreData = useCallback(async () => {
    const data = await contentfulRequest(getMoodboardContentPage(skip))
    setSkip(skip + 10)

    setContent([...content, ...data.moodboard.imagesCollection.items])
  }, [content, setContent, skip])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (skip < total) {
            fetchMoreData()
          }
        }
      },
      { threshold: 1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    const target = observerTarget.current

    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [observerTarget, fetchMoreData, skip, total])

  const renderGalleryRow = (imageGroup, index) => {
    const imageOneURL = imageGroup[0].url
    const imageOneTitle = imageGroup[0].title
    let imageTwoURL
    let imageTwoTitle

    const twoImages = imageGroup.length === 2

    if (twoImages) {
      imageTwoURL = imageGroup[1].url
      imageTwoTitle = imageGroup[1].title
    }

    const urlOneWash = reactContentfulImageURLHelper(imageOneURL)
    const urlTwoWash = reactContentfulImageURLHelper(imageTwoURL)

    return (
      <styles.MoodboardContent key={index}>
        <MoodboardContentInner
          src={urlOneWash.replace(window.location.origin, '')}
          alt={altTextHelper(imageOneTitle)}
          loading={index > 7 ? 'lazy' : ''}
        />

        {twoImages ? (
          <MoodboardContentInner
            src={urlTwoWash.replace(window.location.origin, '')}
            alt={altTextHelper(imageTwoTitle)}
            loading={index > 7 ? 'lazy' : ''}
          />
        ) : null}
      </styles.MoodboardContent>
    )
  }

  const imageMatrix = content.reduce((rows, image, index) => {
    return (
      (index % 2 === 0
        ? rows.push([image])
        : rows[rows.length - 1].push(image)) && rows
    )
  }, [])

  const isSmallScreen = useScreenWidth(720)

  if (!content.length) {
    return <Loading />
  }

  return (
    <styles.PageContainer wrap="wrap">
      {isSmallScreen
        ? content.map((image, index) => {
            const { url, title } = image
            return (
              <>
                {index === content.length - 2 && <div ref={observerTarget} />}

                <MoodboardContentInner
                  key={url}
                  src={reactContentfulImageURLHelper(url).replace(
                    window.location.origin,
                    ''
                  )}
                  alt={altTextHelper(title)}
                  loading="eager"
                />
              </>
            )
          })
        : imageMatrix.map((imageGroup, index) => {
            return renderGalleryRow(imageGroup, index, imageMatrix)
          })}

      {!isSmallScreen && <div ref={observerTarget} />}
    </styles.PageContainer>
  )
}

export default Moodboard

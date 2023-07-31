import FullScreenHeight from 'components/other/FullScreenHeight'
import Loading from 'components/other/Loading'
import { above } from 'styles/utilities/breakpoints'
import { contentfulRequest } from 'contentfulClient'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { Grid, H1 } from 'styles/elements'
import { FlexContainer, PageHero } from 'styles/elements/containers'
import { basePageTitle } from 'utils/constants/lib'
import BlogIndexBlock from './BlogIndexBlock'
import BlogSort from './BlogSort'
import BlogFilter from './BlogFilter'
import { getAllBlogPosts, sortPosts, filterPosts } from './queries'

const Hero = styled(PageHero)`
  background: linear-gradient(to left, #c23b22 0%, #b848a5 100%);

  h1 {
    color: ${({ theme }) => {
      return theme.general.white
    }};
  }
`

const BlogIndex = () => {
  const [posts, setPosts] = useState([])

  const fetchAllProjects = async () => {
    const allPosts = await contentfulRequest(getAllBlogPosts)

    setPosts(allPosts.blogPostCollection.items)
  }

  const handleSort = async (val) => {
    const posts = await contentfulRequest(sortPosts(val))
    setPosts(posts.blogPostCollection.items)
  }

  const handleFilter = async (val) => {
    const posts = await contentfulRequest(filterPosts(val))
    setPosts(posts.blogPostCollection.items)
  }

  useEffect(() => {
    const fetchData = () => {
      fetchAllProjects()
    }

    fetchData()
  }, [])

  const FilterSortContainer = styled(FlexContainer)`
    flex-direction: column;

    ${above.tablet`
      flex-direction: row;
    `}
  `

  return (
    <div>
      <Helmet>
        <title>{basePageTitle} - blog</title>

        <meta name="title" content="danhemerlein.com - blog" />
        <meta name="description" content="dan hemerlein's lil blog" />

        <meta property="og:title" content="dan hemerlein - blog" />
        <meta name="og:description" content="dan hemerlein's lil blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.danhemerlein.com/blog" />
        <meta
          property="og:image"
          content="https://danhemerlein.com/share-3.jpg"
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@danhemerlein" />
        <meta name="twitter:title" content="dan hemerlein" />
        <meta name="twitter:description" content="dan hemerlein's lil blog" />

        <meta
          name="twitter:image"
          content="https://danhemerlein.com/share-3.jpg"
        />
        <meta
          name="twitter:image:alt"
          content="dan hemerlein seated in a backyard in Brooklyn"
        />
      </Helmet>

      {posts.length ? (
        <div>
          <Hero items="center" justify="center">
            <H1>notes</H1>
          </Hero>

          <FilterSortContainer direction="row" justify="flex-start">
            <BlogSort handleChange={handleSort} />
            <BlogFilter handleChange={handleFilter} />
          </FilterSortContainer>

          <Grid mobileColumns={1}>
            {posts.map((post) => {
              return <BlogIndexBlock post={post} key={post.handle} />
            })}
          </Grid>
        </div>
      ) : (
        <FullScreenHeight unsetBreakpoint="none">
          <Loading />
        </FullScreenHeight>
      )}
    </div>
  )
}

export default BlogIndex

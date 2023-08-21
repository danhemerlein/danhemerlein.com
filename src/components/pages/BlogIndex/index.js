import Loading from 'components/other/Loading'
import { contentfulRequest } from 'contentfulClient'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Grid, H1 } from 'styles/elements'
import { basePageTitle } from 'utils/constants/lib'
import { FilterSortContainer, Hero } from './BlogIndex.styles'
import BlogIndexBlock from './BlogIndexBlock'
import BlogSort from './BlogSort'
import BlogFilter from './BlogFilter'
import { getAllBlogPosts, sortPosts, filterPosts } from './queries'

const BlogIndex = () => {
  const [posts, setPosts] = useState([])
  const [blogSortVal, setBlogSortVal] = useState('')
  const [blogFilterVal, setBlogFilterVal] = useState('')

  const fetchAllPosts = async () => {
    const posts = await contentfulRequest(getAllBlogPosts)
    setPosts(posts.blogPostCollection.items)
  }

  const handleSort = async (val) => {
    setBlogFilterVal('')
    const posts = await contentfulRequest(sortPosts(val))
    setPosts(posts.blogPostCollection.items)
  }

  const handleFilter = async (val) => {
    setBlogSortVal('')
    if (val === 'all') {
      fetchAllPosts()
      return
    }
    const posts = await contentfulRequest(filterPosts(val))
    setPosts(posts.blogPostCollection.items)
  }

  useEffect(() => {
    const fetchData = () => {
      fetchAllPosts()
    }

    fetchData()
  }, [])

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
      <Hero items="center" justify="center">
        <H1>notes</H1>
      </Hero>

      <FilterSortContainer direction="row" justify="flex-start">
        <BlogSort
          handleChange={handleSort}
          setVal={setBlogSortVal}
          val={blogSortVal}
        />
        <BlogFilter
          handleChange={handleFilter}
          setVal={setBlogFilterVal}
          val={blogFilterVal}
        />
      </FilterSortContainer>

      {posts.length ? (
        <Grid mobileColumns={1}>
          {posts.map((post) => {
            return <BlogIndexBlock post={post} key={post.handle} />
          })}
        </Grid>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default BlogIndex

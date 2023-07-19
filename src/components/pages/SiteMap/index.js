import { contentfulRequest } from 'contentfulClient'

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FlexContainer, H1, P, StyledLink } from 'styles/elements'
import { basePageTitle } from 'utils/constants/lib'
import data from 'utils/navigation/data'
import { remHelper } from 'utils/remHelper'
import { getAllProjects } from '../Music/queries'

const StyledHeadline = styled(H1)`
  margin-bottom: ${remHelper[8]};
`

const ListItem = styled(P)`
  margin-bottom: ${remHelper[8]};
  padding: ${remHelper[4]} 0;
  width: 100%;
  color: ${({ theme }) => {
    return theme.foreground
  }};
`

const SiteMap = () => {
  const [projects, setProjects] = useState([])

  const fetchAllProjects = async () => {
    const allProjects = await contentfulRequest(getAllProjects)
    const p = allProjects.musicProjectCollection.items

    setProjects(p)
  }

  useEffect(() => {
    const fetchData = () => {
      fetchAllProjects()
    }

    fetchData()

    document.title = `${basePageTitle} - site map`
  }, [])

  return (
    <FlexContainer direction="column" justify="flex" items="flex-start">
      <StyledHeadline>site map:</StyledHeadline>

      <nav role="navigation">
        <FlexContainer
          as="ul"
          items="center"
          justify="center"
          direction="column"
        >
          {data.topNavLinks.map((link) => {
            return (
              <ListItem as="li" key={link.title}>
                <StyledLink to={link.to}>{link.title}</StyledLink>
              </ListItem>
            )
          })}

          <ListItem as="li">
            <P underline>music releases:</P>
          </ListItem>

          {projects.length
            ? projects.map((project) => {
                const { title, handle, artist } = project

                return (
                  <ListItem as="li" key={title}>
                    <StyledLink to={`/music/${handle}/`}>
                      {title} by {artist}
                    </StyledLink>
                  </ListItem>
                )
              })
            : null}
        </FlexContainer>
      </nav>
    </FlexContainer>
  )
}

export default SiteMap

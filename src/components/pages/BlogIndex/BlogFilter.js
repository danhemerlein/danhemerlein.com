import React from 'react'
import { FlexContainer, P } from 'styles/elements'
import styled from 'styled-components'
import { remHelper } from 'utils/remHelper'
import { above } from 'styles/utilities/breakpoints'
import { LabelText } from './BlogIndexBlock.styles'

const Container = styled(FlexContainer)`
  margin-bottom: ${remHelper[16]};
  column-gap: ${remHelper[16]};

  ${above.tablet`
    margin-top: ${remHelper[16]};
  `}
`

const InnerContainer = styled(FlexContainer)`
  column-gap: ${remHelper[8]};
`

const BlogFilter = ({ handleChange }) => {
  const handleFilterChange = (event) => {
    handleChange(event.target.value)
  }
  return (
    <Container as="fieldset" direction="column">
      <LabelText as="span" htmlFor="blogPostFilter">
        year published
      </LabelText>

      <InnerContainer>
        <P as="label" htmlFor="2019">
          2019
          <input
            type="radio"
            onChange={(event) => {
              return handleFilterChange(event)
            }}
            name="year"
            value="2019"
            id="2019"
          />
        </P>

        <P as="label" htmlFor="2020">
          2020
          <input
            type="radio"
            onChange={(event) => {
              return handleFilterChange(event)
            }}
            name="year"
            value="2020"
            id="2020"
          />
        </P>
        <P as="label" htmlFor="2021">
          2021
          <input
            type="radio"
            onChange={(event) => {
              return handleFilterChange(event)
            }}
            name="year"
            value="2021"
            id="2021"
          />
        </P>
        <P as="label" htmlFor="2022">
          2022
          <input
            type="radio"
            onChange={(event) => {
              return handleFilterChange(event)
            }}
            name="year"
            value="2022"
            id="2022"
          />
        </P>
        <P as="label" htmlFor="2023">
          2023
          <input
            type="radio"
            onChange={(event) => {
              return handleFilterChange(event)
            }}
            name="year"
            value="2023"
            id="2023"
          />
        </P>
      </InnerContainer>
    </Container>
  )
}

BlogFilter.propTypes = {}
export default BlogFilter

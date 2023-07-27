import React from 'react'
import { P } from 'styles/elements'
import { LabelText } from './BlogIndexBlock.styles'

const BlogFilter = ({ handleChange }) => {
  const handleFilterChange = (event) => {
    handleChange(event.target.value)
  }
  return (
    <fieldset>
      <LabelText as="span" htmlFor="blogPostFilter">
        filter
      </LabelText>

      <P as="label" htmlFor="2019">
        2019
        <input
          type="radio"
          onChange={(event) => {
            return handleFilterChange(event)
          }}
          name="year"
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
          id="2023"
        />
      </P>
    </fieldset>
  )
}

BlogFilter.propTypes = {}
export default BlogFilter

import { useState } from 'react'
import { LabelText } from './BlogIndexBlock.styles'
import { Container, SelectContainer } from './FilterSortStyles'

const BlogSort = ({ handleChange }) => {
  const [val, setVal] = useState('')

  const handleSortChange = (event) => {
    handleChange(event.target.value)
    setVal(event.target.value)
  }

  return (
    <Container>
      <SelectContainer>
        <fieldset>
          <label>
            <LabelText as="span">sort</LabelText>

            <select
              onChange={(event) => {
                return handleSortChange(event)
              }}
              value={val}
              name="blogPostSort"
              id="blogPostSort"
            >
              <option value="published_DESC">default</option>
              <option value="published_DESC">most recently published</option>
              <option value="published_ASC">least recently published</option>
              <option value="sys_publishedAt_DESC">
                most recently updated
              </option>
              <option value="sys_publishedAt_ASC">
                least recently updated
              </option>
            </select>
          </label>
        </fieldset>
      </SelectContainer>
    </Container>
  )
}

export default BlogSort

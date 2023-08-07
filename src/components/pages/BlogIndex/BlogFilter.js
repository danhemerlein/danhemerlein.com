import { useState } from 'react'
import { LabelText } from './BlogIndexBlock.styles'
import { Container, SelectContainer } from './FilterSortStyles'

const BlogFilter = ({ handleChange }) => {
  const [val, setVal] = useState('')

  const handleFilterChange = (event) => {
    handleChange(event.target.value)
    setVal(event.target.value)
  }

  return (
    <Container>
      <SelectContainer>
        <fieldset>
          <label>
            <LabelText as="span">filter</LabelText>

            <select
              onChange={(event) => {
                return handleFilterChange(event)
              }}
              value={val}
              name="blogPostFilter"
              id="blogPostFilter"
            >
              <option value="all">all</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </label>
        </fieldset>
      </SelectContainer>
    </Container>
  )
}

export default BlogFilter

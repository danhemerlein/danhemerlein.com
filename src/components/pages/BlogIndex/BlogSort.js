import { useState } from 'react';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { above } from 'styles/utilities/breakpoints';
import { remHelper } from 'utils/remHelper';

const Container = styled(FlexContainer)`
  width: 100%;
  margin-top: ${remHelper[16]};
  margin-bottom: ${remHelper[16]};
  flex-direction: column;

  ${above.tablet`
    flex-direction: row;
  `}
`;

const LabelText = styled(P)`
  display: block;
  margin-bottom: ${remHelper[8]};
`;

const SelectContainer = styled(FlexContainer)`
  margin-top: ${remHelper[8]};
  width: 100%;

  ${above.tablet`
    margin-top: 0;
    width: auto;
  `}

  column-gap: ${remHelper[16]};
`;

function BlogSort({ handleChange }) {
  const [val, setVal] = useState('');

  const handleSortChange = (event) => {
    handleChange(event.target.value);
    setVal(event.target.value);
  };

  return (
    <Container>
      <SelectContainer>
        <fieldset>
          <label>
            <LabelText as="span">sort by date published</LabelText>

            <select
              onChange={(event) => {
                return handleSortChange(event);
              }}
              value={val}
              name="blogPostSort"
              id="blogPostSort"
            >
              <option value="published_DESC">default</option>
              <option value="published_DESC">most recent published</option>
              <option value="published_ASC">oldest</option>
            </select>
          </label>
        </fieldset>

        <fieldset>
          <label>
            <LabelText as="span">sort by date updated</LabelText>

            <select
              onChange={(event) => {
                return handleSortChange(event);
              }}
              value={val}
              name="blogPostSortUpdate"
              id="blogPostSortUpdated"
            >
              <option value="sys_publishedAt_DESC">default</option>
              <option value="sys_publishedAt_DESC">
                most recently updated
              </option>
              <option value="sys_publishedAt_ASC">oldest</option>
            </select>
          </label>
        </fieldset>
      </SelectContainer>
    </Container>
  );
}

export default BlogSort;

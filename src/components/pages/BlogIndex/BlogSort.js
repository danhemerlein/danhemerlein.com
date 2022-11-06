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
            <LabelText as="span">sort</LabelText>

            <select
              onChange={(event) => {
                return handleSortChange(event);
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
  );
}

export default BlogSort;

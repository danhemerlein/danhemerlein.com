import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import { remHelper } from 'utils/remHelper';

export const RadioContainer = styled(FlexContainer)`
  margin-top: ${remHelper[8]};
  * {
    font-family: 'arial';
  }
`;

export const InputContainer = styled.div`
  margin-top: ${remHelper[16]};
  height: 100%;
  display: inline-flex;
`;

const FilterSortSettings = ({ setFunMode, funMode }) => {
  return (
    <div>
      <RadioContainer wrap="wrap" justify="space-between">
        <InputContainer>
          <P as="label" htmlFor="funMode">
            toggle fun mode
          </P>
          <input
            onChange={() => {
              return setFunMode(!funMode);
            }}
            type="checkbox"
            name="funMode"
            id="funMode"
            checked={funMode}
          />
        </InputContainer>
      </RadioContainer>
    </div>
  );
};

FilterSortSettings.propTypes = {};

export default FilterSortSettings;

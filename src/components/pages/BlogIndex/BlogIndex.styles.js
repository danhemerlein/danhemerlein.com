import { above } from 'styles/utilities/breakpoints'
import styled from 'styled-components'
import { FlexContainer, PageHero } from 'styles/elements/containers'

export const Hero = styled(PageHero)`
  background: linear-gradient(to left, #c23b22 0%, #b848a5 100%);

  h1 {
    color: ${({ theme }) => {
      return theme.general.white
    }};
  }
`

export const FilterSortContainer = styled(FlexContainer)`
  flex-direction: column;

  ${above.tablet`
    flex-direction: row;
  `}
`

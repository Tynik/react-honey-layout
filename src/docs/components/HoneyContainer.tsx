import styled, { css } from 'styled-components';
import { HoneyBox } from '../../components';

export const HoneyContainer = styled(HoneyBox)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    height: min-content;
    margin: 0 auto;
    max-width: ${theme.container?.maxWidth};

    padding: 16px;
  `}
`;

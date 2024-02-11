import React from 'react';
import styled, { css, useTheme } from 'styled-components';

import { HoneyBox } from '../components';
import { HoneyContainer, Text, Description, DemoContainer } from './components';

const SquareHoneyBox = styled(HoneyBox)``;

SquareHoneyBox.defaultProps = {
  $width: '100px',
  $height: '100px',
};

const List = styled.ul`
  margin: 0;
  padding: 0;

  list-style-type: none;
`;

const ListItem = styled(Text).attrs({
  as: 'li',
})`
  ${({ theme }) => css`
    font-size: 18px;

    padding: 8px 16px;

    color: ${theme.colors?.neutral.lightBlue};
  `}
`;

export const App = () => {
  const theme = useTheme();

  return (
    <HoneyBox $display="flex" $height="100%" $alignItems="flex-start" $overflow="hidden">
      <HoneyBox
        $display={{ xs: 'none', md: 'flex' }}
        $width="300px"
        $height="calc(100% - 16px * 2)"
        $padding="16px"
        $flexShrink={0}
        $overflow="auto"
      >
        <List>
          <ListItem>test 1</ListItem>
          <ListItem>test 2</ListItem>
        </List>
      </HoneyBox>

      <HoneyBox $display="flex" $height="100%" $flexGrow={1} $overflow="auto">
        <HoneyContainer>
          <Description>
            <p>
              <strong>HoneyBox: </strong>A Versatile Styled Component
            </p>
            <p>
              <strong>Usage:</strong>
            </p>
            <p>
              The HoneyBox component is a versatile styled component that provides flexible styling
              options for creating various UI elements. It offers a wide range of props to customize
              its appearance, making it suitable for building different types of components such as
              containers, boxes, or cards.
            </p>
            <p>
              <strong>Benefits:</strong>
            </p>
            <ul>
              <li>
                <strong>Flexibility: </strong>With the HoneyBox component, you have complete control
                over the styling of your UI elements. It supports a variety of props that allow you
                to adjust properties like width, height, padding, margin, background color, and
                more. system.
              </li>
              <li>
                <strong>Responsive Design: </strong>The HoneyBox component supports responsive
                design out of the box. You can easily specify different styles for various screen
                sizes using the $display, $width, $height, and other props with responsive values,
                ensuring your components look great across different devices and viewport sizes.
                system.
              </li>
              <li>
                <strong>Styled Components Integration: </strong>Being built with styled-components,
                the HoneyBox component seamlessly integrates with your styled-components-based
                project. You can leverage the power of styled-components to define complex styling
                logic while maintaining a clean and readable codebase.
              </li>
              <li>
                <strong>Customization: </strong>You can extend the HoneyBox component to create
                custom styled components tailored to your specific design requirements. By extending
                the HoneyBox component and adding custom styling or additional props, you can
                quickly create reusable UI components that fit your project's design system.
              </li>
            </ul>
          </Description>

          <DemoContainer>
            {Array.from(new Array(50)).map((_, index) => (
              <SquareHoneyBox
                key={index}
                $backgroundColor={{
                  xs: 'white',
                  sm: theme.colors?.neutral.forestGreen,
                  md: theme.colors?.neutral.crimsonRed,
                }}
              />
            ))}
          </DemoContainer>
        </HoneyContainer>
      </HoneyBox>
    </HoneyBox>
  );
};

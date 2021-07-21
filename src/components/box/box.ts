import styled from "styled-components";
import {
  SpaceProps,
  LayoutProps,
  ColorProps,
  FlexboxProps,
  BoxShadowProps,
  BorderProps,
  flexbox,
  space,
  boxShadow,
  color,
  layout,
  border,
} from "styled-system";

export type BoxProps = SpaceProps &
  LayoutProps &
  Omit<ColorProps, "color"> &
  FlexboxProps &
  BoxShadowProps &
  BorderProps;

const Box = styled.div<BoxProps>`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
  ${boxShadow}
  ${border}
`;

export { Box };

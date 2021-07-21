import styled from "styled-components";
import {
  typography,
  color,
  space,
  TypographyProps,
  ColorProps,
  SpaceProps,
} from "styled-system";
import { presets, TextPresets } from "./text.presets";

interface TextProps extends TypographyProps, ColorProps, SpaceProps {
  preset?: TextPresets;
}

const Text = styled.p<TextProps>`
  margin: 0;
  padding: 0;
  ${(props) => presets[props.preset || "default"]}
  ${typography}
  ${color}
  ${space}
`;

export { Text };

import React, { ButtonHTMLAttributes } from "react";
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
import { FeatherIconType } from "../../utils/icon-type";
import { ButtonPresets, buttonPresets } from "./button.presets";
import { Text } from "../text";

export interface ButtonProps
  extends SpaceProps,
    LayoutProps,
    Omit<ColorProps, "color">,
    FlexboxProps,
    BoxShadowProps,
    BorderProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  preset?: ButtonPresets;
  icon?: FeatherIconType;
  isLoading?: boolean;
  disabled?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  ${(props) => props.preset && buttonPresets[props.preset]};

  ${space};
  ${color};
  ${layout};
  ${flexbox};
  ${boxShadow};
  ${border};
`;

const Button: React.FC<ButtonProps> = ({
  children,
  preset = "primary",
  ...rest
}) => {
  return (
    <StyledButton preset={preset} {...rest}>
      <Text>{children}</Text>
    </StyledButton>
  );
};

export { Button };

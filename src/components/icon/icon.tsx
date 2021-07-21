import React from "react";
import styled from "styled-components";

import { icons, IconTypes } from "../../assets/icons";

import { LayoutProps, layout, space, SpaceProps } from "styled-system";

const StyledImg = styled.img<LayoutProps>`
  ${layout}
  ${space}
`;

interface IconProps extends LayoutProps, SpaceProps {
  name?: IconTypes;
  uri?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  uri,
  size = 16,
  ...style
}) => {
  return <StyledImg src={uri ?? icons[name || "coin"]} {...(style as any)} />;
};

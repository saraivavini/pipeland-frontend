import React, { useMemo } from "react";
import { Text } from "../text";

import styled from "styled-components";

import { User } from "react-feather";
import { Box } from "../box";

// export const Container = styled.View<PipelandSystemStyleProps>`
//   align-items: center;
//   justify-content: center;
//   background-color: ${(props) => props.theme.color.dim};
//   ${(props) => props.customStyle && pipelandSystemStyle(props.customStyle)}
// `;

export interface AvatarProps {
  name?: string | null | undefined;
  uri?: string | null | undefined;
  size?: number;
  backgroundColor?: string;
  color?: string;
}

export const DefaultAvatar = styled(User)`
  color: ${(props) => props.theme.colors.textSecondary};
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 200px;
`;

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  backgroundColor,
  color,
  size = 32,
}) => {
  const overrideStyle = {
    width: size,
    height: size,
    borderRadius: size,
  };

  const formatedName = useMemo(() => {
    if (!!name) {
      const nameArray = name.split(" ");

      return `${nameArray[0].charAt(0)}${
        nameArray.length > 1 ? nameArray[1].charAt(0) : ""
      }`;
    }

    return "";
  }, [name]);

  return (
    <Box
      alignItems="center"
      backgroundColor={backgroundColor || "lightGreen"}
      justifyContent="center"
      {...overrideStyle}
    >
      {!!uri ? (
        <AvatarImage src={uri} />
      ) : !!name ? (
        <Box>
          <Text
            textAlign="center"
            color={color || "darkGreen"}
            fontWeight="600"
            fontSize={size / 1.75}
          >
            {formatedName}
          </Text>
        </Box>
      ) : (
        <DefaultAvatar color={color || "textSecondary"} size={size - 12} />
        // <DefaultAvatar color={color || "textSecondary"} size={size - 12} />
      )}
    </Box>
  );
};

import React from "react";
import { Box } from "../box";
import { Text } from "../text";

// import { Container } from './styles';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Box
      width="100%"
      px="4"
      py="4"
      display="flex"
      flexDirection="row"
      boxShadow="0px 0px 7px 1px rgba(41,41,41,.25)"
      alignItems="center"
      borderBottomLeftRadius={"8px"}
      borderBottomRightRadius={"8px"}
    >
      <Box display="flex" flex={1} justifyContent="center">
        <Text preset="title">{title}</Text>
      </Box>
    </Box>
  );
};

export default Header;

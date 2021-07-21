import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";
import {
  typography,
  color,
  space,
  TypographyProps,
  ColorProps,
  SpaceProps,
  BorderProps,
  FlexProps,
  LayoutProps,
  border,
  layout,
  flexbox,
} from "styled-system";
import { Box, BoxProps } from "../box";
import { Text } from "../text";

type StyledInputProps = FlexProps &
  LayoutProps &
  TypographyProps &
  SpaceProps &
  ColorProps &
  BorderProps;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  // placeholder?: string;
  // onChange?: (text: string | number) => void;
  //  value?: string;
  // type?: string;

  boxStyle?: BoxProps;
  inputStyle?: StyledInputProps;
}

const StyledInput = styled("input")<StyledInputProps>`
  margin: 0;
  padding: 0;

  ::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
  }

  ${typography}
  ${color}
  ${layout}
  ${flexbox}
  ${space}
  ${border}
`;

const InputBase: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> =
  (
    {
      boxStyle,
      inputStyle,
      label,
      placeholder,
      onChange = () => {},
      value,
      type,
      errorMessage,
      ...rest
    },
    ref
  ) => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        flex={1}
        width="100%"
        {...boxStyle}
      >
        {!!label && (
          <Text preset="inputLabel" paddingBottom={2}>
            {label}
          </Text>
        )}
        <StyledInput
          ref={ref}
          padding={2}
          flex={1}
          borderRadius="4px"
          borderWidth="1px"
          placeholder={placeholder}
          color="text"
          {...(inputStyle as any)}
          onChange={onChange}
          value={value}
          type={type}
          {...rest}
        />
        {!!errorMessage && <Text preset="errorMessage">{errorMessage}</Text>}
      </Box>
    );
  };

const Input = React.forwardRef(InputBase);

export { Input };

import { css } from "styled-components";

const BASE_BUTTON = css`
  /* padding-horizontal: ${(props) => props.theme.space[2]}px; */
  /* padding-vertical: ${(props) => props.theme.space[3]}px; */

  padding: ${(props) => props.theme.space[2]}px
    ${(props) => props.theme.space[3]}px;

  flex: 1;
  width: 100%;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const BASE_TEXT = css`
  font-size: 16px;
`;

export const buttonPresets = {
  primary: css`
    ${BASE_BUTTON}
    background-color: ${(props) => props.theme.colors.primary};

    p {
      ${BASE_TEXT}
      color: ${(props) => props.theme.colors.background};
      font-weight: bold;
    }
  `,

  secondary: css`
    ${BASE_BUTTON}

    p {
      ${BASE_TEXT}
    }
  `,

  link: css`
    ${BASE_BUTTON}
    align-items: center;
    justify-content: flex-start;
    padding: ${(props) => props.theme.space[0]}px
      ${(props) => props.theme.space[4]}px;
    p {
      ${BASE_TEXT}
      margin-horizontal: ${(props) => props.theme.space[4]}px;
      color: ${(props) => props.theme.colors.text};
    }
  `,
};

export type ButtonPresets = keyof typeof buttonPresets;

import { css } from "styled-components";

const BASE = () => css`
  color: ${(props) => props.theme.colors.text};
  font-size: 14px;
`;

export const presets = {
  default: css`
    ${BASE}
  `,

  bold: css`
    ${BASE};
    font-weight: bold;
  `,

  header: css`
    ${BASE};

    font-size: 18px;
    font-weight: bold;
  `,

  title: css`
    ${BASE}

    font-size: 16px;
    font-weight: bold;
  `,

  subtitle: css`
    ${BASE}

    color: ${(props) => props.theme.colors.textSecondary};
  `,

  secondary: css`
    ${BASE}

    font-size: 12px;
    color: ${(props) => props.theme.colors.textSecondary};
  `,

  inputLabel: css`
    ${BASE}

    color: ${(props) => props.theme.colors.textSecondary};
  `,

  errorMessage: css`
    color: ${(props) => props.theme.colors.error};
  `,
};

export type TextPresets = keyof typeof presets;

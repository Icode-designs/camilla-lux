import styled, { css } from 'styled-components';
import { theme } from '../styles/theme';
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  $fullwidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  border-radius: 0;
  transition: all ${({ theme }) => theme.transitions.base};
  cursor: pointer;
  border: 2px solid transparent;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 1px;

  /* Size variants */
  ${({ size = 'medium', theme }) => {
    switch (size) {
      case 'small':
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.lg};
          font-size: ${theme.typography.sizes.sm};
        `;
      case 'large':
        return css`
          padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
          font-size: ${theme.typography.sizes.lg};
        `;
      default:
        return css`
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: ${theme.typography.sizes.base};
        `;
    }
  }}

  /* Style variants */
  ${({ variant = 'primary', theme }) => {
    switch (variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.gold};
          color: ${theme.colors.black};
          border-color: ${theme.colors.gold};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.goldDark};
            border-color: ${theme.colors.goldDark};
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.gold};
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: ${theme.colors.black};
          border-color: ${theme.colors.black};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.black};
            color: ${theme.colors.white};
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.md};
          }
        `;
      default:
        return css`
          background-color: ${theme.colors.black};
          color: ${theme.colors.gold};
          border-color: ${theme.colors.black};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.gray[900]};
            border-color: ${theme.colors.gray[900]};
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.lg};
          }
        `;
    }
  }}

  ${({ $fullwidth }) =>
    $fullwidth &&
    css`
      width: 100%;
    `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

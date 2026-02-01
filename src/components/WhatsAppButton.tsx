'use client';

import styled, { keyframes } from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';
import { openWhatsApp, WhatsAppMessages } from '@/utils/whatsapp';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.xl};
  right: ${({ theme }) => theme.spacing.xl};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #25D366;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: ${({ theme }) => theme.zIndex.fixed};
  transition: all ${({ theme }) => theme.transitions.fast};
  animation: ${pulse} 2s infinite;

  &:hover {
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }

  svg {
    width: 32px;
    height: 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 56px;
    height: 56px;
    bottom: ${({ theme }) => theme.spacing.lg};
    right: ${({ theme }) => theme.spacing.lg};

    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

const Tooltip = styled.span`
  position: absolute;
  right: 70px;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  opacity: 0;
  visibility: hidden;
  transition: all ${({ theme }) => theme.transitions.fast};

  ${FloatingButton}:hover & {
    opacity: 1;
    visibility: visible;
  }

  &::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid ${({ theme }) => theme.colors.black};
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export default function WhatsAppButton() {
  const handleClick = () => {
    openWhatsApp(WhatsAppMessages.generalInquiry);
  };

  return (
    <FloatingButton onClick={handleClick} aria-label="Chat on WhatsApp">
      <Tooltip>Chat with us on WhatsApp</Tooltip>
      <FaWhatsapp />
    </FloatingButton>
  );
}

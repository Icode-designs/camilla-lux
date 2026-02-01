'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { FiInstagram } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';
import { openWhatsApp, WhatsAppMessages } from '@/utils/whatsapp';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
`;

const FooterContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FooterTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  transition: color ${({ theme }) => theme.transitions.fast};
  display: block;
  width: fit-content;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
 }
`;

const FooterButton = styled.button`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  text-align: left;
  background: none;
  border: none;
  padding: 0;
  transition: color ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  display: block;
  width: fit-content;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.gold};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.gold};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.black};
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.gold};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const FooterBottom = styled.div`
  max-width: 1440px;
  margin: ${({ theme }) => theme.spacing.xl} auto 0;
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[800]};
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export default function Footer() {
  const handleContactClick = () => {
    openWhatsApp(WhatsAppMessages.generalInquiry);
  };

  const handleNewsletterClick = () => {
    openWhatsApp("Hi! I'd like to subscribe to your newsletter for exclusive offers and updates.");
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>About Us</FooterTitle>
          <FooterText>
            Camilla Luxe Essence brings you affordable luxury fashion for the modern individual. Premium style, accessible prices.
          </FooterText>
          <SocialLinks>
            <SocialLink href="https://instagram.com/camillaessence" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FiInstagram />
            </SocialLink>
            <SocialLink href="https://tiktok.com/@camillaessence" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <SiTiktok />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Categories</FooterTitle>
          <FooterButton onClick={() => openWhatsApp(WhatsAppMessages.categoryInquiry('Handbags'))}>
            Handbags
          </FooterButton>
          <FooterButton onClick={() => openWhatsApp(WhatsAppMessages.categoryInquiry('Footwear'))}>
            Footwear
          </FooterButton>
          <FooterButton onClick={() => openWhatsApp(WhatsAppMessages.categoryInquiry('Sneakers'))}>
            Sneakers
          </FooterButton>
          <FooterButton onClick={() => openWhatsApp(WhatsAppMessages.categoryInquiry('Perfumes'))}>
            Perfumes
          </FooterButton>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/collection">Collection</FooterLink>
          <FooterLink href="/about">About</FooterLink>
          <FooterButton onClick={handleContactClick}>Contact Us</FooterButton>
          <FooterLink href="/admin/dashboard" style={{ marginTop: '0.5rem', opacity: 0.6 }}>Admin Portal</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Get Updates</FooterTitle>
          <FooterText>
            Chat with us on WhatsApp to get exclusive offers and updates.
          </FooterText>
          <FooterButton onClick={handleNewsletterClick} style={{ color: '#D4AF37', fontWeight: 600 }}>
            Subscribe via WhatsApp →
          </FooterButton>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>&copy; {new Date().getFullYear()} Camilla Luxe Essence. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
}

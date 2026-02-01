'use client';

import styled from 'styled-components';
import { Button } from '@/components/Button';
import { FiMessageCircle, FiStar, FiHeart, FiShield, FiTrendingUp } from 'react-icons/fi';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { openWhatsApp, WhatsAppMessages, WHATSAPP_NUMBER } from '@/utils/whatsapp';

const PageContainer = styled.div`
  max-width: 100%;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.black} 0%, ${({ theme }) => theme.colors.gray[900]} 100%);
  padding: ${({ theme }) => theme.spacing['5xl']} ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.md};
  }
`;

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-size: ${({ theme }) => theme.typography.sizes['6xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  span {
    color: ${({ theme }) => theme.colors.gold};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  color: ${({ theme }) => theme.colors.gray[300]};
  max-width: 700px;
  margin: 0 auto ${({ theme }) => theme.spacing['2xl']};
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
  }
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['5xl']} ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.md};
  }
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -${({ theme }) => theme.spacing.md};
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.gold};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  }
`;

const StoryText = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-top: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['2xl']};
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border: 2px solid transparent;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const ValueIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.gold};
  border-radius: 50%;

  svg {
    width: 28px;
    height: 28px;
  }
`;

const ValueTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.black};
`;

const ValueText = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`;

const ContactSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.gray[100]};
  max-width: 100%;
  text-align: center;
  padding-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

const ContactContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const InfoLabel = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
`;

const InfoValue = styled.a`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  color: ${({ theme }) => theme.colors.gold};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border: 2px solid ${({ theme }) => theme.colors.gold};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.gold};
  transition: all ${({ theme }) => theme.transitions.fast};
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.black};
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.gold};
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const WhatsAppButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  svg {
    width: 20px;
    height: 20px;
  }
`;

export default function AboutPage() {
  const values = [
    {
      icon: <FiStar />,
      title: 'Premium Quality',
      description: 'Every piece in our collection is carefully selected for exceptional craftsmanship and timeless design.',
    },
    {
      icon: <FiHeart />,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We provide personalized service through WhatsApp to ensure the perfect match.',
    },
    {
      icon: <FiShield />,
      title: 'Trust & Authenticity',
      description: 'All our products are 100% authentic luxury items, backed by our guarantee and easy return policy.',
    },
    {
      icon: <FiTrendingUp />,
      title: 'Curated Elegance',
      description: 'We believe premium fashion should be a personalized journey. Discover curated pieces selected for the modern, style-conscious individual.',
    },
  ];

  return (
    <PageContainer>
      {/* Hero */}
      <HeroSection>
        <HeroTitle>
          About <span>Camilla Luxe Essence</span>
        </HeroTitle>
        <HeroSubtitle>
          A curated selection of premium fashion and lifestyle essentials, accessible through direct, personalized consultation.
        </HeroSubtitle>
      </HeroSection>

      {/* Brand Story */}
      <Section>
        <SectionTitle>Our Story</SectionTitle>
        <StoryText>
          Camilla Luxe Essence was born from a simple belief: everyone deserves to experience the confidence and elegance that comes with premium fashion. We saw a gap in the market for truly luxurious pieces that don't require a luxury budget.
        </StoryText>
        <StoryText>
          Our curated collection spans handbags, footwear, sneakers, and perfumes—each piece selected for its exceptional quality, timeless design, and ability to elevate any wardrobe. We provide a tailored shopping experience, connecting you directly with our luxury catalog.
        </StoryText>
        <StoryText>
          What sets us apart is our commitment to personalized service. Through WhatsApp, we offer direct, instant communication to help you find exactly what you're looking for. No automated responses, no waiting—just real conversations with people who genuinely care about your style.
        </StoryText>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <SectionTitle>Why Choose Us</SectionTitle>
        <ValuesGrid>
          {values.map((value, index) => (
            <ValueCard key={index}>
              <ValueIcon>{value.icon}</ValueIcon>
              <ValueTitle>{value.title}</ValueTitle>
              <ValueText>{value.description}</ValueText>
            </ValueCard>
          ))}
        </ValuesGrid>
      </Section>

      {/* Contact */}
      <ContactSection>
        <ContactContent>
          <SectionTitle>Let's Connect</SectionTitle>
          <StoryText>
            Have questions? Want personalized recommendations? We're just a message away. Chat with us on WhatsApp or follow our journey on social media.
          </StoryText>
          
          <ContactInfo>
            <InfoItem>
              <InfoLabel>WhatsApp</InfoLabel>
              <InfoValue href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`}>
                {WHATSAPP_NUMBER}
              </InfoValue>
            </InfoItem>
          </ContactInfo>

          <WhatsAppButton
            variant="secondary"
            size="large"
            onClick={() => openWhatsApp(WhatsAppMessages.generalInquiry)}
          >
            <FiMessageCircle />
            Chat with Us on WhatsApp
          </WhatsAppButton>

          <SocialLinks>
            <SocialLink href="https://instagram.com/camillaessence" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </SocialLink>
            <SocialLink href="https://tiktok.com/@camillaessence" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <FaTiktok />
            </SocialLink>
          </SocialLinks>
        </ContactContent>
      </ContactSection>
    </PageContainer>
  );
}

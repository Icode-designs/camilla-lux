"use client";

import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import {
  Card,
  CardImage,
  CardContent,
  CardTitle,
  CardPrice,
  Badge,
  CategoryImage,
  CategoryOverlay,
  CategoryTitle,
  CategoryCard,
} from "@/components/Card";
import {
  FiStar,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiMessageCircle,
  FiBookOpen,
} from "react-icons/fi";
import { openWhatsApp, WhatsAppMessages } from "@/utils/whatsapp";

const HeroSection = styled.section`
  position: relative;
  height: calc(100vh - 80px);
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: calc(100vh - 80px);
    min-height: 450px;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("/images/WhatsApp Image 2026-01-30 at 18.22.561.jpeg");
  background-size: cover;
  background-position: center;
  opacity: 0.4;
  z-index: 0;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 900px;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.white};
`;

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-size: ${({ theme }) => theme.typography.sizes["7xl"]};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-transform: uppercase;
  letter-spacing: 3px;

  span {
    color: ${({ theme }) => theme.colors.gold};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes["4xl"]};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.sizes["3xl"]};
    letter-spacing: 1px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  color: ${({ theme }) => theme.colors.gray[300]};
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
  letter-spacing: 1px;
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    width: 100%;
    gap: ${({ theme }) => theme.spacing.md};

    button,
    a {
      width: 100%;
      max-width: 300px;
    }
  }
`;

const Section = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing["5xl"]}
    ${({ theme }) => theme.spacing.xl};
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing["2xl"]}
      ${({ theme }) => theme.spacing.md};
  }
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-size: ${({ theme }) => theme.typography.sizes["4xl"]};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -${({ theme }) => theme.spacing.lg};
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.gold};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes["3xl"]};
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing["2xl"]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const ProductCard = styled.div`
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    transform: translateY(-4px);
  }
`;

const WhatsAppButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};

  svg {
    width: 20px;
    height: 20px;
  }
`;

const TrustSection = styled.section`
  background-color: ${({ theme }) => theme.colors.gray[100]};
  padding: ${({ theme }) => theme.spacing["4xl"]}
    ${({ theme }) => theme.spacing.xl};
  width: 100%;
`;

const TrustContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing["2xl"]};
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const TrustItem = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const TrustIcon = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.gold};
  border-radius: 50%;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  svg {
    width: 28px;
    height: 28px;
  }
`;

const TrustTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
`;

const TrustDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

const ContactSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContactForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.gold};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-family: inherit;
  min-height: 120px;
  resize: vertical;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.gold};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const TestimonialSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  max-width: 100%;
`;

const TestimonialGrid = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled.div`
  padding: ${({ theme }) => theme.spacing["2xl"]};
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.2);
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
    border-color: ${({ theme }) => theme.colors.gold};
    transform: translateY(-5px);
  }
`;

const Stars = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TestimonialText = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.gray[300]};
`;

const TestimonialAuthor = styled.p`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.gold};
  margin: 0;
`;

const CTASection = styled.section`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.black} 0%,
    ${({ theme }) => theme.colors.gray[900]} 100%
  );
  padding: ${({ theme }) => theme.spacing["5xl"]}
    ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing["4xl"]};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`;

const CTATitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-size: ${({ theme }) => theme.typography.sizes["4xl"]};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes["2xl"]};
  }
`;

const CTAText = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  color: ${({ theme }) => theme.colors.gray[400]};
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const StyledSectionTitle = styled(SectionTitle)`
  color: ${({ theme }) => theme.colors.white};
`;

const PriceLabel = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showcaseProducts, setShowcaseProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowcase = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .limit(4);

        if (error) throw error;
        setShowcaseProducts(data || []);
      } catch (error) {
        console.error("Error fetching showcase products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShowcase();
  }, []);

  const categories = [
    {
      name: "Handbags",
      image: "/images/WhatsApp Image 2026-01-30 at 18.22.54.jpeg",
    },
    {
      name: "Footwear",
      image: "/images/WhatsApp Image 2026-01-30 at 18.22.55.jpeg",
    },
    {
      name: "Luxury Heels",
      image: "/images/WhatsApp Image 2026-01-30 at 18.22.551.jpeg",
    },
    {
      name: "Perfumes",
      image: "/images/WhatsApp Image 2026-01-30 at 18.22.56.jpeg",
    },
  ];

  const testimonials = [
    {
      text: "The quality is unmatched. I contacted them on WhatsApp and got a response immediately with the full price list. Amazing service.",
      author: "Sarah M.",
      rating: 5,
    },
    {
      text: "Love the showcase style. It feels very exclusive. The sneakers are high-end and the process was so simple.",
      author: "Marcus T.",
      rating: 5,
    },
    {
      text: "Exquisite attention to detail. Definitely the place to get premium luxury without the premium overheads.",
      author: "Emma L.",
      rating: 5,
    },
  ];

  const handleCategoryClick = (categoryName: string) => {
    openWhatsApp(WhatsAppMessages.categoryInquiry(categoryName));
  };

  const handleProductClick = (productName: string) => {
    openWhatsApp(WhatsAppMessages.productInquiry(productName));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi! My name is ${formData.name}. Email: ${formData.email}. Requesting info for: ${formData.message}`;
    openWhatsApp(message);

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const scrollToProducts = () => {
    document
      .getElementById("essentials")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroBackground />
        <HeroContent>
          <HeroTitle>
            Premium <span>Luxury</span> Showcase
          </HeroTitle>
          <HeroSubtitle>
            Discover our curated collection of affordable luxury pieces.
            <br />
            Chat with us on WhatsApp for our full catalog and exclusive prices.
          </HeroSubtitle>
          <HeroActions>
            <WhatsAppButton
              variant="secondary"
              size="large"
              onClick={() => openWhatsApp(WhatsAppMessages.generalInquiry)}
            >
              <FiBookOpen />
              Get Price List
            </WhatsAppButton>
            <Button variant="outline" size="large" onClick={scrollToProducts}>
              Explore Showcase
            </Button>
          </HeroActions>
        </HeroContent>
      </HeroSection>

      {/* Categories Section */}
      <Section>
        <SectionTitle>Explore Our Selection</SectionTitle>
        <CategoryGrid>
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
            >
              <CategoryCard href="#" as="div">
                <CategoryImage src={category.image} />
                <CategoryOverlay>
                  <CategoryTitle>{category.name}</CategoryTitle>
                </CategoryOverlay>
              </CategoryCard>
            </div>
          ))}
        </CategoryGrid>
      </Section>

      {/* Essence Essentials */}
      <Section id="essentials">
        <SectionTitle>Essence Essentials</SectionTitle>
        <ProductGrid>
          {showcaseProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <ProductCard>
                <Card>
                  <CardImage src={product.image}>
                    {product.badge && <Badge>{product.badge}</Badge>}
                  </CardImage>
                  <CardContent>
                    <CardTitle>{product.name}</CardTitle>
                    <PriceLabel>₦{product.price}</PriceLabel>
                    <Button as="div" variant="primary" size="medium" $fullwidth>
                      View Product
                    </Button>
                  </CardContent>
                </Card>
              </ProductCard>
            </Link>
          ))}
          {!loading && showcaseProducts.length === 0 && (
            <p>No products featured yet.</p>
          )}
        </ProductGrid>
      </Section>

      {/* Contact Form */}
      <ContactSection>
        <SectionTitle>Request Catalog</SectionTitle>
        <ContactForm onSubmit={handleFormSubmit}>
          <FormGroup>
            <Label htmlFor="name">Your Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message">Interested in...</Label>
            <TextArea
              id="message"
              placeholder="E.g. Handbags collection, Premium sneakers..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            />
          </FormGroup>
          <WhatsAppButton
            type="submit"
            variant="secondary"
            size="large"
            $fullwidth
          >
            <FiMessageCircle />
            Inquire via WhatsApp
          </WhatsAppButton>
        </ContactForm>
      </ContactSection>

      {/* Trust Signals */}
      <TrustSection>
        <TrustContainer>
          <TrustItem>
            <TrustIcon>
              <FiTruck />
            </TrustIcon>
            <TrustTitle>Fast Delivery</TrustTitle>
            <TrustDescription>Secure nationwide shipping</TrustDescription>
          </TrustItem>
          <TrustItem>
            <TrustIcon>
              <FiMessageCircle />
            </TrustIcon>
            <TrustTitle>24/7 Chat Support</TrustTitle>
            <TrustDescription>Direct human interaction</TrustDescription>
          </TrustItem>
          <TrustItem>
            <TrustIcon>
              <FiShield />
            </TrustIcon>
            <TrustTitle>Buyer Protection</TrustTitle>
            <TrustDescription>Trusted quality assurance</TrustDescription>
          </TrustItem>
          <TrustItem>
            <TrustIcon>
              <FiStar />
            </TrustIcon>
            <TrustTitle>Premium Curation</TrustTitle>
            <TrustDescription>Only the finest selection</TrustDescription>
          </TrustItem>
        </TrustContainer>
      </TrustSection>

      {/* Social Proof / Testimonials */}
      <TestimonialSection>
        <StyledSectionTitle>Reflections of Excellence</StyledSectionTitle>
        <TestimonialGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index}>
              <Stars>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <FiStar key={i} fill="currentColor" />
                ))}
              </Stars>
              <TestimonialText>"{testimonial.text}"</TestimonialText>
              <TestimonialAuthor>{testimonial.author}</TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialGrid>
      </TestimonialSection>

      {/* Final CTA */}
      <CTASection>
        <CTATitle>Secure Your Exclusive Access</CTATitle>
        <CTAText>
          Join our premium WhatsApp community for early access to new arrivals
          and personalized style consulting.
        </CTAText>
        <WhatsAppButton
          variant="secondary"
          size="large"
          onClick={() => openWhatsApp(WhatsAppMessages.generalInquiry)}
        >
          <FiMessageCircle />
          Get Full Price List Now
        </WhatsAppButton>
      </CTASection>
    </>
  );
}

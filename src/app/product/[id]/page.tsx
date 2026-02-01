'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { FiHeart, FiShare2, FiTruck, FiShield } from 'react-icons/fi';
import { 
  Card, 
  CardImage, 
  CardContent, 
  CardTitle, 
  CardPrice, 
  Price 
} from '@/components/Card';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';

const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const ProductSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['4xl']};
  margin-bottom: ${({ theme }) => theme.spacing['5xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing['2xl']};
  }
`;

const GalleryContainer = styled.div`
  position: sticky;
  top: 100px;
  height: fit-content;
`;

const MainImage = styled.div<{ src: string }>`
  width: 100%;
  aspect-ratio: 1/1;
  background-image: url("${({ src }) => src}");
  background-size: cover;
  background-position: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  position: relative;
  overflow: hidden;
  border-radius: 8px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Breadcrumb = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  a {
    color: ${({ theme }) => theme.colors.text.secondary};
    
    &:hover {
      color: ${({ theme }) => theme.colors.gold};
    }
  }
`;

const ProductTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CurrentPrice = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-size: ${({ theme }) => theme.typography.sizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.black};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  }
`;

const OldPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  color: ${({ theme }) => theme.colors.text.light};
  text-decoration: line-through;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  text-align: center;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product details
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
        
        if (productError) throw productError;
        setProduct(productData);
        
        // Fetch related products from same category
        const { data: relatedData, error: relatedError } = await supabase
          .from('products')
          .select('*')
          .eq('category', productData.category)
          .neq('id', id)
          .limit(4);

        if (relatedError) throw relatedError;
        setRelatedProducts(relatedData || []);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleBuyNow = () => {
    if (!product) return;
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const message = encodeURIComponent(
      `Hello! I'm interested in ordering:\n\n*Product:* ${product.name}\n*Price:* $${product.price}\n*Link:* ${window.location.href}\n\nPlease let me know the next steps.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  if (loading) return <PageContainer><p>Loading product...</p></PageContainer>;
  if (!product) return <PageContainer><p>Product not found.</p></PageContainer>;

  return (
    <PageContainer>
      <Breadcrumb>
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/collection">Collection</Link>
        <span>/</span>
        <span>{product.name}</span>
      </Breadcrumb>

      <ProductSection>
        <GalleryContainer>
          <MainImage src={product.image} />
        </GalleryContainer>

        <ProductInfo>
          <div>
            <ProductTitle>{product.name}</ProductTitle>
            <PriceContainer>
              <CurrentPrice>${product.price}</CurrentPrice>
              {product.original_price && (
                <OldPrice>${product.original_price}</OldPrice>
              )}
            </PriceContainer>
          </div>

          <Description>{product.description}</Description>

          <ActionButtons>
            <Button 
              variant="primary" 
              size="large" 
              $fullwidth 
              onClick={() => {
                addToCart(product);
                alert('Added to cart!');
              }}
            >
              Add to Cart
            </Button>
          </ActionButtons>

          <Button variant="secondary" size="large" $fullwidth onClick={handleBuyNow}>
            Buy Now (WhatsApp)
          </Button>
        </ProductInfo>
      </ProductSection>

      {relatedProducts.length > 0 && (
        <>
          <SectionTitle>You May Also Like</SectionTitle>
          <RelatedGrid>
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`}>
                <Card>
                  <CardImage src={p.image} />
                  <CardContent>
                    <CardTitle>{p.name}</CardTitle>
                    <CardPrice>
                      <Price>${p.price}</Price>
                    </CardPrice>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </RelatedGrid>
        </>
      )}
    </PageContainer>
  );
}

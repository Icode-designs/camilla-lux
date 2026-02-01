'use client';

import styled from 'styled-components';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { 
  Card, 
  CardImage, 
  CardContent, 
  CardTitle, 
  CardPrice, 
  Price,
  OriginalPrice,
  Badge 
} from '@/components/Card';
import { FiGrid, FiList, FiFilter, FiX } from 'react-icons/fi';
import { useSearchParams, useRouter } from 'next/navigation';

const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-size: ${({ theme }) => theme.typography.sizes['5xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  }
`;

const PageDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 700px;
  margin: 0 auto;
`;

const CollectionLayout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const Sidebar = styled.aside<{ $isOpen: boolean }>`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: fixed;
    top: 0;
    left: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
    box-shadow: ${({ theme }) => theme.shadows.xl};
    transition: left ${({ theme }) => theme.transitions.base};
    z-index: ${({ theme }) => theme.zIndex.modal};
    overflow-y: auto;
  }
`;

const FilterSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const FilterTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FilterOption = styled.button<{ $isActive: boolean }>`
  display: block;
  width: 100%;
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.black : 'transparent'};
  color: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.gold : theme.colors.text.primary};
  border: 1px solid ${({ $isActive, theme }) => 
    $isActive ? theme.colors.black : 'transparent'};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.gold};
    border-color: ${({ theme }) => theme.colors.black};
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[300]};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const MainContent = styled.div``;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    align-items: stretch;
  }
`;

const ResultCount = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ToolbarActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const FilterToggle = styled.button`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.gold};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const SortSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.black};
  }
`;

const ViewToggle = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const ViewButton = styled.button<{ $isActive: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.black : 'transparent'};
  color: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.gold : theme.colors.text.primary};
  transition: all ${({ theme }) => theme.transitions.fast};

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;

const ProductGrid = styled.div<{ $viewMode: 'grid' | 'list' }>`
  display: grid;
  grid-template-columns: ${({ $viewMode }) => 
    $viewMode === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr'};
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: ${({ $viewMode }) => 
      $viewMode === 'grid' ? 'repeat(auto-fill, minmax(200px, 1fr))' : '1fr'};
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: ${({ $viewMode }) => 
      $viewMode === 'grid' ? 'repeat(2, 1fr)' : '1fr'};
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    transition: all ${({ theme }) => theme.transitions.base};
    z-index: ${({ theme }) => theme.zIndex.overlay};
  }
`;

import { supabase } from '@/lib/supabase';

function CollectionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('q') || '';
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', 'Handbags', 'Footwear', 'Sneakers', 'Perfumes'];
  const priceRanges = ['All Prices', 'Under $100', '$100 - $200', '$200+'];

  const filteredProducts = products.filter(product => {
    const matchCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    let matchPrice = true;
    if (selectedPrice === 'under $100') matchPrice = product.price < 100;
    else if (selectedPrice === '$100 - $200') matchPrice = product.price >= 100 && product.price <= 200;
    else if (selectedPrice === '$200+') matchPrice = product.price > 200;
    
    const matchSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchCategory && matchPrice && matchSearch;
  });

  if (loading) return <PageContainer><p>Loading collection...</p></PageContainer>;

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Our Collection</PageTitle>
        {searchQuery && (
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <p>Results for "<strong>{searchQuery}</strong>"</p>
            <button 
              onClick={() => router.push('/collection')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline' }}
            >
              <FiX size={14} /> Clear
            </button>
          </div>
        )}
        <PageDescription>
          Discover our curated selection of premium fashion pieces designed for the modern individual.
        </PageDescription>
      </PageHeader>

      <CollectionLayout>
        <Sidebar $isOpen={filterOpen}>
          <FilterSection>
            <FilterTitle>Category</FilterTitle>
            {categories.map((category) => (
              <FilterOption
                key={category}
                $isActive={selectedCategory === category.toLowerCase()}
                onClick={() => {
                  setSelectedCategory(category.toLowerCase());
                  setFilterOpen(false);
                }}
              >
                {category}
              </FilterOption>
            ))}
          </FilterSection>

          <Divider />

          <FilterSection>
            <FilterTitle>Price Range</FilterTitle>
            {priceRanges.map((range) => (
              <FilterOption
                key={range}
                $isActive={selectedPrice === range.toLowerCase()}
                onClick={() => {
                  setSelectedPrice(range.toLowerCase());
                  setFilterOpen(false);
                }}
              >
                {range}
              </FilterOption>
            ))}
          </FilterSection>
        </Sidebar>

        <MainContent>
          <Toolbar>
            <ResultCount>Showing {filteredProducts.length} products</ResultCount>
            
            <ToolbarActions>
              <FilterToggle onClick={() => setFilterOpen(true)}>
                <FiFilter />
                Filters
              </FilterToggle>

              <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </SortSelect>

              <ViewToggle>
                <ViewButton 
                  $isActive={viewMode === 'grid'} 
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid View"
                >
                  <FiGrid />
                </ViewButton>
                <ViewButton 
                  $isActive={viewMode === 'list'} 
                  onClick={() => setViewMode('list')}
                  aria-label="List View"
                >
                  <FiList />
                </ViewButton>
              </ViewToggle>
            </ToolbarActions>
          </Toolbar>

          <ProductGrid $viewMode={viewMode}>
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card>
                  <CardImage src={product.image}>
                    {product.badge && <Badge>{product.badge}</Badge>}
                  </CardImage>
                  <CardContent>
                    <CardTitle>{product.name}</CardTitle>
                    <CardPrice>
                      <Price>${product.price}</Price>
                      {product.original_price && (
                        <OriginalPrice>${product.original_price}</OriginalPrice>
                      )}
                    </CardPrice>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </ProductGrid>
          {filteredProducts.length === 0 && <p>No products found matching your criteria.</p>}
        </MainContent>
      </CollectionLayout>

      <Overlay $isOpen={filterOpen} onClick={() => setFilterOpen(false)} />
    </PageContainer>
  );
}

export default function CollectionPage() {
  return (
    <Suspense fallback={<PageContainer><p>Loading...</p></PageContainer>}>
      <CollectionContent />
    </Suspense>
  );
}

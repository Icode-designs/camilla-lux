'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import ProductForm from '@/components/admin/ProductForm';
import { FiPlus, FiEdit2, FiTrash2, FiLogOut } from 'react-icons/fi';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  font-family: var(--font-heading);
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const IconButton = styled.button<{ $variant?: 'danger' | 'primary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ $variant }) => $variant === 'danger' ? '#ff4d4d' : '#000'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  min-width: 40px;
  height: 40px;

  &:hover {
    opacity: 0.8;
  }

  span {
    @media (max-width: 480px) {
      display: none;
    }
  }
`;

const ProductList = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  margin: 0;
`;

const ProductPrice = styled.p`
  color: #666;
  margin: 0;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setUser(session.user);
        fetchProducts();
      }
      setLoadingAuth(false);
    };
    checkUser();
  }, [router]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching products:', error.message || error);
    } else {
      setProducts(data || []);
    }
  };

  const handleCreateOrUpdate = async (productData: any) => {
    try {
      // Clean metadata fields from payload
      const { id, created_at, ...payload } = productData;
      
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(payload)
          .eq('id', editingProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('products')
          .insert([payload]);
        if (error) throw error;
      }
      setIsModalOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (err: any) {
      console.error('Error saving product:', err.message || err);
      if (err.details) console.error('Details:', err.details);
      if (err.hint) console.error('Hint:', err.hint);
      alert('Error saving product: ' + (err.message || 'Unknown error'));
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting product:', error.message || error);
        alert('Error deleting product: ' + error.message);
      } else {
        fetchProducts();
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loadingAuth) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <DashboardContainer>
      <Header>
        <Title>Admin Dashboard</Title>
        <ActionButtons>
          <IconButton onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}>
            <FiPlus /> <span>Add Product</span>
          </IconButton>
          <IconButton $variant="danger" onClick={handleLogout}>
            <FiLogOut /> <span>Logout</span>
          </IconButton>
        </ActionButtons>
      </Header>

      <ProductList>
        {products.map((product) => (
          <ProductItem key={product.id}>
            <ProductInfo>
              <ProductImage src={product.image} alt={product.name} />
              <div>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>${product.price}</ProductPrice>
              </div>
            </ProductInfo>
            <ActionButtons>
              <IconButton onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}>
                <FiEdit2 /> <span>Edit</span>
              </IconButton>
              <IconButton $variant="danger" onClick={() => handleDelete(product.id)}>
                <FiTrash2 /> <span>Delete</span>
              </IconButton>
            </ActionButtons>
          </ProductItem>
        ))}
        {products.length === 0 && <p>No products found. Add your first product!</p>}
      </ProductList>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                &times;
              </button>
            </ModalHeader>
            <ProductForm 
              initialData={editingProduct} 
              onSubmit={handleCreateOrUpdate} 
              buttonText={editingProduct ? 'Update Product' : 'Create Product'} 
            />
          </ModalContent>
        </Modal>
      )}
    </DashboardContainer>
  );
}

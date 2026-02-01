'use client';

import styled from 'styled-components';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft } from 'react-icons/fi';

const CartContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 1rem;
`;

const Title = styled.h1`
  font-family: var(--font-heading);
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 3rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CartItem = styled.div`
  display: flex;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    position: relative;
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
`;

const ItemPrice = styled.p`
  color: #666;
  font-weight: 600;
  margin: 0;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const QtyButton = styled.button`
  background: none;
  border: 1px solid #ddd;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    border-color: #000;
  }
`;

const Summary = styled.div`
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  height: fit-content;
`;

const SummaryRow = styled.div<{ $bold?: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-weight: ${({ $bold }) => ($bold ? '700' : '400')};
  font-size: ${({ $bold }) => ($bold ? '1.2rem' : '1rem')};
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 5rem 0;
`;

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const handleCheckout = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const itemsText = cart
      .map((item) => `- ${item.name} (x${item.quantity}): $${item.price * item.quantity}`)
      .join('\n');
    const message = encodeURIComponent(
      `Hello! I'd like to place an order:\n\n${itemsText}\n\n*Total Items:* ${totalItems}\n*Total Price:* $${totalPrice}\n\nPlease let me know the payment details.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <CartContainer>
        <EmptyCart>
          <Title>Your Cart is Empty</Title>
          <Link href="/collection">
            <Button as="div" variant="primary">Start Shopping</Button>
          </Link>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <Link href="/collection" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#666', textDecoration: 'none' }}>
        <FiArrowLeft /> Back to Collection
      </Link>
      <Title>Your Shopping Cart</Title>
      
      <CartLayout>
        <CartItems>
          {cart.map((item) => (
            <CartItem key={item.id}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>${item.price}</ItemPrice>
                <QuantityControls>
                  <QtyButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <FiMinus size={14} />
                  </QtyButton>
                  <span>{item.quantity}</span>
                  <QtyButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <FiPlus size={14} />
                  </QtyButton>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{ background: 'none', border: 'none', color: '#ff4d4d', marginLeft: '1rem', cursor: 'pointer' }}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </QuantityControls>
              </ItemDetails>
              <p style={{ fontWeight: 'bold' }}>${item.price * item.quantity}</p>
            </CartItem>
          ))}
        </CartItems>

        <Summary>
          <h2 style={{ marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '1.2rem' }}>Order Summary</h2>
          <SummaryRow>
            <span>Subtotal</span>
            <span>${totalPrice}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Shipping</span>
            <span>Free</span>
          </SummaryRow>
          <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px solid #ddd' }} />
          <SummaryRow $bold>
            <span>Total</span>
            <span>${totalPrice}</span>
          </SummaryRow>
          <Button variant="secondary" $fullwidth style={{ marginTop: '2rem' }} onClick={handleCheckout}>
            Checkout via WhatsApp
          </Button>
        </Summary>
      </CartLayout>
    </CartContainer>
  );
}

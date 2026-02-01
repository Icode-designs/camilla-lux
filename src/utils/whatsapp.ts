// WhatsApp contact number
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+2349064158954';

// Generate WhatsApp link with pre-filled message
export const getWhatsAppLink = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
};

// Pre-defined messages for different actions
export const WhatsAppMessages = {
  generalInquiry: 'Hi! I\'m interested in exploring the Camilla Luxe Essence collection. Can you share your full catalog and price list?',
  productInquiry: (productName: string) => `Hi! I\'ve seen the ${productName} on your showcase. Could you provide more details and the current price?`,
  orderInquiry: (productName: string) => `Hi! I\'m interested in acquiring the ${productName}. Please let me know the availability and price.`,
  categoryInquiry: (category: string) => `Hi! I\'m fascinated by your ${category} collection. Could you show me the full range and pricing?`,
  customMessage: (message: string) => message,
};

// Open WhatsApp in new tab
export const openWhatsApp = (message: string): void => {
  const link = getWhatsAppLink(message);
  window.open(link, '_blank');
};

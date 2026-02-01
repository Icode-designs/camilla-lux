'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 1rem;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-top: 0.5rem;
`;

interface ProductFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  buttonText: string;
}

export default function ProductForm({ initialData, onSubmit, buttonText }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    category: 'handbags',
    badge: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        price: initialData.price.toString(),
        original_price: initialData.original_price?.toString() || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        original_price: '',
        category: 'handbags',
        badge: '',
        image: '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadToSupabase = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await uploadToSupabase(imageFile);
      }
      
      const submissionData = {
        ...formData,
        image: imageUrl,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
      };
      
      await onSubmit(submissionData);
    } catch (error: any) {
      console.error('Error submitting form:', error.message || error);
      alert('Failed to save product: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Product Name</Label>
        <Input 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <TextArea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
        />
      </FormGroup>
      <FormGroup>
        <Label>Price ($)</Label>
        <Input 
          type="number" 
          step="0.01"
          name="price" 
          value={formData.price} 
          onChange={handleChange} 
          required 
        />
      </FormGroup>
      <FormGroup>
        <Label>Original Price ($) - Optional</Label>
        <Input 
          type="number" 
          step="0.01"
          name="original_price" 
          value={formData.original_price} 
          onChange={handleChange} 
        />
      </FormGroup>
      <FormGroup>
        <Label>Category</Label>
        <Select name="category" value={formData.category} onChange={handleChange}>
          <option value="handbags">Handbags</option>
          <option value="footwear">Footwear</option>
          <option value="sneakers">Sneakers</option>
          <option value="perfumes">Perfumes</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Badge (e.g., Sale, New) - Optional</Label>
        <Input 
          name="badge" 
          value={formData.badge} 
          onChange={handleChange} 
        />
      </FormGroup>
      <FormGroup>
        <Label>Product Image</Label>
        <Input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          required={!formData.image} 
        />
        {formData.image && !imageFile && (
          <ImagePreview src={formData.image} alt="Preview" />
        )}
        {imageFile && (
          <p>New image selected: {imageFile.name}</p>
        )}
      </FormGroup>
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : buttonText}
      </Button>
    </Form>
  );
}

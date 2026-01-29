import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { products as mockProducts } from '@/data/mockData';

// ==========================================
// 📦 TIPOS E INTERFACES
// ==========================================

export interface DynamicProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  storeId: string;
  storeName: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  // Marca que é produto criado dinamicamente (não mockado)
  isDynamic: true;
}

export interface Product extends DynamicProduct {}

interface ProductsContextType {
  // Lista combinada: mockados + dinâmicos
  allProducts: Product[];
  // Apenas produtos dinâmicos
  dynamicProducts: DynamicProduct[];
  // Apenas mockados
  mockProducts: Product[];
  // Adicionar novo produto dinâmico
  addProduct: (product: DynamicProduct) => void;
  // Remover produto dinâmico
  removeProduct: (productId: string) => void;
  // Atualizar produto dinâmico
  updateProduct: (productId: string, updates: Partial<DynamicProduct>) => void;
  // Obter produtos de uma loja específica
  getStoreProducts: (storeId: string) => Product[];
  // Limpar todos os produtos dinâmicos
  clearDynamicProducts: () => void;
  isLoading: boolean;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

// ==========================================
// 🏪 PROVIDER DO CONTEXTO
// ==========================================

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [dynamicProducts, setDynamicProducts] = useState<DynamicProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Inicializar mockados no contexto (sem duplicação)
  const mockProductsWithFlag = (mockProducts as any[]).map((p) => ({
    ...p,
    isDynamic: false,
  })) as Product[];

  // ==========================================
  // 📝 OPERAÇÕES SOBRE PRODUTOS
  // ==========================================

  const addProduct = (product: DynamicProduct) => {
    // Validar produto
    if (!product.id || !product.name || !product.storeId) {
      console.error('Produto inválido:', product);
      return;
    }

    // Verificar duplicação de ID
    if (
      dynamicProducts.some((p) => p.id === product.id) ||
      mockProductsWithFlag.some((p) => p.id === product.id)
    ) {
      console.error('Produto com ID duplicado:', product.id);
      return;
    }

    setDynamicProducts((prev) => [...prev, product]);
    console.log(`✅ Produto adicionado: ${product.name} (${product.storeId})`);
  };

  const removeProduct = (productId: string) => {
    const isMocked = mockProductsWithFlag.some((p) => p.id === productId);

    if (isMocked) {
      console.warn('❌ Não é permitido remover produtos mockados');
      return;
    }

    setDynamicProducts((prev) => prev.filter((p) => p.id !== productId));
    console.log(`🗑️ Produto removido: ${productId}`);
  };

  const updateProduct = (productId: string, updates: Partial<DynamicProduct>) => {
    const isMocked = mockProductsWithFlag.some((p) => p.id === productId);

    if (isMocked) {
      console.warn('❌ Não é permitido editar produtos mockados');
      return;
    }

    setDynamicProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updates } : p))
    );
    console.log(`✏️ Produto atualizado: ${productId}`);
  };

  const getStoreProducts = (storeId: string): Product[] => {
    return [...mockProductsWithFlag, ...dynamicProducts].filter(
      (p) => p.storeId === storeId
    );
  };

  const clearDynamicProducts = () => {
    setDynamicProducts([]);
    console.log('🧹 Todos os produtos dinâmicos foram limpos');
  };

  // ==========================================
  // 🔄 COMBINAR PRODUTOS
  // ==========================================

  const allProducts: Product[] = [
    ...mockProductsWithFlag,
    ...dynamicProducts,
  ];

  const value: ProductsContextType = {
    allProducts,
    dynamicProducts,
    mockProducts: mockProductsWithFlag,
    addProduct,
    removeProduct,
    updateProduct,
    getStoreProducts,
    clearDynamicProducts,
    isLoading,
  };

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
};

// ==========================================
// 🎣 HOOK PARA USAR O CONTEXTO
// ==========================================

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (context === undefined) {
    throw new Error('useProducts deve ser usado dentro de ProductsProvider');
  }

  return context;
};

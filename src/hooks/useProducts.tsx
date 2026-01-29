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
  // ID do utilizador vendedor (quando aplicável)
  sellerId?: string;
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

  // Chave para persistência no localStorage
  const STORAGE_KEY = 'hoji_dynamic_products_v1';

  // Carrega produtos persistidos do localStorage
  const loadPersistedProducts = (): DynamicProduct[] => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || '[]';
      const parsed = JSON.parse(raw) as DynamicProduct[];
      if (!Array.isArray(parsed)) return [];
      // Garantir que todos os ids sejam strings e filtrar duplicados com mock
      return parsed.map(p => ({ ...p, id: String(p.id) }));
    } catch (e) {
      console.error('Falha ao carregar produtos persistidos:', e);
      return [];
    }
  };

  // Salva todos os produtos dinâmicos no localStorage
  const persistDynamicProducts = (productsToSave: DynamicProduct[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productsToSave));
    } catch (e) {
      console.error('Falha ao persistir produtos:', e);
    }
  };

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

    setDynamicProducts((prev) => {
      const next = [...prev, { ...product, id: String(product.id) }];
      // Persistir
      persistDynamicProducts(next);
      return next;
    });
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
    // Limpar persistência
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Falha ao limpar produtos persistidos:', e);
    }
  };

  // ==========================================
  // 🔄 COMBINAR PRODUTOS
  // ==========================================

  const allProducts: Product[] = [
    ...mockProductsWithFlag,
    ...dynamicProducts,
  ];

  // Ao montar, carregar produtos persistidos
  useEffect(() => {
    try {
      const persisted = loadPersistedProducts();
      // Filtrar produtos que colidem com mockados
      const filtered = persisted.filter(p => !mockProductsWithFlag.some(m => m.id === p.id));
      if (filtered.length > 0) {
        setDynamicProducts(filtered.map(p => ({ ...p, id: String(p.id) })));
        console.log(`🔁 Carregados ${filtered.length} produtos persistidos do armazenamento local`);
      }
    } catch (e) {
      console.error('Erro ao inicializar produtos persistidos:', e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sempre que dynamicProducts mudar, persistir (redundante com persistDynamicProducts na adição,
  // mas útil para atualizações/remoções realizadas por outras funções)
  useEffect(() => {
    persistDynamicProducts(dynamicProducts);
  }, [dynamicProducts]);

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

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { products as mockProducts } from '@/data/mockData';
import { supabase } from '@/integrations/supabase/client';

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
  addProduct: (product: DynamicProduct) => Promise<void>;
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

  // Salva todos os produtos dinâmicos no localStorage (cache/offline fallback)
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

  const addProduct = async (product: DynamicProduct) => {
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

    // First try to persist to Supabase
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select();

      if (error) {
        console.error('Supabase insert error, falling back to localStorage:', error);
        // fallback to localStorage only
        setDynamicProducts((prev) => {
          const next = [...prev, { ...product, id: String(product.id) }];
          persistDynamicProducts(next);
          return next;
        });
      } else {
        // Supabase returned the inserted row(s)
        const inserted = Array.isArray(data) && data.length > 0 ? data[0] : product;
        setDynamicProducts((prev) => {
          const next = [...prev, { ...inserted, id: String((inserted as any).id) } as DynamicProduct];
          // update local cache as well
          persistDynamicProducts(next);
          return next;
        });
        console.log(`✅ Produto adicionado no Supabase: ${(inserted as any).id ?? product.id}`);
      }
    } catch (e) {
      console.error('Erro ao persistir produto no Supabase:', e);
      // fallback
      setDynamicProducts((prev) => {
        const next = [...prev, { ...product, id: String(product.id) }];
        persistDynamicProducts(next);
        return next;
      });
    }
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
    // On mount: try to load from Supabase first, fallback to localStorage cache
    (async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) {
          console.warn('Supabase fetch error, loading from localStorage cache instead:', error);
          const persisted = loadPersistedProducts();
          const filtered = persisted.filter(p => !mockProductsWithFlag.some(m => m.id === p.id));
          if (filtered.length > 0) {
            setDynamicProducts(filtered.map(p => ({ ...p, id: String(p.id) })));
            console.log(`🔁 Carregados ${filtered.length} produtos do cache local`);
          }
        } else if (Array.isArray(data)) {
          // Map and store fetched products
          const fetched = (data as any[]).map(p => ({ ...p, id: String(p.id) })) as DynamicProduct[];
          const filtered = fetched.filter(p => !mockProductsWithFlag.some(m => m.id === p.id));
          if (filtered.length > 0) {
            setDynamicProducts(filtered);
            persistDynamicProducts(filtered);
            console.log(`🔁 Carregados ${filtered.length} produtos do Supabase`);
          }
        }
      } catch (e) {
        console.error('Erro ao inicializar produtos persistidos:', e);
      }
    })();
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

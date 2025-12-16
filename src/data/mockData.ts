// Mock Data for HojiVirtual Prototype

export interface Store {
  id: string;
  name: string;
  owner: string;
  category: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  location: string;
  image: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  storeId: string;
  storeName: string;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'vendor' | 'buyer';
  avatar: string;
  points: number;
  level: string;
}

export const stores: Store[] = [
  {
    id: "1",
    name: "Boutique Kianda",
    owner: "Maria Silva",
    category: "Roupas",
    rating: 4.8,
    reviewCount: 234,
    verified: true,
    location: "Mercado Hoji Ya Henda, Box 12",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
    description: "Moda feminina de qualidade com preços acessíveis"
  },
  {
    id: "2",
    name: "TechStore Angola",
    owner: "João Luís",
    category: "Eletrónicos",
    rating: 4.6,
    reviewCount: 189,
    verified: true,
    location: "Mercado Hoji Ya Henda, Box 45",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400",
    description: "Os melhores gadgets e eletrónicos de Luanda"
  },
  {
    id: "3",
    name: "Sabor de Casa",
    owner: "Ana Costa",
    category: "Alimentos",
    rating: 4.9,
    reviewCount: 312,
    verified: true,
    location: "Mercado Hoji Ya Henda, Box 78",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
    description: "Produtos alimentares frescos e de qualidade"
  },
  {
    id: "4",
    name: "Beleza Natural",
    owner: "Cláudia Fernandes",
    category: "Beleza",
    rating: 4.7,
    reviewCount: 156,
    verified: true,
    location: "Mercado Hoji Ya Henda, Box 23",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400",
    description: "Cosméticos e produtos de beleza naturais"
  },
  {
    id: "5",
    name: "Artesanato Luanda",
    owner: "Pedro Santos",
    category: "Artesanato",
    rating: 4.7,
    reviewCount: 98,
    verified: true,
    location: "Mercado Hoji Ya Henda, Box 56",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400",
    description: "Arte tradicional angolana feita à mão"
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Vestido Floral Vermelho",
    description: "Vestido elegante com estampa floral, perfeito para ocasiões especiais. Tecido leve e confortável.",
    price: 8500,
    stock: 15,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Roupas",
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"],
    rating: 4.8,
    reviewCount: 23,
    featured: true
  },
  {
    id: "2",
    name: "Samsung Galaxy A14",
    description: "Smartphone Samsung com câmara de 50MP, bateria de longa duração e 128GB de armazenamento.",
    price: 85000,
    stock: 8,
    storeId: "2",
    storeName: "TechStore Angola",
    category: "Eletrónicos",
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"],
    rating: 4.6,
    reviewCount: 45,
    featured: true
  },
  {
    id: "3",
    name: "Arroz Nossa Casa 1kg",
    description: "Arroz de alta qualidade, ideal para acompanhar qualquer refeição tradicional.",
    price: 1200,
    stock: 50,
    storeId: "3",
    storeName: "Sabor de Casa",
    category: "Alimentos",
    images: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400"],
    rating: 4.9,
    reviewCount: 89,
    featured: false
  },
  {
    id: "4",
    name: "Kit Maquilhagem Completo",
    description: "Kit completo com base, batom, sombras e pincéis. Ideal para maquilhagem profissional.",
    price: 15000,
    stock: 12,
    storeId: "4",
    storeName: "Beleza Natural",
    category: "Beleza",
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400"],
    rating: 4.7,
    reviewCount: 34,
    featured: true
  },
  {
    id: "5",
    name: "Cesto de Palha Artesanal",
    description: "Cesto tradicional feito à mão por artesãos locais. Perfeito para decoração ou uso prático.",
    price: 4000,
    stock: 25,
    storeId: "5",
    storeName: "Artesanato Luanda",
    category: "Artesanato",
    images: ["https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400"],
    rating: 4.7,
    reviewCount: 18,
    featured: false
  },
  {
    id: "6",
    name: "Camisa Social Azul",
    description: "Camisa social masculina de algodão premium. Corte clássico e elegante.",
    price: 6500,
    stock: 20,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Roupas",
    images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400"],
    rating: 4.5,
    reviewCount: 28,
    featured: false
  },
  {
    id: "7",
    name: "Power Bank 10.000mAh",
    description: "Carregador portátil de alta capacidade com duas portas USB. Carrega seu telefone 3 vezes.",
    price: 7500,
    stock: 30,
    storeId: "2",
    storeName: "TechStore Angola",
    category: "Eletrónicos",
    images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400"],
    rating: 4.4,
    reviewCount: 52,
    featured: true
  },
  {
    id: "8",
    name: "Óleo de Coco Natural",
    description: "Óleo de coco 100% natural, ideal para cabelo, pele e culinária. 500ml.",
    price: 3500,
    stock: 40,
    storeId: "4",
    storeName: "Beleza Natural",
    category: "Beleza",
    images: ["https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400"],
    rating: 4.8,
    reviewCount: 67,
    featured: false
  },
  {
    id: "9",
    name: "Máscara Africana Decorativa",
    description: "Máscara tradicional africana esculpida em madeira. Peça única de colecionador.",
    price: 12000,
    stock: 5,
    storeId: "5",
    storeName: "Artesanato Luanda",
    category: "Artesanato",
    images: ["https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=400"],
    rating: 4.9,
    reviewCount: 12,
    featured: true
  },
  {
    id: "10",
    name: "Pasta 1kg",
    description: "Pasta de primeira qualidade, perfeita para qualquer refeição.",
    price: 1800,
    stock: 35,
    storeId: "3",
    storeName: "Sabor de Casa",
    category: "Alimentos",
    images: ["https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400"],
    rating: 4.8,
    reviewCount: 43,
    featured: false
  },
  {
    id: "11",
    name: "Calças Jeans Femininas",
    description: "Calças jeans de cintura alta com corte moderno e confortável.",
    price: 7500,
    stock: 18,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Roupas",
    images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400"],
    rating: 4.6,
    reviewCount: 31,
    featured: true
  },
  {
    id: "12",
    name: "Auscultadores Bluetooth",
    description: "Auscultadores sem fio com cancelamento de ruído e bateria de 20 horas.",
    price: 25000,
    stock: 15,
    storeId: "2",
    storeName: "TechStore Angola",
    category: "Eletrónicos",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"],
    rating: 4.7,
    reviewCount: 38,
    featured: true
  },
  {
    id: "13",
    name: "Feijão Catarino 1kg",
    description: "Feijão catarino selecionado, rico em proteínas e fibras.",
    price: 950,
    stock: 60,
    storeId: "3",
    storeName: "Sabor de Casa",
    category: "Alimentos",
    images: ["https://images.unsplash.com/photo-1506807803488-8eafc15316c7?w=400"],
    rating: 4.8,
    reviewCount: 56,
    featured: false
  },
  {
    id: "14",
    name: "Creme Hidratante Facial",
    description: "Creme hidratante com vitamina E para todos os tipos de pele.",
    price: 4500,
    stock: 25,
    storeId: "4",
    storeName: "Beleza Natural",
    category: "Beleza",
    images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400"],
    rating: 4.5,
    reviewCount: 42,
    featured: false
  },
  {
    id: "15",
    name: "Estatueta de Madeira",
    description: "Estatueta tradicional angolana esculpida à mão em madeira nobre.",
    price: 8500,
    stock: 8,
    storeId: "5",
    storeName: "Artesanato Luanda",
    category: "Artesanato",
    images: ["https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400"],
    rating: 4.9,
    reviewCount: 15,
    featured: true
  },
  {
    id: "16",
    name: "T-Shirt Básica Branca",
    description: "T-shirt 100% algodão, corte unissex, disponível em vários tamanhos.",
    price: 2500,
    stock: 50,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Roupas",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"],
    rating: 4.4,
    reviewCount: 65,
    featured: false
  },
  {
    id: "17",
    name: "Smartwatch Fitness",
    description: "Relógio inteligente com monitor cardíaco, GPS e resistência à água.",
    price: 35000,
    stock: 10,
    storeId: "2",
    storeName: "TechStore Angola",
    category: "Eletrónicos",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"],
    rating: 4.6,
    reviewCount: 29,
    featured: true
  },
  {
    id: "18",
    name: "Azeite de Palma 500ml",
    description: "Azeite de palma tradicional, perfeito para pratos angolanos autênticos.",
    price: 1500,
    stock: 45,
    storeId: "3",
    storeName: "Sabor de Casa",
    category: "Alimentos",
    images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"],
    rating: 4.9,
    reviewCount: 78,
    featured: false
  },
  {
    id: "19",
    name: "Kit Unhas de Gel",
    description: "Kit completo para aplicação de unhas de gel em casa.",
    price: 12000,
    stock: 15,
    storeId: "4",
    storeName: "Beleza Natural",
    category: "Beleza",
    images: ["https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400"],
    rating: 4.6,
    reviewCount: 23,
    featured: true
  },
  {
    id: "20",
    name: "Tapete Tradicional",
    description: "Tapete artesanal com padrões africanos, feito com materiais naturais.",
    price: 15000,
    stock: 6,
    storeId: "5",
    storeName: "Artesanato Luanda",
    category: "Artesanato",
    images: ["https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=400"],
    rating: 4.8,
    reviewCount: 11,
    featured: false
  },
  {
    id: "21",
    name: "Saia Midi Plissada",
    description: "Saia midi elegante com pregas, perfeita para o escritório ou ocasiões casuais.",
    price: 5500,
    stock: 22,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Roupas",
    images: ["https://images.unsplash.com/photo-1583496661160-fb5886a0uj27?w=400"],
    rating: 4.7,
    reviewCount: 19,
    featured: false
  },
  {
    id: "22",
    name: "Tablet Android 10\"",
    description: "Tablet com ecrã de 10 polegadas, 64GB de armazenamento e bateria de longa duração.",
    price: 65000,
    stock: 7,
    storeId: "2",
    storeName: "TechStore Angola",
    category: "Eletrónicos",
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400"],
    rating: 4.5,
    reviewCount: 24,
    featured: true
  },
  {
    id: "23",
    name: "Fuba de Milho 2kg",
    description: "Fuba de milho de primeira qualidade para preparar funge tradicional.",
    price: 1800,
    stock: 70,
    storeId: "3",
    storeName: "Sabor de Casa",
    category: "Alimentos",
    images: ["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400"],
    rating: 4.9,
    reviewCount: 92,
    featured: false
  },
  {
    id: "24",
    name: "Perfume Floral 100ml",
    description: "Perfume feminino com notas florais e frutadas. Longa duração.",
    price: 18000,
    stock: 12,
    storeId: "4",
    storeName: "Beleza Natural",
    category: "Beleza",
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?w=400"],
    rating: 4.8,
    reviewCount: 35,
    featured: true
  },
  {
    id: "25",
    name: "Colar de Missangas",
    description: "Colar artesanal com missangas coloridas, design tradicional angolano.",
    price: 3500,
    stock: 30,
    storeId: "5",
    storeName: "Artesanato Luanda",
    category: "Artesanato",
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400"],
    rating: 4.6,
    reviewCount: 21,
    featured: false
  },
  {
    id: "26",
    name: "Blazer Feminino",
    description: "Blazer estruturado ideal para looks profissionais ou casuais elegantes.",
    price: 12000,
    stock: 10,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Roupas",
    images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400"],
    rating: 4.8,
    reviewCount: 17,
    featured: true
  },
  {
    id: "27",
    name: "Câmara de Segurança WiFi",
    description: "Câmara de vigilância com visão noturna e aplicação para telemóvel.",
    price: 28000,
    stock: 15,
    storeId: "2",
    storeName: "TechStore Angola",
    category: "Eletrónicos",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"],
    rating: 4.4,
    reviewCount: 33,
    featured: false
  },
  {
    id: "28",
    name: "Ginguba Torrada 500g",
    description: "Amendoim torrado e salgado, snack tradicional angolano.",
    price: 800,
    stock: 100,
    storeId: "3",
    storeName: "Sabor de Casa",
    category: "Alimentos",
    images: ["https://images.unsplash.com/photo-1567892737950-e5a5d8e5c5c5?w=400"],
    rating: 4.7,
    reviewCount: 64,
    featured: false
  },
  {
    id: "29",
    name: "Óleo de Rícino 200ml",
    description: "Óleo natural para crescimento de cabelo e sobrancelhas.",
    price: 2800,
    stock: 35,
    storeId: "4",
    storeName: "Beleza Natural",
    category: "Beleza",
    images: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400"],
    rating: 4.6,
    reviewCount: 48,
    featured: false
  },
  {
    id: "30",
    name: "Pulseira de Couro",
    description: "Pulseira artesanal em couro genuíno com detalhes em bronze.",
    price: 2500,
    stock: 40,
    storeId: "5",
    storeName: "Artesanato Luanda",
    category: "Artesanato",
    images: ["https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400"],
    rating: 4.5,
    reviewCount: 27,
    featured: false
  },
  {
    id: "31",
    name: "Vestido Capulana",
    description: "Vestido feito com tecido capulana tradicional africano, peça única.",
    price: 9500,
    stock: 8,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Roupas",
    images: ["https://images.unsplash.com/photo-1590400516695-36e29039f929?w=400"],
    rating: 4.9,
    reviewCount: 41,
    featured: true
  },
  {
    id: "32",
    name: "Coluna Bluetooth Portátil",
    description: "Coluna sem fio com som potente e resistência à água IPX5.",
    price: 15000,
    stock: 20,
    storeId: "2",
    storeName: "TechStore Angola",
    category: "Eletrónicos",
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400"],
    rating: 4.6,
    reviewCount: 55,
    featured: true
  },
  {
    id: "33",
    name: "Café Angolano 250g",
    description: "Café 100% arábica de produção local, torrado artesanalmente.",
    price: 3200,
    stock: 30,
    storeId: "3",
    storeName: "Sabor de Casa",
    category: "Alimentos",
    images: ["https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400"],
    rating: 4.9,
    reviewCount: 73,
    featured: true
  },
  {
    id: "34",
    name: "Shampoo Natural 300ml",
    description: "Shampoo sem sulfatos com ingredientes naturais para cabelos saudáveis.",
    price: 3800,
    stock: 28,
    storeId: "4",
    storeName: "Beleza Natural",
    category: "Beleza",
    images: ["https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400"],
    rating: 4.7,
    reviewCount: 39,
    featured: false
  },
  {
    id: "35",
    name: "Quadro Decorativo Africano",
    description: "Pintura em tela com motivos africanos, moldura em madeira.",
    price: 22000,
    stock: 4,
    storeId: "5",
    storeName: "Artesanato Luanda",
    category: "Artesanato",
    images: ["https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400"],
    rating: 4.9,
    reviewCount: 8,
    featured: true
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    productId: "1",
    userName: "Ana Luísa",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    rating: 5,
    comment: "Vestido lindo! A qualidade é excelente e chegou muito rápido.",
    date: "2025-11-28",
    verified: true
  },
  {
    id: "2",
    productId: "1",
    userName: "Carla Santos",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    rating: 4,
    comment: "Muito bonito, só achei um pouco apertado no tamanho M.",
    date: "2025-11-25",
    verified: true
  },
  {
    id: "3",
    productId: "2",
    userName: "Miguel Costa",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    rating: 5,
    comment: "Telemóvel excelente pelo preço! Câmara muito boa.",
    date: "2025-11-30",
    verified: true
  },
];

export const currentUser: User = {
  id: "vendor-1",
  name: "Wissel Filipe",
  email: "wissel.filipe@email.com",
  phone: "+244 923 456 789",
  type: "vendor",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
  points: 2345,
  level: "Ouro"
};

export const vendorStats = {
  views: 1234,
  viewsChange: 12,
  sales: 45,
  salesChange: 8,
  revenue: 235000,
  revenueChange: 15,
  rating: 4.7,
  ratingChange: 0.2,
  weeklyData: [
    { day: "Seg", vendas: 8 },
    { day: "Ter", vendas: 12 },
    { day: "Qua", vendas: 6 },
    { day: "Qui", vendas: 15 },
    { day: "Sex", vendas: 10 },
    { day: "Sáb", vendas: 18 },
    { day: "Dom", vendas: 5 },
  ]
};

export const badges = [
  { id: "1", name: "Primeira Venda", icon: "🏆", earned: true, description: "Completou a primeira venda" },
  { id: "2", name: "10 Avaliações 5★", icon: "⭐", earned: true, description: "Recebeu 10 avaliações 5 estrelas" },
  { id: "3", name: "Top Vendedor", icon: "📈", earned: true, description: "Top vendedor do mês" },
  { id: "4", name: "100 QR Validados", icon: "🎯", earned: false, description: "Validou 100 QR codes" },
  { id: "5", name: "Vendedor Premium", icon: "💎", earned: false, description: "Alcançou nível premium" },
];

export const categories = [
  "Roupas",
  "Eletrónicos", 
  "Alimentos",
  "Beleza",
  "Artesanato",
  "Casa",
  "Calçados",
  "Livros"
];

export const paymentMethods = [
  { id: "multicaixa", name: "Multicaixa Express", icon: "💳" },
  { id: "unitel", name: "Unitel Money", icon: "📱" },
  { id: "cash", name: "Dinheiro", icon: "💵" },
];

export const plans = [
  {
    id: "basic",
    name: "Básico",
    price: 3000,
    features: [
      "3 produtos",
      "QR codes ilimitados",
      "Analytics básico",
      "Suporte por email"
    ],
    recommended: false
  },
  {
    id: "premium",
    name: "Premium",
    price: 6000,
    features: [
      "7 produtos",
      "QR codes ilimitados",
      "Analytics avançado",
      "Delivery prioritário",
      "Badge de destaque"
    ],
    recommended: true
  },
  {
    id: "pro",
    name: "Pro",
    price: 12000,
    features: [
      "Produtos ilimitados",
      "QR codes ilimitados",
      "Analytics completo",
      "Suporte prioritário 24/7",
      "Destaque nas buscas"
    ],
    recommended: false
  }
];

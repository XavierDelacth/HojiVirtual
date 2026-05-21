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
  iban?: string;
  bank?: string;
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
    description: "Moda feminina de qualidade com preços acessíveis",
    iban: "AO06000400000009000157512",
    bank: "BFA - Banco de Fomento Angola"
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
    description: "Os melhores gadgets e eletrónicos de Luanda",
    iban: "AO06000600000012000157512",
    bank: "BAI - Banco Angolano de Investimentos"
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
    description: "Produtos alimentares frescos e de qualidade",
    iban: "AO06000300000015000157512",
    bank: "BPC - Banco Privado Comercial"
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
    description: "Cosméticos e produtos de beleza naturais",
    iban: "AO06000700000018000157512",
    bank: "BCA - Banco de Crédito do Sul"
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
    image: "https://images.unsplash.com/photo-1528396518501-b53b655eb9b3?w=400",
    description: "Arte tradicional angolana feita à mão",
    iban: "AO06000500000020000157512",
    bank: "Banco de Desenvolvimento de Angola"
  },
  {
    id: "6",
    name: "Desporto Total",
    owner: "Carlos Mendes",
    category: "Desporto",
    rating: 4.6,
    reviewCount: 145,
    verified: true,
    location: "Mercado Hoji Ya Henda, Box 89",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400",
    description: "Equipamentos desportivos e merchandising de clubes",
    iban: "AO06000800000022000157512",
    bank: "BPI - Banco Português de Investimento"
  },
  {
    id: "7",
    name: "Moda Executiva",
    owner: "Teresa Lopes",
    category: "Roupas",
    rating: 4.8,
    reviewCount: 178,
    verified: true,
    location: "Mercado Hoji Ya Henda, Box 34",
    image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400",
    description: "Fatos e roupas sociais para profissionais",
    iban: "AO06000900000024000157512",
    bank: "Banco Standard Chartered"
  },
  {
    id: "8",
    name: "Casa & Decoração",
    owner: "Francisca Neto",
    category: "Casa",
    rating: 4.5,
    reviewCount: 87,
    verified: true,
    location: "Mercado Hoji Ya Henda, Box 67",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400",
    description: "Artigos para casa e decoração moderna",
    iban: "AO06001000000026000157512",
    bank: "KBC Bank Angola"
  },
  {
    id: "9",
    name: "Livraria Kwanza",
    owner: "Manuel Augusto",
    category: "Livros",
    rating: 4.9,
    reviewCount: 203,
    verified: true,
    location: "Mercado Hoji Ya Henda, Box 15",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400",
    description: "Livros novos e usados, literatura angolana"
  },
  {
    id: "10",
    name: "Acessórios Premium",
    owner: "Rita Domingos",
    category: "Acessórios",
    rating: 4.7,
    reviewCount: 134,
    verified: true,
    location: "Mercado Hoji Ya Henda, Box 42",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    description: "Relógios, óculos e acessórios de moda"
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
    name: "Portátil HP 15\"",
    description: "Computador portátil HP com processador Intel i5, 8GB RAM e 256GB SSD.",
    price: 185000,
    stock: 5,
    storeId: "2",
    storeName: "TechStore Angola",
    category: "Eletrónicos",
    images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"],
    rating: 4.8,
    reviewCount: 42,
    featured: true
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
    name: "Vestido Cocktail Preto",
    description: "Vestido curto elegante para festas e eventos noturnos.",
    price: 12500,
    stock: 12,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Roupas",
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"],
    rating: 4.8,
    reviewCount: 35,
    featured: true
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
    name: "Perfume Masculino 100ml",
    description: "Perfume masculino amadeirado com notas de sândalo e bergamota.",
    price: 22000,
    stock: 18,
    storeId: "4",
    storeName: "Beleza Natural",
    category: "Beleza",
    images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400"],
    rating: 4.9,
    reviewCount: 47,
    featured: true
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
    name: "Polo Masculino Ralph Lauren",
    description: "Camisa polo clássica em algodão piqué, várias cores disponíveis.",
    price: 15000,
    stock: 20,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Roupas",
    images: ["https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=400"],
    rating: 4.7,
    reviewCount: 38,
    featured: true
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
    images: ["https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=400"],
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
    name: "PC Desktop Gaming",
    description: "Computador desktop para gaming com RTX 3060, 16GB RAM e 512GB SSD.",
    price: 350000,
    stock: 3,
    storeId: "2",
    storeName: "TechStore Angola",
    category: "Eletrónicos",
    images: ["https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400"],
    rating: 4.9,
    reviewCount: 28,
    featured: true
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
    name: "Bolsa Feminina Elegante",
    description: "Bolsa de mão em couro sintético com alça removível.",
    price: 18000,
    stock: 15,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Acessórios",
    images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400"],
    rating: 4.7,
    reviewCount: 44,
    featured: true
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
    name: "Sandálias de Salto Alto",
    description: "Sandálias elegantes com salto de 8cm, perfeitas para festas.",
    price: 14000,
    stock: 12,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Calçados",
    images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400"],
    rating: 4.6,
    reviewCount: 31,
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
  {
    id: "36",
    name: "Fato Social Masculino",
    description: "Fato completo com calça e blazer, corte moderno e elegante para ocasiões formais.",
    price: 45000,
    stock: 6,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Roupas",
    images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400"],
    rating: 4.9,
    reviewCount: 22,
    featured: true
  },
  {
    id: "37",
    name: "Camisola SL Benfica 24/25",
    description: "Camisola oficial do Sport Lisboa e Benfica temporada 2024/2025.",
    price: 18000,
    stock: 25,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Roupas",
    images: ["https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400"],
    rating: 4.8,
    reviewCount: 67,
    featured: true
  },
  {
    id: "38",
    name: "Cachecol SL Benfica",
    description: "Cachecol oficial do Benfica em vermelho e branco, 100% acrílico.",
    price: 4500,
    stock: 40,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Acessórios",
    images: ["https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=400"],
    rating: 4.7,
    reviewCount: 34,
    featured: false
  },
  {
    id: "39",
    name: "Camisa Social Branca",
    description: "Camisa social de algodão egípcio, ideal para escritório ou eventos formais.",
    price: 8500,
    stock: 15,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Roupas",
    images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400"],
    rating: 4.6,
    reviewCount: 28,
    featured: true
  },
  {
    id: "40",
    name: "Sapatos Sociais Pretos",
    description: "Sapatos em couro legítimo com design clássico para ocasiões formais.",
    price: 22000,
    stock: 10,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Calçados",
    images: ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400"],
    rating: 4.8,
    reviewCount: 19,
    featured: true
  },
  {
    id: "41",
    name: "Gravata Seda Azul",
    description: "Gravata em seda pura com padrão discreto, elegante para qualquer ocasião.",
    price: 5500,
    stock: 20,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Acessórios",
    images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400"],
    rating: 4.5,
    reviewCount: 15,
    featured: false
  },
  {
    id: "42",
    name: "Boné SL Benfica",
    description: "Boné oficial do Sport Lisboa e Benfica, ajustável.",
    price: 3500,
    stock: 35,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Acessórios",
    images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400"],
    rating: 4.6,
    reviewCount: 42,
    featured: false
  },
  {
    id: "43",
    name: "Relógio Clássico Masculino",
    description: "Relógio analógico com pulseira de couro, design elegante e sofisticado.",
    price: 35000,
    stock: 8,
    storeId: "2",
    storeName: "TechStore Angola",
    category: "Acessórios",
    images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400"],
    rating: 4.7,
    reviewCount: 31,
    featured: true
  },
  {
    id: "44",
    name: "Mala Executiva",
    description: "Mala em couro sintético premium para laptop e documentos.",
    price: 28000,
    stock: 12,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Acessórios",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"],
    rating: 4.8,
    reviewCount: 26,
    featured: true
  },
  {
    id: "45",
    name: "Cinto de Couro",
    description: "Cinto masculino em couro legítimo com fivela prateada.",
    price: 6500,
    stock: 25,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Acessórios",
    images: ["https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400"],
    rating: 4.5,
    reviewCount: 38,
    featured: false
  },
  {
    id: "46",
    name: "Vestido de Noite",
    description: "Vestido longo elegante para festas e eventos especiais.",
    price: 35000,
    stock: 5,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Roupas",
    images: ["https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400"],
    rating: 4.9,
    reviewCount: 17,
    featured: true
  },
  {
    id: "47",
    name: "Calças Sociais Pretas",
    description: "Calças de alfaiataria em tecido premium, corte reto.",
    price: 12000,
    stock: 18,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Roupas",
    images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400"],
    rating: 4.6,
    reviewCount: 24,
    featured: false
  },
  {
    id: "48",
    name: "Bola Oficial SL Benfica",
    description: "Bola de futebol oficial do Sport Lisboa e Benfica, tamanho 5.",
    price: 8500,
    stock: 20,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Desporto",
    images: ["https://images.unsplash.com/photo-1552318965-6e6be7484ada?w=400"],
    rating: 4.7,
    reviewCount: 45,
    featured: true
  },
  {
    id: "49",
    name: "Mochila Desportiva",
    description: "Mochila resistente à água, ideal para ginásio ou viagens curtas.",
    price: 15000,
    stock: 22,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Acessórios",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"],
    rating: 4.5,
    reviewCount: 33,
    featured: false
  },
  {
    id: "50",
    name: "Óculos de Sol Ray-Ban",
    description: "Óculos de sol estilo aviador com proteção UV400.",
    price: 25000,
    stock: 15,
    storeId: "1",
    storeName: "Boutique Kianda",
    category: "Acessórios",
    images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400"],
    rating: 4.8,
    reviewCount: 52,
    featured: true
  },
];

export const reviews: Review[] = [
  // Product 1 - Vestido Floral Vermelho (Roupas)
  {
    id: "1",
    productId: "1",
    userName: "Ana Luísa",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana%20Luisa",
    rating: 5,
    comment: "Vestido lindo! A qualidade é excelente e chegou muito rápido.",
    date: "2025-11-28",
    verified: true
  },
  {
    id: "2",
    productId: "1",
    userName: "Carla Santos",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carla%20Santos",
    rating: 4,
    comment: "Muito bonito, só achei um pouco apertado no tamanho M.",
    date: "2025-11-25",
    verified: true
  },
  {
    id: "r1-3",
    productId: "1",
    userName: "Filomena Costa",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Filomena%20Costa",
    rating: 5,
    comment: "Perfeito para festas! O tecido é macio e fluida. Muito elegante!",
    date: "2025-11-10",
    verified: true
  },
  {
    id: "r1-4",
    productId: "1",
    userName: "Rosa Tavares",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rosa%20Tavares",
    rating: 5,
    comment: "A melhor compra que fiz! Recomendo a todos.",
    date: "2025-10-15",
    verified: true
  },

  // Product 2 - Samsung Galaxy A14 (Eletrónicos)
  {
    id: "3",
    productId: "2",
    userName: "Miguel Costa",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel%20Costa",
    rating: 5,
    comment: "Telemóvel excelente pelo preço! Câmara muito boa.",
    date: "2025-11-30",
    verified: true
  },
  {
    id: "r2-2",
    productId: "2",
    userName: "Paulo Silva",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Paulo%20Silva",
    rating: 4,
    comment: "Muito bom, bateria dura bastante. Entrega rápida.",
    date: "2025-11-15",
    verified: true
  },
  {
    id: "r2-3",
    productId: "2",
    userName: "Kwanza Silva",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kwanza%20Silva",
    rating: 5,
    comment: "Produto de qualidade. Funciona perfeitamente sem problemas.",
    date: "2025-11-01",
    verified: true
  },
  {
    id: "r2-4",
    productId: "2",
    userName: "Beatriz Lopes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz%20Lopes",
    rating: 5,
    comment: "Excelente custo-benefício. Fotos com qualidade profissional.",
    date: "2025-10-20",
    verified: true
  },

  // Product 3 - Portátil HP 15
  {
    id: "r3-1",
    productId: "3",
    userName: "Pedro Neto",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro%20Neto",
    rating: 5,
    comment: "Excelente portátil para trabalho e estudos. Muito rápido!",
    date: "2025-11-20",
    verified: true
  },
  {
    id: "r3-2",
    productId: "3",
    userName: "David Luvualu",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David%20Luvualu",
    rating: 5,
    comment: "Muito satisfeito com a compra. Entrega dentro do prazo.",
    date: "2025-11-05",
    verified: true
  },
  {
    id: "r3-3",
    productId: "3",
    userName: "Rui Alves",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rui%20Alves",
    rating: 4,
    comment: "Bom produto, mas achei o teclado um pouco desconfortável.",
    date: "2025-10-25",
    verified: true
  },
  {
    id: "r3-4",
    userName: "Sofia Neves",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia%20Neves",
    productId: "3",
    rating: 5,
    comment: "Ótimo para edição de fotos. Processador rápido!",
    date: "2025-10-10",
    verified: true
  },

  // Product 4 - Kit Maquilhagem Completo (Beleza)
  {
    id: "r4-1",
    productId: "4",
    userName: "Carla Mendes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carla%20Mendes",
    rating: 5,
    comment: "Kit completo e de boa qualidade. Recomendo!",
    date: "2025-11-18",
    verified: true
  },
  {
    id: "r4-2",
    productId: "4",
    userName: "Teresa Lima",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Teresa%20Lima",
    rating: 4,
    comment: "Muito bom, os pincéis são macios. Vale a pena!",
    date: "2025-11-08",
    verified: true
  },
  {
    id: "r4-3",
    productId: "4",
    userName: "Helena Costa",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Helena%20Costa",
    rating: 5,
    comment: "Excelente variedade de cores. Produto profissional.",
    date: "2025-10-18",
    verified: true
  },

  // Product 6 - Camisa Social Azul (Roupas)
  {
    id: "r6-1",
    productId: "6",
    userName: "António Fernandes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Antonio%20Fernandes",
    rating: 5,
    comment: "Camisa de muito boa qualidade. Cor e ajuste perfeitos.",
    date: "2025-11-22",
    verified: true
  },
  {
    id: "r6-2",
    productId: "6",
    userName: "Miguel Santos",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel%20Santos",
    rating: 4,
    comment: "Muito elegante, só encolheu um pouco na lavagem.",
    date: "2025-11-12",
    verified: true
  },
  {
    id: "r6-3",
    productId: "6",
    userName: "Carlos Santos",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos%20Santos",
    rating: 5,
    comment: "Tecido macio e confortável. Produto excelente!",
    date: "2025-10-28",
    verified: true
  },

  // Product 7 - Power Bank 10.000mAh (Eletrónicos)
  {
    id: "r7-1",
    productId: "7",
    userName: "Joana Ribeiro",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joana%20Ribeiro",
    rating: 5,
    comment: "Muito útil! Carrega o telemóvel rapidamente.",
    date: "2025-11-28",
    verified: true
  },
  {
    id: "r7-2",
    productId: "7",
    userName: "Fernando Dias",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernando%20Dias",
    rating: 4,
    comment: "Bom produto, mas é um pouco pesado para levar.",
    date: "2025-11-14",
    verified: true
  },
  {
    id: "r7-3",
    productId: "7",
    userName: "Gonçalo Martins",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Goncalo%20Martins",
    rating: 5,
    comment: "Ótima bateria! Dura muito tempo.",
    date: "2025-11-02",
    verified: true
  },
  {
    id: "r7-4",
    productId: "7",
    userName: "Marta Oliveira",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marta%20Oliveira",
    rating: 5,
    comment: "Imprescindível para viagens. Muito prático!",
    date: "2025-10-17",
    verified: true
  },

  // Product 8 - Óleo de Coco Natural (Beleza)
  {
    id: "r8-1",
    productId: "8",
    userName: "Lúcia Pinto",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucia%20Pinto",
    rating: 5,
    comment: "Óleo muito bom! O cabelo ficou muito mais bonito.",
    date: "2025-11-26",
    verified: true
  },
  {
    id: "r8-2",
    productId: "8",
    userName: "Rita Marques",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rita%20Marques",
    rating: 5,
    comment: "Produto puro e natural. Recomendo muito!",
    date: "2025-11-16",
    verified: true
  },
  {
    id: "r8-3",
    productId: "8",
    userName: "Vanessa Araújo",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vanessa%20Araujo",
    rating: 5,
    comment: "Melhora muito a pele. Uso todos os dias!",
    date: "2025-11-06",
    verified: true
  },

  // Product 9 - Máscara Africana Decorativa (Artesanato)
  {
    id: "r9-1",
    productId: "9",
    userName: "Estêvão Silva",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Estevao%20Silva",
    rating: 5,
    comment: "Máscara bela e bem esculpida. Peça única!",
    date: "2025-11-24",
    verified: true
  },
  {
    id: "r9-2",
    productId: "9",
    userName: "Nuno Rocha",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nuno%20Rocha",
    rating: 5,
    comment: "Obra de arte! Muito bem feita.",
    date: "2025-11-09",
    verified: true
  },

  // Product 10 - Vestido Cocktail Preto (Roupas)
  {
    id: "r10-1",
    productId: "10",
    userName: "Andrea Mendes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andrea%20Mendes",
    rating: 5,
    comment: "Vestido muito elegante! Perfeito para festas.",
    date: "2025-11-23",
    verified: true
  },
  {
    id: "r10-2",
    productId: "10",
    userName: "Tiago Moreira",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tiago%20Moreira",
    rating: 5,
    comment: "Minha namorada adorou! Muito bonito.",
    date: "2025-11-11",
    verified: true
  },
  {
    id: "r10-3",
    productId: "10",
    userName: "Beatriz Lopes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz%20Lopes",
    rating: 4,
    comment: "Elegante e confortável. Recomendo!",
    date: "2025-10-30",
    verified: true
  },

  // Product 11 - Calças Jeans Femininas (Roupas)
  {
    id: "r11-1",
    productId: "11",
    userName: "Filomena Costa",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Filomena%20Costa",
    rating: 5,
    comment: "Calças muito confortáveis! Ajuste perfeito.",
    date: "2025-11-19",
    verified: true
  },
  {
    id: "r11-2",
    productId: "11",
    userName: "Sofia Neves",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia%20Neves",
    rating: 4,
    comment: "Muito boas, chegaram rápido!",
    date: "2025-11-03",
    verified: true
  },
  {
    id: "r11-3",
    productId: "11",
    userName: "Rosa Tavares",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rosa%20Tavares",
    rating: 5,
    comment: "Melhor que esperava. Uso todos os dias!",
    date: "2025-10-21",
    verified: true
  },

  // Product 12 - Auscultadores Bluetooth (Eletrónicos)
  {
    id: "r12-1",
    productId: "12",
    userName: "Pedro Neto",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro%20Neto",
    rating: 5,
    comment: "Som excelente! Cancelamento de ruído perfeito.",
    date: "2025-11-27",
    verified: true
  },
  {
    id: "r12-2",
    productId: "12",
    userName: "David Luvualu",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David%20Luvualu",
    rating: 5,
    comment: "Confortáveis e de bom som. Muito bom!",
    date: "2025-11-13",
    verified: true
  },
  {
    id: "r12-3",
    productId: "12",
    userName: "Paulo Silva",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Paulo%20Silva",
    rating: 4,
    comment: "Bateria dura muito. Recomendo!",
    date: "2025-10-27",
    verified: true
  },

  // Product 13 - Perfume Masculino 100ml (Beleza)
  {
    id: "r13-1",
    productId: "13",
    userName: "Carla Mendes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carla%20Mendes",
    rating: 5,
    comment: "Perfume muito bom! Cheiro sofisticado.",
    date: "2025-11-21",
    verified: true
  },
  {
    id: "r13-2",
    productId: "13",
    userName: "Teresa Lima",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Teresa%20Lima",
    rating: 5,
    comment: "Dura muito. Qualidade excelente!",
    date: "2025-11-07",
    verified: true
  },
  {
    id: "r13-3",
    productId: "13",
    userName: "Helena Costa",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Helena%20Costa",
    rating: 5,
    comment: "Meu namorado adorou! Muito bom preço.",
    date: "2025-10-19",
    verified: true
  },

  // Product 14 - Creme Hidratante Facial (Beleza)
  {
    id: "r14-1",
    productId: "14",
    userName: "Kwanza Silva",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kwanza%20Silva",
    rating: 5,
    comment: "Creme muito bom! Pele muito macia.",
    date: "2025-11-17",
    verified: true
  },
  {
    id: "r14-2",
    productId: "14",
    userName: "Beatriz Lopes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz%20Lopes",
    rating: 4,
    comment: "Bom produto, mas dura pouco.",
    date: "2025-10-31",
    verified: true
  },
  {
    id: "r14-3",
    productId: "14",
    userName: "Joana Ribeiro",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joana%20Ribeiro",
    rating: 5,
    comment: "Recomendo! Muito eficaz.",
    date: "2025-10-12",
    verified: true
  },

  // Product 15 - Estatueta de Madeira (Artesanato)
  {
    id: "r15-1",
    productId: "15",
    userName: "Fernando Dias",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernando%20Dias",
    rating: 5,
    comment: "Estatueta linda! Madeira de qualidade.",
    date: "2025-11-25",
    verified: true
  },
  {
    id: "r15-2",
    productId: "15",
    userName: "Gonçalo Martins",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Goncalo%20Martins",
    rating: 5,
    comment: "Obra de arte! Muito bem esculpida.",
    date: "2025-11-04",
    verified: true
  },

  // Product 16 - T-Shirt Básica Branca (Roupas)
  {
    id: "r16-1",
    productId: "16",
    userName: "Marta Oliveira",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marta%20Oliveira",
    rating: 5,
    comment: "T-shirt muito confortável! Algodão puro.",
    date: "2025-11-29",
    verified: true
  },
  {
    id: "r16-2",
    productId: "16",
    userName: "Lúcia Pinto",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucia%20Pinto",
    rating: 4,
    comment: "Boa qualidade. Recomendo!",
    date: "2025-11-08",
    verified: true
  },
  {
    id: "r16-3",
    productId: "16",
    userName: "Rita Marques",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rita%20Marques",
    rating: 5,
    comment: "Perfeita para o dia a dia!",
    date: "2025-10-23",
    verified: true
  },
  {
    id: "r16-4",
    productId: "16",
    userName: "Vanessa Araújo",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vanessa%20Araujo",
    rating: 5,
    comment: "Preço bom, qualidade excelente!",
    date: "2025-10-11",
    verified: true
  },

  // Product 17 - Smartwatch Fitness (Eletrónicos)
  {
    id: "r17-1",
    productId: "17",
    userName: "António Fernandes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Antonio%20Fernandes",
    rating: 5,
    comment: "Relógio muito bom! Monitora tudo certinho.",
    date: "2025-11-20",
    verified: true
  },
  {
    id: "r17-2",
    productId: "17",
    userName: "Miguel Santos",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel%20Santos",
    rating: 4,
    comment: "Muito útil para exercícios!",
    date: "2025-10-29",
    verified: true
  },

  // Product 18 - Polo Masculino Ralph Lauren (Roupas)
  {
    id: "r18-1",
    productId: "18",
    userName: "Carlos Santos",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos%20Santos",
    rating: 5,
    comment: "Polo de marca! Qualidade excelente.",
    date: "2025-11-26",
    verified: true
  },
  {
    id: "r18-2",
    productId: "18",
    userName: "Rui Alves",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rui%20Alves",
    rating: 5,
    comment: "Muito bonita! Uso direto.",
    date: "2025-11-14",
    verified: true
  },
  {
    id: "r18-3",
    productId: "18",
    userName: "Sofia Neves",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia%20Neves",
    rating: 4,
    comment: "Boa qualidade, um pouco cara.",
    date: "2025-10-24",
    verified: true
  },

  // Product 19 - Kit Unhas de Gel (Beleza)
  {
    id: "r19-1",
    productId: "19",
    userName: "Joana Ribeiro",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joana%20Ribeiro",
    rating: 5,
    comment: "Kit completo! Resultados profissionais.",
    date: "2025-11-22",
    verified: true
  },
  {
    id: "r19-2",
    productId: "19",
    userName: "Fernando Dias",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernando%20Dias",
    rating: 5,
    comment: "Minha esposa adorou!",
    date: "2025-11-02",
    verified: true
  },

  // Product 20 - Tapete Tradicional (Artesanato)
  {
    id: "r20-1",
    productId: "20",
    userName: "Gonçalo Martins",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Goncalo%20Martins",
    rating: 5,
    comment: "Tapete muito bonito! Padrão africano autêntico.",
    date: "2025-11-18",
    verified: true
  },

  // Product 21 - Saia Midi Plissada (Roupas)
  {
    id: "r21-1",
    productId: "21",
    userName: "Marta Oliveira",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marta%20Oliveira",
    rating: 5,
    comment: "Saia muito elegante! Fica bem em qualquer ocasião.",
    date: "2025-11-27",
    verified: true
  },
  {
    id: "r21-2",
    productId: "21",
    userName: "Lúcia Pinto",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucia%20Pinto",
    rating: 4,
    comment: "Bom produto, achei cara.",
    date: "2025-10-16",
    verified: true
  },

  // Product 22 - Tablet Android 10" (Eletrónicos)
  {
    id: "r22-1",
    productId: "22",
    userName: "Rita Marques",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rita%20Marques",
    rating: 5,
    comment: "Tablet excelente! Tela muito clara.",
    date: "2025-11-23",
    verified: true
  },
  {
    id: "r22-2",
    productId: "22",
    userName: "Vanessa Araújo",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vanessa%20Araujo",
    rating: 4,
    comment: "Muito bom para vídeos e leitura!",
    date: "2025-10-28",
    verified: true
  },

  // Product 23 - PC Desktop Gaming (Eletrónicos)
  {
    id: "r23-1",
    productId: "23",
    userName: "Estêvão Silva",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Estevao%20Silva",
    rating: 5,
    comment: "PC gaming muito poderoso! Joga tudo no ultra!",
    date: "2025-11-21",
    verified: true
  },
  {
    id: "r23-2",
    productId: "23",
    userName: "Nuno Rocha",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nuno%20Rocha",
    rating: 5,
    comment: "Investimento excelente! Performance incrível.",
    date: "2025-11-06",
    verified: true
  },
  {
    id: "r23-3",
    productId: "23",
    userName: "Andrea Mendes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andrea%20Mendes",
    rating: 5,
    comment: "Muito bom para trabalho e games!",
    date: "2025-10-22",
    verified: true
  },

  // Product 24 - Perfume Floral 100ml (Beleza)
  {
    id: "r24-1",
    productId: "24",
    userName: "Tiago Moreira",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tiago%20Moreira",
    rating: 5,
    comment: "Perfume feminino muito bom! Cheiro fresco.",
    date: "2025-11-19",
    verified: true
  },
  {
    id: "r24-2",
    productId: "24",
    userName: "Carla Mendes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carla%20Mendes",
    rating: 5,
    comment: "Adorei! Dura muito tempo.",
    date: "2025-10-31",
    verified: true
  },
  {
    id: "r24-3",
    productId: "24",
    userName: "Teresa Lima",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Teresa%20Lima",
    rating: 5,
    comment: "Muito elegante! Recomendo!",
    date: "2025-10-14",
    verified: true
  },

  // Product 25 - Colar de Missangas (Artesanato)
  {
    id: "r25-1",
    productId: "25",
    userName: "Helena Costa",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Helena%20Costa",
    rating: 5,
    comment: "Colar muito bonito! Cores vibrantes.",
    date: "2025-11-24",
    verified: true
  },
  {
    id: "r25-2",
    productId: "25",
    userName: "Kwanza Silva",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kwanza%20Silva",
    rating: 4,
    comment: "Artesanato de qualidade!",
    date: "2025-10-13",
    verified: true
  },

  // Product 26 - Blazer Feminino (Roupas)
  {
    id: "r26-1",
    productId: "26",
    userName: "Beatriz Lopes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz%20Lopes",
    rating: 5,
    comment: "Blazer muito elegante! Muito bom.",
    date: "2025-11-25",
    verified: true
  },
  {
    id: "r26-2",
    productId: "26",
    userName: "Pedro Neto",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro%20Neto",
    rating: 5,
    comment: "Minha mulher adorou!",
    date: "2025-10-26",
    verified: true
  },

  // Product 27 - Câmara de Segurança WiFi (Eletrónicos)
  {
    id: "r27-1",
    productId: "27",
    userName: "David Luvualu",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David%20Luvualu",
    rating: 5,
    comment: "Câmara muito boa! Visão noturna perfeita.",
    date: "2025-11-20",
    verified: true
  },
  {
    id: "r27-2",
    productId: "27",
    userName: "Paulo Silva",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Paulo%20Silva",
    rating: 4,
    comment: "Bom produto. Fácil de instalar!",
    date: "2025-10-20",
    verified: true
  },
  {
    id: "r27-3",
    productId: "27",
    userName: "Rui Alves",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rui%20Alves",
    rating: 5,
    comment: "Excelente segurança para casa!",
    date: "2025-10-05",
    verified: true
  },

  // Product 28 - Bolsa Feminina Elegante (Acessórios)
  {
    id: "r28-1",
    productId: "28",
    userName: "Sofia Neves",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia%20Neves",
    rating: 5,
    comment: "Bolsa linda! Couro bom e resistente.",
    date: "2025-11-28",
    verified: true
  },
  {
    id: "r28-2",
    productId: "28",
    userName: "Joana Ribeiro",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joana%20Ribeiro",
    rating: 5,
    comment: "Muito elegante! Cabe tudo dentro.",
    date: "2025-11-09",
    verified: true
  },
  {
    id: "r28-3",
    productId: "28",
    userName: "Fernando Dias",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernando%20Dias",
    rating: 4,
    comment: "Boa qualidade. Achei um pouco cara.",
    date: "2025-10-25",
    verified: true
  },
  {
    id: "r28-4",
    productId: "28",
    userName: "Gonçalo Martins",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Goncalo%20Martins",
    rating: 5,
    comment: "Presente perfeito! Minha namorada adorou.",
    date: "2025-10-09",
    verified: true
  },

  // Product 29 - Óleo de Rícino 200ml (Beleza)
  {
    id: "r29-1",
    productId: "29",
    userName: "Marta Oliveira",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marta%20Oliveira",
    rating: 5,
    comment: "Óleo excelente para o cabelo!",
    date: "2025-11-17",
    verified: true
  },
  {
    id: "r29-2",
    productId: "29",
    userName: "Lúcia Pinto",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucia%20Pinto",
    rating: 5,
    comment: "Cabelo cresce muito! Recomendo!",
    date: "2025-10-27",
    verified: true
  },
  {
    id: "r29-3",
    productId: "29",
    userName: "Rita Marques",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rita%20Marques",
    rating: 4,
    comment: "Muito bom. Preço acessível!",
    date: "2025-10-08",
    verified: true
  },

  // Product 30 - Pulseira de Couro (Artesanato)
  {
    id: "r30-1",
    productId: "30",
    userName: "Vanessa Araújo",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vanessa%20Araujo",
    rating: 5,
    comment: "Pulseira muito bonita! Couro autêntico.",
    date: "2025-11-21",
    verified: true
  },
  {
    id: "r30-2",
    productId: "30",
    userName: "Estêvão Silva",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Estevao%20Silva",
    rating: 5,
    comment: "Artesanal e de qualidade!",
    date: "2025-10-18",
    verified: true
  },
  {
    id: "r30-3",
    productId: "30",
    userName: "Nuno Rocha",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nuno%20Rocha",
    rating: 4,
    comment: "Bom preço, boa qualidade!",
    date: "2025-10-03",
    verified: true
  },

  // Product 32 - Coluna Bluetooth Portátil (Eletrónicos)
  {
    id: "r32-1",
    productId: "32",
    userName: "Andrea Mendes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andrea%20Mendes",
    rating: 5,
    comment: "Som muito bom! Resistente à água!",
    date: "2025-11-22",
    verified: true
  },
  {
    id: "r32-2",
    productId: "32",
    userName: "Tiago Moreira",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tiago%20Moreira",
    rating: 5,
    comment: "Perfeita para viagens e piscina!",
    date: "2025-11-07",
    verified: true
  },
  {
    id: "r32-3",
    productId: "32",
    userName: "Carla Mendes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carla%20Mendes",
    rating: 5,
    comment: "Melhor coluna que já tive!",
    date: "2025-10-24",
    verified: true
  },
  {
    id: "r32-4",
    productId: "32",
    userName: "Teresa Lima",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Teresa%20Lima",
    rating: 4,
    comment: "Muito bom custo benefício!",
    date: "2025-10-07",
    verified: true
  },

  // Product 33 - Sandálias de Salto Alto (Calçados)
  {
    id: "r33-1",
    productId: "33",
    userName: "Helena Costa",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Helena%20Costa",
    rating: 5,
    comment: "Sandálias muito elegantes! Confortáveis!",
    date: "2025-11-19",
    verified: true
  },
  {
    id: "r33-2",
    productId: "33",
    userName: "Kwanza Silva",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kwanza%20Silva",
    rating: 5,
    comment: "Perfeitas para festas!",
    date: "2025-10-30",
    verified: true
  },
  {
    id: "r33-3",
    productId: "33",
    userName: "Beatriz Lopes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz%20Lopes",
    rating: 4,
    comment: "Bom preço. Achei um pouco apertada.",
    date: "2025-10-06",
    verified: true
  },

  // Product 34 - Shampoo Natural 300ml (Beleza)
  {
    id: "r34-1",
    productId: "34",
    userName: "Pedro Neto",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro%20Neto",
    rating: 5,
    comment: "Shampoo muito bom! Cabelo brilhante!",
    date: "2025-11-23",
    verified: true
  },
  {
    id: "r34-2",
    productId: "34",
    userName: "David Luvualu",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David%20Luvualu",
    rating: 5,
    comment: "Sem sulfatos! Muito bom para cabelo!",
    date: "2025-11-08",
    verified: true
  },
  {
    id: "r34-3",
    productId: "34",
    userName: "Paulo Silva",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Paulo%20Silva",
    rating: 4,
    comment: "Boa qualidade natural!",
    date: "2025-10-21",
    verified: true
  },
  {
    id: "r34-4",
    productId: "34",
    userName: "Rui Alves",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rui%20Alves",
    rating: 5,
    comment: "Recomendo muito!",
    date: "2025-10-02",
    verified: true
  },

  // Product 35 - Quadro Decorativo Africano (Artesanato)
  {
    id: "r35-1",
    productId: "35",
    userName: "Sofia Neves",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia%20Neves",
    rating: 5,
    comment: "Quadro lindo! Arte africana autêntica!",
    date: "2025-11-18",
    verified: true
  },
  {
    id: "r35-2",
    productId: "35",
    userName: "Joana Ribeiro",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joana%20Ribeiro",
    rating: 5,
    comment: "Muito bonito para decorar a sala!",
    date: "2025-10-29",
    verified: true
  },

  // Product 36 - Fato Social Masculino (Roupas)
  {
    id: "r36-1",
    productId: "36",
    userName: "Fernando Dias",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernando%20Dias",
    rating: 5,
    comment: "Fato muito elegante! Corte perfeito!",
    date: "2025-11-24",
    verified: true
  },
  {
    id: "r36-2",
    productId: "36",
    userName: "Gonçalo Martins",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Goncalo%20Martins",
    rating: 5,
    comment: "Muito bem feito! Recomendo!",
    date: "2025-10-17",
    verified: true
  },

  // Product 37 - Camisola SL Benfica 24/25 (Roupas)
  {
    id: "r37-1",
    productId: "37",
    userName: "Marta Oliveira",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marta%20Oliveira",
    rating: 5,
    comment: "Camisola oficial! Muito bonita!",
    date: "2025-11-21",
    verified: true
  },
  {
    id: "r37-2",
    productId: "37",
    userName: "Lúcia Pinto",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucia%20Pinto",
    rating: 5,
    comment: "Fã do Benfica? Compre já!",
    date: "2025-11-06",
    verified: true
  },
  {
    id: "r37-3",
    productId: "37",
    userName: "Rita Marques",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rita%20Marques",
    rating: 5,
    comment: "Preço bom para camisola oficial!",
    date: "2025-10-19",
    verified: true
  },
  {
    id: "r37-4",
    productId: "37",
    userName: "Vanessa Araújo",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vanessa%20Araujo",
    rating: 5,
    comment: "Excelente qualidade!",
    date: "2025-09-28",
    verified: true
  },

  // Product 38 - Cachecol SL Benfica (Acessórios)
  {
    id: "r38-1",
    productId: "38",
    userName: "Estêvão Silva",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Estevao%20Silva",
    rating: 5,
    comment: "Cachecol muito bom! Cores vivas!",
    date: "2025-11-20",
    verified: true
  },
  {
    id: "r38-2",
    productId: "38",
    userName: "Nuno Rocha",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nuno%20Rocha",
    rating: 4,
    comment: "Acessório perfeito para adeptos!",
    date: "2025-10-15",
    verified: true
  },
  {
    id: "r38-3",
    productId: "38",
    userName: "Andrea Mendes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andrea%20Mendes",
    rating: 5,
    comment: "Muito aquecido! Excelente!",
    date: "2025-10-01",
    verified: true
  },

  // Product 39 - Camisa Social Branca (Roupas)
  {
    id: "r39-1",
    productId: "39",
    userName: "Tiago Moreira",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tiago%20Moreira",
    rating: 5,
    comment: "Camisa muito boa! Algodão egípcio puro!",
    date: "2025-11-17",
    verified: true
  },
  {
    id: "r39-2",
    productId: "39",
    userName: "Carla Mendes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carla%20Mendes",
    rating: 5,
    comment: "Perfeita para o trabalho!",
    date: "2025-10-28",
    verified: true
  },
  {
    id: "r39-3",
    productId: "39",
    userName: "Teresa Lima",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Teresa%20Lima",
    rating: 4,
    comment: "Boa qualidade!",
    date: "2025-10-04",
    verified: true
  },

  // Product 40 - Sapatos Sociais Pretos (Calçados)
  {
    id: "r40-1",
    productId: "40",
    userName: "Helena Costa",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Helena%20Costa",
    rating: 5,
    comment: "Sapatos muito elegantes! Couro bom!",
    date: "2025-11-19",
    verified: true
  },
  {
    id: "r40-2",
    productId: "40",
    userName: "Kwanza Silva",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kwanza%20Silva",
    rating: 5,
    comment: "Confortáveis e duráveis!",
    date: "2025-10-26",
    verified: true
  },

  // Product 41 - Gravata Seda Azul (Acessórios)
  {
    id: "r41-1",
    productId: "41",
    userName: "Beatriz Lopes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz%20Lopes",
    rating: 5,
    comment: "Gravata muito bela! Seda pura!",
    date: "2025-11-16",
    verified: true
  },
  {
    id: "r41-2",
    productId: "41",
    userName: "Pedro Neto",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro%20Neto",
    rating: 4,
    comment: "Cor discreta e elegante!",
    date: "2025-10-12",
    verified: true
  },

  // Product 42 - Boné SL Benfica (Acessórios)
  {
    id: "r42-1",
    productId: "42",
    userName: "David Luvualu",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David%20Luvualu",
    rating: 5,
    comment: "Boné oficial do Benfica! Muito bom!",
    date: "2025-11-22",
    verified: true
  },
  {
    id: "r42-2",
    productId: "42",
    userName: "Paulo Silva",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Paulo%20Silva",
    rating: 5,
    comment: "Ajustável e confortável!",
    date: "2025-11-09",
    verified: true
  },
  {
    id: "r42-3",
    productId: "42",
    userName: "Rui Alves",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rui%20Alves",
    rating: 4,
    comment: "Bom preço!",
    date: "2025-10-23",
    verified: true
  },
  {
    id: "r42-4",
    productId: "42",
    userName: "Sofia Neves",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia%20Neves",
    rating: 5,
    comment: "Presente perfeito para adepto!",
    date: "2025-09-25",
    verified: true
  },

  // Product 43 - Relógio Clássico Masculino (Acessórios)
  {
    id: "r43-1",
    productId: "43",
    userName: "Joana Ribeiro",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joana%20Ribeiro",
    rating: 5,
    comment: "Relógio muito elegante! Pulsoira de couro!",
    date: "2025-11-20",
    verified: true
  },
  {
    id: "r43-2",
    productId: "43",
    userName: "Fernando Dias",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernando%20Dias",
    rating: 5,
    comment: "Design sofisticado!",
    date: "2025-10-19",
    verified: true
  },
  {
    id: "r43-3",
    productId: "43",
    userName: "Gonçalo Martins",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Goncalo%20Martins",
    rating: 4,
    comment: "Bom preço para a qualidade!",
    date: "2025-10-02",
    verified: true
  },

  // Product 44 - Mala Executiva (Acessórios)
  {
    id: "r44-1",
    productId: "44",
    userName: "Marta Oliveira",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marta%20Oliveira",
    rating: 5,
    comment: "Mala muito resistente! Couro bom!",
    date: "2025-11-18",
    verified: true
  },
  {
    id: "r44-2",
    productId: "44",
    userName: "Lúcia Pinto",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucia%20Pinto",
    rating: 5,
    comment: "Perfeita para executivos!",
    date: "2025-10-30",
    verified: true
  },
  {
    id: "r44-3",
    productId: "44",
    userName: "Rita Marques",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rita%20Marques",
    rating: 5,
    comment: "Muitos compartimentos! Muito útil!",
    date: "2025-10-11",
    verified: true
  },

  // Product 45 - Cinto de Couro (Acessórios)
  {
    id: "r45-1",
    productId: "45",
    userName: "Vanessa Araújo",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vanessa%20Araujo",
    rating: 5,
    comment: "Cinto de couro legítimo! Muito bom!",
    date: "2025-11-25",
    verified: true
  },
  {
    id: "r45-2",
    productId: "45",
    userName: "Estêvão Silva",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Estevao%20Silva",
    rating: 5,
    comment: "Fivela bonita! Muito resistente!",
    date: "2025-10-27",
    verified: true
  },
  {
    id: "r45-3",
    productId: "45",
    userName: "Nuno Rocha",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nuno%20Rocha",
    rating: 4,
    comment: "Bom preço!",
    date: "2025-10-08",
    verified: true
  },
  {
    id: "r45-4",
    productId: "45",
    userName: "Andrea Mendes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andrea%20Mendes",
    rating: 5,
    comment: "Dura muito! Ótima qualidade!",
    date: "2025-09-20",
    verified: true
  },

  // Product 46 - Vestido de Noite (Roupas)
  {
    id: "r46-1",
    productId: "46",
    userName: "Tiago Moreira",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tiago%20Moreira",
    rating: 5,
    comment: "Vestido longo muito elegante! Lindo!",
    date: "2025-11-21",
    verified: true
  },
  {
    id: "r46-2",
    productId: "46",
    userName: "Carla Mendes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carla%20Mendes",
    rating: 5,
    comment: "Perfeito para festas e eventos especiais!",
    date: "2025-10-24",
    verified: true
  },

  // Product 47 - Calças Sociais Pretas (Roupas)
  {
    id: "r47-1",
    productId: "47",
    userName: "Teresa Lima",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Teresa%20Lima",
    rating: 5,
    comment: "Calças de alfaiataria! Muito bem feitas!",
    date: "2025-11-19",
    verified: true
  },
  {
    id: "r47-2",
    productId: "47",
    userName: "Helena Costa",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Helena%20Costa",
    rating: 4,
    comment: "Corte reto e elegante!",
    date: "2025-10-29",
    verified: true
  },
  {
    id: "r47-3",
    productId: "47",
    userName: "Kwanza Silva",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kwanza%20Silva",
    rating: 5,
    comment: "Tecido premium! Muito bom!",
    date: "2025-10-06",
    verified: true
  },

  // Product 48 - Bola Oficial SL Benfica (Desporto)
  {
    id: "r48-1",
    productId: "48",
    userName: "Beatriz Lopes",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz%20Lopes",
    rating: 5,
    comment: "Bola oficial! Muito boa para jogar!",
    date: "2025-11-23",
    verified: true
  },
  {
    id: "r48-2",
    productId: "48",
    userName: "Pedro Neto",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro%20Neto",
    rating: 5,
    comment: "Resistente e com bom grip!",
    date: "2025-11-08",
    verified: true
  },
  {
    id: "r48-3",
    productId: "48",
    userName: "David Luvualu",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David%20Luvualu",
    rating: 5,
    comment: "Melhor bola de futebol!",
    date: "2025-10-20",
    verified: true
  },
  {
    id: "r48-4",
    productId: "48",
    userName: "Paulo Silva",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Paulo%20Silva",
    rating: 4,
    comment: "Excelente qualidade!",
    date: "2025-09-19",
    verified: true
  },

  // Product 49 - Mochila Desportiva (Acessórios)
  {
    id: "r49-1",
    productId: "49",
    userName: "Rui Alves",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rui%20Alves",
    rating: 5,
    comment: "Mochila muito resistente! À prova de água!",
    date: "2025-11-20",
    verified: true
  },
  {
    id: "r49-2",
    productId: "49",
    userName: "Sofia Neves",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia%20Neves",
    rating: 5,
    comment: "Perfeita para o ginásio!",
    date: "2025-10-25",
    verified: true
  },
  {
    id: "r49-3",
    productId: "49",
    userName: "Joana Ribeiro",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joana%20Ribeiro",
    rating: 4,
    comment: "Muitos compartimentos!",
    date: "2025-10-05",
    verified: true
  },

  // Product 50 - Óculos de Sol Ray-Ban (Acessórios)
  {
    id: "r50-1",
    productId: "50",
    userName: "Fernando Dias",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernando%20Dias",
    rating: 5,
    comment: "Óculos Ray-Ban autênticos! Muito bons!",
    date: "2025-11-24",
    verified: true
  },
  {
    id: "r50-2",
    productId: "50",
    userName: "Gonçalo Martins",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Goncalo%20Martins",
    rating: 5,
    comment: "Estilo aviador clássico! Muito bom!",
    date: "2025-11-09",
    verified: true
  },
  {
    id: "r50-3",
    productId: "50",
    userName: "Marta Oliveira",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marta%20Oliveira",
    rating: 5,
    comment: "Proteção UV perfeita!",
    date: "2025-10-22",
    verified: true
  },
  {
    id: "r50-4",
    productId: "50",
    userName: "Lúcia Pinto",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucia%20Pinto",
    rating: 5,
    comment: "Excelente qualidade! Recomendo!",
    date: "2025-10-01",
    verified: true
  }
];

export const currentUser: User = {
  id: "vendor-1",
  name: "Maria Santos",
  email: "maria.santos@email.com",
  phone: "+244 923 456 789",
  type: "vendor",
  avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100",
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

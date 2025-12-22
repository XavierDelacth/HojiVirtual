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
    image: "https://images.unsplash.com/photo-1528396518501-b53b655eb9b3?w=400",
    description: "Arte tradicional angolana feita à mão"
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
    description: "Equipamentos desportivos e merchandising de clubes"
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
    description: "Fatos e roupas sociais para profissionais"
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
    description: "Artigos para casa e decoração moderna"
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

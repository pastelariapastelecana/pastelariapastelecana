export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

export const products: Product[] = [
  // Pastéis de Carne
  {
    id: 'p1',
    name: 'Carne - Médio',
    description: 'Pastel recheado com carne moída temperada',
    price: 8.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/V03FW9DG/Pastel-de-Carne-Moida.jpg'
  },
  {
    id: 'p2',
    name: 'Carne - Grande',
    description: 'Pastel recheado com carne moída temperada',
    price: 12.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/V03FW9DG/Pastel-de-Carne-Moida.jpg'
  },
  {
    id: 'p3',
    name: 'Carne com Queijo - Médio',
    description: 'Pastel recheado com queijo mussarela derretido',
    price: 10.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/4wsHNvF9/O-Pastel-de-Carne-visto-de-pertinho-Cada-detalhe-feito-com-muito-amor-para-cada-cliente-V.jpg',
  },
  {
    id: 'p4',
    name: 'Carne com Queijo - Grande',
    description: 'Pastel recheado com queijo mussarela derretido',
    price: 14.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/4wsHNvF9/O-Pastel-de-Carne-visto-de-pertinho-Cada-detalhe-feito-com-muito-amor-para-cada-cliente-V.jpg',
  },
  {
    id: 'p5',
    name: 'Misto - Médio',
    description: 'Carne Moída, Mussarela, Tomate, Milho e Cheiro Verde',
    price: 11.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/KpnLSVRx/024.jpg',
  },
  {
    id: 'p6',
    name: 'Misto - Grande',
    description: 'Carne Moída, Mussarela, Tomate, Milho e Cheiro Verde',
    price: 15.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/KpnLSVRx/024.jpg',
  },
  {
    id: 'p7',
    name: 'Misto com Banana - Médio',
    description: 'Carne Moída, Mussarela, Tomate, Milho, Cheiro Verde e Banana',
    price: 13.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/r2KVY4C8/025.jpg',
  },   
  {
    id: 'p8',
    name: 'Misto com Banana - Grande',
    description: 'Carne Moída, Mussarela, Tomate, Milho e Cheiro Verde',
    price: 16.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/r2KVY4C8/025.jpg',
  },
  {
    id: 'p9',
    name: 'Misto com Bacon - Médio',
    description: 'Carne Moída, Mussarela, Tomate, Milho, Cheiro Verde e Bacon',
    price: 14.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/zV4sjLms/047.jpg',
  },
  {
    id: 'p10',
    name: 'Misto com Bacon - Grande',
    description: 'Carne Moída, Mussarela, Tomate, Milho, Cheiro Verde e Bacon',
    price: 18.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/zV4sjLms/047.jpg',
  },
  {
    id: 'p11',
    name: 'Misto com Catupiry - Médio',
    description: 'Carne Moída, Mussarela, Tomate, Milho, Cheiro Verde e Catupiry',
    price: 14.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/1tKMFysh/027.jpg',
  },

  {
    id: 'p12',
    name: 'Misto com Catupiry - Grande',
    description: 'Carne Moída, Mussarela, Tomate, Milho, Cheiro Verde e Catupiry',
    price: 18.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/1tKMFysh/027.jpg',
  },
  {
    id: 'p13',
    name: 'Misto com Gueiroba - Médio',
    description: 'Carne Moída, Mussarela, Tomate, Milho, Cheiro Verde e Gueiroba',
    price: 14.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/s9F96WVk/028.jpg',
  },
  {
    id: 'p14',
    name: 'Misto com Gueiroba - Grande',
    description: 'Carne Moída, Mussarela, Tomate, Milho, Cheiro Verde e Gueiroba',
    price: 18.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/s9F96WVk/028.jpg',
  },
  {
    id: 'p15',
    name: 'Misto com Jiló - Médio',
    description: 'Carne Moída, Mussarela, Tomate, Milho, Cheiro Verde e Jiló',
    price: 12.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/4wG8SB6W/029.jpg',
  },
  {
    id: 'p16',
    name: 'Misto com Jiló - Grande',
    description: 'Carne Moída, Mussarela, Tomate, Milho, Cheiro Verde e Jiló',
    price: 16.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/4wG8SB6W/029.jpg',
  },
  {
    id: 'p17',
    name: 'Misto com Cheddar - Médio',
    description: 'Carne Moída, Mussarela, Tomate, Milho, Cheiro Verde e Cheddar',
    price: 14.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/99k0MChY/030.jpg',
  },
  {
    id: 'p18',
    name: 'Misto com Cheddar - Grande',
    description: 'Carne Moída, Mussarela, Tomate, Milho, Cheiro Verde, Banana, Bacon, Catupiry, Gueiroba, Jiló e Cheddar',
    price: 18.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/99k0MChY/030.jpg',
  },
  {
    id: 'p19',
    name: 'Misto X-Tudo - Médio',
    description: 'Carne Moída, Mussarela, Tomate, Milho, Cheiro Verde, Banana, Bacon, Catupiry, Gueiroba, Jiló e Cheddar',
    price: 31.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/WNmDJSch/042.jpg',
  },
  {
    id: 'p20',
    name: 'Misto com X-Tudo - Grande',
    description: 'Carne Moída, Mussarela, Tomate, Milho, Cheiro Verde e Cheddar',
    price: 37.00,
    category: 'pasteis',
    imageUrl: 'https://i.ibb.co/WNmDJSch/042.jpg',

    // Pastéis de Frango
  },
  {
    id: 's1',
    name: 'Frango - Médio',
    description: 'Carne desfiada de Frango temperada',
    price: 8.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/x8fcdL80/001.jpg',
  },
  {
    id: 's2',
    name: 'Frango - Grande',
    description: 'Carne desfiada de Frango temperada',
    price: 12.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/x8fcdL80/001.jpg',
  },
  {
    id: 's3',
    name: 'Frango com Queijo - Médio',
    description: 'Carne desfiada de Frango temperada com Queijo',
    price: 10.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/5W9dm8m2/frangocomqueijo.jpg',
  },
  {
    id: 's4',
    name: 'Frango com Queijo - Grande',
    description: 'Carne desfiada de Frango temperada com Queijo',
    price: 14.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/5W9dm8m2/frangocomqueijo.jpg',
  },
  {
    id: 's5',
    name: 'Frango com Catupiry - Médio',
    description: 'Frango, Mussarela, Tomate, Milho, Azeitona, Cheiro Verde e Catupiry',
    price: 14.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/5XW0Nz14/032.jpg',
  },
  {
    id: 's6',
    name: 'Frango com Catupiry - Grande',
    description: 'Frango, Mussarela, Tomate, Milho, Azeitona, Cheiro Verde e Catupiry',
    price: 18.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/5XW0Nz14/032.jpg',
  },
  {
    id: 's7',
    name: 'Frango com Gueiroba - Médio',
    description: 'Frango, Mussarela, Tomate, Milho, Azeitona, Cheiro Verde e Gueiroba',
    price: 14.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/5XW0Nz14/032.jpg',
  },
  {
    id: 's8',
    name: 'Frango com Gueiroba - Grande',
    description: 'Frango, Mussarela, Tomate, Milho, Azeitona, Cheiro Verde e Gueiroba',
    price: 18.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/5XW0Nz14/032.jpg',
  },
  {
    id: 's9',
    name: 'Frango com Cheddar - Médio',
    description: 'Frango, Mussarela, Tomate, Milho, Azeitona, Cheiro Verde e Cheddar',
    price: 14.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/YTBj5Ptx/034.jpg',
  },
  {
    id: 's10',
    name: 'Frango com Cheddar - Grande',
    description: 'Frango, Mussarela, Tomate, Milho, Azeitona, Cheiro Verde e Cheddar',
    price: 18.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/YTBj5Ptx/034.jpg',
  },
  {
    id: 's11',
    name: 'Frango com Bacon - Médio',
    description: 'Frango, Mussarela, Tomate, Milho, Azeitona, Cheiro Verde e Bacon',
    price: 14.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/gbLRqKgq/036.jpg',
  },
  {
    id: 's12',
    name: 'Frango com Bacon - Grande',
    description: 'Frango, Mussarela, Tomate, Milho, Azeitona, Cheiro Verde e Bacon',
    price: 18.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/gbLRqKgq/036.jpg',
  },
  {
    id: 's13',
    name: 'Frango com Palmito - Médio',
    description: 'Frango, Mussarela, Tomate, Milho, Azeitona, Cheiro Verde e Palmito',
    price: 14.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/LzCzWxh5/038.jpg',
  },
  {
    id: 's14',
    name: 'Frango com Palmito - Grande',
    description: 'Frango, Mussarela, Tomate, Milho, Azeitona, Cheiro Verde e Palmito',
    price: 18.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/LzCzWxh5/038.jpg',
  },
  {
    id: 's15',
    name: 'Frango com Presunto - Médio',
    description: 'Frango, Mussarela, Tomate, Milho, Azeitona, Cheiro Verde e Presunto',
    price: 9.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/Ng327Srw/frango-com-presunto.jpg',
  },
  {
    id: 's16',
    name: 'Frango com Presunto - Grande',
    description: 'Frango, Mussarela, Tomate, Milho, Azeitona, Cheiro Verde e Presunto',
    price: 13.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/Ng327Srw/frango-com-presunto.jpg',
  },
  {
    id: 's17',
    name: 'Frango com Calabresa - Médio',
    description: 'Frango, Mussarela, Tomate, Milho, Azeitona, Cheiro Verde e Calabresa',
    price: 12.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/wrzVTzPt/040.jpg',
  },
  {
    id: 's18',
    name: 'Frango com Calabresa - Grande',
    description: 'Frango, Mussarela, Tomate, Milho, Azeitona, Cheiro Verde e Calabresa',
    price: 16.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/wrzVTzPt/040.jpg',
  },
  {
    id: 's19',
    name: 'Frango com Jiló - Médio',
    description: 'Frango, Mussarela, Tomate, Milho, Azeitona, Cheiro Verde e Jiló',
    price: 11.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/ccYfY4p7/frango-com-jilo.jpg',
  },
  {
    id: 's20',
    name: 'Frango com Jiló - Grande',
    description: 'Frango, Mussarela, Tomate, Milho, Azeitona, Cheiro Verde e Jiló',
    price: 15.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/ccYfY4p7/frango-com-jilo.jpg',
  },
  {
    id: 's21',
    name: 'Frango X-Tudo - Médio',
    description: 'Frango, Mussarela, Tomate, Milho, Azeitona, Cheiro Verde, Catupiry, Gueiroba, Cheddar, Bacon, Palmito, Presunto, Calabresa e Jiló',
    price: 31.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/M59QVHgL/015.jpg',
  },
  {
    id: 's22',
    name: 'Frango X-Tudo - Grande',
    description: 'Frango, Mussarela, Tomate, Milho, Azeitona, Cheiro Verde, Catupiry, Gueiroba, Cheddar, Bacon, Palmito, Presunto, Calabresa e Jiló',
    price: 37.00,
    category: 'salgados',
    imageUrl: 'https://i.ibb.co/M59QVHgL/015.jpg',
  },

  // Pastéis de Queijo

  {
    id: 'sd1',
    name: 'Queijo - Médio',
    description: 'Queijo Minas meia cura',
    price: 8.00,
    category: 'sanduiches',
    imageUrl: 'https://i.ibb.co/hx6rckRK/007.jpg',
  },
  {
    id: 'sd2',
    name: 'Queijo - Grande',
    description: 'Queijo Minas meia cura',
    price: 12.00,
    category: 'sanduiches',
    imageUrl: 'https://i.ibb.co/hx6rckRK/007.jpg',
  },
  {
    id: 'sd3',
    name: '02 Queijos - Médio',
    description: 'Mussarela e Catupiry',
    price: 9.00,
    category: 'sanduiches',
    imageUrl: 'https://i.ibb.co/Kp52BxGy/043.jpg',
  },
  {
    id: 'sd4',
    name: '02 Queijos - Grande',
    description: 'Mussarela e Catupiry',
    price: 13.00,
    category: 'sanduiches',
    imageUrl: 'https://i.ibb.co/Kp52BxGy/043.jpg',
  },
  {
    id: 'sd5',
    name: '03 Queijos - Médio',
    description: 'Queijo Minas, Mussarela e Catupiry',
    price: 9.00,
    category: 'sanduiches',
    imageUrl: 'https://i.ibb.co/Lh8jwy0j/044.jpg',
  },
  {
    id: 'sd6',
    name: '03 Queijos - Grande',
    description: 'Queijo Minas, Mussarela e Catupiry',
    price: 13.00,
    category: 'sanduiches',
    imageUrl: 'https://i.ibb.co/Lh8jwy0j/044.jpg',
  },
  {
    id: 'sd7',
    name: '04 Queijos - Médio',
    description: 'Queijo Minas, Mussarela, Provolone e Catupiry',
    price: 10.00,
    category: 'sanduiches',
    imageUrl: 'https://i.ibb.co/qMj9yjBJ/045.jpg',
  },
  {
    id: 'sd8',
    name: '04 Queijos - Grande',
    description: 'Queijo Minas, Mussarela, Provolone e Catupiry',
    price: 14.00,
    category: 'sanduiches',
    imageUrl: 'https://i.ibb.co/qMj9yjBJ/045.jpg',
  },
  {
    id: 'sd9',
    name: '04 Queijos - Médio',
    description: 'Queijo Minas, Mussarela, Provolone, Cheddar e Catupiry',
    price: 11.00,
    category: 'sanduiches',
    imageUrl: 'https://i.ibb.co/FkJmWcwM/046.jpg',
  },
  {
    id: 'sd10',
    name: '04 Queijos - Grande',
    description: 'Queijo Minas, Mussarela, Provolone, Cheddar e Catupiry',
    price: 15.00,
    category: 'sanduiches',
    imageUrl: 'https://i.ibb.co/FkJmWcwM/046.jpg',
  },
  {
    id: 'sd11',
    name: 'Queijo com Bacon - Médio',
    description: 'Queijo Minas, Mussarela, Provolone, Cheddar e Catupiry',
    price: 11.00,
    category: 'sanduiches',
    imageUrl: 'https://i.ibb.co/zV4sjLms/047.jpg',
  },
  {
    id: 'sd12',
    name: 'Queijo com Bacon - Grande',
    description: 'Queijo Minas, Mussarela, Provolone, Cheddar e Catupiry',
    price: 15.00,
    category: 'sanduiches',
    imageUrl: 'https://i.ibb.co/zV4sjLms/047.jpg',
  },
  {
    id: 'sd13',
    name: 'Marguerita - Médio',
    description: 'Tomate, Mussarela e Manjericão',
    price: 11.00,
    category: 'sanduiches',
    imageUrl: 'https://i.ibb.co/QFbFXqnQ/048.jpg',
  },
  {
    id: 'sd14',
    name: 'Marguerita - Grande',
    description: 'Tomate, Mussarela e Manjericão',
    price: 15.00,
    category: 'sanduiches',
    imageUrl: 'https://i.ibb.co/QFbFXqnQ/048.jpg',
  },
  {
    id: 'sd15',
    name: 'Queijo Especial - Médio',
    description: 'Mussarela, Catupiry e Palmito',
    price: 12.00,
    category: 'sanduiches',
    imageUrl: 'https://i.ibb.co/LzCzWxh5/038.jpg',
  },
  {
    id: 'sd16',
    name: 'Queijo Especial - Grande',
    description: 'Mussarela, Catupiry e Palmito',
    price: 16.00,
    category: 'sanduiches',
    imageUrl: 'https://i.ibb.co/LzCzWxh5/038.jpg',
  },

    // Pastéis Especiais

  {
    id: 'd1',
    name: 'Cupim ao Alho - Médio',
    description: 'Cupim, Tomate, Mussarela e Catupiry',
    price: 15.00,
    category: 'doces',
    imageUrl: 'https://i.ibb.co/bRRTgTNj/050.jpg',
  },
  {
    id: 'd2',
    name: 'Cupim ao Alho - Grande',
    description: 'Cupim, Tomate, Mussarela e Catupiry',
    price: 22.00,
    category: 'doces',
    imageUrl: 'https://i.ibb.co/bRRTgTNj/050.jpg',
  },
  {
    id: 'd3',
    name: 'Vegetariana - Médio',
    description: 'Milho, Tomate, Mussarela, Azeitona e Catupiry',
    price: 12.00,
    category: 'doces',
    imageUrl: 'https://i.ibb.co/BVpwn1LJ/051.jpg',
  },
  {
    id: 'd4',
    name: 'Vegetariana - Grande',
    description: 'Milho, Tomate, Mussarela, Azeitona e Catupiry',
    price: 14.00,
    category: 'doces',
    imageUrl: 'https://i.ibb.co/BVpwn1LJ/051.jpg',
  },
  {
    id: 'd5',
    name: 'Pernil - Médio',
    description: 'Pernil, Tomate, Mussarela, e Catupiry',
    price: 15.00,
    category: 'doces',
    imageUrl: 'https://i.ibb.co/dJB5Jh1J/052.jpg',
  },
  {
    id: 'd6',
    name: 'Pernil - Grande',
    description: 'Pernil, Tomate, Mussarela, e Catupiry',
    price: 20.00,
    category: 'doces',
    imageUrl: 'https://i.ibb.co/dJB5Jh1J/052.jpg',
  }, 
  
{
    id: 'd7',
    name: 'Pernil ao molho Barbecue - Médio',
    description: 'Pernil ao molho Barbecue, Tomate, Mussarela, e Catupiry',
    price: 15.00,
    category: 'doces',
    imageUrl: 'https://i.ibb.co/3y9yxN69/053.jpg',
  },
  {
    id: 'd8',
    name: 'Pernil ao molho Barbecue - Grande',
    description: 'Pernil ao molho Barbecue, Tomate, Mussarela, e Catupiry',
    price: 20.00,
    category: 'doces',
    imageUrl: 'https://i.ibb.co/3y9yxN69/053.jpg',
  },
  {
    id: 'd9',
    name: 'Carne Seca - Médio',
    description: 'Carne Seca, Tomate, Mussarela, e Catupiry',
    price: 18.00,
    category: 'doces',
    imageUrl: 'https://i.ibb.co/TBwdxwv6/054.jpg',
  },
  {
    id: 'd10',
    name: 'Carne Seca - Grande',
    description: 'Carne Seca, Tomate, Mussarela, e Catupiry',
    price: 24.00,
    category: 'doces',
    imageUrl: 'https://i.ibb.co/TBwdxwv6/054.jpg',
  },
  {
    id: 'd11',
    name: 'Camarão - Grande',
    description: 'Camarão ao molho de queijo',
    price: 24.00,
    category: 'doces',
    imageUrl: 'https://i.ibb.co/V0G5ppQW/055.jpg',
  },
  {
    id: 'd12',
    name: 'Brócolis com Bacon - Grande',
    description: 'Brócolis, Bacon, Milho, Tomate, Mussarela, Azeitona e Catupiry',
    price: 18.00,
    category: 'doces',
    imageUrl: 'https://i.ibb.co/BVpwn1LJ/051.jpg',
  },
  
  // Pastéis Doces

  {
    id: 't1',
    name: 'Banana com Canela - Médio',
    description: 'Banana, Canela e Mussarela',
    price: 12.00,
    category: 'tortas',
    imageUrl: 'https://i.ibb.co/pB9TdSsT/057.jpg',
  },
  {
    id: 't2',
    name: 'Chocolate ao Leite - Médio',
    description: 'Chocolate ao Leite ',
    price: 13.00,
    category: 'tortas',
    imageUrl: 'https://i.ibb.co/Y79Cd5s9/058.jpg',
  },
  {
    id: 't3',
    name: 'Chocolate Branco - Médio',
    description: 'Chocolate Branco ',
    price: 13.00,
    category: 'tortas',
    imageUrl: 'https://i.ibb.co/xSqG799N/060.jpg',
  },
  {
    id: 't4',
    name: 'Romeu e Julieta - Médio',
    description: 'Doce de goiaba com Queijo Minas ',
    price: 11.00,
    category: 'tortas',
    imageUrl: 'https://i.ibb.co/sJmxgx5N/059.jpg',
  },

  // Caldo de Cana

  {
    id: 'b1',
    name: 'Caldo de Cana 500ml',
    description: 'Cana selecionada e higienizada moída na hora ',
    price: 10.00,
    category: 'bebidas',
    imageUrl: 'https://i.ibb.co/HpDvmc9k/061.jpg',
  },
  {
    id: 'b2',
    name: 'Caldo de Cana c/ Morango 500ml',
    description: 'Cana moída na hora e batida com Morango ',
    price: 15.00,
    category: 'bebidas',
    imageUrl: 'https://i.ibb.co/8gC5tpVt/011.jpg',
  },
  {
    id: 'b3',
    name: 'Caldo de Cana c/ Abacaxi 500ml',
    description: 'Cana moída na hora e batida com Abacaxi ',
    price: 15.00,
    category: 'bebidas',
    imageUrl: 'https://i.ibb.co/WZpwxhf/063.jpg',
  },
  {
    id: 'b4',
    name: 'Caldo de Cana c/ Maracujá 500ml',
    description: 'Cana moída na hora e batida com Maracujá ',
    price: 15.00,
    category: 'bebidas',
    imageUrl: 'https://i.ibb.co/k6Q3hyTV/062.jpg',
  },
  {
    id: 'b5',
    name: 'Caldo de Cana c/ Limão 500ml',
    description: 'Cana moída na hora e batida com Limão ',
    price: 11.00,
    category: 'bebidas',
    imageUrl: 'https://i.ibb.co/xqZDBPgr/064.jpg',
  },
  {
    id: 'b6',
    name: 'Embalagem com lacre 500ml',
    description: 'Embalagem para viagem com lacre',
    price: 1.00,
    category: 'bebidas',
    imageUrl: 'https://i.ibb.co/tP2xGXQn/embalagem.jpg',
  },

  // Refrigerantes

  {
    id: 'r1',
    name: 'Coca Cola Lata 310ml',
    description: 'Coca Cola Lata 310ml',
    price: 5.00,
    category: 'refrigerantes',
    imageUrl: 'https://i.ibb.co/1JXKDzk9/coca310ml.jpg',
  },
  {
    id: 'r2',
    name: 'Coca Cola Zero Lata 310ml',
    description: 'Coca Cola Zero Lata 310ml',
    price: 5.00,
    category: 'refrigerantes',
    imageUrl: 'https://i.ibb.co/5W669b9v/cocazero310.jpg',
  },
  {
    id: 'r3',
    name: 'Coca Cola Lata 220ml',
    description: 'Coca Cola Lata 220ml',
    price: 4.00,
    category: 'refrigerantes',
    imageUrl: 'https://i.ibb.co/KRfjNDj/coca220ml.jpg',
  },
  {
    id: 'r4',
    name: 'Coca Cola zero Lata 220ml',
    description: 'Coca Cola Lata 220ml',
    price: 4.00,
    category: 'refrigerantes',
    imageUrl: 'https://i.ibb.co/KRfjNDj/coca220ml.jpg',
  },
  {
    id: 'r5',
    name: 'Coca Cola com Café Lata 220ml',
    description: 'Coca Cola Lata 220ml',
    price: 4.00,
    category: 'refrigerantes',
    imageUrl: 'https://i.ibb.co/S7VmmmLh/cocacafe.jpg',
  },
  {
    id: 'r6',
    name: 'Coca Cola Pet 200ml',
    description: 'Coca Cola Pet 200ml',
    price: 3.00,
    category: 'refrigerantes',
    imageUrl: 'https://i.ibb.co/FLcZNWy9/cocapet200ml.jpg',
  },
  {
    id: 'r7',
    name: 'Coca Cola Zero Pet 200ml',
    description: 'Coca Cola Zero Pet 200ml',
    price: 3.00,
    category: 'refrigerantes',
    imageUrl: 'https://i.ibb.co/mCnF4LsV/cocazero200.jpg',
  },
  {
    id: 'r8',
    name: 'Coca Cola Pet 1Lt',
    description: 'Coca Cola Pet 1Lt',
    price: 10.00,
    category: 'refrigerantes',
    imageUrl: 'https://i.ibb.co/ymnVGrQh/coca1lt.jpg',
  },
  {
    id: 'r9',
    name: 'Fanta Laranja Lt 310ml',
    description: 'Fanta Laranja Lt 310ml',
    price: 5.00,
    category: 'refrigerantes',
    imageUrl: 'https://i.ibb.co/ccRb4t9q/fantalaranja310.jpg',
  },
  {
    id: 'r10',
    name: 'Fanta Uva Lt 310ml',
    description: 'Fanta Uva Lt 310ml',
    price: 5.00,
    category: 'refrigerantes',
    imageUrl: 'https://i.ibb.co/6hQwtjw/fantauva310.jpg',
  },
  {
    id: 'r11',
    name: 'Mineirinho Baby 250ml',
    description: 'Mineirinho Baby 250ml',
    price: 3.00,
    category: 'refrigerantes',
    imageUrl: 'https://i.ibb.co/C5pTN53q/mineirobaby.jpg',
  },
  {
    id: 'r12',
    name: 'Água Mineral s/ Gás 500ml',
    description: 'Água Mineral s/ Gás 500ml',
    price: 3.00,
    category: 'refrigerantes',
    imageUrl: 'https://i.ibb.co/nMcYMmLW/aguasemgas.jpg',
  },
  {
    id: 'r13',
    name: 'Água Mineral c/ Gás 500ml',
    description: 'Água Mineral c/ Gás 500ml',
    price: 3.00,
    category: 'refrigerantes',
    imageUrl: 'https://i.ibb.co/v4tYW5F6/aguacomgas.jpg',
  },

  // Sucos Naturais

  {
    id: 'sc1',
    name: 'Morango 500ml',
    description: 'Suco natural de morango',
    price: 12.00,
    category: 'sucos',
    imageUrl: 'https://i.ibb.co/8q5T4GT/065.jpg',
  },
  {
    id: 'sc2',
    name: 'Açaí 500ml',
    description: 'Suco natural de açaí',
    price: 12.00,
    category: 'sucos',
    imageUrl: 'https://i.ibb.co/1GGK5BgP/075.jpg',
  },
  {
    id: 'sc3',
    name: 'Maracujá 500ml',
    description: 'Suco natural de Maracujá',
    price: 12.00,
    category: 'sucos',
    imageUrl: 'https://i.ibb.co/vCG0PNWs/067.jpg',
  },
  {
    id: 'sc4',
    name: 'Laranja 500ml',
    description: 'Suco natural de Laranja',
    price: 12.00,
    category: 'sucos',
    imageUrl: 'https://i.ibb.co/sdbczrQq/068.jpg',
  },
  {
    id: 'sc5',
    name: 'Limão 500ml',
    description: 'Suco natural de Limão',
    price: 8.00,
    category: 'sucos',
    imageUrl: 'https://i.ibb.co/Fbm66yKg/069.jpg',
  },
  {
    id: 'sc6',
    name: 'Abacaxi 500ml',
    description: 'Suco natural de Abacaxi',
    price: 12.00,
    category: 'sucos',
    imageUrl: 'https://i.ibb.co/sdRQDf1W/070.jpg',
  },
  {
    id: 'sc7',
    name: 'Abacaxi c/ Hortelã 500ml',
    description: 'Suco natural de Abacaxi com Hortelã',
    price: 13.00,
    category: 'sucos',
    imageUrl: 'https://i.ibb.co/tMMPxs0q/072.jpg',
  },
  {
    id: 'sc8',
    name: 'Embalagem com lacre 500ml',
    description: 'Embalagem para viagem com lacre',
    price: 1.00,
    category: 'sucos',
    imageUrl: 'https://i.ibb.co/tP2xGXQn/embalagem.jpg',
  },

  // Vitaminas

  {
    id: 'v1',
    name: 'Morango 500ml',
    description: 'Vitamina de Morango',
    price: 13.00,
    category: 'vitaminas',
    imageUrl: 'https://i.ibb.co/FkWTBqSj/vitaminademorango.jpg',
  },
  {
    id: 'v2',
    name: 'Banana 500ml',
    description: 'Vitamina de Banana',
    price: 12.00,
    category: 'vitaminas',
    imageUrl: 'https://i.ibb.co/QFSpXxM7/076.jpg',
  },
  {
    id: 'v3',
    name: 'Açaí 500ml',
    description: 'Vitamina de Açaí',
    price: 13.00,
    category: 'vitaminas',
    imageUrl: 'https://i.ibb.co/66RpjKx/073.jpg',
  },
  {
    id: 'v4',
    name: 'Mamão 500ml',
    description: 'Vitamina de Mamão',
    price: 13.00,
    category: 'vitaminas',
    imageUrl: 'https://i.ibb.co/PZ8tpDBT/077.jpg',
  },
  {
    id: 'v5',
    name: 'Abacate 500ml',
    description: 'Vitamina de Abacate',
    price: 13.00,
    category: 'vitaminas',
    imageUrl: 'https://i.ibb.co/27tT3DwM/078.jpg',
  },
  {
    id: 'v6',
    name: 'Embalagem com lacre 500ml',
    description: 'Embalagem para viagem com lacre',
    price: 1.00,
    category: 'vitaminas',
    imageUrl: 'https://i.ibb.co/tP2xGXQn/embalagem.jpg',
  },

  // Adicionais

  {
    id: 'a1',
    name: 'Catupiry',
    description: 'Adicional de Catupiry',
    price: 4.00,
    category: 'adicionais',
    imageUrl: 'https://i.ibb.co/gZwn45PT/catupiry.jpg',
  },
  {
    id: 'a2',
    name: 'Mussarela',
    description: 'Adicional de Mussarela',
    price: 3.00,
    category: 'adicionais',
    imageUrl: 'https://i.ibb.co/ym9kJb4Q/mussarela.jpg',
  },
  {
    id: 'a3',
    name: 'Presunto',
    description: 'Adicional de Presunto',
    price: 1.00,
    category: 'adicionais',
    imageUrl: 'https://i.ibb.co/GQwWgD9L/presunto.jpg',
  },
  {
    id: 'a4',
    name: 'Milho',
    description: 'Adicional de Milho',
    price: 2.00,
    category: 'adicionais',
    imageUrl: 'https://i.ibb.co/4wyw9ZMB/milho.jpg',
  },
  {
    id: 'a5',
    name: 'Azeitona',
    description: 'Adicional de Azeitona',
    price: 2.00,
    category: 'adicionais',
    imageUrl: 'https://i.ibb.co/qYX2zTh1/azeitona.jpg',
  },
  {
    id: 'a6',
    name: 'Bacon',
    description: 'Adicional de Bacon',
    price: 4.00,
    category: 'adicionais',
    imageUrl: 'https://i.ibb.co/B5jY4S0P/bacon.jpg',
  },
  {
    id: 'a7',
    name: 'Cheddar',
    description: 'Adicional de Cheddar',
    price: 4.00,
    category: 'adicionais',
    imageUrl: 'https://i.ibb.co/Kj8hmtZk/cheddar.jpg',
  },
  {
    id: 'a8',
    name: 'Banana',
    description: 'Adicional de Banana',
    price: 2.00,
    category: 'adicionais',
    imageUrl: 'https://i.ibb.co/JRfShBKv/bananaemrodela.jpg',
  },
  {
    id: 'a9',
    name: 'Palmito',
    description: 'Adicional de Palmito',
    price: 4.00,
    category: 'adicionais',
    imageUrl: 'https://i.ibb.co/WWyjdRx7/palmito.jpg',
  },
  {
    id: 'a10',
    name: 'Queijo Minas',
    description: 'Adicional de Queijo Minas',
    price: 3.00,
    category: 'adicionais',
    imageUrl: 'https://i.ibb.co/fzJQb90r/queijominas.jpg',
  },
  {
    id: 'a11',
    name: 'Gueiroba',
    description: 'Adicional de Gueiroba',
    price: 4.00,
    category: 'adicionais',
    imageUrl: 'https://i.ibb.co/cKg1t59W/gueiroba.jpg',
  },
  {
    id: 'a12',
    name: 'Paçoca',
    description: 'Adicional de Paçoca',
    price: 2.00,
    category: 'adicionais',
    imageUrl: 'https://i.ibb.co/cK1V83HQ/pa-oca.jpg',
  },
  {
    id: 'a13',
    name: 'Leite ninho',
    description: 'Adicional de Leite Ninho',
    price: 2.00,
    category: 'adicionais',
    imageUrl: 'https://i.ibb.co/PsRXW2xM/leiteninho.jpg',
  },
  {
    id: 'a14',
    name: 'Granola ',
    description: 'Adicional de Granola',
    price: 2.00,
    category: 'adicionais',
    imageUrl: 'https://i.ibb.co/8gLQPDB2/granola.jpg',
  },
  {
    id: 'a15',
    name: 'Mel ',
    description: 'Adicional de Mel',
    price: 3.00,
    category: 'adicionais',
    imageUrl: 'https://i.ibb.co/ynrR3r0f/mel.jpg',
  },
  {
    id: 'a16',
    name: 'Aveia ',
    description: 'Adicional de Aveia',
    price: 2.00,
    category: 'adicionais',
    imageUrl: 'https://i.ibb.co/NGwWL65/aveia.jpg',
  },
  {
    id: 'a17',
    name: 'Morango ',
    description: 'Adicional de Morango',
    price: 5.00,
    category: 'adicionais',
    imageUrl: 'https://i.ibb.co/Fv13zgh/morango.jpg',
  },
  


  







  






































































































































];
export const categories = [
  { id: 'pasteis', name: 'Pastéis de Carne' },
  { id: 'salgados', name: 'Pastéis de Frango' },
  { id: 'sanduiches', name: 'Pastéis de Queijo' },
  { id: 'doces', name: 'Pastéis Especiais ' },
  { id: 'tortas', name: 'Pastéis Doces' },
  { id: 'bebidas', name: 'Caldo de Cana' },
  { id: 'refrigerantes', name: 'Refrigerantes' },
  { id: 'sucos', name: 'Sucos' },
  { id: 'vitaminas', name: 'Vitaminas' },
  { id: 'adicionais', name: 'Adicionais' },
];

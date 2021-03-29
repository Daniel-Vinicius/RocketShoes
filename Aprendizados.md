# Rocketshoes

- **1 Usar .find em arrays**

**TODA VEZ que eu quero encontrar 1 elemento dentro de um Array USE FIND**

```tsx
const productExists = cart.find((product) => product.id == productId);

/* Retorno: Product | undefined
{
  "id": 3,
  "title": "Tênis Adidas Duramo Lite 2.0",
  "price": 219.9,
  "image": "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg"
}
*/
```

---

- **2 JSON Server tem os todos os métodos GET, POST, PUT, DELETE**

_Ele altera o arquivo server.json para executar as requisições, também busca, altera e deleta um id específico_

```tsx
// const { data } = await api.get(`stock/${productId}`);
```

---

- **3 Adicionar um novo objeto em um estado do tipo Array**

```tsx
setCart([...cart, { ...responseProducts.data, amount: 1 }]);
```

- **4 Adicionar um novo objeto em um localStorage do tipo Array**

```tsx
localStorage.setItem(
  "@RocketShoes:cart",
  JSON.stringify([...cart, { ...responseProducts.data, amount: 1 }])
);
```

- **5 Usar Map para ALTERAR/ADICIONAR itens em um Array seja ele ou não de objetos**

**TODA VEZ que eu quero adicionar propriedades para cada objeto dentro de um Array USE MAP**

```tsx
const cartFormatted: ProductFormatted[] = response.data.map((product) => ({
  ...product,
  priceFormatted: formatPrice(product.price),
}));

/*
 Antes: {
 amount: 1,
 id: 5,
 image: "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/ modulo-redux/tenis2.jpg",
 price: 139.9,
 title: "Tênis VR Caminhada Confortável Detalhes Couro  Masculino"
}
 Depois: {
 amount: 1,
 id: 5,
 image: "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/ modulo-redux/tenis2.jpg",
 price: 139.9,
 title: "Tênis VR Caminhada Confortável Detalhes Couro  Masculino",
 priceFormatted: "R$ 219,90"
}
*/

/*
 Ex 2, Mudando propriedades de objetos que atendam a uma condição e que estão dentro de um array.
 Abaixo somente os products que tiverem o id igual ao id passado por parâmetro terão sua propriedade amount modificada, todos os outros ficarão exatamente iguais.
*/

const newCardList = cart.map((product) =>
  product.id === productId ? { ...product, amount: 2 } : product
);

// ATENTE-SE A ISSOOOOOOOOO:

const filmes = [
  {
    id: 1,
    name: "Os Parças",
    genrer: "Comédia",
  },
  {
    id: 2,
    name: "Os Tiozinhos",
    genrer: "Ação",
  },
];

const classificacao = "Boa";

// filmesComGeneroInvertido É um Array
const filmesComGeneroInvertido = filmes.map((filme, indice, arrayOriginal) => {
  // JAVASCRIPT É DENTRO DAS CHAVES NO MAP
  if (filme.genrer === "Comédia") {
    return {
      ...filme,
      // Alterando a Propriedade genrer
      genrer: "Ação",
      // Criando a Propriedade classificacao
      classificacao,
    };
  }
  if (filme.genrer === "Ação") {
    return {
      ...filme,
      // Alterando a Propriedade genrer
      genrer: "Comédia",
      // Criando a Propriedade nivel_de_engracades
      nivel_de_engracades: 1000,
    };
  } else {
    // caso nenhuma das condições seja atendida simplesmente retorno o filme do jeito que tava
    return filme;
  }
});
```

- **6 Não Confunda Array Com Objeto**

```tsx
const objeto = {
  prop1: "Tomate",
  prop2: 3,
};

// objeto[0] Não irá retornar nada

// objeto[3] Não irá retornar nada

// objeto['Tomate'] Não irá retornar nada

const array = ["Batata", "Tomate"];

// array[0] irá Retornar Batata pois o item de indice 0 é 'Batata'

// array['Batata'] Não irá retornar nada
```

- **7 Filter**
  Sempre que Precisar de um Array Filtrado USE FILTERR

  Filtrar Filmes de Ação

```tsx
const filmes = [
  {
    id: 1,
    name: "Os Parças",
    genrer: "Comédia",
  },
  {
    id: 2,
    name: "Os Tiozinhos",
    genrer: "Ação",
  },
];

const filmesDeAcao = filmes.filter((filme) => {
  if (filme.genrer === "Ação") {
    return filme;
  }
});

console.log(filmesDeAcao);

/*
Retorna Um Array com os filmes de Ação

[{
  genrer: "Ação",
  id: 2,
  name: "Os Tiozinhos"
}]

*/
```

Filtrar filmes com o id diferente do passado (Sintaxe reduzida)

```tsx
const filmes = [
  {
    id: 1,
    name: "Os Parças",
    genrer: "Comédia",
  },
  {
    id: 2,
    name: "Os Tiozinhos",
    genrer: "Ação",
  },
];

function filtarPorId(id) {
  const filmesDeAcao = filmes.filter((filme) => filme.id !== id);

  return filmesDeAcao;
}

console.log(filtarPorId(2));

/*
Retorna Um Array com todos os filmes menos o de id 2

[{
  genrer: "Comédia",
  id: 1,
  name: "Os Parças"
}]

*/
```

- **8 Reduce**
  Sempre que Precisar Reduzir valores que estão dentro de Arrays USE REDUCE

  Sintaxe:

  ```tsx
  array.reduce(function(acumulador, elementoAtual, indexAtual, arrayOriginal), valorInicial)
  ```

  Detalhes em: https://medium.com/@raullesteves/javascript-entendendo-o-reduce-de-uma-vez-por-todas-c4cbaa16e380

  - Calculando o Total de uma compra a partir de um array de produtos

  OBS: Sempre no reduce é obrigatório retornar por último o acumulador

```tsx
const sapatos = [
  {
    id: 1,
    title: "Tênis de Caminhada Leve Confortável",
    price: 179.9,
    quantidade: 4,
  },
  {
    id: 2,
    title: "Tênis VR Caminhada Confortável Detalhes Couro Masculino",
    price: 139.9,
    quantidade: 4,
  },
  {
    id: 3,
    title: "Tênis Adidas Duramo Lite 2.0",
    price: 219.9,
    quantidade: 4,
  },
];
const total = sapatos.reduce((acumulador, sapato, indice, arrayOriginal) => {
  const { price, quantidade } = sapato;
  return (acumulador += price * quantidade);
}, 0);

console.log(total);
// 2158.8
```

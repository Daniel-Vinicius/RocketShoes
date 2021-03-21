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

// objeto[0] Não irá retornar nada pois nenhuma propriedade do objeto é igual 0

// objeto[3] irá retornar o objeto pois a prop2 do objeto é igual a 3

// objeto['Tomate'] irá retornar o objeto pois a prop1 do objeto é igual 'Tomate'

const array = ["Batata", "Tomate"];

// array[0] irá Retornar Batata pois o item de indice 0 é 'Batata'

// array['Batata'] Sintaxe inválida
```

- **7 Não Confunda Array Com Objeto**

```tsx
const objeto = {
  prop1: "Tomate",
  prop2: 3,
};

// objeto[0] Não irá retornar nada pois nenhuma propriedade do objeto é igual 0

// objeto[3] irá retornar o objeto pois a prop2 do objeto é igual a 3

// objeto['Tomate'] irá retornar o objeto pois a prop1 do objeto é igual 'Tomate'

const array = ["Batata", "Tomate"];

// array[0] irá Retornar Batata pois o item de indice 0 é 'Batata'

// array['Batata'] Sintaxe inválida
```

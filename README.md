# Sweet Table React

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui--->

<img src="https://res.cloudinary.com/dgms21srr/image/upload/v1668517682/importante/1_fwbv1t.png" alt="Sweet table react">

> Sweet Table React, é uma tabela par renderizar dados dinâmicos, com duas opçoes de filtro e paginação.
> Estilizavel

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [x] Paginação
- [x] Filtro Dropdown
- [x] Renderizar componentes
- [ ] Paginação como chamadas API
- [ ] Opçoes de estilização
- [ ] Integração com bibliotecas de UI

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

<!---Estes são apenas requisitos de exemplo. Adicionar, duplicar ou remover conforme necessário--->

- Você instalou a versão 18+ de React e React DOM
- Node Instalado
- Você leu este guia de instalação e uso

## 🚀 Instalando sweet-table-react

Para instalar o sweet-table-react, siga estas etapas:

```
npm install sweet-table-react
```

## ☕ Usando sweet-table-react

Para usar sweet-table-react, siga estas etapas:

Certifique-se que os dados estão em uma array de objetos, como abaixo:

```javascript
const data = [
    {
      "id": "636fd4528d5030434c93e7db",
      "picture": "https://picsum.photos/200/300",
      "age": 26,
      "name": "Mavis Rocha",
      "gender": "female",
      "company": "HOTCAKES",
      "email": "mavisrocha@hotcakes.com",
      "phone": "+1 (918) 585-3587",
      "address": "750 Laurel Avenue, Glidden, Maine, 6794",
      "tags": [
        "anim",
        "labore",
        "aliqua",
        "laboris",
        "veniam",
        "in",
        "sunt"
      ],
      "friends": [
        {
          "id": 0,
          "name": "Tracie Sweeney"
        },
        {
          "id": 1,
          "name": "Jennings Miller"
        },
        {
          "id": 2,
          "name": "Amber Becker"
        }
      ]
    },
    ...
]
```

A estrutura dos dados nesse array é livre, pois vamos montar as colunas conforme o exemplo abaixo:

```javascript
const columns = Object.keys(data[0])
  .filter((arg) => arg !== "id" && arg !== "gender") // Filtrar os dados para exibir
  .map((arg, index) => {
    const column = {
      id: index,
      title: arg,
      width: 100, // Largura da coluna
    };
    // Selecione o que renderizar por coluna
    if (arg === "picture") {
      column["width"] = 200;
      column["element"] = <Image item={data.find((item) => item[arg])} />; // defina se haverá imagem no item
    }
    if (arg === "age") column["width"] = 40;
    if (arg === "email") column["width"] = 150;
    if (arg === "phone") column["width"] = 150;
    if (arg === "address") column["width"] = 220;
    // Exiba comontents nas colunas
    if (arg === "tags") {
      column["width"] = 20;
      column["element"] = (
        <Button
          item={data.find((item) => item[arg])} // Passar o item por props para o elemento
        />
      );
    }
    if (arg === "friends") column["width"] = 20;

    return column;
  });
```

### Entendendo a estrutura

Para montar as colunas, obtenha os valores das chaves de cada um dos objetos do array de dados

```javascript
const columns = Object.keys(data[0]); // data[0] expecifica o primeiro objeto do array
```

Filtre os dados que deseja ou não exibir

```javascript
.filter((arg) => arg !== "id" && arg !== "gender") // Filtrar os dados para exibir
```

Mapeie a estrutura e defina as colunas

```javascript
.map((arg, index) => {
      const column = {
        id: index,
        title: arg,
        width: 100, // Largura da coluna
      };
      return column
}
```

Defina largura da coluna conforme necessário

```javascript
if (arg === "age") column["width"] = 40;
```

Renderize um componente na coluna

```javascript
import Image from "../Image.jsx";
//...
if (arg === "picture") {
  column["width"] = 200;
  column["element"] = <Image item={data.find((item) => item[arg])} />; // Renderize um componente jsx
}
//... or
if (arg === "picture") {
  column["width"] = 200;
  column["element"] = <img src={data.find((item) => item[arg]).src} />; // Renderize um componente html
}
```

Para usar o item atual no componente use

```javascript
<Image
    item={data.find((item) => item[arg])} // Passe a linha em questão como props
 />
 //or
<img
    src={data.find((item) => item[arg]).src}  // Use as propriedades conforme necessário
/>
```

### Montando o Componente

```javascript
<SweetTable
  rows={data}
  columns={columns}
  columnKey="title"
  rowKey="id"
  perPage={perPage} // Linhas por pagina
  rowsSize={data.length} // Quantidade de linhas
  fetchPerPage={false} // Exibir os dados do lado servidor = true
  setPerPage={setPerPage}
  listItemsPerPage={[7, 14, 21, 28]} // define a lista de items por pagina
  filters={[
    {
      id: 1,
      label: "maior de idade",
      property: "age",
      operator: ">",
      filter: 18,
    },
    {
      id: 2,
      label: "Menor de idade",
      property: "age",
      operator: "<",
      filter: 18,
    },
    {
      id: 3,
      label: "Começa com A",
      property: "name",
      operator: "startsWith",
      filter: "A",
    },
    {
      id: 4,
      label: "Termina com O",
      property: "name",
      operator: "endsWith",
      filter: "O",
    },
    {
      id: 5,
      label: "Maior e Igual a 38",
      property: "age",
      operator: ">=",
      filter: 38,
    },
    {
      id: 6,
      label: "Menor e igual a 42",
      property: "age",
      operator: "<=",
      filter: 42,
    },
    {
      id: 7,
      label: "Primeiro Nome é igual a Julianne",
      property: "name",
      operator: "startsWith",
      filter: "Julianne",
    },
    {
      id: 8,
      label: "Tem 29 anos",
      property: "age",
      operator: "===",
      filter: 29,
    },
    {
      id: 10,
      label: "Tem 31 anos",
      property: "age",
      operator: "==",
      filter: "31",
    },
    {
      id: 11,
      label: "Company TERRASYS",
      property: "company",
      operator: "===",
      filter: "TERRASYS",
    },
    {
      id: 12,
      label: "Companhia não é  TERRASYS",
      property: "company",
      operator: "!==",
      filter: "TERRASYS",
    },
    {
      id: 13,
      label: "Email é de musix",
      property: "email",
      operator: "includes",
      filter: "musix",
    },
    {
      id: 14,
      label: "Idade maior que 18 e menor que 42",
      property: "age",
      logicalOparator: {
        logical: "&&",
        operator1: ">",
        filter1: 18,
        operator2: "<",
        filter2: 42,
      },
    },
    {
      id: 15,
      label: "Começa com C ou tem ba",
      property: "name",
      logicalOparator: {
        logical: "||",
        operator1: "startsWith",
        filter1: "C",
        operator2: "includes",
        filter2: "ba",
      },
    },
  ]}
  propertyFilter="name"
/>
```

Vamos entender essas props todas

- É onde passamos o array de dados para o componente

```javascript
rows = { data };
```

- As colunas que montamos acima

```javascript
columns = { columns };
```

- O nome da prorpiedade que você escolheu para as colunas, o padrão é <pre>title</pre>

```javascript
   columnKey="title"

   //Definido ao montar as colunas
    .map((arg, index) => {
    const column = {
      id: index,
      title: arg,// Esta propriedade
      width: 100,
    }; //...
```

- O identificador de cada linha

```javascript
rowKey = "id";
```

- Defina a quantidade de linhas exibir por página

```javascript
perPage = { perPage }; // Linhas por pagina
```

- Função para alterar a quantidade de items por pagina

```javascript
setPerPage = { setPerPage };
```

\*\* Exemplo de uso

```javascript
import { useState } from "react";
const [perPage, setPerPage] = useState(5);
```

- Quantidade total dos items do array

```javascript
rowsSize={data.length} // Quantidade de linhas
```

- Define um array com as opçoes de itens por página

```javascript
listItemsPerPage={[7, 14, 21, 28]} // define a lista de items por pagina
```

<img src="https://res.cloudinary.com/dgms21srr/image/upload/v1668515910/importante/2_w1bhur.png" alt="Sweet table react select filter">

## Filtros

<center><img src="https://res.cloudinary.com/dgms21srr/image/upload/v1668516930/importante/3_iqjl3w.png" alt="sweet table filter"/></center>

```javascript
filters={[
          {id:1,label:'maior de idade', property:'age',operator:'>',filter:18},
          {id:2,label:'Menor de idade', property:'age',operator:'<',filter:18},
          {id:3,label:'Começa com A', property:'name',operator:'startsWith',filter:'A'},
          {id:4,label:'Termina com O', property:'name',operator:'endsWith',filter:'O'},
          {id:5,label:'Maior e Igual a 38', property:'age',operator:'>=',filter:38},
          {id:6,label:'Menor e igual a 42', property:'age',operator:'<=',filter:42},
          {id:7,label:'Primeiro Nome é igual a Julianne', property:'name',operator:'startsWith',filter:"Julianne"},
          {id:8,label:'Tem 29 anos', property:'age',operator:'===',filter:29},
          {id:10,label:'Tem 31 anos', property:'age',operator:'==',filter:"31"},
          {id:11,label:'Company TERRASYS', property:'company',operator:'===',filter:"TERRASYS"},
          {id:12,label:'Companhia não é  TERRASYS', property:'company',operator:'!==',filter:"TERRASYS"},
          {id:13,label:'Email é de musix', property:'email',operator:'includes',filter:"musix"},
          {id:14,label:'Idade maior que 18 e menor que 42', property:'age',logicalOparator:{
            logical:'&&',
            operator1:'>',
            filter1:18,
            operator2:'<',
            filter2:42
          }},
```

Deve ser um array de objetos com essa estrutura acima.
Certifique-se dos seguintes pontos

- Cada filtro possua um id expecifico
- Tenha um <pre>label</pre> para exibição
- Passar a propriedade para ser filtrada em <pre>property</pre>
- Expecificar o filtro em <pre>filter</pre>

* Operadores:
   <table>
       <thead>
           <tr>
               <th>OPERADOR</th>
               <th>COMANDO</th>
           </tr>
       </thead>
       <tbody>
           <tr>
               <td>></td>
               <td>Maior que</td>
           </tr>
           <tr>
               <td><</td>
               <td>Menor que</td>
           </tr>
            <tr>
               <td>>=</td>
               <td>Maior e igual a que</td>
           </tr>
           <tr>
               <td><=</td>
               <td>Menor e igual a que</td>
           </tr>
           <tr>
               <td>==</td>
               <td>Igual</td>
           </tr>
           <tr>
               <td>===</td>
               <td>Exatamente igual</td>
           </tr>
           <tr>
               <td>!=</td>
               <td>Diferente</td>
           </tr>
           <tr>
               <td>!==</td>
               <td>Exatamente diferente</td>
           </tr>
           <tr>
               <td>startsWith</td>
               <td>Começa com:</td>
           </tr>
           <tr>
               <td>endsWith</td>
               <td>Termina com:</td>
           </tr>
           <tr>
               <td>includes</td>
               <td>Inclui ou contém</td>
           </tr>
       </tbody>
   </table>
* Operadores lógicos <pre>logicalOparator</pre>

- Você pode usar operadores lógicos com a seguinte extrutura

```javascript
logicalOparator:{
            logical:'&&',
            operator1:'>',
            filter1:18,
            operator2:'<',
            filter2:42
          }
```

> Existem apenas dois operadores lógicos <pre>&&</pre>(E) e <pre>||</pre>(OU).

### Usando sweet-table-react com next.js

- Crie um componente e importe o SweetTable normalmente

```javascript
// components/Table.jsx

import SweetTable from "sweet-table-react";
//...
<SweetTable
//...
/>;
```
** Crie o state dessa forma
```javascript
import {useState,useEffect} from 'react'
//...
  const [perPage, setPerPage] = useState(); // Linhas por pagina
  useEffect(() => setPerPage(5),[])
//...
```
- Chame esse componente na página de exibição com <a href="https://nextjs.org/docs/advanced-features/dynamic-import" target="_blank">dynamic</a>

```javascript
// pages/index.jsx

   import dynamic from 'next/dynamic';
   const Table = dynamic(
         () => import('../components/Table'),
        { ssr: false }
    );
   //...
   <Table
    //...
   />
```

### Estitlize

Estilize como quiser:
<table>
      <thead>
        <tr>
          <th>Seletor</th>
          <th>Elemento</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>sweet</td>
          <td>Container Principal</td>
        </tr>
        <tr>
          <td>sweet_header_filter</td>
          <td>Container do cabeçalho</td>
        </tr>
        <tr>
          <td>sweet_select_filter</td>
          <td>Dropdown Filtro</td>
        </tr>
        <tr>
          <td>sweet_select_filter > p</td>
          <td>Seletor do filtro dropdown</td>
        </tr>
        <tr>
          <td>sweet_select_filter > p > svg</td>
          <td>Icone do Seletor do filtro dropdown</td>
        </tr>
        <tr>
          <td>sweet_list_options_filter</td>
          <td>Box da lista do filtro dropdown</td>
        </tr>
        <tr>
          <td>sweet_option_filter</td>
          <td>Item da lista do filtro dropdown</td>
        </tr>
        <tr>
          <td>sweet_text_filter</td>
          <td>Box do input do filtro</td>
        </tr>
        <tr>
          <td>sweet_text_filter > input</td>
          <td>Input do filtro</td>
        </tr>
        <tr>
          <td>sweet_text_filter svg</td>
          <td>Icone do input do filtro</td>
        </tr>
        <tr>
          <td>sweet_table_content</td>
          <td>Box com a Tabela</td>
        </tr>
        <tr>
          <td>sweet_table</td>
          <td>Tabela</td>
        </tr>
        <tr>
          <td>sweet_head</td>
          <td>Cabeçalho da Tabela</td>
        </tr>
        <tr>
          <td>sweet_body</td>
          <td>Corpo da tabela</td>
        </tr>
        <tr>
          <td>sweet_head_col</td>
          <td>Coluna do cabeçalho</td>
        </tr>
        <tr>
          <td>sweet_head_row</td>
          <td>Linha do cabeçalho</td>
        </tr>
        <tr>
          <td>sweet_body_col</td>
          <td>Coluna do corpo da tabela</td>
        </tr>
        <tr>
          <td>sweet_body_row</td>
          <td>Linha do corpo da tabela</td>
        </tr>
        <tr>
          <td>sweet_pagination</td>
          <td>Box com items da paginação</td>
        </tr>
        <tr>
          <td>sweet_pagination select</td>
          <td>Select items por pagina</td>
        </tr>
        <tr>
          <td>sweet_pagination button</td>
          <td>Botões da paginação</td>
        </tr>
      </tbody>
    </table>

## 📫 Contribuindo para sweet-table-react

<!---Se o seu README for longo ou se você tiver algum processo ou etapas específicas que deseja que os contribuidores sigam, considere a criação de um arquivo CONTRIBUTING.md separado--->

Para contribuir com sweet-table-react, siga estas etapas:

1. Bifurque este repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin <nome_do_projeto> / <local>`
5. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 🤝 Colaboradores

Este projeto é apenas meu, por enquanto:

<table>
 <tr>
   <td align="center">
     <a href="#">
       <img src="https://res.cloudinary.com/dgms21srr/image/upload/v1667237782/sweet-images/iumq6jrxhkrq5la1qgds.jpg" width="100px;" alt="Foto do Cris Rocha no GitHub"/><br>
       <sub>
         <b>Cris Rocha</b>
       </sub>
     </a>
   </td>
 </tr>
</table>

<!-- ## 😄 Seja um dos contribuidores<br>

Quer fazer parte desse projeto? Clique [AQUI](CONTRIBUTING.md) e leia como contribuir. -->

<!-- ## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes. -->

[⬆ Voltar ao topo](#nome-do-projeto)<br>


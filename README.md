# Sobre o projeto

nesse projeto decidi utilizar a context api para fazer a movimentação dos dados entre as paginas, não é a maneira normal de utilizala mas foi a forma que seria mais facil para fazer o CRUD,não precisei fazer varias requisições para a api.



# Bibliotecas utilizadas

Chakra ui - Utilizei ela pelo fato de ja ter um design system pre configurado e fazer uso de css declarativo

Axios - Utilizado para fazer requisições para api


cypress - Utilizado para fazer testes

# Como utilizar a aplicação

-Primeiramente utilize o npm install ou yarn para fazer download das dependencias
-Apos utilize o npm run start ou yarn start para rodar aplicação

# O que da para fazer na aplicação


-Criar grupos de herois
-Atualizar os grupos de herois
-Remover herois dos grupos
-Adicionar novos herois ao grupo

# Testes

Opitei por utilizar o cypress como ferramenta de testes, utilizei a ferramenta E2E mas não fiz teste E2E fiz testes de validações e de funcionalidadee.

-Para rodar os testes utilize o comando npx cypress run

Poderia melhorar os teste fazendo testes de componentes mas tive problemas com a ferramenta de componente pelo fato dela não estar conseguindo reconhecer os componentes, tentei utlizar o jest mas tambem tive problemas por usar o typescript e ele não reconhecer os imports

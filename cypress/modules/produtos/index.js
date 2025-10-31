export default {
    // Test Case 8 - Verificar todos os produtos
    verificarTodosProdutos() {
        cy.get('a[href="/products"]').click();
        cy.get('.features_items .col-sm-4').should('be.visible');
    },

    verificarDetalhesProduto() {
        cy.get('a[href="/product_details/1"]').first().click();
        cy.get('.product-information').should('be.visible');
        cy.get('.product-information h2').should('be.visible'); // Nome
        cy.get('.product-information p').should('be.visible'); // Categoria, Preço, etc.
    },

    // Test Case 9 - Buscar produto
    buscarProduto(produto) {
        cy.get('#search_product').type(produto);
        cy.get('#submit_search').click();
        cy.get('.features_items h2.title').should('contain', 'Searched Products');
    },

    verificarProdutosBuscados() {
        cy.get('.features_items .col-sm-4').should('be.visible');
    }
}
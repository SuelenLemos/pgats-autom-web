import { faker } from '@faker-js/faker';

export default {
    adicionarProdutoAoCarrinho() {
        cy.get('a[href="/products"]').click();
        cy.get('.features_items .col-sm-4').first().within(() => {
            cy.contains('Add to cart').click();
        });
        cy.contains('button', 'Continue Shopping').click();
    },

    procederCheckout() {
    // Filtrar apenas elementos visíveis
    cy.get('a[href="/view_cart"]')
      .filter(':visible')
      .first()
      .click();
    
    cy.contains('Proceed To Checkout').click();
},

      registrarDuranteCheckout() {
        // VERSÃO OTIMIZADA - Mais robusta e específica
       cy.get('.modal-body > :nth-child(2) > a > u').click();
        
        // Verificar navegação bem-sucedida
        
        
    },
preencherDetalhesPagamento() {
    cy.get('input[name="name_on_card"]').type(faker.person.fullName().toUpperCase());
    cy.get('input[name="card_number"]').type(faker.finance.creditCardNumber().replace(/-/g, ''));
    cy.get('input[name="cvc"]').type(faker.finance.creditCardCVV());
    cy.get('input[name="expiry_month"]').type(faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0'));
    cy.get('input[name="expiry_year"]').type(faker.number.int({ min: 2024, max: 2030 }).toString());
},
    confirmarPedido() {
        cy.get('#submit').click();
        cy.contains('Order Placed!').should('be.visible');
    }
}
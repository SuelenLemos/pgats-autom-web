export default {
    // Test Case 10 - Subscription na home page
    rolarParaSubscription() {
        cy.get('footer').scrollIntoView();
        cy.contains('h2', 'Subscription').should('be.visible');
    },

    preencherSubscription(email) {
        cy.get('#susbscribe_email').type(email);
        cy.get('#subscribe').click();
    },

    verificarSubscriptionSucesso() {
        cy.contains('.alert-success', 'You have been successfully subscribed!')
          .should('be.visible');
    }
}
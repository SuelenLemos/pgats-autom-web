import { faker } from '@faker-js/faker';
class Cadastro {
    preencherFormularioCadastroCompleto() {
        // Implementar o preenchimento do formulário de cadastro completo
         cy.get('#id_gender2').check();
        // poderia usar também o comando abaixo
        //cy.get('input[type="radio"]').check('Mrs');
        
        cy.get('input#password').type('teste1234', {log: false}); //log:false não mostra a senha no log do cypress
        // para combobox ou selects --select
        cy.get('[data-qa=days]').select('4');
        cy.get('[data-qa=months]').select('October');
        cy.get('[data-qa=years]').select('2000');
        cy.get('input[type =checkbox]#newsletter').check();
        cy.get('input[type =checkbox]#optin').check();
        cy.get('[data-qa=first_name]').type(faker.person.firstName());
        cy.get('input#last_name').type(faker.person.lastName());
        cy.get('[data-qa=company]').type('PGATS');
        cy.get('input#address1').type(faker.location.streetAddress());
        cy.get('select#country').select('Singapore');
        cy.get('input#state').type(faker.location.state());
        cy.get('input#city').type(faker.location.city());
        cy.get('input#zipcode').type(faker.location.zipCode());
        cy.get('input#mobile_number').type('+55 11 91234-5678');
        cy.get('[data-qa="create-account"]').click();

        cy.url().should('includes','account_created');
    }

}

export default new Cadastro();
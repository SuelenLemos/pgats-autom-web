import { faker } from '@faker-js/faker';
import userData from '../fixtures/example.json';
import { getRandonEmail } from '../support/helpers.js';

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.viewport('iphone-xr');
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/login"]').click();

    });
    it.only('1-Cadatrar usuário com sucesso', () => {
        const timestamp = new Date().getTime(); //gera um número único baseado no tempo atual, para evitar utilizar email que já existe no site
        
        cy.get('[data-qa="signup-name"]').type('Auau Tester');
        const randonEmail = getRandonEmail();
        console.log('Email gerado:', randonEmail);
        cy.get('[data-qa="signup-email"]').type(randonEmail);
        cy.get('button[data-qa="signup-button"]').click();
        // se fosse pelo texto do botão:
        // cy.get('button:contains("Signup")').click();
        cy.get('#id_gender2').check();
        // poderia usar também o comando abaixo
        //cy.get('input[type="radio"]').check('Mrs');
        cy.get('[data-qa="name"]').should('have.value', 'Auau Tester');
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
        //cy.contanins('b', 'Account Created!')
        
    });

    
    it('2-Fazer login com sucesso', () => {
       
        cy.get('[data-qa="login-email"]').type('miau.cat@tester.com');
        cy.get('[data-qa="login-password"]').type('123456', {log: false});
        cy.get('[data-qa="login-button"]').click();
        cy.get('i.fa-user').parent().should('contain', 'miau miau'); 
        // o nome do usuário aparece dentro de um "link" , a classe desse link se chama fa fa-user,
        //O comando parent vai pegar a classe como referencia e subir um nível na hierarquia do html
        // para verificar se o nome do usuário está visível na tela.

         });

    it('3-Fazer login com usuário incorreto', () => {
       
        cy.get('[data-qa="login-email"]').type('kikat44444@tester.com');
        cy.get('[data-qa="login-password"]').type('123456', {log: false});
        cy.get('[data-qa="login-button"]').click();
        cy.contains('p','Your email or password is incorrect!').should('be.visible');
        // o nome do usuário aparece dentro de um "link" , a classe desse link se chama fa fa-user,
        //O comando parent vai pegar a classe como referencia e subir um nível na hierarquia do html
        // para verificar se o nome do usuário está visível na tela.

         });

    it('4-Fazer logout', () => {
        
        cy.get('[data-qa="login-email"]').type('miau.cat@tester.com');
        cy.get('[data-qa="login-password"]').type('123456', {log: false});
        cy.get('[data-qa="login-button"]').click();
        cy.get('i.fa-user').parent().should('contain', 'miau miau'); 
        cy.get('a[href="/logout"]').click();
        cy.get('a[href="/login"]').should('be.visible');

         });

    it('5-Tentar cadastrar usuário com email já existente', () => {
        
        cy.get('[data-qa="signup-name"]').type('Auau Tester');
        cy.get('[data-qa="signup-email"]').type(`miau.cat@tester.com`);
        cy.get('button[data-qa="signup-button"]').click();
        cy.get('p:contains("Email Address already exist!")').should('be.visible');
        });


    it('6-Formulario de contato', () => {
        cy.get('a[href*=contact]').click();
        cy.get('input[data-qa="name"]').type(userData.name);        
        cy.get('input[data-qa="email"]').type(userData.email);
        cy.get('input[data-qa="subject"]').type(userData.subject);
        cy.get('textarea[data-qa="message"]').type(userData.message);
        cy.fixture('cypressTest.png').as('fileToUpload');
        cy.get('input[type=file').selectFile('@fileToUpload');
        cy.get('[data-qa="submit-button"]').click();
        cy.get('.status').should('be.visible').and('have.text', 'Success! Your details have been submitted successfully.');
    });
});
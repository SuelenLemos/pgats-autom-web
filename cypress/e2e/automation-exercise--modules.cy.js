import { faker } from '@faker-js/faker';
import userData from '../fixtures/example.json';
import menu from '../modules/menu';
import login from '../modules/login';
import cadastro from '../modules/cadastro';
import contato from '../modules/contato';


describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.viewport('iphone-xr');
        cy.visit('https://automationexercise.com/');
        menu.navegarParaLogin();

    });
    it('1-Cadatrar usuário com sucesso', () => {
         
        login.preencherFormularioPreCadastro();
        cadastro.preencherFormularioCadastroCompleto();

        cy.url().should('includes','account_created');
        //cy.contanins('b', 'Account Created!')
        
    });

    
    it('2-Fazer login com sucesso', () => {
       
        login.preencherLoginESenha(userData.email, userData.password);
        cy.get('i.fa-user').parent().should('contain', userData.name);
        cy.get('a[href="/logout"]').should('be.visible'); 
        
         });

    it('3-Fazer login com usuário incorreto', () => {
       
        login.preencherLoginESenha(userData.email, 'senhaerrada');
        cy.contains('p','Your email or password is incorrect!').should('be.visible');
       
         });

    it('4-Fazer logout', () => {
        
        login.preencherLoginESenha(userData.email, userData.password);
        menu.efetuarLogout();
        cy.get('a[href="/login"]').should('be.visible');

         });

    it('5-Tentar cadastrar usuário com email já existente', () => {
        
        cy.get('[data-qa="signup-name"]').type('Auau Tester');
        cy.get('[data-qa="signup-email"]').type(`miau.cat@tester.com`);
        cy.get('button[data-qa="signup-button"]').click();
        cy.get('p:contains("Email Address already exist!")').should('be.visible');
        });


    it.only('6-Formulario de contato', () => {
        menu.navegarParaContato();
        contato.preencherFormularioDeContato();
        cy.get('.status').should('be.visible').and('have.text', 'Success! Your details have been submitted successfully.');
    });
});
/// <reference types = "cypress" />
//describe ou context - suite ou conjunto de testes em um mesmo arquio
// it - um teste dentro de um bloco ou conjunto de teste

//describe - Automation Exercise
// it - Cadastra usuário com sucesso - primeiro teste
//it  - Cadastra usuário com email já existente - segundo teste

// before - executa uma vez antes de todos os testes
// after - executa uma vez depois de todos os testes
// beforeEach - executa antes de cada teste
// afterEach - executa depois de cada teste

//rastrear elementos no html
// TAG  - h1, div, input, button, select, etc
// ID - #nomeDoId (sempre com hashtag #)
// CLASS - .nomeDaClasse (.form-control)
// Atributo - [atributo="valor"] ([data-qa="signup-name"])(name, placeholder, type, etc)


describe('Automation Exercise', () => {
    it('1-Cadatrar usuário com sucesso', () => {
        const timestamp = new Date().getTime(); //gera um número único baseado no tempo atual, para evitar utilizar email que já existe no site
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/login"]').click();
        cy.get('[data-qa="signup-name"]').type('Auau Tester');
        cy.get('[data-qa="signup-email"]').type(`auau-@tester.com`);
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
        cy.get('[data-qa=first_name]').type('Auau');
        cy.get('input#last_name').type('Tester');
        cy.get('[data-qa=company]').type('PGATS');
        cy.get('input#address1').type('Rua dos Cachorros, 123');
        cy.get('select#country').select('Singapore');
        cy.get('input#state').type('State Test');
        cy.get('input#city').type('City Test');
        cy.get('input#zipcode').type('12345-678');
        cy.get('input#mobile_number').type('+55 11 91234-5678');
        cy.get('[data-qa="create-account"]').click();

        cy.url().should('includes','account_created');
        //cy.contanins('b', 'Account Created!')
        
    });

    
    it('2-Fazer login com sucesso', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/login"]').click();
        cy.get('[data-qa="login-email"]').type('miau.cat@tester.com');
        cy.get('[data-qa="login-password"]').type('123456', {log: false});
        cy.get('[data-qa="login-button"]').click();
        cy.get('i.fa-user').parent().should('contain', 'miau miau'); 
        // o nome do usuário aparece dentro de um "link" , a classe desse link se chama fa fa-user,
        //O comando parent vai pegar a classe como referencia e subir um nível na hierarquia do html
        // para verificar se o nome do usuário está visível na tela.

         });

    it('3-Fazer login com usuário incorreto', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/login"]').click();
        cy.get('[data-qa="login-email"]').type('kikat44444@tester.com');
        cy.get('[data-qa="login-password"]').type('123456', {log: false});
        cy.get('[data-qa="login-button"]').click();
        cy.contains('p','Your email or password is incorrect!').should('be.visible');
        // o nome do usuário aparece dentro de um "link" , a classe desse link se chama fa fa-user,
        //O comando parent vai pegar a classe como referencia e subir um nível na hierarquia do html
        // para verificar se o nome do usuário está visível na tela.

         });

    it('4-Fazer logout', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/login"]').click();
        cy.get('[data-qa="login-email"]').type('miau.cat@tester.com');
        cy.get('[data-qa="login-password"]').type('123456', {log: false});
        cy.get('[data-qa="login-button"]').click();
        cy.get('i.fa-user').parent().should('contain', 'miau miau'); 
        cy.get('a[href="/logout"]').click();
        cy.get('a[href="/login"]').should('be.visible');

         });

    it.only('5-Tentar cadastrar usuário com email já existente', () => {
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/login"]').click();
        cy.get('[data-qa="signup-name"]').type('Auau Tester');
        cy.get('[data-qa="signup-email"]').type(`miau.cat@tester.com`);
        cy.get('button[data-qa="signup-button"]').click();
        cy.get('p:contains("Email Address already exist!")').should('be.visible');
        });

}); 
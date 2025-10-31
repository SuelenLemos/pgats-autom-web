import { faker } from '@faker-js/faker';
import userData from '../fixtures/example.json';
import menu from '../modules/menu';
import login from '../modules/login';
import cadastro from '../modules/cadastro';
import contato from '../modules/contato';
import home from '../modules/home';
import produtos from '../modules/produtos';
import checkout from '../modules/checkout';


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


    it('6-Formulario de contato', () => {
        menu.navegarParaContato();
        contato.preencherFormularioDeContato();
        cy.get('.status').should('be.visible').and('have.text', 'Success! Your details have been submitted successfully.');
    });


    it('8 - verificar todos os produtos e detalhes', () => {
        // Step 1: Navegar para produtos
        produtos.verificarTodosProdutos();
        
        // Step 2: Verificar lista de produtos visível
        cy.get('.features_items .col-sm-4').should('have.length.gt', 0);
        
        // Step 3: Clicar em View Product do primeiro produto
        produtos.verificarDetalhesProduto();
        
        // Step 4: Verificar detalhes do produto
        cy.get('.product-information h2').should('be.visible'); // Nome
        cy.get('.product-information p').first().should('be.visible'); // Categoria
        cy.get('.product-information span span').should('be.visible'); // Preço
    });

    // TEST CASE 9 - Search Product
    it('9 - buscar produto', () => {
        // Step 1: Navegar para produtos
        produtos.verificarTodosProdutos();
        
        // Step 2: Buscar produto
        produtos.buscarProduto('T-Shirt');
        
        // Step 3: Verificar produtos relacionados
        produtos.verificarProdutosBuscados();
        
        // Verificar que todos os produtos contém "T-Shirt" no nome
        cy.get('.features_items .productinfo p').each(($el) => {
            cy.wrap($el).invoke('text').should('include', 'T-Shirt');
        });
    });

    // TEST CASE 10 - Verify Subscription in home page
    it('10 - verificar subscription na home page', () => {
        // Step 1: Rolar até o footer
        home.rolarParaSubscription();
        
        // Step 2: Preencher e enviar subscription
        home.preencherSubscription(faker.internet.email());
        
        // Step 3: Verificar mensagem de sucesso
        home.verificarSubscriptionSucesso();
    });

    // TEST CASE 15 - Place Order: Register while Checkout
    it.only('15 - finalizar pedido com cadastro durante checkout', () => {
        const email = faker.internet.email();
        const password = faker.internet.password();
        
        // Step 1: Adicionar produto ao carrinho
        checkout.adicionarProdutoAoCarrinho();
        
        // Step 2: Proceder para checkout
        checkout.procederCheckout();
        
        // Step 3: Registrar/Login durante checkout
        checkout.registrarDuranteCheckout();
        
        // Step 4: Cadastrar novo usuário
        login.preencherFormularioPreCadastro(email, password);
        cadastro.preencherFormularioCadastroCompleto();
        
        // Step 5: Voltar para checkout
        cy.get('a[href="/view_cart"]').click();
        checkout.procederCheckout();
        
        // Step 6: Preencher detalhes e confirmar pedido
        cy.contains('Place Order').click();
        checkout.preencherDetalhesPagamento();
        checkout.confirmarPedido();
        
        // Verificar pedido criado com sucesso
        cy.contains('Order Placed!').should('be.visible');
        cy.get('a[href="/download_invoice/500"]').should('be.visible');
    });
});
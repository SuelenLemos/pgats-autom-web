class Menu {
    navegarParaLogin() {
        cy.get('a[href="/login"]').click();
        }

    efetuarLogout() {
        cy.get('a[href="/logout"]').should('be.visible').click();
        }

    navegarParaContato(){
        cy.get('a[href*=contact]').click();
    }
    }
     export default new Menu();  
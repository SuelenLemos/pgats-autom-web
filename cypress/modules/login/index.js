import {faker} from '@faker-js/faker';
import { getRandonEmail } from '../../support/helpers.js';


class login{
     preencherFormularioPreCadastro(){
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    cy.get('[data-qa="signup-name"]').type(`${firstName} ${lastName}`);
    const randonEmail = getRandonEmail();
    cy.get('[data-qa="signup-email"]').type(randonEmail);
    cy.get('button[data-qa="signup-button"]').click();
    }

    preencherLoginESenha(email, password){
        cy.get('[data-qa="login-email"]').type(email);
        cy.get('[data-qa="login-password"]').type(password);
        cy.get('[data-qa="login-button"]').click();
        // o nome do usuário aparece dentro de um "link" , a classe desse link se chama fa fa-user,
        //O comando parent vai pegar a classe como referencia e subir um nível na hierarquia do html
        // para verificar se o nome do usuário está visível na tela.

         };
}

export default new login();
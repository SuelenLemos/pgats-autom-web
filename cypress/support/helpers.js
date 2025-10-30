import { faker } from "@faker-js/faker";    

export function getRandonNumber() {
    return faker.number.bigInt();
}

export function getRandonEmail() {
    return faker.internet.email({firstName:'Auau'})};
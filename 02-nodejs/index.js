/*
 Sincronização de funções (Promises com Async/Await)
 0 - Obter um usuario
 1 - Obter o numero de telefone de um usuario a partir de seu ID
 2 - Obter o endereco do usuario pelo ID
 3 - Adicionei a lib FAKER como dependencia para gerar dados 'falsos'. 
*/

const faker = require('faker'); 

function obterUsuario() {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => { 
                resolve ({
                    id: faker.random.uuid(), 
                    nome: faker.name.findName(), 
                    dataNascimento: faker.date.past()
                }); 
            }, 1000)
        } catch (err) {
            reject({trace: arguments.callee.name, error: err}); 
        }
    });
}

function obterTelefone(idUsuario) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve({
                    numero: faker.phone.phoneNumber()
                })
            }, 2000)
        } catch (error) {
            reject({trace: arguments.callee.name, error: err}); 
        }
    }); 
} 

function obterEndereco(idUsuario) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve({
                    rua: faker.address.direction()
                })
            }, 3000)
        } catch (err) {
            reject({trace: arguments.callee.name, error: err}); 
        }
    });

}

async function main() {
    console.time("Medida-promise"); 
    try {
        const usuario = await obterUsuario(); 

        /* 
            Telefone e Endereco nao possuem interdependencias, portanto podem 
            ser executados em paralelo. 
        */
        const resultado = await Promise.all([
            obterTelefone(usuario.id), 
            obterEndereco(usuario.id)
        ]); 
        const telefone = resultado[0]; 
        const endereco = resultado[1]; 

        console.info(`
            Nome: ${usuario.nome}, 
            Endereco: ${endereco.rua}, 
            Telefone: ${telefone.numero}
        `); 
    
    } catch (err) {
        console.error("Error: ", err); 
    } finally {
        console.timeEnd("Medida-promise"); 
    }
}

main(); 


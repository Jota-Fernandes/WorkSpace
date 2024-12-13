class Heroi{
    constructor(nome, idade, tipo){
        this.nome = nome
        this.idade = idade
        this.tipo = tipo
    }

    atacar(){
        if(this.tipo == 'mago'){
            console.log(`O ${this.tipo} atacou usando magia`)
        }
        else if(this.tipo == 'guerreiro'){
            console.log(`O ${this.tipo} atacou usando espada`)
        }
        else if(this.tipo == 'monge'){
            console.log(`O ${this.tipo} atacou usando artes marciais`)
        }
        else{
            console.log(`O ${this.tipo} atacou usando shuriken`)
        }
    }
}

const heroi1 = new Heroi('Aragorn', 87, 'guerreiro')
heroi1.atacar()
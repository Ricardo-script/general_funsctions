/* 
	1. yarn add bcrypt
	2. yarn add @types/bcrypt
*/

// criar um model para users:

import { DataTypes } from "sequelize"; // importar DataTypes, não usar sequelize/types, somente usar sequelize
import { db } from "../db";
//<any> inserir essa tipagem pois estava sando erro ao chamar propriedades do banco
export const UserModel = <any>db.define('user', { // dizer qual é a tabela no banco de dados, abrir um obj e inserir o schema
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idade: {
        type: DataTypes.INTEGER,
    },
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------
// criar arquivo UserController.ts
import { Request, Response } from "express";
import { UserModel } from "../database/models/UserModel"; //importar a model
import * as bcrypt from 'bcrypt'; // importar bcrypt

class UserController { // criar as funções

    async create(req:Request , res:Response){
        const { nome, email, password, idade } = req.body; //criar uma desestruturação dos campos que estão na models

        const generateHash = (password: string) => {
            let pass = password.toString();
            const hash = bcrypt.hashSync(pass, 10);
            password = hash;

            UserModel.create({
                nome,
                email,
                password,
                idade,
            });
            return res.status(201).json({message: `Usuário ${nome} criado com sucesso!`});
        }
        generateHash(password);
     
    }    
}
export default new UserController();
//-------------------------------------------------------------------------------------------------------------------------------------------------------
// criar arquivo auth.ts

import { Request, Response } from "express";
import { UserModel } from "../database/models/UserModel";
import { sign } from "jsonwebtoken";
import * as bcrypt from 'bcrypt';

export const auth = async (req: Request, res: Response) => { //dentro da função inserir oque vc quer receber nessa rota de autenticação
    const { email, password } = req.body; // pega o user e password que foi passado no body
    
    const user = await UserModel.findOne({
        where:{
            email: email,
        }
    });
    
    //verifica se o email está no banco de dados
    if(user === null){
        return res.status(400).json({
            error: true,
            mensage: 'Usuário não existe!'
        })
    }

    //password vem da req.body e user.password vem do banco [foi colocado como tipo any em Usermodel para funcionar(arrumar isso)]
    if(!(await bcrypt.compare(password, user.password))){ // compare, compara se o password(não criptografado) vindo da requisição é igual ao password do banco criptografado
        return res.status(400).json({					// se não for igual retornar status 400 e message senha inválida	
            error: true,
            message: 'Senha inválida!'
        });
    }

    const nome = user.nome;


    // se o email do banco for igual email da requisicao então gera o token
    const token = sign(  //passar o payload
       {email}
    , process.env.JWT_SALT, { // depois da virgula inserir um secret, inserido com a variavel de ambiente JWT_SALT
        expiresIn: 120, // dentro podemos inserir algumas propriedades: expiresIn é a qnd de tempo para expirar o token, nesse exemplo 120 segundos
    });

    return res.json({nome, email, token});
}   
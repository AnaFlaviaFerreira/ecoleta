import Knex from 'knex';

export async function up(knex: Knex){//dizer o formato da váriavel para ter acesso inteligente na ide
    //criar tabela
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    });
}

export async function down(knex: Knex){
    //voltar atras (deletar a tabela)
    knex.schema.dropTable('items');
}
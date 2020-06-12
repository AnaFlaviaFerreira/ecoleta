import Knex from 'knex';

export async function up(knex: Knex){//dizer o formato da váriavel para ter acesso inteligente na ide
    //criar tabela
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary();
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points');
        table.integer('items_id')
            .notNullable()
            .references('id')
            .inTable('items');
    });
}

export async function down(knex: Knex){
    //voltar atras (deletar a tabela)
    knex.schema.dropTable('point_items');
}
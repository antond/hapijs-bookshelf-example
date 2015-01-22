'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('vwe_user', function(table) {
        table.increments('id').primary().unique();
        table.varchar('username').notNull().unique();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('vwe_user');
};

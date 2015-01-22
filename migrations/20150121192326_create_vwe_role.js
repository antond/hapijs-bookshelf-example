'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('vwe_role', function(table) {
        table.increments('id').primary().unique();
        table.varchar('name').notNull();
        table.varchar('description').notNull();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('vwe_role');
};

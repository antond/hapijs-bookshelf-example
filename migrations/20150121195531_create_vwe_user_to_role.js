'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('vwe_user_to_role', function(table) {
        table.increments('id').primary().unique();
        table.integer('vwe_role_id');
        table.integer('vwe_user_id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('vwe_user_to_role');
};

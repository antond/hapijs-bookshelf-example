var Hapi = require('hapi');
var fs = require('fs');
var server = new Hapi.Server();
server.connection({
    port: 3000
});

var env = process.env.APP_ENV || 'development';

server.register([{
    register: require('hapi-bookshelf-models'),
    options: {
        knex: require('./knexfile.js')[env],
        plugins: ['registry'], // Required
        models: __dirname + '/app/models/',
        base: function (bookshelf) {
            return bookshelf.Model.extend({});
        }
    }
}], function (err) {
    // An error will be available here if anything goes wrong
});

var bookshelf = server.plugins.bookshelf;

server.route([{
    path: '/api/users',
    method: 'GET',
    handler: function (request, reply) {
        server.plugins.bookshelf.model('User').collection().fetch().then(function(collection){
            reply(collection);
        });
    },
},
{
    path: '/api/users/{userId}',
    method: 'GET',
    handler: function (request, reply) {
        //server.plugins.bookshelf.model('User').where({id: request.params.userId}).fetch().then(function(user){
        //    user.roles().fetch().then(function(roles){
        //        reply(roles);
        //});
        bookshelf
        .model('User')
        .where({id: request.params.userId})
        .fetch({withRelated: 'roles'})
        .then(function(user){
            reply(user);
        });
    }
}]);

server.start(function () {
    console.log('Served at:' + server.info.uri);
});

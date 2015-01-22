var Hapi = require('hapi');
var fs = require('fs');
var server = new Hapi.Server();
server.connection({
    port: 3000
});

var env = process.env.APP_ENV || 'development';

var knex = require('knex')(require('./knexfile.js')[env]);
var Bookshelf = require('bookshelf')(knex);

var User = require('./app/models/user')(Bookshelf);


// app.set equivalent
server.app.Bookshelf = Bookshelf;

server.route([{
    path: '/api/users',
    method: 'GET',
    handler: function (request, reply) {
        User.collection().fetch().then(function(collection){
            reply(collection);
        });
    },
},
{
    path: '/api/users/{userId}',
    method: 'GET',
    handler: function (request, reply) {
        User.where({id: request.params.userId}).roles().fetch().then(function(roles){
            reply(roles);
        });
    }
}]);


server.start(function () {
    console.log('Served at:' + server.info.uri);
});

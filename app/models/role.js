module.exports = function(Bookshelf) {
    'use strict';

    var User = require('./user');

    var checkit = require('checkit');

    return Bookshelf.Model.extend({
        initialize: function () {
            this.on('saving', this.validateSave);
        },
        validateSave: function () {
            return checkit({
                name: 'required' // checkit validation rules obj
            })
            .run(this.attributes);
        },
        user: function() {
            return this.belongsToMany(User);
        },
    });
};

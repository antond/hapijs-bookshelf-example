module.exports = function(Bookshelf) {
    'use strict';

    var Role = require('./role')(Bookshelf);

    var checkit = require('checkit');

    return Bookshelf.Model.extend({
        initialize: function () {
            this.on('saving', this.validateSave);
        },
        validateSave: function () {
            return checkit({
                username: 'required' // checkit validation rules obj
            })
            .run(this.attributes);
        },
        roles: function () {
            return this.hasMany(Role);
        },
        tableName: 'vwe_user'
    });
};

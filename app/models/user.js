module.exports = function(bookshelf) {
    'use strict';

    var checkit = require('checkit');

    return bookshelf.extend({
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
            return this.belongsToMany('Role', 'vwe_user_to_role', 'vwe_user_id', 'vwe_role_id');
        },
        tableName: 'vwe_user'
    });
};

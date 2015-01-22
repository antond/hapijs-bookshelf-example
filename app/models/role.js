module.exports = function(bookshelf) {
    'use strict';

    var checkit = require('checkit');

    return bookshelf.extend({
        initialize: function () {
            this.on('saving', this.validateSave);
        },
        validateSave: function () {
            return checkit({
                name: 'required' // checkit validation rules obj
            })
            .run(this.attributes);
        },
        tableName: 'vwe_role'
    });
};

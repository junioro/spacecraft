define([
    'jquery',
    'underscore',
    'db',

    'views/game/infrastructure/data/LoadSettings'
], function (
    $,
    _,
    db,

    loadSettings
) {

    return {

        configure: function () {
            var defer = $.Deferred();

            $.when(
                
                loadSettings.projectiles(this.session),
                loadSettings.enemies(this.session),
                loadSettings.characters(this.session),
                loadSettings.entities(this.session)
            
            ).then(function () {
                
                defer.resolve();
                
            });

            return defer.promise();
        },

        initialize: function () {
            var self = this;

            this.session = null;

            db.open({
                server: 'spacecraft',
                version: 15,
                schema: {
                    projectiles: {
                        key: { keyPath: 'type', autoIncrement: false }
                    },

                    enemies: {
                        key: { keyPath: 'type', autoIncrement: false }
                    },

                    characters: {
                        key: { keyPath: 'type', autoIncrement: false }
                    },

                    entities: {
                        key: { keyPath: 'type', autoIncrement: false }
                    }
                }
            }).done(function (s) {
                self.session = s;

                self.configure();
            });
        },

        getBy: function (table, value, onsuccess) {
            this.session.get(table, value)
                        .done(function (data) {
                            onsuccess(data);
                        });
        }
    };

});
﻿define([
    'jquery',
    'underscore',
    'db'
], function (
    $,
    _,
    db
) {

    return {

        insert: function (url, onsuccess) {
            $.get(url, function () { })
                .done(function (data) {
                    _.each(data, function (item) {
                        onsuccess(item);
                    });
                })
                .fail(function (e) {
                    console.log(e);
                });
        },

        insertProjectiles: function () {
            var self = this;

            this.insert('/api/projectiles', function (obj) {
                self.session.projectiles.add(obj);
            });
        },

        insertEnemies: function () {
            var self = this;

            this.insert('/api/enemies', function (obj) {
                self.session.enemies.add(obj);
            });
        },
        
        insertCharacters: function () {
            var self = this;

            this.insert('/api/characters', function (obj) {
                self.session.characters.add(obj);
            });
        },

        configure: function () {
            this.insertProjectiles();
            this.insertEnemies();
            this.insertCharacters();
        },

        initialize: function () {
            var self = this;

            this.session = null;

            db.open({
                server: 'spacecraft',
                version: 8,
                schema: {
                    projectiles: {
                        key: { keyPath: 'type', autoIncrement: false }
                    },

                    enemies: {
                        key: { keyPath: 'type', autoIncrement: false }
                    },
                    
                    characters: {
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
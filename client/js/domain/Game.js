﻿define([
    'underscore',

    'domain/Background',
    'domain/Ship',
    'domain/Asteroid',
    'domain/Element'
], function (_, Background, Ship, Asteroid, Element) {

    var game = (function () {

        function Game($canvas) {
            this.$canvas = $canvas;
            this.context = this.$canvas.getContext('2d');

            this.timer = 0;

            this.ship = new Ship();

            this.elements = [];
            this.elements.push(new Background('bg1', 2.5));
            this.elements.push(new Background('bg2', 10));
            this.elements.push(new Background('bg3', 5));
            this.elements.push(this.ship);
        }

        Game.prototype.draw = function () {
            var self = this;

            this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);

            _.each(this.elements, function (element) {
                element.draw(self.context);
            });
        };

        Game.prototype.detectsCollision = function (element) {
            _.each(this.elements, function (obstacle) {
                if ((obstacle instanceof Element) && (obstacle != element)) {
                    if (element.collided(obstacle)) {
                        element.destroy();
                        obstacle.destroy();
                    }
                }
            });
        };

        Game.prototype.insertEnemy = function () {
            this.elements.push(new Asteroid());
        };

        Game.prototype.updates = function () {
            var self = this;

            _.each(this.elements, function (element) {
                if (element instanceof Element) {
                    self.detectsCollision(element);
                }

                element.updates();
            });

            this.timer++;
            if (this.timer === 200) {
                this.timer = 0;
                this.insertEnemy();
            }
            
            this.draw();
        };

        Game.prototype.start = function () {
            var self = this;

            this.draw();

            $(document).bind('keydown', function (e) {
                e.preventDefault();

                switch (e.keyCode) {
                    case 37:
                        self.ship.left(true);
                        break;
                    case 38:
                        self.ship.up(true);
                        break;
                    case 39:
                        self.ship.right(true);
                        break;
                    case 40:
                        self.ship.down(true);
                        break;
                }
            });

            $(document).bind('keyup', function (e) {
                e.preventDefault();

                switch (e.keyCode) {
                    case 37:
                        self.ship.left(false);
                        break;
                    case 38:
                        self.ship.up(false);
                        break;
                    case 39:
                        self.ship.right(false);
                        break;
                    case 40:
                        self.ship.down(false);
                        break;
                }
            });
        };

        return Game;

    })();

    return game;
});
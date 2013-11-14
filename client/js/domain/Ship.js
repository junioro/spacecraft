﻿define([
    'domain/Element'
], function (Element) {

    var ship = (function () {

        function Ship() {
            this.pos = { x: 0, y: 0 };
            this.image = { width: 43, height: 39 };
            this.sprite = { row: 0, col: 0 };
            this.keys = { up: false, down: false, right: false, left: false };

            this.imageSprite = new Image();
            this.imageSprite.src = "../../client/img/shipSprite.png";
        }

        Ship.prototype = new Element();

        Ship.prototype.currentRowSprite = function () {
            return this.sprite.row * this.image.width;
        };

        Ship.prototype.currentColSprite = function () {
            return this.sprite.col * this.image.height;
        };

        Ship.prototype.width = function () {
            return this.image.width * 2;
        };

        Ship.prototype.height = function () {
            return this.image.height * 2;
        };

        Ship.prototype.destroy = function () {
            this.pos.x = 0;
            this.pos.y = 0;
        };

        Ship.prototype.draw = function (context) {
            context.drawImage(this.imageSprite, this.currentRowSprite(), this.currentColSprite(), this.image.width, this.image.height, this.pos.x, this.pos.y, this.width(), this.height());
        };

        Ship.prototype.updates = function () {
            if (this.keys.up) {
                this.pos.y -= 2;
            }
            if (this.keys.down) {
                this.pos.y += 2;
            }
            if (this.keys.left) {
                this.pos.x -= 2;
            }
            if (this.keys.right) {
                this.pos.x += 2;
            }

            this.sprite.row = (this.sprite.row === 2) ? 0 : this.sprite.row + 1;
        };

        Ship.prototype.up = function (move) {
            this.keys.up = move;

            if (this.keys.up) {
                if (this.sprite.col <= 0)
                    this.sprite.col = 0;
                else
                    this.sprite.col--;
            }
        };

        Ship.prototype.down = function (move) {
            this.keys.down = move;

            if (this.keys.down) {
                if (this.sprite.col >= 2)
                    this.sprite.col = 2;
                else
                    this.sprite.col++;
            }
        };

        Ship.prototype.left = function (move) {
            return this.keys.left = move;
        };

        Ship.prototype.right = function (move) {
            return this.keys.right = move;
        };

        return Ship;

    })();

    return ship;

});
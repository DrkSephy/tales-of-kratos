/*
hud.js
------
    This file contains the code for controlling the player
    health HUD. The technique used is "injection", which is
    an extension of the original code. The way it works is
    by creating a new instance of original code and supply it
    with a new name. Simply put, injection is a copy of the
    original but different in the sense of the extra code we
    add. While injecting, we modify the original code. In
    the case of this plugin, we overwrite the draw() function
    of our game. The this.parent() function will point to our
    old draw() function, so everything there is kept. All we
    check for in the new isntance is the presence of a player
    entity, and if true then a HUD is drawn.

    The health HUD consists of two parts: A number and Health bar.

    Number: A function which handles drawing a black, slightly transparent
    rectangle where the health will be visible. Uses the following
    canvas properties to draw the HUD to screen:
        | fillstyle: This property sets the color
        | font: This property sets the font
        | setAlpha(): This property sets the transparency.
            | setalpha = 1: Fully Solid
            | setAlpha = 0: Fully transparent
        | fillRect(): This property draws a rectangle to the screen
          given a given position with a given width + height
        | fillText(): This property draws text on screen at a given positon.

    Bar: A function which draws two rectangles on top of each other. Uses
    the same canvas properties above to draw.

*/

ig.module(
    'plugins.hud.hud'
)
.defines(function() {
    ig.hud = ig.Class.extend({
        // Get the canvas
        canvas  : document.getElementById('canvas'),
        // Check if the canvas is being viewed
        context : canvas.getContext('2d'),

        init: function() {
            ig.Game.inject({
                draw: function() {
                    this.parent();
                    // If there is a player. draw the HUD
                    if(ig.game.getEntitiesByType('EntityPlayer').length  != 0) {
                        if(this.hud && !ig.game.menuVisible) {
                            this.hud.number_health();
                            this.hud.bar_health();
                            this.hud.number_mana();
                            this.hud.bar_mana();
                            // this.hud.number_stamina();
                            // this.hud.bar_stamina();
                            // this.hud.number_level();
                            // this.hud.bar_exp();
                        }
                    }
                }
            })
        },

        // ----- Health Meter -----
        number_health: function() {
            if(!this.context) return null;
            // Get the player instance
            var player  = ig.game.getEntitiesByType('EntityPlayer')[0];
            // Draw a transparent Black Rectangle
            var context  = this.canvas.getContext('2d');
            // Set visual properties of the HUD
            context.fillStyle = "rgb(0, 0, 0)";
            context.setAlpha = 0.7; //set transparency
            context.fillRect (10, 10, 75, 13);
            //draw text on top of the rectangle
            context.fillStyle = "rgb(255, 255, 255)";
            context.font = "13px Arial";
            context.fillText ('HP: ' + player.health + '/' + player.stats.maxHP, 11, 21); //font used is the default canvas font
            context.setAlpha = 1;
            return null;
        },

        bar_health: function() {
            if(!this.context) return null;
            // Get the player instance
            var player  = ig.game.getEntitiesByType('EntityPlayer')[0];
            // Draw a transparent Black Rectangle
            var h = 100 * Math.min(player.health / player.stats.maxHP, 100);
            var context  = this.canvas.getContext('2d');
            // Set visual properties of the HUD
            context.fillStyle = "rgb(0, 0, 0)";
            context.setAlpha = 0.7;
            context.fillRect (90, 10, 100, 13);
            // Determine what color of health to draw, Bright red for full, dim red otherwise
            var color = h < 100 ? "rgb(175, 0, 0)" : "rgb(225, 0, 0)";
            //var color = "rgb(200, 0, 0)";
            context.fillStyle = color;
            context.setAlpha = 0.9;
            context.fillRect (91, 11, h-2, 11);
            context.setAlpha = 1;
            return null;
        },

        // ----- Mana Meter -----
        number_mana: function() {
            if(!this.context) return null;
            // Get the player instance
            var player  = ig.game.getEntitiesByType('EntityPlayer')[0];
            // Draw a transparent Black Rectangle
            var context  = this.canvas.getContext('2d');
            // Set visual properties of the HUD
            context.fillStyle = "rgb(0, 0, 0)";
            context.setAlpha = 0.7; //set transparency
            context.fillRect (10, 25, 75, 13);
            //draw text on top of the rectangle
            context.fillStyle = "rgb(255, 255, 255)";
            context.font = "13px Arial";
            context.fillText ('MP: ' + player.stats.tp + '/' + player.stats.maxTP, 11, 36); //font used is the default canvas font
            context.setAlpha = 1;
            return null;
        },

        bar_mana: function() {
            if(!this.context) return null;
            // Get the player instance
            var player  = ig.game.getEntitiesByType('EntityPlayer')[0];
            // Draw a transparent Black Rectangle
            var h = 100 * Math.min(player.stats.tp / player.stats.maxTP, 100);
            var context  = this.canvas.getContext('2d');
            // Set visual properties of the HUD
            context.fillStyle = "rgb(0, 0, 0)";
            context.setAlpha = 0.7;
            context.fillRect (90, 25, 100, 13);
            // Determine what color of mana to draw, Bright blue for full, dim blue otherwise
            var color = h < 100 ? "rgb(0, 0, 175)" : "rgb(0, 0, 225)";
            //var color = "rgb(0, 0, 200)";
            context.fillStyle = color;
            context.setAlpha = 0.9;
            context.fillRect (91, 26, h-2, 11);
            context.setAlpha = 1;
            return null;
        },

        // ----- Stamina Meter -----
        number_stamina: function() {
            if(!this.context) return null;
            // Get the player instance
            var player  = ig.game.getEntitiesByType('EntityPlayer')[0];
            // Draw a transparent Black Rectangle
            var context  = this.canvas.getContext('2d');
            // Set visual properties of the HUD
            context.fillStyle = "rgb(0, 0, 0)";
            context.setAlpha = 0.7; //set transparency
            context.fillRect (10, 40, 75, 13);
            //draw text on top of the rectangle
            context.fillStyle = "rgb(255, 255, 255)";
            context.font = "13px Arial";
            context.fillText ('SP: ' + player.stamina + '/' + player.max_stamina, 11, 51); //font used is the default canvas font
            context.setAlpha = 1;
            return null;
        },

        bar_stamina: function() {
            if(!this.context) return null;
            // Get the player instance
            var player  = ig.game.getEntitiesByType('EntityPlayer')[0];
            // Draw a transparent Black Rectangle
            var h = 100 * Math.min(player.stamina / player.max_stamina, 100);
            var context  = this.canvas.getContext('2d');
            // Set visual properties of the HUD
            context.fillStyle = "rgb(0, 0, 0)";
            context.setAlpha = 0.7;
            context.fillRect (90, 40, 100, 13);
            // Determine what color of stamina to draw, Bright green for full, dim green otherwise
            var color = h < 100 ? "rgb(0, 175, 0)" : "rgb(0, 225, 0)";
            //var color = "rgb(0, 200, 0)";
            context.fillStyle = color;
            context.setAlpha = 0.9;
            context.fillRect (91, 41, h-2, 11);
            context.setAlpha = 1;
            return null;
        },

        // ----- Level/Experience Meter -----
        number_level: function() {
            if(!this.context) return null;
            // Get the player instance
            var player  = ig.game.getEntitiesByType('EntityPlayer')[0];
            // Draw a transparent Black Rectangle
            var context  = this.canvas.getContext('2d');
            // Set visual properties of the HUD
            context.fillStyle = "rgb(0, 0, 0)";
            context.setAlpha = 0.7; //set transparency
            context.fillRect (10, 55, 75, 13);
            //draw text on top of the rectangle
            context.fillStyle = "rgb(255, 255, 255)";
            context.font = "13px Arial";
            context.fillText ('Level: ' + ig.game.LEVEL, 11, 66); //font used is the default canvas font
            context.setAlpha = 1;
            return null;
        },

        bar_exp: function() {
            if(!this.context) return null;
            // Get the player instance
            var player  = ig.game.getEntitiesByType('EntityPlayer')[0];
            // Draw a transparent Black Rectangle
            var h = 100 * Math.min(ig.game.EXP.curr / ig.game.EXP.next, 100);
            var context  = this.canvas.getContext('2d');
            // Set visual properties of the HUD
            context.fillStyle = "rgb(0, 0, 0)";
            context.setAlpha = 0.7;
            context.fillRect (90, 55, 100, 13);
            var color = "rgb(200, 200, 0)";
            context.fillStyle = color;
            context.setAlpha = 0.9;
            context.fillRect (91, 56, h-2, 11);
            context.setAlpha = 1;
            return null;
        },
    });
})

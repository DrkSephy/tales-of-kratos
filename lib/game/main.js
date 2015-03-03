ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.debug.debug',
    'game.levels.basic'
)

.defines(function(){
    MyGame = ig.Game.extend({
        font: new ig.Font('media/04b03.font.png'),
        gravity: 300,
        
        init: function(){
            ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
            ig.input.bind(ig.KEY.X, 'jump');
            this.loadLevel(LevelBasic);
        },

        draw: function(){
            this.parent();
            if(this.font){
                var player = ig.game.getEntitiesByType('EntityPlayer')[0];
                this.font.draw('Health: ' + player.health, 50, 10, ig.Font.ALIGN.CENTER);
            }
        }
        
    });

    ig.main('#canvas', MyGame, 60, 320, 240, 2);
});
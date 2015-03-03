ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.debug.debug',
    'game.levels.basic',
    'plugins.camera.camera'
)

.defines(function(){
    MyGame = ig.Game.extend({
        font: new ig.Font('media/04b03.font.png'),
        gravity: 300,
        camera: null,
        lastCheckpoint: null,
        playerSpawnPos: {x: 0, y: 0},
        lives: 3,


        init: function(){
            this.camera = new Camera( ig.system.width/4, ig.system.height/3, 5 );
            this.camera.trap.size.x = ig.system.width/10;
            this.camera.trap.size.y = ig.system.height/3;
            this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width/6 : 0;

            ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
            ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
            ig.input.bind(ig.KEY.UP_ARROW, 'up');
            ig.input.bind(ig.KEY.X, 'jump');
            ig.input.bind(ig.KEY.A, 'attack');
            this.loadLevel(LevelBasic);
        },

        update: function() {
            this.camera.follow( this.player );
            this.parent();
        },

        loadLevel: function( level ) {        
            this.parent( level );

            // Set up checkpoint data for respawning of player
            this.player = this.getEntitiesByType( EntityPlayer )[0];
            this.lastCheckpoint = null;
            this.playerSpawnPos = {
                x: this.player.pos.x,
                y: this.player.pos.y
            };
            
            // Set camera max and reposition trap
            this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
            this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;
            
            this.camera.set( this.player );
        },

        respawnPlayerAtLastCheckpoint: function(x,y){
            var pos = this.playerSpawnPos;
            if(this.lastCheckpoint){
                pos = this.lastCheckpoint.getSpawnPos()
                }
            this.player = this.spawnEntity(EntityPlayer, pos.x, pos.y);
        },

        gameOver: function(){
            ig.system.setGame(GameOverScreen);
        },

        draw: function(){
            this.parent();
            if(this.font){
                var player = ig.game.getEntitiesByType('EntityPlayer')[0];
                this.font.draw('Health: ' + player.health, 50, 10, ig.Font.ALIGN.CENTER);
            }
        }
        
    });

    GameOverScreen = ig.Game.extend({

        instructText: new ig.Font( 'media/04b03.font.png' ),
        background: new ig.Image('media/stat-matte.png'),
        gameOver: new ig.Image('media/gameover.png'),

        init: function() {
            ig.input.bind( ig.KEY.SPACE, 'start');
        },

        update: function() {
            if(ig.input.pressed('start')){
                ig.system.setGame(MyGame)
            }
            this.parent();
        },

        // Draw the stats on Game Over Screen
        draw: function() {
            this.parent();
            this.background.draw(0,0);
            var x = ig.system.width/2;
            var y = ig.system.height/2 - 20;
            this.gameOver.draw(x - (this.gameOver.width * .5), y - 30);
            this.instructText.draw('Press Spacebar To Continue.', x, ig.system.height - 10, ig.Font.ALIGN.CENTER);
        }
    });

    ig.main('#canvas', MyGame, 60, 320, 240, 2);
});
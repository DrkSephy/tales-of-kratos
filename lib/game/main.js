ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.debug.debug',
    'game.levels.basic',
    'plugins.camera.camera',
    'plugins.font-sugar.font'
)

.defines(function(){
    MyGame = ig.Game.extend({
        font: new ig.Font('media/04b03.font.png'),
        fontContent10: new ig.Font('media/verdana_10.font.png',  { fontColor: '#E5E5E5' }),
        statusScreen: new ig.Image('media/statusScreen.png'),
        kratosMugshot: new ig.Image('media/kratos.png'),
        gravity: 300,
        camera: null,
        lastCheckpoint: null,
        playerSpawnPos: {x: 0, y: 0},
        lives: 3,
        menuVisible: false,
        gameState: null,


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
            ig.input.bind(ig.KEY.ENTER, 'menu');
            ig.input.bind(ig.KEY.ESC, 'escape');
            this.loadLevel(LevelBasic);
        },

        update: function() {
            this.camera.follow( this.player );
            if(ig.input.pressed('menu') && !this.menuVisible){
                this.gameState = 'stats';
                this.menuVisible = true;
            }
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

            if(this.gameState === 'stats' && this.menuVisible){
                this.statusScreen.draw(0,0);
                // Draw mugshot of Kratos
                this.kratosMugshot.draw(10, 10);
                var player = ig.game.getEntitiesByType('EntityPlayer')[0];
                this.fontContent10.draw(player.name, 160, 5, ig.Font.ALIGN.CENTER)
                this.fontContent10.draw('Level ', 130, 20, ig.Font.ALIGN.CENTER);
                this.fontContent10.draw(player.stats.level, 200, 20, ig.Font.ALIGN.CENTER);
                this.fontContent10.draw('HP    ', 130, 35, ig.Font.ALIGN.CENTER);
                this.fontContent10.draw(player.stats.hp + ' / ' + player.stats.maxHP, 200, 35, ig.Font.ALIGN.CENTER);
                this.fontContent10.draw('TP    ', 130, 50, ig.Font.ALIGN.CENTER);
                this.fontContent10.draw(player.stats.tp + ' / ' + player.stats.maxTP, 200, 50, ig.Font.ALIGN.CENTER);
                this.fontContent10.draw('STR   ' + player.stats.str, 30, 100, ig.Font.ALIGN.CENTER);
                this.fontContent10.draw('MAG   ' + player.stats.mag, 30, 115, ig.Font.ALIGN.CENTER);
                this.fontContent10.draw('DEF   ' + player.stats.def, 30, 130, ig.Font.ALIGN.CENTER);
                this.fontContent10.draw('SPD   ' + player.stats.mag, 30, 145, ig.Font.ALIGN.CENTER);
                this.fontContent10.draw('EXP   ' + player.stats.totalExp, 30, 180, ig.Font.ALIGN.CENTER);
                this.fontContent10.draw('NEXT   ' + player.stats.nextExp, 35, 195, ig.Font.ALIGN.CENTER);
                if(ig.input.pressed('escape')){
                    this.gameState = null; 
                    this.menuVisible = false;

                }
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
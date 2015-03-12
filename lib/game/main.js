ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.debug.debug',
    'game.levels.basic',
    'game.entities.catalogs.artes',
    'game.entities.misc.pointer',
    'game.entities.menus.artemenu',
    'game.entities.menus.arteboxA',
    'game.entities.menus.arteboxB',
    'game.entities.menus.arteboxC',
    'game.entities.menus.arteboxD',
    'game.entities.menus.increaseLightningBlade',
    'game.entities.menus.decreaseLightningBlade',
    'game.entities.menus.decreaseHellPyre', 
    'game.entities.menus.increaseHellPyre',
    'game.entities.menus.increaseSonicThrust',
    'game.entities.menus.decreaseSonicThrust',
    'game.entities.menus.decreaseSuperSonicThrust',
    'game.entities.menus.increaseSuperSonicThrust',
    'game.entities.menus.transmenu',
    'plugins.camera.camera',
    'plugins.font-sugar.font'
)

.defines(function(){
    MyGame = ig.Game.extend({
        /* Fonts */
        font: new ig.Font('media/04b03.font.png'),
        fontContent10: new ig.Font('media/verdana_10.font.png',  { fontColor: '#E5E5E5', letterSpacing: -1 }),

        /* Game images */
        statusScreen: new ig.Image('media/statusScreen.png'), // Status Screen image
        transScreen:  new ig.Image('media/transScreen.png'), // Artes Screen Image
        artesBox: new ig.Image('media/artebox.png'), // Arte box
        kratosMugshot: new ig.Image('media/kratos.png'), // Kratos mugshot
        lightningBladeDescription: new ig.Image('media/lightningBladeDescription.png'),
        displayedLightningBladeDescription: false, 
        /* Physics Properties */
        gravity: 300, // How much does gravity affect all the entities in the game world?

        /* Camera properties */
        camera: null, // Set the initial camera to be null
        lastCheckpoint: null, // Set initial checkpoint to null 
        playerSpawnPos: {x: 0, y: 0}, // Set initial player spawn point to 0, 0

        /* Booleans for control */
        menuVisible: false, // Used to make menus stay open, prevents duplicate re-spawning of menus
        gameState: null, // Used for controlling the state of the game, i.e: equipping, viewing stats, etc

        /* Pointer properties */
        pointer: null,
        arteMenu: null,
        spawnedArteBoxes: false,
        artesCatalog: new ig.global.ArtesCatalog(),

        /* Bind keys here, set up initial variables */
        init: function(){
            /* Set up camera plugin */
            var player = ig.game.getEntitiesByType('EntityPlayer')[0];
            // Initiate camera plugin, which takes width and height as parameters for the constructor
            this.camera = new Camera( ig.system.width/4, ig.system.height/3, 5 );
            // How far should the camera look ahead?
            this.camera.trap.size.x = ig.system.width/10;
            this.camera.trap.size.y = ig.system.height/3;
            this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width/6 : 0;
            // Bind key inputs
            ig.input.bind(ig.KEY.MOUSE1,     'leftClick' );
            ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
            ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
            ig.input.bind(ig.KEY.UP_ARROW, 'up');
            ig.input.bind(ig.KEY.X, 'jump');
            ig.input.bind(ig.KEY.A, 'attack');
            ig.input.bind(ig.KEY.ENTER, 'menu');
            ig.input.bind(ig.KEY.ESC, 'escape');

            // Load the first level, basic.js
            this.loadLevel(LevelBasic);
            this.pointer = this.spawnEntity(EntityPointer, 100, 100);
            this.arteMenu = this.spawnEntity(EntityArteMenu, 250, 8);
        },

        // Here we set up menu interactions, camera updates
        update: function() {
            //this.pointer = this.spawnEntity(EntityPlayer, 100, 100);
            // The camera plugin "follow" method takes an entity as input.
            // Pass in the player entity. 
            this.camera.follow( this.player );
            // If user presses enter, and menu is not showing...
            // ....display the stat screen menu
            if(ig.input.pressed('menu') && !this.menuVisible){
                // Set the game state to be 'stats', which means we
                // are viewing the status screen
                this.gameState = 'stats';
                // Toggle menuVisible so the user cannot spawn multiple
                // copies of the menu
                this.menuVisible = true;
            }
            this.parent();
        },

        // loadLevel is called when a level is loaded
        loadLevel: function( level ) {        
            this.parent( level );

            // Set up checkpoint data for respawning of player
            // Grab an instance of the player
            this.player = this.getEntitiesByType( EntityPlayer )[0];
            // Set the last checkpoint to be null
            this.lastCheckpoint = null;
            // Set the player spawn position to be the initial position
            // as set from Weltmeister. 
            this.playerSpawnPos = {
                x: this.player.pos.x,
                y: this.player.pos.y
            };
            
            // Set camera max and reposition trap
            this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
            this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;
            
            // Set the camera to follow the player
            this.camera.set( this.player );
        },

        // Method for respawning the player
        // repspawnPlayerAtLastCheckpoint (x, y)
        //    x: number
        //       - the x position of the entity
        //    y: number
        //       - the y position of the entity
        respawnPlayerAtLastCheckpoint: function(x,y){
            var pos = this.playerSpawnPos;
            // If one of the checkpoints were triggered, call
            // the getSpawnPos method from the checkpoint entity, respawn.js
            if(this.lastCheckpoint){
                // Get new player position and save it
                pos = this.lastCheckpoint.getSpawnPos()
            }
            // Respawn the player at the given x, y position
            this.player = this.spawnEntity(EntityPlayer, pos.x, pos.y);
        },

        // Method for setting the game class to be game over
        gameOver: function(){
            ig.system.setGame(GameOverScreen);
        },

        // Draw method, used for drawing images, text and menus
        draw: function(){
            this.parent();


            if(this.gameState === 'artesMenu' && this.menuVisible){
                var player = ig.game.getEntitiesByType('EntityPlayer')[0];

                // Draw artes menu
                if(typeof this.getEntityByName('transparentmenu') === 'undefined'){
                    this.spawnEntity(EntityTransMenu, 0, 0);
                }

                if(!this.spawnedArteBoxes){
                    this.spawnEntity(EntityArteBoxA, 32, 32);
                    this.spawnEntity(EntityIncreaseLightningBlade, 120, 40);
                    this.spawnEntity(EntityDecreaseLightningBlade, 160, 40);
                    this.spawnEntity(EntityArteBoxB, 32, 80);
                    this.spawnEntity(EntityIncreaseHellPyre, 120, 90);
                    this.spawnEntity(EntityDecreaseHellPyre, 160, 90);
                    this.spawnEntity(EntityArteBoxC, 32, 128);
                    this.spawnEntity(EntityIncreaseSonicThrust, 120, 140);
                    this.spawnEntity(EntityDecreaseSonicThrust, 160, 140);
                    this.spawnEntity(EntityArteBoxD, 32, 176);
                    this.spawnEntity(EntityIncreaseSuperSonicThrust, 120, 185);
                    this.spawnEntity(EntityDecreaseSuperSonicThrust, 160, 185);
                    this.spawnedArteBoxes = true; 
                }

                this.fontContent10.draw('Level: ' + this.artesCatalog['lightningBlade'].level, 70, 40);
                this.fontContent10.draw('Level: ' + this.artesCatalog['hellPyre'].level, 70, 90);
                this.fontContent10.draw('Level: ' + this.artesCatalog['sonicThrust'].level, 70, 140);
                this.fontContent10.draw('Level: ' + this.artesCatalog['superSonicThrust'].level, 70, 185);

                this.fontContent10.draw('Skill Points: ' + this.player.skillPoints, 200, 40);

                if(this.displayedLightningBladeDescription){
                    this.lightningBladeDescription.draw(200, 75);
                }

                // Exit the menu
                if(ig.input.pressed('escape')){
                    this.gameState = null; 
                    this.menuVisible = false;
                    this.spawnedArteBoxes = false; 
                    // Clean up menu entities
                    ig.global.killAllMenus(ig.global.EntityDecreaseSkill);
                    ig.global.killAllMenus(ig.global.EntityIncreaseSkill);
                    ig.global.killAllMenus(ig.global.EntityArteBox);
                    ig.global.killAllMenus(ig.global.EntityTransMenu);
                    this.displayedLightningBladeDescription = false; 
                }
            }

            if(this.font){
                var player = ig.game.getEntitiesByType('EntityPlayer')[0];
                this.fontContent10.draw('Health: ' + player.health, 50, 10, ig.Font.ALIGN.CENTER);
            }
            // If gameState is 'stats' (user pressed enter key), draw stuff
            if(this.gameState === 'stats' && this.menuVisible){
                // Draw status screen image
                this.statusScreen.draw(0,0);
                // Draw mugshot of Kratos
                this.kratosMugshot.draw(10, 10);
                // Get instance of player
                var player = ig.game.getEntitiesByType('EntityPlayer')[0];
                // Draw player stats
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
                // If the user pressed the escape key, kill the menu by making the
                // game state null, and we toggle menuVisible to false so we can
                // respawn it later. 
                if(ig.input.pressed('escape')){
                    this.gameState = null; 
                    this.menuVisible = false;
                }
            }
        }
        
    });

    /* Game over game class */
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

    // Instantiate game starting on the MyGame game class, with 60 frames per second,
    // width of 320 pixels, height of 240 pixels, scaled up by a factor of 2
    ig.main('#canvas', MyGame, 60, 320, 240, 2);
});

ig.global.killAllMenus = function(menu) {
    var menus = ig.game.getEntitiesByType(menu);
    for(var i = 0; i < menus.length; i++) {
        menus[i].kill();
    }
};
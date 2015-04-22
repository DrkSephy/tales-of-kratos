ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.debug.debug',
    'game.levels.basic',

    /* Spell/Arte Catalogs */
    'game.entities.catalogs.artes',
    'game.entities.catalogs.spells',
    'game.entities.catalogs.skills',
    'game.entities.catalogs.levelCatalog',

    'game.entities.misc.pointer',

    /* skill menu, blue route */
    'game.entities.menus.stamina',
    'game.entities.menus.staminaTwo',
    'game.entities.menus.attack',
    'game.entities.menus.defense',
    'game.entities.menus.staminaThree',
    'game.entities.menus.mana',
    'game.entities.menus.skillOne',
    'game.entities.menus.attackTwo',

    /* skill menu, red route */
    'game.entities.menus.defenseTwo',
    'game.entities.menus.manaTwo',
    'game.entities.menus.skillTwo',
    'game.entities.menus.attackThree',
    'game.entities.menus.staminaFour',

    /* spell, arte menus */
    'game.entities.menus.artemenu',
    'game.entities.menus.spellmenu',

    /* Arte boxes for arte menu */
    'game.entities.menus.arteboxA',
    'game.entities.menus.arteboxB',
    'game.entities.menus.arteboxC',
    'game.entities.menus.arteboxD',

    /* Arte skill level increase/decrease */
    'game.entities.menus.increaseLightningBlade',
    'game.entities.menus.decreaseLightningBlade',
    'game.entities.menus.decreaseHellPyre', 
    'game.entities.menus.increaseHellPyre',
    'game.entities.menus.increaseSonicThrust',
    'game.entities.menus.decreaseSonicThrust',
    'game.entities.menus.decreaseDemonFang',
    'game.entities.menus.increaseDemonFang',

    /* Spell boxes for spell menu */
    'game.entities.menus.spellboxA',
    'game.entities.menus.spellboxB',
    'game.entities.menus.spellboxC',
    'game.entities.menus.spellboxD',

    /* Spell skill level increase/decrease */
    'game.entities.menus.decreaseFireball',
    'game.entities.menus.increaseFireball',
    'game.entities.menus.decreaseHeal',
    'game.entities.menus.increaseHeal',
    'game.entities.menus.decreaseLightning',
    'game.entities.menus.increaseLightning',
    'game.entities.menus.decreaseWind',
    'game.entities.menus.increaseWind',

    /* Menu screen */
    'game.entities.menus.transmenu',
    'game.entities.menus.skillsMenu',

    /* Plugins */
    'plugins.camera.camera',
    'plugins.font-sugar.font',
    'plugins.hud.hud'
    // 'plugins.minimap.minimap'
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
        lightningBladeDescription: new ig.Image('media/description.png'),
        artesMenuImage: new ig.Image('media/sword.png'),
        spellsMenuImage: new ig.Image('media/wizardhat.png'),

        /* Arte Description booleans */
        displayedLightningBladeDescription: false,  
        displayedHellPyreDescription: false,
        displayedSonicThrustDescription: false,
        displayedDemonFangDescription: false, 

        /* Spell Description booleans */
        displayedFireBallDescription: false,
        displayedLightningDescription: false,
        displayedWindDescription: false,
        displayedHealDescription: false,


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
        spawnedSkillBoxes: false, 
        artesCatalog: new ig.global.ArtesCatalog(),
        spellsCatalog: new ig.global.SpellsCatalog(),
        skillsCatalog: new ig.global.SkillsCatalog(),
        levelsCatalog: new ig.global.LevelCatalog(),

        hud: new ig.hud(),

        /* Bind keys here, set up initial variables */
        init: function(){
            /* Set up camera plugin */
            var player = ig.game.getEntitiesByType('EntityPlayer')[0];
            // Initiate camera plugin, which takes width and height as parameters for the constructor
            this.camera = new Camera( ig.system.width/3, ig.system.height/3, 5 );
            // How far should the camera look ahead?
            this.camera.trap.size.x = ig.system.width/5;
            this.camera.trap.size.y = ig.system.height/3;
            this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width/6 : 0;
            // this.camera.debug = true;
            // Bind key inputs
            ig.input.bind(ig.KEY.MOUSE1, 'leftClick' );
            ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
            ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
            ig.input.bind(ig.KEY.UP_ARROW, 'up');
            ig.input.bind(ig.KEY.X, 'jump');
            ig.input.bind(ig.KEY.A, 'attack');
            ig.input.bind(ig.KEY.ENTER, 'menu');
            ig.input.bind(ig.KEY.ESC, 'escape');
            ig.input.bind(ig.KEY.S, 'attack2');
            ig.input.bind(ig.KEY.D, 'attack3');
            ig.input.bind(ig.KEY.F, 'attack4');

            // Load the first level, basic.js
            this.loadLevel(LevelBasic);
            // this.generateMiniMap("minimap", 150, 150, [0,1]);
            this.pointer = this.spawnEntity(EntityPointer, 100, 100);
            // console.log(this.levelsCatalog[1])
        },

        // Here we set up menu interactions, camera updates
        update: function() {
            this.parent();
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
            
        },

        // loadLevel is called when a level is loaded
        loadLevel: function(level) {        
            this.parent(level);

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

        /**
         * number generateRandomInt(number min, number max)
         * ------
         * Returns a random number between min and max
        */
        generateRandomInt: function(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        // Draw method, used for drawing images, text and menus
        draw: function(){
            this.parent();
            // this.drawMiniMap("minimap", (ig.system.width - 150 - 8), 8, ["EntityPlayer"], true);
            this.artesMenuImage.draw(246, 6);
            this.spellsMenuImage.draw(216, 6);
            this.spellsMenuImage.draw(186, 6);
            
            // Debug draw for camera
            // this.camera.draw();
            
            /* Begin drawing skills menu */
            if(this.gameState === 'skillsMenu' && this.menuVisible){
                if(typeof this.getEntityByName('skillsmenu') === 'undefined'){
                    this.spawnEntity(EntitySkillsMenu, ig.game.screen.x, 0);
                } 

                if(!this.spawnedSkillBoxes){
                    // Blue skill tree path
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 104, 112);
                    this.spawnEntity(EntityAttack, ig.game.screen.x + 104, 64);
                    this.spawnEntity(EntityDefense, ig.game.screen.x + 64, 64);
                    this.spawnEntity(EntityStaminaThree, ig.game.screen.x + 24, 64);
                    this.spawnEntity(EntityMana, ig.game.screen.x + 24, 24);
                    this.spawnEntity(EntitySkillOne, ig.game.screen.x + 64, 24);
                    this.spawnEntity(EntityAttackTwo, ig.game.screen.x + 104, 24);
                    this.spawnEntity(EntityDefenseTwo, ig.game.screen.x + 64, 112);
                    this.spawnEntity(EntityManaTwo, ig.game.screen.x + 24, 112);
                    this.spawnEntity(EntitySkillTwo, ig.game.screen.x + 24, 152);
                    this.spawnEntity(EntityAttackThree, ig.game.screen.x + 24, 192);
                    this.spawnEntity(EntityStaminaFour, ig.game.screen.x + 64, 192);

                    /*
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 24, 24);
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 64, 24);
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 104, 24);
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 144, 24);
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 24, 64);
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 64, 64);
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 104, 64);
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 144, 64);
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 104, 112);
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 64, 112);
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 24, 112);
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 144, 112);
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 24, 152);
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 64, 152);
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 104, 152);
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 144, 152);
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 64, 192);
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 104, 192);
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 144, 192);
                    //this.spawnEntity(EntityStaminaTwo, ig.game.screen.x + 64, 32);
                    */
                    this.spawnedSkillBoxes = true;
                }


                // Exit the menu
                if(ig.input.pressed('escape')){
                    this.gameState = null; 
                    this.menuVisible = false;
                    this.spawnedSkillBoxes = false;
                    ig.global.killAllMenus(ig.global.EntitySkillsMenu);
                    ig.global.killAllMenus(ig.global.EntityArteBox);
                    // this.displayedLightningBladeDescription = false; 
                }
            }

            /* Begin drawing spell menu */
            if(this.gameState === 'spellsMenu' && this.menuVisible && this.gameState !== 'artesMenu'){
                var player = ig.game.getEntitiesByType('EntityPlayer')[0];

                // Draw spells menu
                if(typeof this.getEntityByName('transparentmenu') === 'undefined'){
                    this.spawnEntity(EntityTransMenu, ig.game.screen.x, 0);
                }

                if(!this.spawnedArteBoxes){
                    this.spawnEntity(EntitySpellBoxA, ig.game.screen.x + 32, 32);
                    this.spawnEntity(EntityIncreaseFireball, ig.game.screen.x + 132, 40);
                    this.spawnEntity(EntityDecreaseFireball, ig.game.screen.x + 164, 40);
                    this.spawnEntity(EntitySpellBoxB, ig.game.screen.x + 32, 80);
                    this.spawnEntity(EntityIncreaseLightning, ig.game.screen.x + 132, 90);
                    this.spawnEntity(EntityDecreaseLightning, ig.game.screen.x + 164, 90);
                    this.spawnEntity(EntitySpellBoxC, ig.game.screen.x + 32, 128);
                    this.spawnEntity(EntityIncreaseWind, ig.game.screen.x + 132, 140);
                    this.spawnEntity(EntityDecreaseWind, ig.game.screen.x + 164, 140);
                    this.spawnEntity(EntitySpellBoxD, ig.game.screen.x + 32, 176);
                    this.spawnEntity(EntityIncreaseHeal, ig.game.screen.x + 132, 185);
                    this.spawnEntity(EntityDecreaseHeal, ig.game.screen.x + 164, 185);
                    this.spawnedArteBoxes = true; 
                }

                this.fontContent10.draw('Level: ' + this.spellsCatalog['fireball'].level, 70, 40);
                this.fontContent10.draw('Level: ' + this.spellsCatalog['lightning'].level, 70, 90);  
                this.fontContent10.draw('Level: ' + this.spellsCatalog['wind'].level, 70, 140); 
                this.fontContent10.draw('Level: ' + this.spellsCatalog['heal'].level, 70, 185);            

                this.fontContent10.draw('Skill Points: ' + this.player.skillPoints, 200, 40);

                if(this.displayedFireBallDescription){
                    this.lightningBladeDescription.draw(100, 75);
                    this.fontContent10.draw('Fireball', 110, 90);
                    this.fontContent10.draw('TP: ' + this.spellsCatalog['fireball'].tp, 250, 90);
                    this.fontContent10.draw('Singe the target with flames.', 110, 120);
                }

                if(this.displayedLightningDescription){
                    this.lightningBladeDescription.draw(100, 75);
                    this.fontContent10.draw('Lightning', 110, 90);
                    this.fontContent10.draw('TP: ' + this.spellsCatalog['lightning'].tp, 250, 90);
                    this.fontContent10.draw('Zap the target with wrath from the\nheavens.', 110, 120);
                }

                if(this.displayedWindDescription){
                    this.lightningBladeDescription.draw(100, 75);
                    this.fontContent10.draw('Wind', 110, 90);
                    this.fontContent10.draw('TP: ' + this.spellsCatalog['wind'].tp, 250, 90);
                    this.fontContent10.draw('Slice the enemy with blades of wind.', 110, 120);
                }

                if(this.displayedHealDescription){
                    this.lightningBladeDescription.draw(100, 75);
                    this.fontContent10.draw('Heal', 110, 90);
                    this.fontContent10.draw('TP: ' + this.spellsCatalog['heal'].tp, 250, 90);
                    this.fontContent10.draw('Channel divine energy to replenish HP.', 110, 120);
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
                    // this.displayedLightningBladeDescription = false; 
                }
            }

            /* Begin drawing arte menu */
            if(this.gameState === 'artesMenu' && this.menuVisible && this.gameState !== 'spellsMenu'){
                var player = ig.game.getEntitiesByType('EntityPlayer')[0];

                // Draw artes menu
                if(typeof this.getEntityByName('transparentmenu') === 'undefined'){
                    this.spawnEntity(EntityTransMenu, ig.game.screen.x, 0);
                }


                if(!this.spawnedArteBoxes){
                    this.spawnEntity(EntityArteBoxA, ig.game.screen.x + 32, 32);
                    this.spawnEntity(EntityIncreaseLightningBlade, ig.game.screen.x + 132, 40);
                    this.spawnEntity(EntityDecreaseLightningBlade, ig.game.screen.x + 164, 40);

                    this.spawnEntity(EntityArteBoxD, ig.game.screen.x + 32, 80);
                    this.spawnEntity(EntityIncreaseDemonFang, ig.game.screen.x + 132, 90);
                    this.spawnEntity(EntityDecreaseDemonFang, ig.game.screen.x + 164, 90);

                    this.spawnEntity(EntityArteBoxB, ig.game.screen.x + 32, 176);
                    this.spawnEntity(EntityIncreaseHellPyre, ig.game.screen.x + 132, 185);
                    this.spawnEntity(EntityDecreaseHellPyre, ig.game.screen.x + 164, 185);

                    this.spawnEntity(EntityArteBoxC, ig.game.screen.x + 32, 128);
                    this.spawnEntity(EntityIncreaseSonicThrust, ig.game.screen.x + 132, 140);
                    this.spawnEntity(EntityDecreaseSonicThrust, ig.game.screen.x + 164, 140);
                    this.spawnedArteBoxes = true; 
                }

                this.fontContent10.draw('Level: ' + this.artesCatalog['lightningBlade'].level, 70, 40);
                this.fontContent10.draw('Level: ' + this.artesCatalog['demonFang'].level, 70, 90);
                this.fontContent10.draw('Level: ' + this.artesCatalog['sonicThrust'].level, 70, 140);
                this.fontContent10.draw('Level: ' + this.artesCatalog['hellPyre'].level, 70, 185);
                

                this.fontContent10.draw('Skill Points: ' + this.player.skillPoints, 200, 40);

                if(this.displayedLightningBladeDescription){
                    this.lightningBladeDescription.draw(100, 75);
                    this.fontContent10.draw('Lightning Blade', 110, 90);
                    this.fontContent10.draw('TP: ' + this.artesCatalog['lightningBlade'].tp, 250, 90);
                    this.fontContent10.draw('Shock and thrust the target with sword\nand thunder.', 110, 120);
                }

                if(this.displayedHellPyreDescription){
                    this.lightningBladeDescription.draw(100, 75);
                    this.fontContent10.draw('Hell Pyre', 110, 90);
                    this.fontContent10.draw('TP: ' + this.artesCatalog['hellPyre'].tp, 250, 90);
                    this.fontContent10.draw('Bathe your weapon in holy fire and\nsend it crashing into the enemy.', 110, 120);
                }

                if(this.displayedSonicThrustDescription){
                    this.lightningBladeDescription.draw(100, 75);
                    this.fontContent10.draw('Sonic Trust', 110, 90);
                    this.fontContent10.draw('TP: ' + this.artesCatalog['sonicThrust'].tp, 250, 90);
                    this.fontContent10.draw('Powerful thrusts that down the enemy.', 110, 120);
                }

                if(this.displayedDemonFangDescription){
                    this.lightningBladeDescription.draw(100, 75);
                    this.fontContent10.draw('Demon Fang', 110, 90);
                    this.fontContent10.draw('TP: ' + this.artesCatalog['demonFang'].tp, 250, 90);
                    this.fontContent10.draw('Send demonic energy hurdling towards\nthe enemy.', 110, 120);
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
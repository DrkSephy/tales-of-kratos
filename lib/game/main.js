ig.module(
    'game.main'
)
.requires(
    'impact.game',
    // 'impact.debug.debug',
    'game.levels.basic',
    'game.levels.forest',

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
    'game.entities.menus.skillThree',

    /* skill menu, green route */
    'game.entities.menus.attackFour',
    'game.entities.menus.defenseThree',
    'game.entities.menus.staminaFive',
    'game.entities.menus.manaThree',
    'game.entities.menus.attackFive',
    'game.entities.menus.defenseFour',
    'game.entities.menus.skillFour',

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
    'plugins.hud.hud',
    'plugins.screen-fader.screen-fader',
    'plugins.screenshaker.screenshaker'
    // 'plugins.minimap.minimap'
)

.defines(function(){
    ig.BaseGame = ig.Game.extend({
        /* Fonts */
        font: new ig.Font('media/04b03.font.png'),
        fontContent10: {
            default: new ig.Font('media/verdana_10.font.png',  { fontColor: '#E5E5E5', letterSpacing: -1 }),
            green: new ig.Font('media/verdana_10.font.png',  { fontColor: '#3CDC3C', letterSpacing: -1 }),
            red: new ig.Font('media/verdana_10.font.png',  { fontColor: '#DC3C3C', letterSpacing: -1 })
        },

        /* Game images */
        statusScreen: new ig.Image('media/status.png'), // Status Screen image
        transScreen:  new ig.Image('media/transScreen.png'), // Artes Screen Image
        artesBox: new ig.Image('media/artebox.png'), // Arte box
        kratosMugshot: new ig.Image('media/kratos.png'), // Kratos mugshot
        lightningBladeDescription: new ig.Image('media/description.png'),
        artesMenuImage: new ig.Image('media/sword.png'),
        spellsMenuImage: new ig.Image('media/wizardhat.png'),
        skillSummary: new ig.Image('media/skilldescription.png'),
        abilitySummary: new ig.Image('media/abilitypoints.png'),
        arteBanner: new ig.Image('media/artebanner.png'),
        hurtAnimation: new ig.Image('media/hurt.png'),
        attackingAnimation: new ig.Image('media/attacking.png'),
        okayAnimation: new ig.Image('media/okay.png'),
        barHud: new ig.Image('media/barhud.png'),
        skillMenuImage: new ig.Image('media/skillmenu.png'),
        skillHPImage: new ig.Image('media/hp.png'),
        windSkillImage: new ig.Image('media/wind.png'),
        attackSkillImage: new ig.Image('media/attack.png'),
        hellPyreSkillImage: new ig.Image('media/hellpyre.png'),
        defenseImage: new ig.Image('media/defense.png'),
        fireballImage: new ig.Image('media/fireball.png'),
        sonicThrustImage: new ig.Image('media/sonicthrust.png'),
        inactiveHPImage: new ig.Image('media/inactivehp.png'),
        inactiveAttackImage: new ig.Image('media/inactiveattack.png'),
        inactiveDefenseImage: new ig.Image('media/inactivedefense.png'),
        inactiveWindSkillImage: new ig.Image('media/inactivewind.png'),
        inactiveFireballImage: new ig.Image('media/inactivefireball.png'),
        inactiveSonicThrustImage: new ig.Image('media/inactivesonicthrust.png'),
        inactiveHellPyreImage: new ig.Image('media/inactivehellpyre.png'),

        
        newSkillIcon: new ig.Image('media/skills.png'),
        newArtesIcon: new ig.Image('media/artes.png'),
        newSpellsIcon: new ig.Image('media/spells.png'),

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

        displayedSkillDescription: false,
        displayedStaminaDescription: false,
        displayedAttackDescription: false,
        displayedDefenseDescription: false,
        displayedStaminaThreeDescription: false,
        displayedManaDescription: false,
        displayedSkillOneDescription: false,
        displayedAttackTwoDescription: false,
        displayedDefenseTwoDescription: false,
        displayedManaTwoDescription: false,
        displayedSkillTwoDescription: false, 
        displayedAttackThreeDescription: false,
        displayedStaminaFourDescription: false,
        displayedSkillThreeDescription: false,
        displayedAttackFourDescription: false,
        displayedDefenseThreeDescription: false,
        displayedStaminaFiveDescription: false,
        displayedManaThreeDescription: false,
        displayedAttackFiveDescription: false,
        displayedDefenseFourDescription: false,
        activeArte: null,
        gotHurt: false,
        titleButton: new ig.Image('media/button.png'),

        musicState: null,

        screenshakeIntensity: 0, // Intensity of screen shaking

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

        clickSFX: new ig.Sound('media/sfx/trimmedselect.*'),
        hitSFX: new ig.Sound('media/sfx/hit.*'),
        deathSFX: new ig.Sound('media/sfx/death.*'),
        hud: new ig.hud(),
        auxMusic: null,

        /* Bind keys here, set up initial variables */
        init: function(){
            this.auxMusic = new ig.Music();
            this.auxMusic.add('media/bgm/title_screen.*', 'title');
            this.auxMusic.add('media/bgm/ruins.*', 'map');
            ig.music.loop = this.auxMusic.loop = true;
            this.musicState = 'titleScreenMusic';

            /* Set up camera plugin */
            var player = ig.game.getEntitiesByType('EntityTitleScreenEntity')[0];
            // Initiate camera plugin, which takes width and height as parameters for the constructor
            this.camera = new Camera( ig.system.width/3, ig.system.height/3, 5 );
            // How far should the camera look ahead?
            this.camera.trap.size.x = ig.system.width/5;
            this.camera.trap.size.y = ig.system.height/3;
            this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width/6 : 0;

            this.screenFadeOut = new ig.ScreenFader({
                fade: 'out',
                speed: 4
                //delayAfter: 1,
            });
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
            
            this.loadLevel(LevelBasic);
            this.pointer = this.spawnEntity(EntityPointer, 100, 100);
            // ig.music.add(this.introMusic);
            // ig.music.volume = 1;
            // ig.music.play();

            this.screenFadeOut = new ig.ScreenFader({
                fade: 'out',
                speed: 1
            });
        },
    });

    ig.MyGame = ig.BaseGame.extend({
        
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

            this.screenFadeOut = new ig.ScreenFader({
                fade: 'out',
                speed: 4
                //delayAfter: 1,
            });
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
            this.musicState = 'mapMusic';
            this.auxMusic = new ig.Music();
            this.auxMusic.add('media/bgm/title_screen.*', 'title');
            this.auxMusic.add('media/bgm/ruins.*', 'map');

            this.hurtTimer = new ig.Timer(0.5);

            // Load the first level, basic.js
            this.loadLevel(LevelForest);
            // this.generateMiniMap("minimap", 150, 150, [0,1]);
            this.pointer = this.spawnEntity(EntityPointer, 100, 100);

        },

        // Here we set up menu interactions, camera updates
        update: function() {
            if(this.hurtTimer.delta() < 0){
                this.gotHurt = true;
            } else
                this.gotHurt = false;
            if(this.musicState === 'mapMusic'){
                this.auxMusic.play('map');
            } else if (this.musicState === 'titleScreenMusic'){
                this.auxMusic.play('title');
            }
            // this.auxMusic.play('title');
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
            
            var water = new ig.AnimationSheet('media/animatedwater.png', 16, 16);
            var waterfall = new ig.AnimationSheet('media/animatedwaterfall.png', 16, 16);
            var lava = new ig.AnimationSheet('media/fg/lava.png', 16, 16);

            // Set up checkpoint data for respawning of player
            // Grab an instance of the player

             
            
            this.backgroundAnims = {   
                'media/animatedwater.png': {
                    0: new ig.Animation(water, 0.3, [0,1,2,3])
                },
                'media/animatedwaterfall.png': {
                    0: new ig.Animation(waterfall, 0.2, [0,1,2,3])
                },
                'media/fg/lava.png': {
                    0: new ig.Animation(lava, 0.2, [0, 1, 2, 3])
                },
            }


            this.parent(level);
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

        levelUp: function(entity){
            entity.stats.str += (this.levelsCatalog[entity.stats.level].atkIncrease * 1 + this.generateRandomInt(10, 150));
            entity.stats.mag += (this.levelsCatalog[entity.stats.level].magIncrease) * 1 + this.generateRandomInt(10, 150);
            entity.stats.def += (this.levelsCatalog[entity.stats.level].defIncrease) * 2 + this.generateRandomInt(10, 100);
            entity.stats.spd += (this.levelsCatalog[entity.stats.level].spdIncrease) * 2 + this.generateRandomInt(10, 150);
            entity.stats.maxHP += (this.levelsCatalog[entity.stats.level].hpIncrease) * 2 + this.generateRandomInt(10, 50); 
            entity.stats.maxTP += (this.levelsCatalog[entity.stats.level].tpIncrease) * 1 + this.generateRandomInt(10, 50);
            entity.stats.level++;
            return;
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
            if(this.screenshakeIntensity === 0) {
                this.parent();
            } else {
                // Modified sign/signum function. Extracts the sign of a real number
                // (returns -1 if negative or +1 if positive). If 0, return +1 (positive).
                var sgn = function(num) {
                    return !num ? (num > 0) - (num < 0) : 1;
                };

                // Modified screen shaking effect (no plugins)
                //   http://impactjs.com/forums/code/plugin-to-shake-the-screen/page/1
                ig.system.context.save();
                    // Screen shake intensity
                    //   x: -5 px or +5 px
                    //   y: -5 px OR +5 px
                    ig.system.context.translate(
                        this.screenshakeIntensity * sgn(Math.random() - 0.5),
                        this.screenshakeIntensity * sgn(Math.random() - 0.5)
                    );
                    this.parent();
                ig.system.context.restore();
                this.screenshakeIntensity = 0;
            }
            // this.drawMiniMap("minimap", (ig.system.width - 150 - 8), 8, ["EntityPlayer"], true);
            if(!ig.game.menuVisible){
                this.newSpellsIcon.draw(286, 6);
                this.newArtesIcon.draw(266, 6);
                this.newSkillIcon.draw(246, 6);
            }

            var player = ig.game.getEntitiesByType('EntityPlayer')[0];



            if(player.attacking && !this.menuVisible){
                this.arteBanner.draw(60, 0);
                //this.attackingAnimation.draw(10, 185);
                if(this.activeArte === 'lightningBlade'){
                    this.fontContent10.default.draw('Lightning Blade', 120, 10);
                }
                else if(this.activeArte === 'sonicThrust'){
                    this.fontContent10.default.draw('Sonic Thrust', 125, 10);
                }

                else if(this.activeArte === 'lightning'){
                    this.fontContent10.default.draw('Lightning', 130, 10);
                }

                else if(this.activeArte === 'heal'){
                    this.fontContent10.default.draw('Heal', 140, 10);
                }

                else if(this.activeArte === 'wind'){
                    this.fontContent10.default.draw('Wind', 140, 10);
                }

                else if(this.activeArte === 'demonFang'){
                    this.fontContent10.default.draw('Demon Fang', 125, 10);
                }

                else if(this.activeArte === 'hellPyre'){
                    this.fontContent10.default.draw('Hell Pyre', 135, 10);
                }

                else if(this.activeArte === 'fireball'){
                    this.fontContent10.default.draw('Fireball', 135, 10);
                }
            }
            
            else if (!this.player.attacking && !this.menuVisible){
                //this.okayAnimation.draw(10, 185);
            }
            // Debug draw for camera
            // this.camera.draw();
            
            /* Begin drawing skills menu */
            if(this.gameState === 'skillsMenu' && this.menuVisible && this.gameState !== 'artesMenu' && this.gameState !== 'spellsMenu'){
                var player = ig.game.getEntitiesByType('EntityPlayer')[0];
                this.skillMenuImage.draw(0,0);
                // Box to display abilty points
                this.abilitySummary.draw(180, 20);
                this.fontContent10.default.draw('Ability Tree', 190, 25);
                this.fontContent10.default.draw('Ability Points: ' +  player.abilityPoints, 190, 50)
                if(this.skillsCatalog['health3'].active){
                    this.skillHPImage.draw(24, 64); // health increase 3 
                } else 
                    this.inactiveHPImage.draw(24, 64);

                if(this.skillsCatalog['healthIncrease1'].active){
                    this.skillHPImage.draw(104, 112); // health increase 1 
                } else 
                    this.inactiveHPImage.draw(104, 112);

                if(this.skillsCatalog['healthIncrease5'].active){
                    this.skillHPImage.draw(144, 192); // health increase 5
                } else
                    this.inactiveHPImage.draw(144, 192);
                
                if(this.skillsCatalog['mana1'].active){
                    this.skillHPImage.draw(24, 24); // mana increase 1
                } else
                    this.inactiveHPImage.draw(24, 24);

                if(this.skillsCatalog['skill1'].active){
                    this.windSkillImage.draw(64, 24); // wind skill
                } else
                    this.inactiveWindSkillImage.draw(64, 24);
                
                if(this.skillsCatalog['attack2'].active){
                    this.attackSkillImage.draw(104, 24); // attack increase 2
                } else
                    this.inactiveAttackImage.draw(104, 24);
                
                if(this.skillsCatalog['skill4'].active){
                    this.hellPyreSkillImage.draw(144, 24); // hell pyre skill
                } else
                    this.inactiveHellPyreImage.draw(144, 24);
                if(this.skillsCatalog['defense1'].active){
                    this.defenseImage.draw(64, 64); // defense increase 1
                } else
                    this.inactiveDefenseImage.draw(64, 64);

                if(this.skillsCatalog['attack1'].active){
                    this.attackSkillImage.draw(104, 64); // attack increase 1
                } else
                    this.inactiveAttackImage.draw(104, 64);

                if(this.skillsCatalog['defense4'].active){
                    this.defenseImage.draw(144, 64); //defense increase 4
                } else
                    this.inactiveDefenseImage.draw(144, 64);

                if(this.skillsCatalog['mana2'].active){
                    this.skillHPImage.draw(24, 112); // mana increase 2
                } else
                    this.inactiveHPImage.draw(24, 112);

                if(this.skillsCatalog['defense2'].active){
                    this.defenseImage.draw(64, 112); // defense increase 2
                } else 
                    this.inactiveDefenseImage.draw(64, 112);

                if(this.skillsCatalog['attack5'].active){
                    this.attackSkillImage.draw(144, 112); // attack increase 5
                } else
                    this.inactiveAttackImage.draw(144, 112);

                if(this.skillsCatalog['skill2'].active){
                    this.fireballImage.draw(24, 152); // fireball skill
                } else 
                    this.inactiveFireballImage.draw(24, 152);

                if(this.skillsCatalog['skill3'].active){
                    this.sonicThrustImage.draw(64, 152); // sonic thrust skill
                } else 
                    this.inactiveSonicThrustImage.draw(64, 152);
                if(this.skillsCatalog['attack4'].active){
                    this.attackSkillImage.draw(104, 152); // Attack increase 4
                } else 
                    this.inactiveAttackImage.draw(104, 152);

                if(this.skillsCatalog['mana3'].active){
                    this.skillHPImage.draw(144, 152); // mana increase 3
                } else
                    this.inactiveHPImage.draw(144, 152);

                if(this.skillsCatalog['attack3'].active){
                    this.attackSkillImage.draw(24, 192); // attack increase 3
                } else
                    this.inactiveAttackImage.draw(24, 192);

                if(this.skillsCatalog['healthIncrease4'].active){
                    this.skillHPImage.draw(64, 192); // health increase 4
                } else
                    this.inactiveHPImage.draw(64, 192);
                if(this.skillsCatalog['defense3'].active){
                    this.defenseImage.draw(104, 192); // defense increase 3
                } else
                    this.inactiveDefenseImage.draw(104, 192);


                
                // if(typeof this.getEntityByName('skillsmenu') === 'undefined'){
                //     this.spawnEntity(EntitySkillsMenu, ig.game.screen.x, ig.game.screen.y + 0);
                // } 

                if(!this.spawnedSkillBoxes){
                    // Blue skill tree path
                    this.spawnEntity(EntityStamina, ig.game.screen.x + 104, ig.game.screen.y + 112);
                    this.spawnEntity(EntityAttack, ig.game.screen.x + 104, ig.game.screen.y + 64);
                    this.spawnEntity(EntityDefense, ig.game.screen.x + 64, ig.game.screen.y + 64);
                    this.spawnEntity(EntityStaminaThree, ig.game.screen.x + 24, ig.game.screen.y + 64);
                    this.spawnEntity(EntityMana, ig.game.screen.x + 24, ig.game.screen.y + 24);
                    this.spawnEntity(EntitySkillOne, ig.game.screen.x + 64, ig.game.screen.y + 24);
                    this.spawnEntity(EntityAttackTwo, ig.game.screen.x + 104, ig.game.screen.y + 24);
                    this.spawnEntity(EntityDefenseTwo, ig.game.screen.x + 64, ig.game.screen.y + 112);
                    this.spawnEntity(EntityManaTwo, ig.game.screen.x + 24, ig.game.screen.y + 112);
                    this.spawnEntity(EntitySkillTwo, ig.game.screen.x + 24, ig.game.screen.y + 152);
                    this.spawnEntity(EntityAttackThree, ig.game.screen.x + 24, ig.game.screen.y + 192);
                    this.spawnEntity(EntityStaminaFour, ig.game.screen.x + 64, ig.game.screen.y + 192);
                    this.spawnEntity(EntitySkillThree, ig.game.screen.x + 64, ig.game.screen.y + 152);
                    this.spawnEntity(EntityAttackFour, ig.game.screen.x + 104, ig.game.screen.y + 152);
                    this.spawnEntity(EntityDefenseThree, ig.game.screen.x + 104, ig.game.screen.y + 192);
                    this.spawnEntity(EntityStaminaFive, ig.game.screen.x + 144, ig.game.screen.y + 192);
                    this.spawnEntity(EntityManaThree, ig.game.screen.x + 144, ig.game.screen.y + 152);
                    this.spawnEntity(EntityAttackFive, ig.game.screen.x + 144, ig.game.screen.y + 112);
                    this.spawnEntity(EntityDefenseFour, ig.game.screen.x + 144, ig.game.screen.y + 64);
                    this.spawnEntity(EntitySkillFour, ig.game.screen.x + 144, ig.game.screen.y + 24);
                    this.spawnedSkillBoxes = true;
                }

                // Box for skill summary
                if(this.displayedSkillDescription){
                    this.skillSummary.draw(180, 100);
                }

                
                /* Blue skill route */
                if(this.displayedStaminaDescription){
                    this.fontContent10.default.draw('Health Increase 1', 190, 115);
                    this.fontContent10.default.draw('Increase max hit points \nby ' + this.skillsCatalog['healthIncrease1'].increase + '.', 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['healthIncrease1'].points, 190, 190);
                }

                if(this.displayedAttackDescription){
                    this.fontContent10.default.draw('Attack Increase 1', 190, 115);
                    this.fontContent10.default.draw('Increase ATK points by ' + this.skillsCatalog['attack1'].increase + '.', 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['attack1'].points, 190, 190);
                }

                if(this.displayedDefenseDescription){
                    this.fontContent10.default.draw('Defense Increase 1', 190, 115);
                    this.fontContent10.default.draw('Increase DEF points by ' + this.skillsCatalog['defense1'].increase + '.', 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['defense1'].points, 190, 190);
                }

                if(this.displayedStaminaThreeDescription){
                    this.fontContent10.default.draw('Health Increase 3', 190, 115);
                    this.fontContent10.default.draw('Increase max hit points \nby ' + this.skillsCatalog['health3'].increase + '.', 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['health3'].points, 190, 190);
                }

                if(this.displayedManaDescription){
                    this.fontContent10.default.draw('Mana Increase 1', 190, 115);
                    this.fontContent10.default.draw('Increase max technical \npoints by ' + this.skillsCatalog['mana1'].increase + '.', 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['mana1'].points, 190, 190);
                }    

                if(this.displayedSkillOneDescription){
                    this.fontContent10.default.draw('Wind', 190, 115);
                    this.fontContent10.default.draw('Unlocks Wind Spell.', 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['skill1'].points, 190, 190);
                }  

                if(this.displayedAttackTwoDescription){
                    this.fontContent10.default.draw('Attack Increase 2', 190, 115);
                    this.fontContent10.default.draw('Increase ATK points by ' + this.skillsCatalog['attack2'].increase + '.', 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['attack2'].points, 190, 190);
                } 

                    
                /* Red Route */

                if(this.displayedDefenseTwoDescription){
                    this.fontContent10.default.draw('Defense Increase 2', 190, 115);
                    this.fontContent10.default.draw('Increase DEF points by ' + this.skillsCatalog['defense2'].increase + '.', 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['defense2'].points, 190, 190);
                } 

                if(this.displayedManaTwoDescription){
                    this.fontContent10.default.draw('Mana Increase 2', 190, 115);
                    this.fontContent10.default.draw('Increase max technical \npoints by ' + this.skillsCatalog['mana2'].increase + '.', 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['mana2'].points, 190, 190);
                }

                if(this.displayedSkillTwoDescription){
                    this.fontContent10.default.draw('Fireball', 190, 115);
                    this.fontContent10.default.draw('Unlocks Fireball spell.' , 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['skill2'].points, 190, 190);
                }

                if(this.displayedAttackThreeDescription){
                    this.fontContent10.default.draw('Attack Increase 3', 190, 115);
                    this.fontContent10.default.draw('Increase ATK points by ' + this.skillsCatalog['attack3'].increase + '.', 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['attack3'].points, 190, 190);
                }

                if(this.displayedStaminaFourDescription){
                    this.fontContent10.default.draw('Health Increase 4', 190, 115);
                    this.fontContent10.default.draw('Increase max hit points \nby ' + this.skillsCatalog['healthIncrease4'].increase + '.', 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['healthIncrease4'].points, 190, 190);
                }

                if(this.displayedSkillThreeDescription){
                    this.fontContent10.default.draw('Sonic Thrust', 190, 115);
                    this.fontContent10.default.draw('Unlocks Sonic Thrust Arte.', 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['skill3'].points, 190, 190);
                }

                
                /* Green Route */
                if(this.displayedAttackFourDescription){
                    this.fontContent10.default.draw('Attack Increase 4', 190, 115);
                    this.fontContent10.default.draw('Increase ATK points by ' + this.skillsCatalog['attack4'].increase + '.', 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['attack4'].points, 190, 190);
                }

                if(this.displayedDefenseThreeDescription){
                    this.fontContent10.default.draw('Defense Increase 3', 190, 115);
                    this.fontContent10.default.draw('Increase DEF points by ' + this.skillsCatalog['defense3'].increase + '.', 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['defense3'].points, 190, 190);
                }

                if(this.displayedStaminaFiveDescription){
                    this.fontContent10.default.draw('Health Increase 5', 190, 115);
                    this.fontContent10.default.draw('Increase max hit points \nby ' + this.skillsCatalog['healthIncrease5'].increase + '.', 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['healthIncrease5'].points, 190, 190);
                }

                if(this.displayedManaThreeDescription){
                    this.fontContent10.default.draw('Mana Increase 3', 190, 115);
                    this.fontContent10.default.draw('Increase max technical \npoints by ' + this.skillsCatalog['mana3'].increase + '.', 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['mana3'].points, 190, 190);
                }

                if(this.displayedAttackFiveDescription){
                    this.fontContent10.default.draw('Attack Increase 5', 190, 115);
                    this.fontContent10.default.draw('Increase ATK points by ' + this.skillsCatalog['attack5'].increase + '.', 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['attack5'].points, 190, 190);
                }

                if(this.displayedDefenseFourDescription){
                    this.fontContent10.default.draw('Defense Increase 4', 190, 115);
                    this.fontContent10.default.draw('Increase DEF points by ' + this.skillsCatalog['defense4'].increase + '.', 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['defense4'].points, 190, 190);
                }

                if(this.displayedSkillFourDescription){
                    this.fontContent10.default.draw('Hell Pyre', 190, 115);
                    this.fontContent10.default.draw('Unlocks Hell Pyre Arte.', 190, 150);
                    this.fontContent10.default.draw('Ability Points required: ' + this.skillsCatalog['skill4'].points, 190, 190);
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
            if(this.gameState === 'spellsMenu' && this.menuVisible && this.gameState !== 'artesMenu' && this.gameState !== 'skillsMenu'){

                // Draw spells menu
                if(typeof this.getEntityByName('transparentmenu') === 'undefined'){
                    this.spawnEntity(EntityTransMenu, ig.game.screen.x, ig.game.screen.y + 0);
                }

                if(!this.spawnedArteBoxes){
                    this.spawnEntity(EntitySpellBoxA, ig.game.screen.x + 32, ig.game.screen.y + 32);
                    this.spawnEntity(EntityIncreaseFireball, ig.game.screen.x + 132, ig.game.screen.y + 40);
                    this.spawnEntity(EntityDecreaseFireball, ig.game.screen.x + 164, ig.game.screen.y + 40);
                    this.spawnEntity(EntitySpellBoxB, ig.game.screen.x + 32, ig.game.screen.y + 80);
                    this.spawnEntity(EntityIncreaseLightning, ig.game.screen.x + 132, ig.game.screen.y + 90);
                    this.spawnEntity(EntityDecreaseLightning, ig.game.screen.x + 164, ig.game.screen.y + 90);
                    this.spawnEntity(EntitySpellBoxC, ig.game.screen.x + 32, ig.game.screen.y + 128);
                    this.spawnEntity(EntityIncreaseWind, ig.game.screen.x + 132, ig.game.screen.y + 140);
                    this.spawnEntity(EntityDecreaseWind, ig.game.screen.x + 164, ig.game.screen.y + 140);
                    this.spawnEntity(EntitySpellBoxD, ig.game.screen.x + 32, ig.game.screen.y + 176);
                    this.spawnEntity(EntityIncreaseHeal, ig.game.screen.x + 132, ig.game.screen.y + 185);
                    this.spawnEntity(EntityDecreaseHeal, ig.game.screen.x + 164, ig.game.screen.y + 185);
                    this.spawnedArteBoxes = true; 
                }

                this.fontContent10.default.draw('Level: ' + this.spellsCatalog['fireball'].level, 70, 40);
                this.fontContent10.default.draw('Level: ' + this.spellsCatalog['lightning'].level, 70, 90);  
                this.fontContent10.default.draw('Level: ' + this.spellsCatalog['wind'].level, 70, 140); 
                this.fontContent10.default.draw('Level: ' + this.spellsCatalog['heal'].level, 70, 185);            

                this.fontContent10.default.draw('Skill Points: ' + this.player.skillPoints, 200, 40);

                if(this.displayedFireBallDescription){
                    this.lightningBladeDescription.draw(100, 75);
                    this.fontContent10.default.draw('Fireball', 110, 90);
                    this.fontContent10.default.draw('TP: ' + this.spellsCatalog['fireball'].tp, 250, 90);
                    this.fontContent10.default.draw('Singe the target with flames.', 110, 120);
                }

                if(this.displayedLightningDescription){
                    this.lightningBladeDescription.draw(100, 75);
                    this.fontContent10.default.draw('Lightning', 110, 90);
                    this.fontContent10.default.draw('TP: ' + this.spellsCatalog['lightning'].tp, 250, 90);
                    this.fontContent10.default.draw('Zap the target with wrath from the\nheavens.', 110, 120);
                }

                if(this.displayedWindDescription){
                    this.lightningBladeDescription.draw(100, 75);
                    this.fontContent10.default.draw('Wind', 110, 90);
                    this.fontContent10.default.draw('TP: ' + this.spellsCatalog['wind'].tp, 250, 90);
                    this.fontContent10.default.draw('Slice the enemy with blades of wind.', 110, 120);
                }

                if(this.displayedHealDescription){
                    this.lightningBladeDescription.draw(100, 75);
                    this.fontContent10.default.draw('Heal', 110, 90);
                    this.fontContent10.default.draw('TP: ' + this.spellsCatalog['heal'].tp, 250, 90);
                    this.fontContent10.default.draw('Channel divine energy to replenish HP.', 110, 120);
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
            if(this.gameState === 'artesMenu' && this.menuVisible && this.gameState !== 'spellsMenu' && this.gameState !== 'skillsMenu'){
                var player = ig.game.getEntitiesByType('EntityPlayer')[0];

                // Draw artes menu
                if(typeof this.getEntityByName('transparentmenu') === 'undefined'){
                    this.spawnEntity(EntityTransMenu, ig.game.screen.x, ig.game.screen.y + 0);
                }


                if(!this.spawnedArteBoxes){
                    this.spawnEntity(EntityArteBoxA, ig.game.screen.x + 32, ig.game.screen.y + 32);
                    this.spawnEntity(EntityIncreaseLightningBlade, ig.game.screen.x + 132, ig.game.screen.y + 40);
                    this.spawnEntity(EntityDecreaseLightningBlade, ig.game.screen.x + 164, ig.game.screen.y + 40);

                    this.spawnEntity(EntityArteBoxD, ig.game.screen.x + 32, ig.game.screen.y + 80);
                    this.spawnEntity(EntityIncreaseDemonFang, ig.game.screen.x + 132, ig.game.screen.y + 90);
                    this.spawnEntity(EntityDecreaseDemonFang, ig.game.screen.x + 164, ig.game.screen.y + 90);

                    this.spawnEntity(EntityArteBoxB, ig.game.screen.x + 32, ig.game.screen.y + 176);
                    this.spawnEntity(EntityIncreaseHellPyre, ig.game.screen.x + 132, ig.game.screen.y + 185);
                    this.spawnEntity(EntityDecreaseHellPyre, ig.game.screen.x + 164, ig.game.screen.y + 185);

                    this.spawnEntity(EntityArteBoxC, ig.game.screen.x + 32, ig.game.screen.y + 128);
                    this.spawnEntity(EntityIncreaseSonicThrust, ig.game.screen.x + 132, ig.game.screen.y + 140);
                    this.spawnEntity(EntityDecreaseSonicThrust, ig.game.screen.x + 164, ig.game.screen.y + 140);
                    this.spawnedArteBoxes = true; 
                }

                this.fontContent10.default.draw('Level: ' + this.artesCatalog['lightningBlade'].level, 70, 40);
                this.fontContent10.default.draw('Level: ' + this.artesCatalog['demonFang'].level, 70, 90);
                this.fontContent10.default.draw('Level: ' + this.artesCatalog['sonicThrust'].level, 70, 140);
                this.fontContent10.default.draw('Level: ' + this.artesCatalog['hellPyre'].level, 70, 185);
                

                this.fontContent10.default.draw('Skill Points: ' + this.player.skillPoints, 200, 40);

                if(this.displayedLightningBladeDescription){
                    this.lightningBladeDescription.draw(100, 75);
                    this.fontContent10.default.draw('Lightning Blade', 110, 90);
                    this.fontContent10.default.draw('TP: ' + this.artesCatalog['lightningBlade'].tp, 250, 90);
                    this.fontContent10.default.draw('Shock and thrust the target with sword\nand thunder.', 110, 120);
                }

                if(this.displayedHellPyreDescription){
                    this.lightningBladeDescription.draw(100, 75);
                    this.fontContent10.default.draw('Hell Pyre', 110, 90);
                    this.fontContent10.default.draw('TP: ' + this.artesCatalog['hellPyre'].tp, 250, 90);
                    this.fontContent10.default.draw('Bathe your weapon in holy fire and\nsend it crashing into the enemy.', 110, 120);
                }

                if(this.displayedSonicThrustDescription){
                    this.lightningBladeDescription.draw(100, 75);
                    this.fontContent10.default.draw('Sonic Trust', 110, 90);
                    this.fontContent10.default.draw('TP: ' + this.artesCatalog['sonicThrust'].tp, 250, 90);
                    this.fontContent10.default.draw('Powerful thrusts that down the enemy.', 110, 120);
                }

                if(this.displayedDemonFangDescription){
                    this.lightningBladeDescription.draw(100, 75);
                    this.fontContent10.default.draw('Demon Fang', 110, 90);
                    this.fontContent10.default.draw('TP: ' + this.artesCatalog['demonFang'].tp, 250, 90);
                    this.fontContent10.default.draw('Send demonic energy hurdling towards\nthe enemy.', 110, 120);
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
                // this.kratosMugshot.draw(10, 10);
                // Get instance of player
                var player = ig.game.getEntitiesByType('EntityPlayer')[0];
                // Draw player stats
                this.fontContent10.red.draw('Kratos Aurion', 60, 50, ig.Font.ALIGN.CENTER);
                this.fontContent10.red.draw('Level ', 41, 70, ig.Font.ALIGN.CENTER);
                this.fontContent10.default.draw(player.stats.level, 81, 70, ig.Font.ALIGN.CENTER);
                this.fontContent10.red.draw('HP    ', 41, 90, ig.Font.ALIGN.CENTER);
                this.fontContent10.default.draw(player.health + ' / ' + player.stats.maxHP, 91, 90, ig.Font.ALIGN.CENTER);
                this.fontContent10.red.draw('TP    ', 41, 110, ig.Font.ALIGN.CENTER);
                this.fontContent10.default.draw(player.tp + ' / ' + player.stats.maxTP, 91, 110, ig.Font.ALIGN.CENTER);

                this.fontContent10.red.draw('STR: ', 41, 130, ig.Font.ALIGN.CENTER);
                this.fontContent10.default.draw(player.stats.str, 61, 130, ig.Font.ALIGN.CENTER);
                this.fontContent10.red.draw('MAG: ', 42, 150, ig.Font.ALIGN.CENTER);
                this.fontContent10.default.draw(player.stats.mag, 61, 150, ig.Font.ALIGN.CENTER);
                this.fontContent10.red.draw('DEF: ', 41, 170, ig.Font.ALIGN.CENTER);
                this.fontContent10.default.draw(player.stats.def, 61, 170, ig.Font.ALIGN.CENTER);
                this.fontContent10.red.draw('SPD: ', 41, 190, ig.Font.ALIGN.CENTER);
                this.fontContent10.default.draw(player.stats.spd, 61, 190, ig.Font.ALIGN.CENTER);
                this.fontContent10.red.draw('EXP: ', 100, 130, ig.Font.ALIGN.CENTER);
                this.fontContent10.default.draw(this.levelsCatalog[player.stats.level].expTotal, 120, 130, ig.Font.ALIGN.CENTER);
                this.fontContent10.red.draw('NEXT: ', 103, 150, ig.Font.ALIGN.CENTER);
                this.fontContent10.default.draw(this.levelsCatalog[player.stats.level].expToNext, 130, 150, ig.Font.ALIGN.CENTER);

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

    ig.StartScreen = ig.BaseGame.extend({
        fontContent10: new ig.Font('media/verdana_10.font.png',  { fontColor: '#E5E5E5', letterSpacing: -1 }),
        titleScreen: new ig.Image('media/title.png'),
        clicked: false,
        titleFont: new ig.Image('media/title1.png'),

        init: function(){
            this.parent();
            
        },

        update: function(){
            if(this.musicState === 'titleScreenMusic'){
                this.auxMusic.play('title');
            }
            if(this.pointer.isLeftClicking && this.pointer.pos.x >= 92 + ig.game.screen.x && this.pointer.pos.x <= 238 + ig.game.screen.x && this.pointer.pos.y >= 122 + ig.game.screen.y && this.pointer.pos.y <= 131 + ig.game.screen.y
                && this.clicked === false){
                    this.clicked = true;
                    ig.game.clickSFX.volume = 0.7;
                    ig.game.clickSFX.play();
                    this.fadeIn();
                    this.auxMusic.fadeOut(2);
            }
            

            this.camera.follow( this.player );
            this.parent();
        }, // End update

        // loadLevel is called when a level is loaded
        loadLevel: function(level) {        
            
            var water = new ig.AnimationSheet('media/animatedwater.png', 16, 16);
            var waterfall = new ig.AnimationSheet('media/animatedwaterfall.png', 16, 16);
            var lava = new ig.AnimationSheet('media/fg/lava.png', 16, 16);

            // Set up checkpoint data for respawning of player
            // Grab an instance of the player

             
            
            this.backgroundAnims = {   
                'media/animatedwater.png': {
                    0: new ig.Animation(water, 0.3, [0,1,2,3])
                },
                'media/animatedwaterfall.png': {
                    0: new ig.Animation(waterfall, 0.2, [0,1,2,3])
                },
                'media/fg/lava.png': {
                    0: new ig.Animation(lava, 0.2, [0, 1, 2, 3])
                },
            }


            this.parent(level);
            this.player = this.getEntitiesByType('EntityTitleScreenEntity')[0];
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

        draw: function(){
            this.parent();
            // this.titleScreen.draw(0,0);
            //this.background.draw(0,0);
            var x = ig.system.width/2,
            y = ig.system.height/2;
            this.titleButton.draw(x - 76, y - 22);
            this.titleFont.draw(60, 10);
            this.fontContent10.draw('Click to Start', x, y, ig.Font.ALIGN.CENTER);

            // Screen fade transition effect
            if(this.screenFadeOut) {
                this.screenFadeOut.draw();
            }
            if(this.screenFadeIn) {
                this.screenFadeIn.draw();
            }
        }, // End draw

        fadeIn: function() {
            this.screenFadeIn = new ig.ScreenFader({
                fade: 'in',
                speed: 1.5,
                callback: function() { 
                    ig.system.setGame(ig.MyGame); 
                    this.auxMusic.fadeOut(2);
                },
                delayBefore: 1,
                delayAfter: 1
            });
        }


}); // End StartScreen

    // Instantiate game starting on the MyGame game class, with 60 frames per second,
    // width of 320 pixels, height of 240 pixels, scaled up by a factor of 2
    ig.main('#canvas', ig.StartScreen, 60, 320, 240, 2);
});

ig.global.killAllMenus = function(menu) {
    var menus = ig.game.getEntitiesByType(menu);
    for(var i = 0; i < menus.length; i++) {
        menus[i].kill();
    }
};
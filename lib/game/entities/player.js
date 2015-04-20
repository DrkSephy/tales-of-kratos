ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity',
    'game.entities.projectiles.demonfang',
    'game.entities.projectiles.lightning',
    'game.entities.projectiles.fiercedemonfang',
    'game.entities.projectiles.healing'
)
.defines(function(){
    EntityPlayer = ig.Entity.extend({
        /* Collision Properties 
         * type: What group does the player belong to? 
         *  TYPE.A: Friendly
         *  TYPE.B: Enemy
         * checkAgainst: What entities do we check against?
         * collides: What happens if we collide with an entity? 
        */
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.ACTIVE,
        
        name: 'Kratos', 

        /* Setup player properties */
        animSheet: new ig.AnimationSheet('media/kratos-d.png', 140, 100), // Animation sheet
        size: {x: 40, y: 50}, // Size of collision bounding box
        flip: true, // Set flip property to true
        accelGround: 200, // How fast we accelerate for movement on the ground
        accelAir: 310, // How fast we accelerate in the air
        jump: 360, // How high can we jump? 
        friction: {x: 500, y: 0}, // Resistance against movement
        maxVel: {x: 100, y: 160}, // Cap our maximum velocity from acceleration
        attacking: false, // Boolean to control when we can attack
        startPosition: null, // Our starting position in the game world, used for respawning
        offset: {x: 50, y: 30},
        running: false,
        arte: null, // Which arte are we using?
        spellAnimation: false, 

        // miniMap: { mapColor: '#0000FF', mapSize: 4, icon: 'media/plus.png', iconOffset: {x: 0, y: 0} },

        /* Player stats */
        // Just temporary for now
        stats : {
            str: 10,
            mag: 5,
            def: 9,
            spd: 10,
            totalExp: 0,
            nextExp: 10, 
            level: 1, 
            hp: 150,
            tp: 100,
            maxHP: 150, 
            maxTP: 100, 
        }, 

        skillPoints: 10, // How many skill points we have to allocate
        health: 150, // Override base health value
        tp: 100, // Technical Points

        init: function(x, y, settings){
            this.parent(x, y, settings);
            /* Set up player animations */

            /* this.addAnim(name, speed, frames)
             * name: string
             *  - the identifier for this animation
             * speed: number
             *  - how fast to iterate through frame cycle
             * frames: array
             *  - array of what frames to animate
            */ 
            this.addAnim('idle', 1, [1]);
            this.addAnim('walk', 0.10, [14, 15, 16, 17, 18, 19, 20]);
            this.addAnim('run', 0.10, [28, 29, 30, 31, 32, 33]);
            this.addAnim('jump', 0.10, [48]);
            this.addAnim('fall', 0.10, [48]);
            this.addAnim('lightningBlade', 0.10, [57, 58, 59, 60], true);
            this.addAnim('hellPyre', 0.10, [71, 72, 73, 74, 75, 76, 77, 84, 85, 86, 87, 88, 89, 90, 91], false)
            this.addAnim('demon_fang', 0.10, [73, 74, 75, 76], false);
            this.addAnim('spellCasting', 0.10, [126, 127, 128], false);
            this.addAnim('castSpell', 0.10, [129, 129, 129, 129], false);

            this.atkTimer = new ig.Timer(1.5);
            this.demonFangTimer = new ig.Timer(1.5);
            this.startPosition = {x:x, y:y};
            this.parent(x, y, settings);
        },

        update: function(){
            // Set up movement cases
            var accel = this.standing ? this.accelGround : this.accelAir;

            /******************************
            * LIGHTNING BLADE FACING LEFT *
            ******************************/

            if(ig.input.state('left') && !ig.game.menuVisible && !this.attacking){
                this.accel.x = -accel;
                this.flip = false;
                // Trigger Lightning blade facing left
                if(ig.input.state('attack') && !this.attacking){
                    this.atkTimer.reset();
                    // ig.game.spawnEntity(EntityDemonFang, this.pos.x - 20, this.pos.y + 7, {flip: !this.flip});
                    this.tp -= 5;
                    this.currentAnim = this.anims.lightningBlade;
                    // ig.game.spawnEntity(EntityFierceDemonFang, this.pos.x - 30, this.pos.y + 4, {flip: !this.flip});
                    console.log('Lightning blade');
                    if(this.atkTimer.delta() < 0){
                        this.attacking = true;
                        this.arte = 'lightning_blade';
                        this.size.x = 50;
                        this.offset.x = 25;
                        // this.offset.x = 25;
                    }
                }
            } 

            /*******************************
            * LIGHTNING BLADE FACING RIGHT *
            *******************************/

            else if(ig.input.state('right') && !ig.game.menuVisible && !this.attacking){
                this.accel.x = accel;
                this.flip = true;
                // Trigger lightning blade facing right
                if(ig.input.state('attack') && !this.attacking){
                    this.atkTimer.reset();
                    this.vel.x = 10;
                    // this.pos.x += 30;
                    // ig.game.spawnEntity(EntityDemonFang, this.pos.x + 40, this.pos.y + 7, {flip: !this.flip});
                    // ig.game.spawnEntity(EntityFierceDemonFang, this.pos.x + 20, this.pos.y + 4, {flip: !this.flip});
                    console.log('Lightning blade');
                    if(this.atkTimer.delta() < 0){
                        this.attacking = true;
                        this.size.x = 50;
                        this.arte = 'lightning_blade';
                        console.log("Doing an attack")
                    }
                }
            } 

            /****************
            * SPELL CASTING *
            ****************/

            else if(ig.input.state('down') && !ig.game.menuVisible && !this.attacking){

                /************
                * LIGHTNING *
                ************/

                if(ig.input.state('attack2') && !this.attacking){
                    this.atkTimer.reset();
                    console.log('Casting Spell');
                    // ig.game.spawnEntity(EntityLightning, this.pos.x + 40, this.pos.y - 40, {flip: !this.flip});
                    // ig.game.spawnEntity(EntityLightning, this.pos.x + 30, this.pos.y - 40, {flip: !this.flip});
                    // ig.game.spawnEntity(EntityLightning, this.pos.x + 20, this.pos.y - 40, {flip: !this.flip});
                    if(this.atkTimer.delta() < 0){
                        this.attacking = true;
                        // this.arte = 'heal';
                        this.arte = 'lightning'
                    }
                }

                /**********
                * HEALING *
                **********/

                if(ig.input.state('attack') && !this.attacking){
                    this.atkTimer.reset();
                    console.log('Casting Spell');
                    // ig.game.spawnEntity(EntityLightning, this.pos.x + 40, this.pos.y - 40, {flip: !this.flip});
                    // ig.game.spawnEntity(EntityLightning, this.pos.x + 30, this.pos.y - 40, {flip: !this.flip});
                    // ig.game.spawnEntity(EntityLightning, this.pos.x + 20, this.pos.y - 40, {flip: !this.flip});
                    if(this.atkTimer.delta() < 0){
                        this.attacking = true;
                        this.arte = 'heal';
                        //this.arte = 'lightning'
                    }
                }

            } 

            /************
            * HELL PYRE *
            ************/

            else if(ig.input.state('up') && !ig.game.menuVisible && !this.attacking){
                // Stop the player
                this.accel.x = 0;
                if(ig.input.state('attack') && !this.attacking){
                    this.atkTimer.reset();
                    console.log('Hell Pyre');
                    if(this.atkTimer.delta() < 0){
                        this.attacking = true;
                        this.arte = 'hell_pyre';
                    }
                }

            } 


            /*************
            * DEMON FANG *
            *************/

            else if(ig.input.state('attack') && !ig.game.menuVisible && !this.attacking){
                this.accel.x = 0;
                if(this.flip === false){
                    ig.game.spawnEntity(EntityDemonFang, this.pos.x - 20, this.pos.y + 7, {flip: !this.flip});
                } else if (this.flip = true){
                    ig.game.spawnEntity(EntityDemonFang, this.pos.x + 40, this.pos.y + 7, {flip: !this.flip}); 
                }
                this.atkTimer.reset();
                if(this.atkTimer.delta() < 0){
                    this.attacking = true;
                    this.arte = 'demon_fang';
                }
            } 

            else {
                // If we aren't moving in any direction, we must
                // be standing still. Therefore, accel = 0
                this.accel.x = 0;
            }


            // Used to reset attack timer after time has elasped.
            // Once the timer has expired, we can attack again
            if(this.atkTimer.delta() > -1.3 && this.arte === 'demon_fang'){
                this.attacking = false;
                this.arte = '';
            }

            else if (this.atkTimer.delta() > -0.7 && this.arte === 'lightning_blade'){
                this.attacking = false;
                this.arte = '';
            }

            else if(this.atkTimer.delta() > 0){
                this.attacking = false;
            }

            // If the player is using an arte, stop them in place
            // The player will be stopped based on this.atkTimer
            // NOTE: this is also useful for spell casting cooldowns
            if(this.attacking){
                // Stop the player
                this.accel.x = 0;
            }

            // Jumping logic: CASE 1
            if(this.standing && ig.input.state('jump') && !ig.game.menuVisible && !this.attacking) {
                if(this.vel.y == 0) {
                    this.vel.y = -this.jump;
                    this.falling = false;
                }
            }

            // Jumping logic: CASE 2
            else if(!this.standing && !ig.input.state('jump') && !this.falling && !ig.game.menuVisible && !this.attacking){
                this.vel.y = Math.floor(this.vel.y/3);
                this.falling = true;
            }

            // Flip the player based on left/right movement
            this.currentAnim.flip.x = this.flip;

            this.parent();

            /* Here we animate the player based on which arte they are using */
            if(this.attacking === true && this.arte === 'lightning_blade'){
                this.currentAnim = this.anims.lightningBlade;  
                // Restore default size parameters
                this.size.x = 65;
            }

            else if (this.attacking === true && this.arte === 'hell_pyre'){
                this.currentAnim = this.anims.hellPyre;
            } 

            else if (this.attacking === true && this.arte === 'heal'){
                console.log('Charging spell');
                if(this.atkTimer.delta() > -0.7){
                    this.currentAnim = this.anims.castSpell;
                    ig.game.spawnEntity(EntityHealing, this.pos.x, this.pos.y);
                    console.log('should display second animation')
                } else 
                    this.currentAnim = this.anims.spellCasting;
            }


            else if (this.attacking === true && this.arte === 'lightning'){
                console.log('Charging spell');
                if(this.atkTimer.delta() > -0.5){
                    if(typeof ig.game.getEntityByName('bolt') === 'undefined'){
                        ig.game.spawnEntity(EntityLightning, this.pos.x + 60, this.pos.y);
                        this.attacking = false;
                    }
                }
                else if(this.atkTimer.delta() > -0.7){
                    console.log('displaying second spell animation');
                    this.currentAnim = this.anims.castSpell;
                }
                else 
                    this.currentAnim = this.anims.spellCasting;
            }

            else if (this.attacking === true && this.arte === 'heal'){
                console.log('Charging spell');
                if(this.atkTimer.delta() > -0.5){
                    if(typeof ig.game.getEntityByName('heal') === 'undefined'){
                        ig.game.spawnEntity(EntityHealing, this.pos.x + 60, this.pos.y);
                        this.attacking = false;
                    }
                }
                else if(this.atkTimer.delta() > -0.7){
                    console.log('displaying second spell animation');
                    this.currentAnim = this.anims.castSpell;
                }
                else 
                    this.currentAnim = this.anims.spellCasting;
            }

            else if (this.attacking === true && this.arte === 'demon_fang'){
                this.currentAnim = this.anims.demon_fang;
            } else {
                // Reset initial size and offsets
                this.size.x = 40;
                this.offset.x = 50;
            }

            // Animate player based on velocity
            // This may be refactored later

            // CASE 1: Y-velocity is negative and we aren't standing...
            //         therefore we are jumping. 
            if(this.vel.y < 0 && !this.standing && !this.attacking)
                this.currentAnim = this.anims.jump;
            // CASE 2: Y-velocity is positive and we aren't standing...
            //         Y-velocity is only positive when falling
            else if(this.vel.y > 0 && !this.standing && !this.attacking)
                this.currentAnim = this.anims.fall;
            // CASE 3: X-velocity is not zero, we must be moving
            else if(this.vel.x > 0 && this.vel.x < 100 && !this.attacking || this.vel.x < 0 && this.vel.x > -100 && !this.attacking) {
                this.currentAnim = this.anims.walk;
            }
            else if(this.vel.x >= 100 && !this.attacking || this.vel.x <= -100 && !this.attacking) {
                this.currentAnim = this.anims.run;
            }
            // CASE 4: We are not moving, play idle animation
            else if (this.vel.y === 0 && this.vel.x == 0 && !this.attacking) {
                this.currentAnim = this.anims.idle;

            }

        },

        // This method is called on player's death
        kill: function() {
            this.parent();
            ig.game.respawnPlayerAtLastCheckpoint(this.pos.x, this.pos.y);
        },

        // On a player's death, this method checks # of lives and displays the proper screen
        // If lives > 0, respawn the player, else show game over screen
        onDeath: function() {
            ig.game.lives --;
            if(ig.game.lives < 0)
                ig.game.gameOver();
        },

    });
});

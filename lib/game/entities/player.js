ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity',
    'game.entities.projectiles.demonfang',
    'game.entities.projectiles.lightning',
    'game.entities.projectiles.fiercedemonfang'
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
        animSheet: new ig.AnimationSheet('media/player.png', 16, 28), // Animation sheet
        size: {x: 16, y: 28}, // Size of collision bounding box
        flip: true, // Set flip property to true
        accelGround: 200, // How fast we accelerate for movement on the ground
        accelAir: 310, // How fast we accelerate in the air
        jump: 360, // How high can we jump? 
        friction: {x: 500, y: 0}, // Resistance against movement
        maxVel: {x: 100, y: 160}, // Cap our maximum velocity from acceleration
        attacking: false, // Boolean to control when we can attack
        startPosition: null, // Our starting position in the game world, used for respawning

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

        skillPoints: 10, 


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
            this.addAnim('run', 0.10, [1, 0]);
            this.addAnim('jump', 1, [2]);
            this.addAnim('fall', 0.4, [2]);

            this.atkTimer = new ig.Timer(1.5);
            this.startPosition = {x:x, y:y};
            this.parent(x, y, settings);
        },

        update: function(){
            // Set up movement cases
            var accel = this.standing ? this.accelGround : this.accelAir;
            console.log(this.accel);
            if(ig.input.state('left') && !ig.game.menuVisible){
                this.accel.x = -accel;
                this.flip = false;
                /* 
                 *  Lightning blade framework
                 *  -------------------------
                 * Pressing left/right in combination with 'a' will trigger
                 * the lightning blade attack. 
                 *
                 * Implementation
                 * --------------
                 * 1. Put timer on attack. This is to:
                 *      - Prevent spamming of arte (cooldown)
                 *      - Allow animations to finish
                 *      - Lock player into specific animation
                 * 2. If player has not attacked (!this.attacking):
                 *      - Initiate attack. Reset timer. 
                 * 3. Until timer expires, we set attacking = true, preventing
                 *    additional triggers of Lightning Blade.
                 * 4. Once the timer expires, we reset the attacking boolean flag.
                 * 
                 * TODO
                 * ----
                 * 1. Setup animation frames for Lightning blade
                */
                // Trigger Lightning blade facing left
                if(ig.input.state('attack') && !this.attacking){
                    this.atkTimer.reset();
                     ig.game.spawnEntity(EntityDemonFang, this.pos.x - 20, this.pos.y + 7, {flip: !this.flip});
                    // ig.game.spawnEntity(EntityFierceDemonFang, this.pos.x - 30, this.pos.y + 4, {flip: !this.flip});
                    console.log('Lightning blade');
                    if(this.atkTimer.delta() < 0){
                        this.attacking = true;
                    }
                }
            } else if(ig.input.state('right') && !ig.game.menuVisible){
                this.accel.x = accel;
                this.flip = true;
                // Trigger lightning blade facing right
                if(ig.input.state('attack') && !this.attacking){
                    this.atkTimer.reset();
                    ig.game.spawnEntity(EntityDemonFang, this.pos.x + 20, this.pos.y + 7, {flip: !this.flip});
                    // ig.game.spawnEntity(EntityFierceDemonFang, this.pos.x + 20, this.pos.y + 4, {flip: !this.flip});
                    console.log('Lightning blade');
                    if(this.atkTimer.delta() < 0){
                        this.attacking = true;
                    }
                }
            } else if(ig.input.state('down') && !ig.game.menuVisible){
                if(ig.input.state('attack') && !this.attacking){
                    this.atkTimer.reset();
                    console.log('Casting Spell');
                    ig.game.spawnEntity(EntityLightning, this.pos.x + 40, this.pos.y - 40, {flip: !this.flip});
                    ig.game.spawnEntity(EntityLightning, this.pos.x + 30, this.pos.y - 40, {flip: !this.flip});
                    ig.game.spawnEntity(EntityLightning, this.pos.x + 20, this.pos.y - 40, {flip: !this.flip});
                    if(this.atkTimer.delta() < 0){
                        this.attacking = true;
                    }
                }

             } else if(ig.input.state('up') && !ig.game.menuVisible){
                // Stop the player
                this.accel.x = 0;
                if(ig.input.state('attack') && !this.attacking){
                    this.atkTimer.reset();
                    console.log('Hell Pyre');
                    if(this.atkTimer.delta() < 0){
                        this.attacking = true;
                    }
                }

             } else {
                // If we aren't moving in any direction, we must
                // be standing still. Therefore, accel = 0
                this.accel.x = 0;
            }

            // Used to reset attack timer after time has elasped.
            // Once the timer has expired, we can attack again
            if(this.atkTimer.delta() > 0){
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
            if(this.standing && ig.input.state('jump') && !ig.game.menuVisible) {
                if(this.vel.y == 0) {
                    this.vel.y = -this.jump;
                    this.falling = false;
                }
            }

            // Jumping logic: CASE 2
            else if(!this.standing && !ig.input.state('jump') && !this.falling && !ig.game.menuVisible){
                this.vel.y = Math.floor(this.vel.y/3);
                this.falling = true;
            }

            // Flip the player based on left/right movement
            this.currentAnim.flip.x = this.flip;

            this.parent();
            
            // Animate player based on velocity
            // This may be refactored later

            // CASE 1: Y-velocity is negative and we aren't standing...
            //         therefore we are jumping. 
            if(this.vel.y < 0 && !this.standing)
                this.currentAnim = this.anims.jump;
            // CASE 2: Y-velocity is positive and we aren't standing...
            //         Y-velocity is only positive when falling
            else if(this.vel.y > 0 && !this.standing)
                this.currentAnim = this.anims.fall;
            // CASE 3: X-velocity is not zero, we must be moving
            else if(this.vel.x != 0)
                this.currentAnim = this.anims.run;
            // CASE 4: We are not moving, play idle animation
            else
                this.currentAnim = this.anims.idle;

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
ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
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
        animSheet: new ig.AnimationSheet('media/player.png', 16, 28),
        size: {x: 16, y: 28},
        flip: true,
        accelGround: 200,
        accelAir: 310,
        jump: 360,
        friction: {x: 500, y: 0},
        maxVel: {x: 100, y: 160},
        attacking: false,
        startPosition: null,

        /* Player stats */
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


        init: function(x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [1]);
            this.addAnim('run', 0.10, [1, 0]);
            this.addAnim('jump', 1, [2]);
            this.addAnim('fall', 0.4, [2]);

            this.atkTimer = new ig.Timer(1.5);
            this.startPosition = {x:x, y:y};
            this.parent(x, y, settings);
        },

        update: function(){
            // Add left/right movement logic
            var accel = this.standing ? this.accelGround : this.accelAir;
            if(ig.input.state('left')){
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
                    console.log('Lightning blade');
                    if(this.atkTimer.delta() < 0){
                        this.attacking = true;
                    }
                }
            } else if(ig.input.state('right')){
                this.accel.x = accel;
                this.flip = true;
                // Trigger lightning blade facing right
                if(ig.input.state('attack') && !this.attacking){
                    this.atkTimer.reset();
                    console.log('Lightning blade');
                    if(this.atkTimer.delta() < 0){
                        this.attacking = true;
                    }
                }
            } else if(ig.input.state('down')){
                if(ig.input.state('attack') && !this.attacking){
                    this.atkTimer.reset();
                    console.log('Casting Spell');
                    if(this.atkTimer.delta() < 0){
                        this.attacking = true;
                    }
                }

             } else if(ig.input.state('up')){
                // Stop the player
                this.accel.x = 0;
                if(ig.input.state('attack') && !this.attacking){
                    this.atkTimer.reset();
                    console.log('Hell Pyre');
                    if(this.atkTimer.delta() < 0){
                        this.attacking = true;
                    }
                }

             } else
                this.accel.x = 0;

            // Used to reset attack timer after time has elasped.
            if(this.atkTimer.delta() > 0){
                this.attacking = false;
            }

            // If the player is using an arte, stop them in place
            // The player will be stopped based on this.atkTimer
            if(this.attacking){
                // Stop the player
                this.accel.x = 0;
            }

            // Jumping logic: CASE 1
            if(this.standing && ig.input.state('jump')) {
                if(this.vel.y == 0) {
                    this.vel.y = -this.jump;
                    this.falling = false;
                }
            }

            // Jumping logic: CASE 2
            else if(!this.standing && !ig.input.state('jump') && !this.falling){
                this.vel.y = Math.floor(this.vel.y/3);
                this.falling = true;
            }

            this.currentAnim.flip.x = this.flip;

            this.parent();
            
            if(this.vel.y < 0 && !this.standing)
                this.currentAnim = this.anims.jump;
            else if(this.vel.y > 0 && !this.standing)
                this.currentAnim = this.anims.fall;
            else if(this.vel.x != 0)
                this.currentAnim = this.anims.run;
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
ig.module(
	'game.entities.projectiles.lightning'
)
.requires(
	'impact.entity'
)

.defines(function(){
	EntityLightning = ig.Entity.extend({
		/* Set up projectile properties */
		size: {x: 14, y: 48},
		offset: {x: 0, y: 0},
		animSheet: new ig.AnimationSheet('media/lightning.png', 15, 48),
		maxVel: {x: 0, y: 900},
        gravity: 200,
		//vel: {x: 0, y: 200},
		speed: 200,
		//gravity: 300,

		/* Set up collision properties */
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.B, 
		collides: ig.Entity.COLLIDES.ACTIVE,
		name: 'bolt',

		/* init method */
		init: function( x, y, settings ) {
			// Define animation frames
			this.addAnim('idle', 0.1, [0, 1, 2]); 
			// Read settings from parent object (player.js)
        	this.parent( x , y, settings );           
        	// Assign velocity based on flip property of player (stored in settings)
            this.vel.x = settings.flip ? -1*this.speed : 1*this.speed;
            // Flip projectile based on player's flip value
            this.currentAnim.flip.x = settings.flip;
        },

        /* Kill projectile on collision on the x-axis */
        handleMovementTrace: function(res){
            this.parent(res);
            if(res.collision.y){
            	this.kill();
            }
        },

        collideWith: function(other, axis){
        	if(other instanceof EntityArcher){
                ig.game.hitSFX.volume = 0.7;
                ig.game.hitSFX.play();
        		console.log('Lightning hit archer');
        		other.receiveDamage(5, this);
                ig.game.screenshakeIntensity = 10;
                this.kill();
        	} else if(other instanceof EntityPlayer){
                console.log('nothing');
                this.kill();
            }

            else {
                other.kill();
                this.kill();
            }
        },

	});
});
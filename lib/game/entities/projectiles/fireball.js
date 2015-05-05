ig.module(
	'game.entities.projectiles.fireball'
)
.requires(
	'impact.entity'
)

.defines(function(){
	EntityFireball = ig.Entity.extend({
		/* Set up projectile properties */
		size: {x: 32, y: 32},
		offset: {x: 0, y: 0},
		animSheet: new ig.AnimationSheet('media/fireballattack.png', 32, 32),
		maxVel: {x:100, y: 0},
		speed: 100,
        gravity: 0,
        lifetime: 0,

		/* Set up collision properties */
		type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.ACTIVE,
        name: 'fireball',

		/* init method */
		init: function( x, y, settings ) {
			// Define animation frames
			this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5, 6, 7, 8]); 
			// Read settings from parent object (player.js)
        	this.parent( x , y, settings );           
        	// Assign velocity based on flip property of player (stored in settings)
            this.vel.x = settings.flip ? -1*this.speed : 1*this.speed;
            // Flip projectile based on player's flip value
            this.currentAnim.flip.x = settings.flip;
        },

        update: function(){
            this.parent();
            console.log(this.lifetime);
            this.lifetime++;
            if(this.lifetime > 120){
                this.kill();
                this.lifetime = 0;
            }
        },

        /* Kill projectile on collision on the x-axis */
        handleMovementTrace: function(res){
            this.parent(res);
            if(res.collision.x){
            	this.kill();
            }
        },

        collideWith: function(other, axis){
            if(other instanceof EntityArcher){
                ig.game.hitSFX.volume = 0.7;
                ig.game.hitSFX.play();
                console.log('Fireball hit archer');
                other.receiveDamage(5, this);
                ig.game.screenshakeIntensity = 10;
                this.kill();
            } else {
                other.kill();
                this.kill();
            }
        },

	});
});
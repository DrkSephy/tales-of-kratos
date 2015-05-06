ig.module(
	'game.entities.projectiles.demonfang'
)
.requires(
	'impact.entity'
)

.defines(function(){
	EntityDemonFang = ig.Entity.extend({
		/* Set up projectile properties */
		size: {x: 20, y: 20},
		offset: {x: 5, y: 6},
		animSheet: new ig.AnimationSheet('media/demonfang.png', 28, 28),
		maxVel: {x:100, y: 200},
		speed: 100,
        gravity: 100,
        lifetime: 0,

		/* Set up collision properties */
		type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.ACTIVE,

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
            if(res.collision.x){
            	this.kill();
            }
        },

        update: function(){
            this.parent();
            this.lifetime++;
            if(this.lifetime > 120){
                this.kill();
                this.lifetime = 0;
            }
        },

        collideWith: function(other, axis){
        	if(other instanceof EntityArcher){
                ig.game.hitSFX.volume = 0.7;
                ig.game.hitSFX.play();
        		console.log('Demon fang hit archer');
                ig.game.screenshakeIntensity = 10;
        		other.receiveDamage(5, this);
                this.kill();
        	} else if (other instanceof EntityStone){
                ig.game.hitSFX.volume = 0.7;
                ig.game.hitSFX.play();
                console.log("Hit stone");
                other.hitCounter += 1;
                this.kill();
            }
            else {
                other.kill();
                this.kill();
            }
        },

	});
});
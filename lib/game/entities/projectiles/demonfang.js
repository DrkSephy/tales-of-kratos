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
		maxVel: {x:100, y: 0},
		speed: 100,

		/* Set up collision properties */
		type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
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

        /* check method for collisions */
        check: function( other ) {
            other.receiveDamage( 5, this );
            this.kill();
        },

        /* Kill projectile on collision on the x-axis */
        handleMovementTrace: function(res){
            this.parent(res);
            if(res.collision.x){
            	console.log('hello')
            	this.kill();
            }
        },

        collideWith: function(other, axis){
        	if(other instanceof EntityKnight){
        		console.log('Demon fang hit knight');
        		if(axis == 'x'){
        			other.receiveDamage(1, this);
        			if(other.pos.x > this.pos.x){
        				console.log('Should move enemy back');
        				other.pos.x += 5;
        			}
        			else if(other.pos.x < this.pos.x){
        				other.pos.x -= 5;
        			}
        			this.kill();
        		}
        	}
        },

	});
});
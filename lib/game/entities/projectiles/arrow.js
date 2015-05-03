ig.module(
	'game.entities.projectiles.arrow'
)
.requires(
	'impact.entity'
)

.defines(function(){
	EntityArrow = ig.Entity.extend({
		/* Set up projectile properties */
		animSheet: new ig.AnimationSheet('media/arrow.png', 35, 35),
        size: {x: 30, y: 10},
        offset: {x: 2, y: 12},
		maxVel: {x: 100, y: 0},
		speed: 100,

		/* Set up collision properties */
		type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.ACTIVE,

		/* init method */
		init: function( x, y, settings ) {
			// Define animation frames
			this.addAnim('idle', 0.1, [0]); 
			// Read settings from parent object (player.js)
        	this.parent( x , y, settings );   
            // Define animation frames
            this.addAnim('idle', 0.1, [0, 1, 2]);         
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
            	this.kill();
            }
        },

        collideWith: function(other, axis){
            if(other instanceof EntityPlayer){
                console.log('Player was hit');
                other.receiveDamage(5, this);
                this.kill();
            }
        	
        },

	});
});
ig.module(
	'game.entities.demonfang'
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
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B, 
		collides: ig.Entity.COLLIDES.PASSIVE,

		/* init method */
		init: function( x, y, settings ) {
			this.addAnim('idle', 0.1, [0, 1, 2]); 
        	this.parent( x , y, settings );           
            this.vel.x = settings.flip ? -1*this.speed : 1*this.speed;
            this.currentAnim.flip.x = settings.flip;
        },

        /* check method for collisions */
        check: function( other ) {
            other.receiveDamage( 5, this );
            this.kill();
        },

        handleMovementTrace: function(res){
            this.parent(res);
            if(res.collision.x){
            	this.kill();
            }
        },

	});
});
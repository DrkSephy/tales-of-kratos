ig.module(
	'game.entities.demonfang'
)
.requires(
	'impact.entity'
)

.defines(function(){
	EntityDemonFang = ig.Entity.extend({
		/* Set up projectile properties */
		size: {x: 28, y: 28},
		offset: {x: 0, y: 0},
		animSheet: new ig.AnimationSheet('media/demonfang.png', 28, 28),
		maxVel: {x:100, y: 0},
		speed: 100,

		/* Set up collision properties */
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B, 
		collides: ig.Entity.COLLIDES.PASSIVE,

		/* init method */
		init: function( x, y, settings ) {
        	this.parent( x , y, settings );
            this.addAnim('idle', 1, [0]);
        	var xdir = this.flip ? 1 : -1;            
            this.vel.x = this.speed*xdir;
        },

        /* check method for collisions */
        check: function( other ) {
            other.receiveDamage( 5, this );
            this.kill();
        },

	});
});
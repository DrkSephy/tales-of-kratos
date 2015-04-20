ig.module(
	'game.entities.projectiles.healing'
)
.requires(
	'impact.entity'
)

.defines(function(){
	EntityHealing = ig.Entity.extend({
		/* Set up projectile properties */
		size: {x: 30, y: 24},
		offset: {x: 0, y: 0},
		animSheet: new ig.AnimationSheet('media/healing.png', 30, 24),
		maxVel: {x: 0, y: 0},
		speed: 100,

		/* Set up collision properties */
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE, 
		collides: ig.Entity.COLLIDES.NONE,

		/* init method */
		init: function( x, y, settings ) {
			// Define animation frames
			this.addAnim('idle', 0.15, [3, 2, 1, 0]); 
			// Read settings from parent object (player.js)
        	this.parent( x , y, settings );           
        },
	});
});
ig.module(
	'game.entities.projectiles.healing'
)
.requires(
	'impact.entity'
)

.defines(function(){
	EntityHealing = ig.Entity.extend({
		/* Set up projectile properties */
		size: {x: 40, y: 30},
		offset: {x: 0, y: 0},
		animSheet: new ig.AnimationSheet('media/healing.png', 40, 30),
		maxVel: {x: 0, y: 0},
		speed: 100,

		/* Set up collision properties */
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE, 
		collides: ig.Entity.COLLIDES.NONE,

		name: 'heal',

		/* init method */
		init: function( x, y, settings ) {
			// Define animation frames
			this.addAnim('idle', 0.15, [3, 2, 1, 0, 3, 2, 1]); 
			// Read settings from parent object (player.js)
        	this.parent( x , y, settings );    
        	this.animationTimer = new ig.Timer(1.0);       
        }, 

        update: function(){
        	this.parent();
        	if(this.animationTimer.delta() > -0.1){
        		this.kill();
        	}
        },
	});
});
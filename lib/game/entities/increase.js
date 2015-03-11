ig.module(
	'game.entities.increase'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityIncrease = ig.Entity.extend({

	    type: ig.Entity.TYPE.B,

	    size: {x: 32, y: 32},
	    animSheet: new ig.AnimationSheet('media/plus.png', 16, 16),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	this.currentAnim = this.anims.idle;
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked plus");
	    },
	});
});
ig.module(
	'game.entities.abstractions.decreaseSkill'
)
.requires(
	'impact.entity'
)
.defines(function(){
	ig.global.EntityDecreaseSkill = ig.Entity.extend({

	    type: ig.Entity.TYPE.B,

	    size: {x: 32, y: 32},
	    animSheet: new ig.AnimationSheet('media/minus.png', 16, 16),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    	this.addAnim('fade', 0.1, [1]);
	    },

	    update: function(){

	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked minus");
	    },
	});
});
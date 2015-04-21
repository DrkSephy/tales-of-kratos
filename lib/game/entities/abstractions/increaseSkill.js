ig.module(
	'game.entities.abstractions.increaseSkill'
)
.requires(
	'impact.entity'
)
.defines(function(){
	ig.global.EntityIncreaseSkill = ig.Entity.extend({

	    type: ig.Entity.TYPE.B,

	    size: {x: 32, y: 32},
	    animSheet: new ig.AnimationSheet('media/plus.png', 16, 16),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    	this.addAnim('fade', 0.1, [1]);
	    },

	    update: function(){
	    	if(ig.game.player.skillPoints > 0){
	    		this.currentAnim = this.anims.idle;
	    	} else {
	    		this.currentAnim = this.anims.fade;
	    	} 
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked plus");
	    },
	});
});
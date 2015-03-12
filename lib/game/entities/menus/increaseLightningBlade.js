ig.module(
	'game.entities.menus.increaseLightningBlade'
)
.requires(
	'game.entities.abstractions.increaseSkill'
)
.defines(function(){
	ig.global.EntityIncreaseLightningBlade = ig.global.EntityIncreaseSkill.extend({

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
	        if(ig.game.player.skillPoints > 0){
		        ig.game.artesCatalog['lightningBlade'].level += 1;
		        ig.game.player.skillPoints -= 1;
		        ig.game.artesCatalog['lightningBlade'].points += 1;  
		    }
	    },
	});
});
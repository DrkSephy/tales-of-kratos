ig.module(
	'game.entities.menus.decreaseLightningBlade'
)
.requires(
	'game.entities.abstractions.decreaseSkill'
)
.defines(function(){
	ig.global.EntityDecreaseLightningBlade = ig.global.EntityDecreaseSkill.extend({

	    type: ig.Entity.TYPE.B,

	    size: {x: 32, y: 32},
	    animSheet: new ig.AnimationSheet('media/minus.png', 16, 16),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	this.currentAnim = this.anims.idle;
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked minus");
	        if(ig.game.artesCatalog['lightningBlade'].points > 0){
		        ig.game.artesCatalog['lightningBlade'].level -= 1;
		        ig.game.player.skillPoints += 1; 
		        ig.game.artesCatalog['lightningBlade'].points -= 1;
		    }
		   
	    },
	});
});
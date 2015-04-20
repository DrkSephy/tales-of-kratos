ig.module(
	'game.entities.menus.decreaseLightningBlade'
)
.requires(
	'game.entities.abstractions.decreaseSkill'
)
.defines(function(){
	ig.global.EntityDecreaseLightningBlade = ig.global.EntityDecreaseSkill.extend({

		update: function(){
			if(ig.game.artesCatalog['lightningBlade'].points > 0){
	    		this.currentAnim = this.anims.idle;
	    	} else {
	    		this.currentAnim = this.anims.fade;
	    	}
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked minus");
	        if(ig.game.artesCatalog['lightningBlade'].active){
		        if(ig.game.artesCatalog['lightningBlade'].points > 0){
			        ig.game.artesCatalog['lightningBlade'].level -= 1;
			        ig.game.player.skillPoints += 1; 
			        ig.game.artesCatalog['lightningBlade'].points -= 1;
			    }
			}
		   
	    },
	});
});
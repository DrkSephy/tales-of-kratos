ig.module(
	'game.entities.menus.decreaseHeal'
)
.requires(
	'game.entities.abstractions.decreaseSkill'
)
.defines(function(){
	ig.global.EntityDecreaseHeal = ig.global.EntityDecreaseSkill.extend({

	   	update: function(){
			if(ig.game.artesCatalog['heal'].points > 0){
	    		this.currentAnim = this.anims.idle;
	    	} else {
	    		this.currentAnim = this.anims.fade;
	    	}
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked minus");
	        if(ig.game.artesCatalog['heal'].points > 0){
		        ig.game.artesCatalog['heal'].level -= 1;
		        ig.game.player.skillPoints += 1; 
		        ig.game.artesCatalog['heal'].points -= 1;
		    }
		   
	    },
	});
});
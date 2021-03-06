ig.module(
	'game.entities.menus.decreaseHellPyre'
)
.requires(
	'game.entities.abstractions.decreaseSkill'
)
.defines(function(){
	ig.global.EntityDecreaseHellPyre = ig.global.EntityDecreaseSkill.extend({


		update: function(){
			if(ig.game.artesCatalog['hellPyre'].points > 0 && ig.game.artesCatalog['hellPyre'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else {
	    		this.currentAnim = this.anims.fade;
	    		this.currentAnim.alpha = 0.2;
	    	}
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked minus");
	        if(ig.game.artesCatalog['hellPyre'].active){
		        if(ig.game.artesCatalog['hellPyre'].points > 0){
			        ig.game.artesCatalog['hellPyre'].level -= 1;
			        ig.game.player.skillPoints += 1; 
			        ig.game.artesCatalog['hellPyre'].points -= 1;
			    }
			}
		   
	    },
	});
});
ig.module(
	'game.entities.menus.increaseWind'
)
.requires(
	'game.entities.abstractions.increaseSkill'
)
.defines(function(){
	ig.global.EntityIncreaseWind = ig.global.EntityIncreaseSkill.extend({

	   	
		update: function(){
			if(ig.game.spellsCatalog['wind'].active && ig.game.player.skillPoints > 0){
	    		this.currentAnim = this.anims.idle;
	    	} else {
	    		this.currentAnim = this.anims.fade;
	    		this.currentAnim.alpha = 0.2;
	    	}
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked plus");
	        if(ig.game.spellsCatalog['wind'].active){
		        if(ig.game.player.skillPoints > 0){
			        ig.game.spellsCatalog['wind'].level += 1;
			        ig.game.player.skillPoints -= 1; 
			        ig.game.spellsCatalog['wind'].points += 1;
			    }
			}
		   
	    },
	});
});
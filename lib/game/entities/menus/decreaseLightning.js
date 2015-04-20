ig.module(
	'game.entities.menus.decreaseLightning'
)
.requires(
	'game.entities.abstractions.decreaseSkill'
)
.defines(function(){
	ig.global.EntityDecreaseLightning = ig.global.EntityDecreaseSkill.extend({

		update: function(){
			if(ig.game.spellsCatalog['lightning'].points > 0){
	    		this.currentAnim = this.anims.idle;
	    	} else {
	    		this.currentAnim = this.anims.fade;
	    	}
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked minus");
	        if(ig.game.spellsCatalog['lightning'].active){
		        if(ig.game.spellsCatalog['lightning'].points > 0){
			        ig.game.spellsCatalog['lightning'].level -= 1;
			        ig.game.player.skillPoints += 1; 
			        ig.game.spellsCatalog['lightning'].points -= 1;
			    }
			}
		   
	    },
	});
});
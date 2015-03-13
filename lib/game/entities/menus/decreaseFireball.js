ig.module(
	'game.entities.menus.decreaseFireball'
)
.requires(
	'game.entities.abstractions.decreaseSkill'
)
.defines(function(){
	ig.global.EntityDecreaseFireball = ig.global.EntityDecreaseSkill.extend({


		update: function(){
			if(ig.game.spellsCatalog['fireball'].points > 0){
	    		this.currentAnim = this.anims.idle;
	    	} else {
	    		this.currentAnim = this.anims.fade;
	    	}
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked minus");
	        if(ig.game.spellsCatalog['fireball'].points > 0){
		        ig.game.spellsCatalog['fireball'].level -= 1;
		        ig.game.player.skillPoints += 1; 
		        ig.game.spellsCatalog['fireball'].points -= 1;
		    }
		   
	    },
	});
});
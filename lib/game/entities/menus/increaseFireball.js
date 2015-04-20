ig.module(
	'game.entities.menus.increaseFireball'
)
.requires(
	'game.entities.abstractions.increaseSkill'
)
.defines(function(){
	ig.global.EntityIncreaseFireball = ig.global.EntityIncreaseSkill.extend({

	   	
		update: function(){
			if(ig.game.spellsCatalog['fireball'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else {
	    		this.currentAnim = this.anims.fade;
	    	}
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked plus");
	        if(ig.game.spellsCatalog['fireball'].active){
		        if(ig.game.player.skillPoints > 0){
			        ig.game.spellsCatalog['fireball'].level += 1;
			        ig.game.player.skillPoints -= 1;
			        ig.game.spellsCatalog['fireball'].points += 1;  
			    }
			}
	    },
	});
});
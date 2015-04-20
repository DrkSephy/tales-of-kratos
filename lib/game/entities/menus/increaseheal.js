ig.module(
	'game.entities.menus.increaseHeal'
)
.requires(
	'game.entities.abstractions.increaseSkill'
)
.defines(function(){
	ig.global.EntityIncreaseHeal = ig.global.EntityIncreaseSkill.extend({


	   	update: function(){
			if(ig.game.spellsCatalog['heal'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else {
	    		this.currentAnim = this.anims.fade;
	    		this.currentAnim.alpha = 0.2;
	    	}
	    },


	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked plus");
	        if(ig.game.spellsCatalog['heal'].active){
		        if(ig.game.player.skillPoints > 0){
			        ig.game.spellsCatalog['heal'].level += 1;
			        ig.game.player.skillPoints -= 1; 
			        ig.game.spellsCatalog['heal'].points += 1;
			    }
		    }
	    },
	});
});
ig.module(
	'game.entities.menus.decreaseFireball'
)
.requires(
	'game.entities.abstractions.decreaseSkill'
)
.defines(function(){
	ig.global.EntityFireball = ig.global.EntityDecreaseSkill.extend({


		update: function(){
			if(ig.game.artesCatalog['fireball'].points > 0){
	    		this.currentAnim = this.anims.idle;
	    	} else {
	    		this.currentAnim = this.anims.fade;
	    	}
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked minus");
	        if(ig.game.artesCatalog['fireball'].points > 0){
		        ig.game.artesCatalog['fireball'].level -= 1;
		        ig.game.player.skillPoints += 1; 
		        ig.game.artesCatalog['fireball'].points -= 1;
		    }
		   
	    },
	});
});
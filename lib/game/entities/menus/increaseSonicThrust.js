ig.module(
	'game.entities.menus.increaseSonicThrust'
)
.requires(
	'game.entities.abstractions.increaseSkill'
)
.defines(function(){
	ig.global.EntityIncreaseSonicThrust = ig.global.EntityIncreaseSkill.extend({

	   	
		update: function(){
			if(ig.game.artesCatalog['sonicThrust'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else {
	    		this.currentAnim = this.anims.fade;
	    		this.currentAnim.alpha = 0.2;
	    	}
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked plus");
	        if(ig.game.artesCatalog['sonicThrust'].active){
		        if(ig.game.player.skillPoints > 0){
			        ig.game.artesCatalog['sonicThrust'].level += 1;
			        ig.game.player.skillPoints -= 1; 
			        ig.game.artesCatalog['sonicThrust'].points += 1;
			    }
			}
		   
	    },
	});
});
ig.module(
	'game.entities.menus.decreaseSonicThrust'
)
.requires(
	'game.entities.abstractions.decreaseSkill'
)
.defines(function(){
	ig.global.EntityDecreaseSonicThrust = ig.global.EntityDecreaseSkill.extend({

		update: function(){
			if(ig.game.artesCatalog['sonicThrust'].points > 0 && ig.game.artesCatalog['sonicThrust'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else {
	    		this.currentAnim = this.anims.fade;
	    	}
	    },


	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked minus");
	       	if(ig.game.artesCatalog['sonicThrust'].active){
		        if(ig.game.artesCatalog['sonicThrust'].points > 0){
			        ig.game.artesCatalog['sonicThrust'].level -= 1;
			        ig.game.player.skillPoints += 1; 
			        ig.game.artesCatalog['sonicThrust'].points -= 1;
			    }
		   	}
	    },
	});
});
ig.module(
	'game.entities.menus.decreaseWind'
)
.requires(
	'game.entities.abstractions.decreaseSkill'
)
.defines(function(){
	ig.global.EntityDecreaseWind = ig.global.EntityDecreaseSkill.extend({

		update: function(){
			if(ig.game.artesCatalog['wind'].points > 0){
	    		this.currentAnim = this.anims.idle;
	    	} else {
	    		this.currentAnim = this.anims.fade;
	    	}
	    },


	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked minus");
	        if(ig.game.artesCatalog['wind'].points > 0){
		        ig.game.artesCatalog['wind'].level -= 1;
		        ig.game.player.skillPoints += 1; 
		        ig.game.artesCatalog['wind'].points -= 1;
		    }
		   
	    },
	});
});
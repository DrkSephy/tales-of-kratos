ig.module(
	'game.entities.menus.decreaseDemonFang'
)
.requires(
	'game.entities.abstractions.decreaseSkill'
)
.defines(function(){
	ig.global.EntityDecreaseDemonFang = ig.global.EntityDecreaseSkill.extend({

	   	update: function(){
			if(ig.game.artesCatalog['demonFang'].points > 0 && ig.game.artesCatalog['demonFang'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else {
	    		this.currentAnim = this.anims.fade;
	    		this.currentAnim.alpha = 0.2;
	    	}
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked minus");
	        if(ig.game.artesCatalog['demonFang'].active){
		        if(ig.game.artesCatalog['demonFang'].points > 0){
			        ig.game.artesCatalog['demonFang'].level -= 1;
			        ig.game.player.skillPoints += 1; 
			        ig.game.artesCatalog['demonFang'].points -= 1;
			    }
			}
		   
	    },
	});
});
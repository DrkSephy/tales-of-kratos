ig.module(
	'game.entities.menus.increaseLightningBlade'
)
.requires(
	'game.entities.abstractions.increaseSkill'
)
.defines(function(){
	ig.global.EntityIncreaseLightningBlade = ig.global.EntityIncreaseSkill.extend({
		
	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked plus");
	        if(ig.game.player.skillPoints > 0){
		        ig.game.artesCatalog['lightningBlade'].level += 1;
		        ig.game.player.skillPoints -= 1;
		        ig.game.artesCatalog['lightningBlade'].points += 1;  
		    }
	    },
	});
});
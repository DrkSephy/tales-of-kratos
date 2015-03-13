ig.module(
	'game.entities.menus.increaseSonicThrust'
)
.requires(
	'game.entities.abstractions.increaseSkill'
)
.defines(function(){
	ig.global.EntityIncreaseSonicThrust = ig.global.EntityIncreaseSkill.extend({

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked plus");
	        if(ig.game.player.skillPoints > 0){
		        ig.game.artesCatalog['sonicThrust'].level += 1;
		        ig.game.player.skillPoints -= 1; 
		        ig.game.artesCatalog['sonicThrust'].points += 1;
		    }
		   
	    },
	});
});
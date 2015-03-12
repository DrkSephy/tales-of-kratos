ig.module(
	'game.entities.menus.increaseHeal'
)
.requires(
	'game.entities.abstractions.increaseSkill'
)
.defines(function(){
	ig.global.EntityIncreaseHeal = ig.global.EntityIncreaseSkill.extend({


	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked plus");
	        if(ig.game.player.skillPoints > 0){
		        ig.game.artesCatalog['heal'].level += 1;
		        ig.game.player.skillPoints -= 1; 
		        ig.game.artesCatalog['heal'].points += 1;
		    }
		   
	    },
	});
});
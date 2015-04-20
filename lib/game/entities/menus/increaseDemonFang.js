ig.module(
	'game.entities.menus.increaseDemonFang'
)
.requires(
	'game.entities.abstractions.increaseSkill'
)
.defines(function(){
	ig.global.EntityIncreaseDemonFang = ig.global.EntityIncreaseSkill.extend({


	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked plus");
	        if(ig.game.artesCatalog['demonFang'].active){
		        if(ig.game.player.skillPoints > 0){
			        ig.game.artesCatalog['demonFang'].level += 1;
			        ig.game.player.skillPoints -= 1; 
			        ig.game.artesCatalog['demonFang'].points += 1;
			    }
			}
		   
	    },
	});
});
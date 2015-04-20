ig.module(
	'game.entities.menus.increaseLightning'
)
.requires(
	'game.entities.abstractions.increaseSkill'
)
.defines(function(){
	ig.global.EntityIncreaseLightning = ig.global.EntityIncreaseSkill.extend({
		
	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked plus");
	        if(ig.game.spellsCatalog['lightning'].active){
		        if(ig.game.player.skillPoints > 0){
			        ig.game.spellsCatalog['lightning'].level += 1;
			        ig.game.player.skillPoints -= 1;
			        ig.game.spellsCatalog['lightning'].points += 1;  
			    }
			}
	    },
	});
});
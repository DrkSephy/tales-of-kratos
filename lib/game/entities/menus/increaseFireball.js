ig.module(
	'game.entities.menus.increaseFireball'
)
.requires(
	'game.entities.abstractions.increaseSkill'
)
.defines(function(){
	ig.global.EntityIncreaseFireball = ig.global.EntityIncreaseSkill.extend({

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked plus");
	        if(ig.game.player.skillPoints > 0){
		        ig.game.spellsCatalog['fireball'].level += 1;
		        ig.game.player.skillPoints -= 1;
		        ig.game.spellsCatalog['fireball'].points += 1;  
		    }
	    },
	});
});
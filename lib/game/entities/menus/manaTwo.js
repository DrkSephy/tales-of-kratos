ig.module(
	'game.entities.menus.manaTwo'
)
.requires(
	'game.entities.abstractions.artebox'
)
.defines(function(){
	EntityManaTwo = EntityArteBox.extend({

	    type: ig.Entity.TYPE.B,

	    size: {x: 32, y: 32},
	    animSheet: new ig.AnimationSheet('media/hp.png', 32, 32),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	if(ig.game.skillsCatalog['mana2'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else 
	    		this.currentAnim.alpha = 0.3;
	    },

	   	clicked: function() {
	        /* Handle the click */
	        var player = ig.game.getEntitiesByType( EntityPlayer )[0];
	        console.log("Clicked mana1 icon");
	        if(ig.game.skillsCatalog['healthIncrease1'].active && ig.game.skillsCatalog['defense2'].active){
		        if(!ig.game.skillsCatalog['mana2'].active && player.abilityPoints >= ig.game.skillsCatalog['mana2'].points){
		        	player.stats.maxTP += ig.game.skillsCatalog['mana2'].increase;
		        	player.stats.tp += ig.game.skillsCatalog['mana2'].increase;
		        	ig.game.skillsCatalog['mana2'].active = true;
		        	player.abilityPoints -= ig.game.skillsCatalog['mana2'].points;
		        }
	    	}
	    },
	});
});
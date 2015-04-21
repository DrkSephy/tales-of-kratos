ig.module(
	'game.entities.menus.defenseTwo'
)
.requires(
	'game.entities.abstractions.artebox'
)
.defines(function(){
	EntityDefenseTwo = EntityArteBox.extend({

	    type: ig.Entity.TYPE.B,

	    size: {x: 32, y: 32},
	    animSheet: new ig.AnimationSheet('media/defense.png', 32, 32),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	if(ig.game.skillsCatalog['defense2'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else 
	    		this.currentAnim.alpha = 0.3;
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked defense1 icon");
	       	if(ig.game.skillsCatalog['healthIncrease1'].active){
		        if(!ig.game.skillsCatalog['defense2'].active){
		        	var player = ig.game.getEntitiesByType( EntityPlayer )[0];
		        	player.stats.def += ig.game.skillsCatalog['defense2'].increase;
		        	ig.game.skillsCatalog['defense2'].active = true;
		        }
		    }
	    },
	});
});
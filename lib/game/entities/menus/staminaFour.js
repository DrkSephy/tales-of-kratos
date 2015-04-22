ig.module(
	'game.entities.menus.staminaFour'
)
.requires(
	'game.entities.abstractions.artebox'
)
.defines(function(){
	EntityStaminaFour = EntityArteBox.extend({

	    type: ig.Entity.TYPE.B,

	    size: {x: 32, y: 32},
	    animSheet: new ig.AnimationSheet('media/hp.png', 32, 32),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	if(ig.game.skillsCatalog['healthIncrease4'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else 
	    		this.currentAnim.alpha = 0.3;
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked healthIncrease4 icon");
	        if(ig.game.skillsCatalog['healthIncrease1'].active && ig.game.skillsCatalog['defense2'].active 
	        	&& ig.game.skillsCatalog['mana2'].active && ig.game.skillsCatalog['skill2'].active
	        	&& ig.game.skillsCatalog['attack3'].active){
		        if(!ig.game.skillsCatalog['healthIncrease4'].active){
		        	var player = ig.game.getEntitiesByType( EntityPlayer )[0];
		        	player.stats.maxHP += ig.game.skillsCatalog['healthIncrease4'].increase;
		        	player.health += ig.game.skillsCatalog['healthIncrease4'].increase;
		        	ig.game.skillsCatalog['healthIncrease4'].active = true;
		        }
		    }
	    },
	});
});
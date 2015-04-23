ig.module(
	'game.entities.menus.skillThree'
)
.requires(
	'game.entities.abstractions.artebox'
)
.defines(function(){
	EntitySkillThree = EntityArteBox.extend({

	    type: ig.Entity.TYPE.B,

	    size: {x: 32, y: 32},
	    animSheet: new ig.AnimationSheet('media/sonicthrust.png', 32, 32),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	if(ig.game.skillsCatalog['skill3'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else 
	    		this.currentAnim.alpha = 0.3;
	    },

	   	clicked: function() {
	        /* Handle the click */
	        var player = ig.game.getEntitiesByType( EntityPlayer )[0];
	        console.log("Clicked skill3 icon");
	        if(ig.game.skillsCatalog['healthIncrease1'].active && ig.game.skillsCatalog['defense2'].active 
	        	&& ig.game.skillsCatalog['mana2'].active && ig.game.skillsCatalog['skill2'].active
	        	&& ig.game.skillsCatalog['attack3'].active && ig.game.skillsCatalog['healthIncrease4'].active){
		        if(!ig.game.skillsCatalog['skill3'].active && player.abilityPoints >= ig.game.skillsCatalog['skill3'].points){
		        	ig.game.artesCatalog['sonicThrust'].active = true;
		        	ig.game.skillsCatalog['skill3'].active = true;
		        	player.abilityPoints -= ig.game.skillsCatalog['skill3'].points;
		        }
		    }
	    },
	});
});
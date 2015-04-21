ig.module(
	'game.entities.menus.skillOne'
)
.requires(
	'game.entities.abstractions.artebox'
)
.defines(function(){
	EntitySkillOne = EntityArteBox.extend({

	    type: ig.Entity.TYPE.B,

	    size: {x: 32, y: 32},
	    animSheet: new ig.AnimationSheet('media/wind.png', 32, 32),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	if(ig.game.skillsCatalog['skill1'].active){
	    		this.currentAnim = this.anims.idle;
	    	} else 
	    		this.currentAnim.alpha = 0.1;
	    },

	   	clicked: function() {
	        /* Handle the click */
	        console.log("Clicked skill1 icon");
	       	
	        if(!ig.game.skillsCatalog['skill1'].active){
	        	console.log('hello');
	        	ig.game.spellsCatalog['wind'].active = true;
	        	ig.game.skillsCatalog['skill1'].active = true;
	        }
		    
	    },
	});
});
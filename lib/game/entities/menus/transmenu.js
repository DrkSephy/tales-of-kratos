ig.module(
	'game.entities.menus.transmenu'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityTransMenu = ig.Entity.extend({
		name: 'transparentmenu',
	    size: {x: 320, y: 240},
	    animSheet: new ig.AnimationSheet('media/transScreen.png', 320, 240),
	    zIndex: 1000, 

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	this.currentAnim = this.anims.idle;
	    },
	});
});
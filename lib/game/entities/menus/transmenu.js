ig.module(
	'game.entities.menus.transmenu'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityTransMenu = ig.Entity.extend({
		name: 'transparentmenu',
		type: ig.Entity.TYPE.A,
	    checkAgainst: ig.Entity.TYPE.NONE,
	    collides: ig.Entity.COLLIDES.NONE,
	    size: {x: 320, y: 240},
	    animSheet: new ig.AnimationSheet('media/transScreen.png', 320, 240),

	    init: function(x, y, settings){
	    	this.parent(x, y, settings);
	    	this.addAnim('idle', 0.1, [0]);
	    },

	    update: function(){
	    	this.currentAnim = this.anims.idle;
	    },
	});
});
ig.module(
    'game.entities.block'
)
.requires(
    'impact.entity'
)

.defines(function() {
    EntityBlock = ig.Entity.extend({
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.FIXED,
    	size: {x: 16, y: 96},
        health: 999999,
        gravity: 0,
        animSheet: new ig.AnimationSheet('media/block.png', 16, 96),
        active: false,

        init: function(x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        }, // End init

        update: function() {
            this.parent();
        },

        check: function(other) {
        }
    })
});
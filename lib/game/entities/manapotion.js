ig.module(
    'game.entities.manapotion'
)
.requires(
    'impact.entity'
)

.defines(function() {
    EntityManapotion = ig.Entity.extend({
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
    	size: {x: 32, y: 32},
        animSheet: new ig.AnimationSheet('media/bluepotion.png', 32, 32),


        init: function(x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        }, // End init

        update: function() {
            this.parent();
        },

        check: function(other) {
        if(other instanceof EntityPlayer){
            var player = ig.game.getEntitiesByType( EntityPlayer )[0];
            if(player.tp + 10 <= player.stats.maxTP){
                other.tp += 10;
            }
            this.kill();
            }
        }
    })
});
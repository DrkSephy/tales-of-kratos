ig.module(
    'game.entities.healthpotion'
)
.requires(
    'impact.entity'
)

.defines(function() {
    EntityHealthpotion = ig.Entity.extend({
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
    	size: {x: 32, y: 32},
        health: 99999,
        animSheet: new ig.AnimationSheet('media/redpotion.png', 32, 32),


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
                if(player.health + 10 <= player.stats.maxHP){
                    other.receiveDamage(-10, this);
                    this.kill();
                }
            }
        }
    })
});
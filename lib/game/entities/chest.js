ig.module(
    'game.entities.chest'
)
.requires(
    'impact.entity',
    'game.entities.healthpotion',
    'game.entities.manapotion'

)

.defines(function() {
    EntityChest = ig.Entity.extend({
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
    	size: {x: 46.5, y: 37},
        animSheet: new ig.AnimationSheet('media/chest.png', 46.5, 37),
        open: false,

        init: function(x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.addAnim('open', 0.10, [0, 1, 2, 3], true)
        }, // End init

        update: function() {
            this.parent();
        },

        check: function(other) {
            if(other instanceof EntityDemonFang){
                this.currentAnim = this.anims.open;
                if(!this.open){
                    ig.game.spawnEntity(EntityManapotion, this.pos.x + 10, this.pos.y);
                    this.open = true;
                }
            }
        }
    })
});
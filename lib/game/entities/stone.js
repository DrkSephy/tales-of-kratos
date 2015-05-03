ig.module(
    'game.entities.stone'
)
.requires(
    'impact.entity'
)

.defines(function() {
    EntityStone = ig.Entity.extend({
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.FIXED,
    	size: {x: 32, y: 32},
        health: 999999,
        animSheet: new ig.AnimationSheet('media/stone.png', 32, 32),
        hitCounter: 0,


        init: function(x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('solid', 1, [0]);
            this.addAnim('cracked', 1, [1]);
        }, // End init

        update: function() {
            this.parent();
            if(this.hitCounter == 1){
                this.currentAnim = this.anims.cracked;
            } else if (this.hitCounter == 2){
                this.kill()
            } else
                this.currentAnim = this.anims.solid;
        },
    })
});
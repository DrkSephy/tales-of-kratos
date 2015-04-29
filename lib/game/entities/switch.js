ig.module(
    'game.entities.switch'
)
.requires(
    'impact.entity'
)

.defines(function() {
    EntitySwitch = ig.Entity.extend({
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
    	size: {x: 32, y: 32},
        health: 999999,
        animSheet: new ig.AnimationSheet('media/switches.png', 32, 32),
        active: false,

        init: function(x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('inactive', 1, [0]);
            this.addAnim('active', 0.10, [0, 1], true)
        }, // End init

        update: function() {
            if(!this.active){
                this.currentAnim = this.anims.inactive;
            } else if (this.active){
                this.currentAnim = this.anims.active;
            }
            this.parent();
        },

        check: function(other) {
            if(other instanceof EntityDemonFang){
                other.kill();
                this.active = !this.active;
            }
        }
    })
});
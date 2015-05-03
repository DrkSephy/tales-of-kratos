ig.module(
    'game.entities.archer'
)
.requires(
    'impact.entity'
)

.defines(function(){
    EntityArcher = ig.Entity.extend({
        type: ig.Entity.TYPE.B, 
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.LITE, 

        animSheet: new ig.AnimationSheet('media/link.png', 70, 77),
        size: {x: 50, y: 50},
        offset: {x: 5, y: 18},
        flip: true,
        health: 5,
        speed: 0,

        init: function(x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('walk', 0.20, [0, 1, 2, 3, 4, 5, 6, 7]);
        },

        update: function(){
            this.parent();
        },

        collideWith: function(other, axis){
            if(other instanceof EntityDemonFang){
                if(axis === 'y'){
                    var player = ig.game.getEntitiesByType( EntityPlayer )[0]; /* takes slot 0 of array returned by getEntitiesByType--> player */
                    player.stats.totalExp += this.expGiven; /*updates tot experience set it player.js, adds experience */
                    player.stats.nextExp -= this.expGiven; /*updates experience necessary to level up set in player.js, decreases experience necessary*/ 
                    this.kill();
                }
                else {
                    other.receiveDamage(1, this);
                }
            }
            if(other instanceof EntityPlayer){
                var player = ig.game.getEntitiesByType( EntityPlayer )[0];
                if(player.attacking === true) {
                    this.receiveDamage(5, this);
                    this.pos.x += 50;
                }
                if(axis === 'x'){
                    other.receiveDamage(1, this);
                }
            }
        },
    });
});
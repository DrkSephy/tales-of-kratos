ig.module(
    'game.entities.goomba'
)
.requires(
    'impact.entity'
)

.defines(function(){
    EntityGoomba = ig.Entity.extend({
        type: ig.Entity.TYPE.B, 
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE, 

        animSheet: new ig.AnimationSheet('media/enemies/goomba.png', 25, 26),
        size: {x: 22, y: 19},
        flip: true,
        speed: 50,
        expGiven: 9999,

        init: function(x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('crawl', 0.20, [0, 1]);
        },

        update: function(){
            var xdir = this.flip ? -1:1;
            this.vel.x = this.speed * xdir;
            this.parent();
        },

        handleMovementTrace: function(res){
            this.parent(res);
            if(res.collision.x){
                this.flip = !this.flip;
                this.anims.crawl.flip.x = !this.flip;
            }
        },

        collideWith: function(other, axis){
            if(other instanceof EntityPlayer){
                if(axis === 'y'){
                    var player = ig.game.getEntitiesByType( EntityPlayer )[0]; /* takes slot 0 of array returned by getEntitiesByType--> player */
                    player.stats.totalExp += this.expGiven; /*updates tot experience set it player.js, adds experience */
                    player.stats.nextExp -= this.expGiven; /*updates experience necessary to level up set in player.js, decreases experience necessary*/ 
                    this.kill();
                }
                else 
                    other.receiveDamage(1, this);
            }
        },
    });
});
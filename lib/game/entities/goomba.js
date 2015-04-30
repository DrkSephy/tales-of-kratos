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
        expGiven: 50,

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
                        
                    // 1. Add goomba.expGiven to level catalog expTotal
                    ig.game.levelsCatalog[player.stats.level].expTotal += this.expGiven;

                    // Did we level up? Let's check.
                    if(ig.game.levelsCatalog[player.stats.level].expToNext <= ig.game.levelsCatalog[player.stats.level].expTotal){
                        // Store any potential overflow experience
                        overflow = ig.game.levelsCatalog[player.stats.level].expOverflow += (ig.game.levelsCatalog[player.stats.level].expTotal - ig.game.levelsCatalog[player.stats.level].expToNext)
                        console.log(ig.game.levelsCatalog[player.stats.level].expOverflow);
                        console.log("calling level up function");
                        // level up
                        ig.game.levelUp(player);
                        console.log("Returned from leveling up");
                        // Do something here
                        //ig.game.levelsCatalog[player.stats.level].expTotal = overflow;
                        //console.log(ig.game.levelsCatalog[player.stats.level]);
                        //if(ig.game.levelsCatalog[player.stats.level].expToNext <= ig.game.levelsCatalog[player.stats.level].expTotal){
                        //    ig.game.levelUp(player);
                        // }
                    }
                    this.kill();
                }
                else 
                    other.receiveDamage(1, this);
            }
        },
    });
});
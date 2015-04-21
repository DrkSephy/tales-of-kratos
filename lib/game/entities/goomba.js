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
                    //console.log(this.levelCatalog[player.level].expTotal); 
                    //console.log(this.levelCatalog[player.level].expToNext);
                    expTotal = this.levelCatalog[player.level].expTotal; /* uses player's level property to directly access the levelCatalog */ 
                    expToNext = this.levelCatalog[player.level].expToNext;
                    expOverflow = this.levelCatalog[player.level].expOverflow; 
                    expOverflow = expTotal - expToNext; 

                    /* Case with overflow exp */
                    if(expOverflow > 0){
                        /* 1. level up player & stats according to levelCatalog 
                         * 2. set expTotal to the value of expOverflow
                         * 3. ~potential recursion~ check if expTotal - expToNext is <, = or, > 0
                         * Cases: 
                         * 1. if (expOverflow>0):
                         *      move player to next level (not sure how) 
                         *      update expToNext (or will moving player to next level suffice)
                         *      set expTotal = to expOverflow,
                         * 2. else if (<):
                         *      level up player & stats  
                         * 3. else //expOverflow = 0
                         *      do nothing */
                    }
                    //player.stats.totalExp += this.expGiven; /*updates tot experience set it player.js, adds experience */
                    //player.stats.nextExp -= this.expGiven; /*updates experience necessary to level up set in player.js, decreases experience necessary*/ 
                    this.kill();
                }
                else 
                    other.receiveDamage(1, this);
            }
        },
    });
});
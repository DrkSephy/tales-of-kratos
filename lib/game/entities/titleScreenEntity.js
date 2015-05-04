ig.module(
    'game.entities.titleScreenEntity'
)
.requires(
    'impact.entity'
)

.defines(function(){
    EntityTitleScreenEntity = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.NEVER, 

        animSheet: new ig.AnimationSheet('media/enemies/goomba.png', 25, 26),
        size: {x: 22, y: 19},
        flip: true,
        speed: 50,
        expGiven: 50,

        init: function(x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('crawl', 0.20, [9]);
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

    });
});
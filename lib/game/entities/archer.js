ig.module(
    'game.entities.archer'
)
.requires(
    'impact.entity',
    'game.entities.projectiles.arrow'
)

.defines(function(){
    EntityArcher = ig.Entity.extend({
        type: ig.Entity.TYPE.B, 
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.LITE, 

        animSheet: new ig.AnimationSheet('media/link.png', 70, 77),
        size: {x: 40, y: 50},
        offset: {x: 19, y: 18},
        flip: true,
        health: 5,
        speed: 0,
        shoot: false, 

        init: function(x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('idle', 0.20, [17]);
            this.addAnim('shoot', 0.15, [17, 16, 15, 14, 13, 12, 11, 11, 11, 11, 11, 11, 11, 10]);
            this.atkTimer = new ig.Timer(3.0);
        },

        update: function(){
            console.log(this.flip)
            if (this.atkTimer.delta() > 0){
                if(this.flip){
                    ig.game.spawnEntity(EntityArrow, this.pos.x - 30, this.pos.y + 20, {flip: this.flip});
                } else {
                    ig.game.spawnEntity(EntityArrow, this.pos.x + 30, this.pos.y + 20, {flip: this.flip});
                }
                this.atkTimer.reset();
            } else if(this.atkTimer.delta() > -1.5){
                console.log(this.currentAnim.frame)
                this.currentAnim = this.anims.shoot;
            } else {
                this.currentAnim = this.anims.idle;
                this.anims.shoot.rewind();
            }

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
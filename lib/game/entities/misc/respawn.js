ig.module(
  'game.entities.misc.respawn'
)
.requires(
  'impact.entity'
)

.defines(function () {
  EntityRespawn = ig.Entity.extend({
    size: {x: 46, y: 84},
    zIndex: -1,
    gravityFactor: 0,
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.NEVER,
    animSheet: new ig.AnimationSheet('media/respawn.png', 46, 84),

    init: function(x,y,settings){
      this.parent(x,y,settings);
      this.addAnim('idle', 0.5, [0]);
      this.addAnim('active', 0.30, [0, 1, 2, 3]);
    },

    update: function() {
      this.currentAnim.update();
    },

    getSpawnPos: function() {
      return {
        x: this.pos.x + 11,
        y: this.pos.y
      };
    },

    activate: function(){
      this.active = true;
      ig.game.lastCheckpoint = this;

    },

    check: function (other) {
      if(!this.active){
        this.currentAnim = this.anims.active;
        this.activate();
      }
    }
  });
});

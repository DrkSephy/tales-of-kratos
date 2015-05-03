ig.module(
    'game.entities.misc.enemy_spawner'
)

.requires(
    'impact.entity',
    'game.entities.player',
    'game.entities.archer'   
)

.defines(function() {
    EntityEnemy_spawner = ig.Entity.extend({
        _wmScalable: true,
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(196, 255, 0, 0.7)',

        enemy: null,

        update: function() {
            // Check distance to player
            var xdist = Math.abs(ig.game.player.pos.x - this.pos.x);
            var ydist = Math.abs(ig.game.player.pos.y - this.pos.y);

            if((xdist <= (ig.system.width - 25)) && (ydist <= (ig.system.height - 50))) {
                console.log('Entity' + this.enemy + ' spawned.');
                ig.game.spawnEntity('Entity' + this.enemy, this.pos.x, this.pos.y);
                this.kill();
            }
        }
    });
});

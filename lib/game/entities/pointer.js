
ig.module(
    'game.entities.pointer'
)
.requires(
    'impact.entity'
)
.defines(function(){
    ig.global.EntityPointer = ig.Entity.extend({
        checkAgainst: ig.Entity.TYPE.B,
        size: {x:1, y:1},
        isLeftClicking: false,
        
        update: function() {
            // Update the position to follow the mouse cursor. You
            // may also have to account for ig.game.screen.x/y here 
            this.pos.x = ig.input.mouse.x + ig.game.screen.x;
            this.pos.y = ig.input.mouse.y + ig.game.screen.y;
            // Only check for the click once per frame, instead of
            // for each entity it touches in the 'check' function
            this.isLeftClicking = ig.input.pressed('leftClick');
        },
        
        check: function( other ) {
            // User is clicking and the 'other' entity has 
            // a 'clicked' function?

            if(this.isLeftClicking && typeof(other.clicked) == 'function') {
                other.clicked();
            }
        }
    });
});
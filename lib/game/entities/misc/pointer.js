
ig.module(
    'game.entities.misc.pointer'
)
.requires(
    'impact.entity'
)
.defines(function(){
    EntityPointer = ig.Entity.extend({
        checkAgainst: ig.Entity.TYPE.B,
        size: {x:1, y:1},
        isLeftClicking: false,
        animSheet: new ig.AnimationSheet('media/cursor.png', 32, 32),
        zIndex: 0, 

        init: function(x, y, settings){
            this.parent(x, y, settings);
            //this.addAnim('idle', 0.08, [0, 1, 2]);
        },

        update: function() {
            //this.currentAnim = this.anims.idle;
            // Update the position to follow the mouse cursor. You
            // may also have to account for ig.game.screen.x/y here 
            this.pos.x = ig.input.mouse.x + ig.game.screen.x;
            this.pos.y = ig.input.mouse.y + ig.game.screen.y;
            // Only check for the click once per frame, instead of
            // for each entity it touches in the 'check' function
            this.isLeftClicking = ig.input.pressed('leftClick');
            /*
            if(this.isLeftClicking){
                console.log(ig.input.mouse.x);
                console.log(ig.input.mouse.y);
            }*/


            if(this.isLeftClicking && (ig.input.mouse.x >= 246 && ig.input.mouse.x <= 260) && (ig.input.mouse.y >= 6 && ig.input.mouse.y <= 22)){
                ig.game.gameState = 'artesMenu';
                ig.game.menuVisible = true;
            }

            if(this.isLeftClicking && (ig.input.mouse.x >= 216 && ig.input.mouse.x <= 230) && (ig.input.mouse.y >= 6 && ig.input.mouse.y <= 22)){
                ig.game.gameState = 'spellsMenu';
                ig.game.menuVisible = true;
            }

            if(this.isLeftClicking && (ig.input.mouse.x >= 186 && ig.input.mouse.x <= 200) && (ig.input.mouse.y >= 6 && ig.input.mouse.y <= 22)){
                ig.game.gameState = 'skillsMenu';
                ig.game.menuVisible = true;
            }
        },
        
        check: function( other ) {
            // User is clicking and the 'other' entity has a 'clicked' function?
           
            // Useful for doing something "onHover" on an entity
            if(other instanceof EntityArteBoxA){
                ig.game.displayedLightningBladeDescription = true;
            } else if (other instanceof EntityArteBoxB){
                ig.game.displayedHellPyreDescription = true;
            } else if (other instanceof EntityArteBoxC){
                ig.game.displayedSonicThrustDescription = true;
            } else if (other instanceof EntityArteBoxD){
                ig.game.displayedDemonFangDescription = true;
            } else if (other instanceof EntitySpellBoxA) {
                ig.game.displayedFireBallDescription = true;
            } else if (other instanceof EntitySpellBoxB) {
                ig.game.displayedLightningDescription = true;
            } else if (other instanceof EntitySpellBoxC) {
                ig.game.displayedWindDescription = true;
            } else if (other instanceof EntitySpellBoxD){
                ig.game.displayedHealDescription = true;
            } else if (other instanceof EntityStamina){
                ig.game.displayedStaminaDescription = true;
            } else if (other instanceof EntityAttack){
                ig.game.displayedAttackDescription = true;
            }



            else {
                ig.game.displayedHellPyreDescription = false;
                ig.game.displayedLightningBladeDescription = false;
                ig.game.displayedSonicThrustDescription = false;
                ig.game.displayedDemonFangDescription = false;
                ig.game.displayedFireBallDescription = false;
                ig.game.displayedLightningDescription = false;
                ig.game.displayedWindDescription = false;
                ig.game.displayedHealDescription = false;
                ig.game.displayedStaminaDescription = false;
                ig.game.displayedAttackDescription = false;
            }

            if(this.isLeftClicking && typeof(other.clicked) === 'function') {
                other.clicked();
            }
        },
    });
});

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
            if(typeof ig.game.getEntitiesByType('EntityPlayer')[0] !== 'undefined'){
                var player = ig.game.getEntitiesByType('EntityPlayer')[0];
            }
            //this.currentAnim = this.anims.idle;
            // Update the position to follow the mouse cursor. You
            // may also have to account for ig.game.screen.x/y here 
            this.pos.x = ig.input.mouse.x + ig.game.screen.x;
            this.pos.y = ig.input.mouse.y + ig.game.screen.y;
            // Only check for the click once per frame, instead of
            // for each entity it touches in the 'check' function
            this.isLeftClicking = ig.input.pressed('leftClick');


            if(this.isLeftClicking && (ig.input.mouse.x >= 286 && ig.input.mouse.x <= 302) && (ig.input.mouse.y >= 6 && ig.input.mouse.y <= 22)
                && ig.game.gameState !== 'skillsMenu' && ig.game.gameState !== 'spellsMenu' && ig.game.gameState !== 'stats' && player.vel.x === 0){
                ig.game.gameState = 'artesMenu';
                ig.game.menuVisible = true;
                ig.game.clickSFX.volume = 0.7;
                ig.game.clickSFX.play();
            }

            if(this.isLeftClicking && (ig.input.mouse.x >= 266 && ig.input.mouse.x <= 282) && (ig.input.mouse.y >= 6 && ig.input.mouse.y <= 22)
                && ig.game.gameState !== 'artesMenu' && ig.game.gameState !== 'skillsMenu' && ig.game.gameState !== 'stats' && player.vel.x === 0){
                ig.game.gameState = 'spellsMenu';
                ig.game.menuVisible = true;
                ig.game.clickSFX.volume = 0.7;
                ig.game.clickSFX.play();
            }

            if(this.isLeftClicking && (ig.input.mouse.x >= 246 && ig.input.mouse.x <= 262) && (ig.input.mouse.y >= 6 && ig.input.mouse.y <= 22)
                && ig.game.gameState !== 'spellsMenu' && ig.game.gameState !== 'artesMenu' && ig.game.gameState !== 'stats' && player.vel.x === 0){
                ig.game.gameState = 'skillsMenu';
                ig.game.menuVisible = true;
                ig.game.clickSFX.volume = 0.7;
                ig.game.clickSFX.play();
            }

            if(ig.input.mouse.x >= 28 && ig.input.mouse.x <= 54 && ig.input.mouse.y >= 27 && ig.input.mouse.y <= 54){
                ig.game.displayedManaDescription = true;
                ig.game.displayedSkillDescription = true;  
            } 

            else if(ig.input.mouse.x >= 66  && ig.input.mouse.x <= 92 && ig.input.mouse.y >= 27 && ig.input.mouse.y <= 54){
                ig.game.displayedSkillOneDescription = true;
                ig.game.displayedSkillDescription = true;  
            } 

            else if(ig.input.mouse.x >= 108  && ig.input.mouse.x <= 134 && ig.input.mouse.y >= 27 && ig.input.mouse.y <= 54){
                ig.game.displayedAttackTwoDescription = true;
                ig.game.displayedSkillDescription = true;  
            } 

            else if(ig.input.mouse.x >= 146  && ig.input.mouse.x <= 174 && ig.input.mouse.y >= 27 && ig.input.mouse.y <= 54){
                ig.game.displayedSkillFourDescription = true;
                ig.game.displayedSkillDescription = true;  
            }

            else if(ig.input.mouse.x >= 28  && ig.input.mouse.x <= 54 && ig.input.mouse.y >= 66 && ig.input.mouse.y <= 94){
                ig.game.displayedStaminaThreeDescription = true;
                ig.game.displayedSkillDescription = true;  
            }

            else if(ig.input.mouse.x >= 66  && ig.input.mouse.x <= 92 && ig.input.mouse.y >= 66 && ig.input.mouse.y <= 94){
                ig.game.displayedDefenseDescription = true;
                ig.game.displayedSkillDescription = true;  
            }

            else if(ig.input.mouse.x >= 108  && ig.input.mouse.x <= 134 && ig.input.mouse.y >= 66 && ig.input.mouse.y <= 94){
                ig.game.displayedAttackDescription = true;
                ig.game.displayedSkillDescription = true;  
            }

            else if(ig.input.mouse.x >= 146  && ig.input.mouse.x <= 174 && ig.input.mouse.y >= 66 && ig.input.mouse.y <= 94){
                ig.game.displayedDefenseFourDescription = true;
                ig.game.displayedSkillDescription = true;  
            }

            else if(ig.input.mouse.x >= 28  && ig.input.mouse.x <= 54 && ig.input.mouse.y >= 116 && ig.input.mouse.y <= 143){
                ig.game.displayedManaTwoDescription = true;
                ig.game.displayedSkillDescription = true;  
            }

            else if(ig.input.mouse.x >= 66  && ig.input.mouse.x <= 92 && ig.input.mouse.y >= 116 && ig.input.mouse.y <= 143){
                ig.game.displayedDefenseTwoDescription = true;
                ig.game.displayedSkillDescription = true;  
            }

            else if(ig.input.mouse.x >= 108  && ig.input.mouse.x <= 134 && ig.input.mouse.y >= 116 && ig.input.mouse.y <= 143){
                ig.game.displayedStaminaDescription = true;
                ig.game.displayedSkillDescription = true;  
            }

            else if(ig.input.mouse.x >= 146  && ig.input.mouse.x <= 174 && ig.input.mouse.y >= 116 && ig.input.mouse.y <= 143){
                ig.game.displayedAttackFiveDescription = true;
                ig.game.displayedSkillDescription = true;  
            }

            else if(ig.input.mouse.x >= 28  && ig.input.mouse.x <= 54 && ig.input.mouse.y >= 154 && ig.input.mouse.y <= 180){
                ig.game.displayedSkillTwoDescription = true;
                ig.game.displayedSkillDescription = true;  
            }

            else if(ig.input.mouse.x >= 66 && ig.input.mouse.x <= 92 && ig.input.mouse.y >= 154 && ig.input.mouse.y <= 180){
                ig.game.displayedSkillThreeDescription = true;
                ig.game.displayedSkillDescription = true;  
            }

            else if(ig.input.mouse.x >= 108 && ig.input.mouse.x <= 134 && ig.input.mouse.y >= 154 && ig.input.mouse.y <= 180){
                ig.game.displayedAttackFourDescription = true;
                ig.game.displayedSkillDescription = true;  
            }

            else if(ig.input.mouse.x >= 146 && ig.input.mouse.x <= 174 && ig.input.mouse.y >= 154 && ig.input.mouse.y <= 180){
                ig.game.displayedManaThreeDescription = true;
                ig.game.displayedSkillDescription = true;  
            }

            else if(ig.input.mouse.x >= 28 && ig.input.mouse.x <= 54 && ig.input.mouse.y >= 195 && ig.input.mouse.y <= 221){
                ig.game.displayedAttackThreeDescription = true;
                ig.game.displayedSkillDescription = true;  
            }

            else if(ig.input.mouse.x >= 66 && ig.input.mouse.x <= 92 && ig.input.mouse.y >= 195 && ig.input.mouse.y <= 221){
                ig.game.displayedStaminaFourDescription = true;
                ig.game.displayedSkillDescription = true;  
            }

            else if(ig.input.mouse.x >= 108 && ig.input.mouse.x <= 134 && ig.input.mouse.y >= 195 && ig.input.mouse.y <= 221){
                ig.game.displayedDefenseThreeDescription = true;
                ig.game.displayedSkillDescription = true;  
            }

            else if(ig.input.mouse.x >= 146 && ig.input.mouse.x <= 174 && ig.input.mouse.y >= 195 && ig.input.mouse.y <= 221){
                ig.game.displayedStaminaFiveDescription = true;
                ig.game.displayedSkillDescription = true;  
            }



            else {
                ig.game.displayedSkillDescription = false;
                ig.game.displayedManaDescription = false;
                ig.game.displayedSkillOneDescription = false;
                ig.game.displayedAttackTwoDescription = false;
                ig.game.displayedSkillFourDescription = false;
                ig.game.displayedStaminaThreeDescription = false;
                ig.game.displayedDefenseDescription = false;
                ig.game.displayedAttackDescription = false;
                ig.game.displayedDefenseFourDescription = false;
                ig.game.displayedManaTwoDescription = false;
                ig.game.displayedDefenseTwoDescription = false;
                ig.game.displayedStaminaDescription = false;
                ig.game.displayedAttackFiveDescription = false;
                ig.game.displayedSkillTwoDescription = false;
                ig.game.displayedSkillThreeDescription = false;
                ig.game.displayedAttackFourDescription = false;
                ig.game.displayedManaThreeDescription = false;
                ig.game.displayedAttackThreeDescription = false;
                ig.game.displayedStaminaFourDescription = false;
                ig.game.displayedDefenseThreeDescription = false;
                ig.game.displayedStaminaFiveDescription = false;
            }

            // console.log(ig.input.mouse.x, ig.input.mouse.y);

            // console.log(ig.input.mouse.x, ig.input.mouse.y);
        },
        
        check: function( other ) {

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
            } else {
                ig.game.displayedLightningBladeDescription = false;
                ig.game.displayedHellPyreDescription = false;
                ig.game.displayedSonicThrustDescription = false;
                ig.game.displayedDemonFangDescription = false;
                ig.game.displayedFireBallDescription = false;
                ig.game.displayedLightningDescription = false;
                ig.game.displayedWindDescription = false;
                ig.game.displayedHealDescription = false;

            }

            if(this.isLeftClicking && typeof(other.clicked) === 'function') {
                other.clicked();
            }
        },
    });
});
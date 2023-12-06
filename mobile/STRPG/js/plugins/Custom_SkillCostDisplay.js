/*:
 * @plugindesc Custom_SkillCostDisplay
 * @target MZ
 *
 */

Window_SkillList.prototype.drawItem = function(index) {
    const skill = this.itemAt(index);
    if (skill) {
        const costWidth = this.costWidth(skill);
        const rect = this.itemLineRect(index);
        this.changePaintOpacity(this.isEnabled(skill));
        this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
        
        // Check if the skill is on cooldown before drawing the cost
        if (!this._actor.isSkillItemCooldown(skill)) {
            this.drawSkillCost(skill, rect.x, rect.y, rect.width);
        }
        
        this.drawSkillCooldown(skill, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    }
};

ColorManager.CooldownColor = function() {
    return this.textColor(7);
};

Window_SkillList.prototype.drawSkillCooldown = function(skill, x, y, width) {
    const actor = this._actor;
    if (actor.isSkillItemCooldown(skill)) {
        const cooldownText = "Cooldown: " + actor.skillItemCooldown(skill) + " Turns";
        const cooldownWidth = this.textWidth(cooldownText);
        const cooldownX = x + width - cooldownWidth;
        this.changeTextColor(ColorManager.CooldownColor());
        this.drawText(cooldownText, cooldownX, y, cooldownWidth);
    }
};

Window_SkillList.prototype.costWidth = function(skill) {
    let value = 0;
    if (this._actor.skillTpCost(skill) > 0) {
        value += this.textWidth(this._actor.skillTpCost(skill) + TextManager.tpA);
    }
    if (this._actor.skillMpCost(skill) > 0) {
        if (value > 0) {
            value += this.textWidth(' ');
        }
        value += this.textWidth(this._actor.skillMpCost(skill) + TextManager.mpA);
    }
    value += this.textWidth(' ');
    return value;
};

Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    const partialSpaceWidth = Math.floor(this.textWidth(' ') / 3);

    if (this._actor.skillTpCost(skill) > 0) {
        const tpValText = this._actor.skillTpCost(skill);
        const tpValWidth = this.textWidth(tpValText);
        const tpAWidth = this.textWidth(TextManager.tpA);
        var tpWidth = tpValWidth + partialSpaceWidth + tpAWidth;
        const tpValX = x + width - tpWidth;
        const tpAX = x + width - tpAWidth;
        this.changeTextColor(ColorManager.tpCostColor());
        this.drawText(tpValText, tpValX, y, tpValWidth);
        this.drawText(TextManager.tpA, tpAX, y, tpAWidth);
    }

    if (this._actor.skillMpCost(skill) > 0) {
        const mpValText = this._actor.skillMpCost(skill);
        const mpValWidth = this.textWidth(mpValText);
        const mpAWidth = this.textWidth(TextManager.mpA);
        const mpWidth = mpValWidth + partialSpaceWidth + mpAWidth;
        const mpOffset = tpWidth ? tpWidth + this.textWidth(' ') : 0;
        const mpValX = x + width - mpWidth - mpOffset;
        const mpAX = x + width - mpAWidth - mpOffset;
        this.changeTextColor(ColorManager.mpCostColor());
        this.drawText(mpValText, mpValX, y, mpValWidth);
        this.drawText(TextManager.mpA, mpAX, y, mpAWidth);
    }
};


let blankUser = {
  summary: {
    hp: {
      name: "Hit Points",
      value: "0",
      totalHp: { name: "Total HP", value: "0" },
      damage: { name: "Damage (neg)", value: "0" },
      nonLethalDamage: { name: "Non-Lethal Damage (neg)", value: "0" }
    },
    ac: {
      name: "Armour Class",
      value: "10",
      aaaarmourBonus: { name: "Armour Bonus", value: "0" },
      bbbdexBonus: { name: "Dex Bonus", value: "0" },
      cccsizeBonus: { name: "Size Bonus", value: "0" },
      dddnaturalArmourBonus: { name: "Natural Armour", value: "0" },
      eeemiscBonus: { name: "Misc Bonus", value: "0" }
    },
    initiative: {
      name: "Initiative",
      value: "0",
      dexBonus: { name: "Dex Bonus", value: "0" },
      miscBonus: { name: "Misc Bonus", value: "0" }
    },

    grapple: {
      name: "Grapple",
      value: "0",
      baseAttackBonus: { name: "Base Attack Bonus", value: "0" },
      strBonus: { name: "Str Bonus", value: "0" },
      sizeBonus: { name: "Size Bonus", value: "0" },
      miscBonus: { name: "Misc Bonus", value: "0" }
    }
  },
  savingThrows: {
    fortitude: {
      name: "Fortitude",
      value: "0",
      baseSave: "0",
      abilityMod: "0",
      miscMod: "0"
    },
    reflex: {
      name: "Reflex",
      value: "0",
      baseSave: "0",
      abilityMod: "0",
      miscMod: "0"
    },
    will: {
      name: "Will",
      value: "0",
      baseSave: "0",
      abilityMod: "0",
      miscMod: "0"
    }
  },
  abilities: [
    {
      id: "str",
      name: "Strength",
      abilityScore: "10"
    },
    {
      id: "dex",
      name: "Dexterity",
      abilityScore: "10"
    },
    {
      id: "con",
      name: "Constitution",
      abilityScore: "10"
    },
    {
      id: "int",
      name: "Intelligence",
      abilityScore: "10"
    },
    {
      id: "wis",
      name: "Wisdom",
      abilityScore: "10"
    },
    {
      id: "cha",
      name: "Charisma",
      abilityScore: "10"
    }
  ],
  skills: [
    {
      name: "Appraise",
      ability: "INT",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Balance",
      ability: "DEX",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Bluff",
      ability: "CHA",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Climb",
      ability: "STR",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Concentrate",
      ability: "CON",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Craft",
      ability: "INT",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Craft",
      ability: "INT",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Craft",
      ability: "INT",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Decipher Script",
      ability: "INT",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Diplomacy",
      ability: "CHA",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Disable Device",
      ability: "INT",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Disguise",
      ability: "CHA",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Escape Artist",
      ability: "DEX",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Forgery",
      ability: "INT",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Gather Information",
      ability: "CHA",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Handle Animal",
      ability: "CHA",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Heal",
      ability: "WIS",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Hide",
      ability: "DEX",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Intimidate",
      ability: "CHA",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Jump",
      ability: "STR",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Knowledge",
      ability: "INT",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Knowledge",
      ability: "INT",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Knowledge",
      ability: "INT",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Knowledge",
      ability: "INT",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Listen",
      ability: "WIS",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Move Silently",
      ability: "DEX",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Open Lock",
      ability: "DEX",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Perform",
      ability: "CHA",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Perform",
      ability: "CHA",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Perform",
      ability: "CHA",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Profession",
      ability: "WIS",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Profession",
      ability: "WIS",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Ride",
      ability: "DEX",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Search",
      ability: "INT",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Sense Motive",
      ability: "WIS",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Sleight Of Hand",
      ability: "DEX",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Spellcraft",
      ability: "INT",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Spot",
      ability: "WIS",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Survival",
      ability: "WIS",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Swim",
      ability: "STR",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Tumble",
      ability: "DEX",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Use Magic Device",
      ability: "CHA",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "Use Rope",
      ability: "DEX",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "",
      ability: "",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "",
      ability: "",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "",
      ability: "",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "",
      ability: "",
      skillRanks: "0",
      skillMisc: "0"
    },
    {
      name: "",
      ability: "",
      skillRanks: "0",
      skillMisc: "0"
    }
  ],
  weapons: {},
  armour: {},
  spells: {}
};

function blankWeapon(randomId) {
  return {
    weapons: {
      [randomId]: {
        name: "Dagger",
        attackBonus: "0",
        damage: "0",
        critical: "19-20/x2",
        range: "10",
        type: "Pierce/Slash",
        ammo: "0",
        notes: ""
      }
    }
  };
}

function blankArmour(randomId) {
  return {
    armours: {
      [randomId]: {
        name: "Leather",
        type: "Light",
        acBonus: "2",
        maxDex: "6",
        checkPenalty: "0",
        spellFailure: "10%",
        speed: "100%",
        weight: "15",
        specialProperties: "None"
      }
    }
  };
}

function blankSpell(randomId) {
  return {
    spells: {
      [randomId]: {
        name: "Finger of Death",
        level: "8",
        components: "Vocal, Semantic",
        castingTime: "1 Round",
        range: "25ft + 5ft/2 lvls",
        area: "None",
        target: "One Living Creature",
        duration: "Instantaneous",
        savingThrow: "Fortitude",
        spellResistance: "Yes",
        summary:
          "You can slay any one living creature within range. The target is entitled to a Fortitude saving throw to survive the attack. If the save is successful, the creature instead takes 3d6 points of damage +1 point per caster level (maximum +25). The subject might die from damage even if it succeeds on its saving throw.        "
      }
    }
  };
}

function blankNote(randomId) {
  return {
    other: {
      [randomId]: {
        title: "Feats",
        summary:
          "Feat 1: Dodge\n\nBenefit: During your action, you designate an opponent and\nreceive a +1 dodge bonus to Armor Class against attacks from that opponent. You can select a new opponent on any action.\nA condition that makes you lose your Dexterity bonus to Armor Class (if any) also makes you lose dodge bonuses. Also, dodge bonuses (such as this one and a dwarf’s racial bonus on dodge attempts against giants) stack with each other, unlike most other types of bonuses.\n\nFeat 2: Mobility\n\n You get a +4 dodge bonus to Armor Class against attacks of opportunity caused when you move out of or within a threatened area. A condition that makes you lose your Dexterity bonus to Armor Class (if any) also makes you lose dodge bonuses. Dodge bonuses (such as this one and a dwarf’s racial bonus on dodge attempts against giants) stack with each other, unlike most types of bonuses."
      }
    }
  };
}

export default blankUser;
export { blankWeapon, blankArmour, blankSpell, blankNote };

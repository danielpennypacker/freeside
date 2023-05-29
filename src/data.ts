import { CLIENT_RENEG_LIMIT } from "tls";
import { Tracing } from "trace_events";

export const getNpc = (id: number) => {
    return characters.filter((npc) => {
        return npc.id === id
    })[0] as Character
  };

  export const getLocation = (id: number) => {
    return locations.filter((npc) => {
        return npc.id === id
    })[0] as Location
  };

  export const getAttrBonus = (value: number) => {
    const bonus = Math.floor((value - 10) / 2);
    if (bonus > 0) {
      return `+${bonus}`;
    }
    return bonus;
  };



export const toTitle = (val: string) => {
    return val.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  export enum Skills {
    Acrobatics = "Acrobatics",
    AnimalHandling = "Animal Handling",
    Arcana = "Arcana",
    Athletics = "Athletics",
    Deception = "Deception",
    History = "History",
    Insight = "Insight",
    Intimidation = "Intimidation",
    Investigation = "Investigation",
    Medicine = "Medicine",
    Nature = "Nature",
    Perception = "Perception",
    Performance = "Performance",
    Persuasion = "Persuasion",
    Religion = "Religion",
    SlieghtofHand = "Slieght of Hand",
    Stealth = "Stealth",
    Survival = "Survival",
  }

export enum DC {
    square="square",//- 
    sewer="sewer",//- 
    base="base",//-     
    vr="vr",//- 
    caves="caves",//- 
    nature="nature",
    area="area",//- 
    fight="fight",// -
}      

export type Monster =  { 
    armorClass: number;    
    hitPoints: number;
    speed: number;
    passivePerception: number;
    attack: Attack;
    proficiencyBonus: number;
    name: string; 
    strength: number;
    dexterity: number;
    constitution: number;    
    intelligence: number;    
    wisdom: number;    
    charisma: number;
    skills: Skills[];
    challengeRating: number;
    code: string;
    alignment?: string;
    race?: string;
}    

export type Dungeon =  {    
    code: DC;    
    rooms: Room[];
    id?: string | number;
    page?: number;
    title: string;
    dmNotes: string;
    misc: [string, string][];
    monsters: Monster[];
}

export type Room = {    
    title: string;
    num: number;
    desc: string;
    events: string[];
}    

export const dungeons: Dungeon[] = [
    // ==== Square Dungeon ==== 
    {
        code: DC.square,
        rooms: [
            {
                num: 1,
                title: "Total Dark Room, Kaiju Book Location",
                desc: `A room that is magicall totally dark, and nothing will light it.`,
                events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
            },
            {
                num: 2,
                title: "Total Dark Room, Kaiju Book Location",
                desc: `A room that is magicall totally dark, and nothing will light it.`,
                events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
            },
            {
                num: 3,
                title: "Total Dark Room, Kaiju Book Location",
                desc: `A room that is magicall totally dark, and nothing will light it.`,
                events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
            },
            {
                num: 4,
                title: "Total Dark Room, Kaiju Book Location",
                desc: `A room that is magicall totally dark, and nothing will light it.`,
                events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
            },
            {
                num: 5,
                title: "Total Dark Room, Kaiju Book Location",
                desc: `A room that is magicall totally dark, and nothing will light it.`,
                events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
            },
            {
                num: 6,
                title: "Total Dark Room, Kaiju Book Location",
                desc: `A room that is magicall totally dark, and nothing will light it.`,
                events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
            },
            {
                num: 7,
                title: "Total Dark Room, Kaiju Book Location",
                desc: `A room that is magicall totally dark, and nothing will light it.`,
                events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
            },
            {
                num: 8,
                title: "Total Dark Room, Kaiju Book Location",
                desc: `A room that is magicall totally dark, and nothing will light it.`,
                events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
            },
            {
                num: 9,
                title: "Total Dark Room, Kaiju Book Location",
                desc: `A room that is magicall totally dark, and nothing will light it.`,
                events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
            },
        ],
        title: 'Square Dungeon',
        dmNotes: 'Find the Kaiju book.',
        misc: [],
        monsters: [ {
            code: 'evil_elf',
            name: 'Evil Elf Fighter',
            armorClass: 14,    
            hitPoints: 20,
            speed: 30,
            passivePerception: 10,
            proficiencyBonus: 2,
            attack: {
                description: 'Bow',
                damage: '1d8',
                bonus: 5,
                range: 30,
                multi: 1,
            },         
            challengeRating: 2,   
            strength: 9,
            dexterity: 14,
            constitution: 9,
            intelligence: 12,
            wisdom: 12,
            charisma: 13,
            skills: [Skills.Deception, Skills.AnimalHandling]
        },
        {
            code: 'evil_dwarf',
            name: 'Evil Dwarf Fighter',
            armorClass: 13,    
            hitPoints: 25,
            speed: 20,
            passivePerception: 10,
            proficiencyBonus: 2,
            attack: {
                description: 'Axe',
                damage: '1d10',
                bonus: 4,
                range: 5,
                multi: 1,
            },         
            challengeRating: 2,   
            strength: 13,
            dexterity: 9,
            constitution: 12,
            intelligence: 9,
            wisdom: 12,
            charisma: 10,
            skills: [Skills.Survival, Skills.History]
        }
    ],
    },
// ==== Sewer Dungeon ==== 
{
    code: DC.sewer,
    rooms: [
        {
            num: 1,
            title: "Hub Room, Cape Trap Monster",
            desc: `A room that is magicall totally dark, and nothing will light it.`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 2,
            title: "Giant Ape",
            desc: `A room that is magicall totally dark, and nothing will light it.`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 3,
            title: "Tyrannosaurus Rex",
            desc: `A room that is magicall totally dark, and nothing will light it.`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 4,
            title: "Total Dark Room, Kaiju Book Location",
            desc: `A room that is magicall totally dark, and nothing will light it.`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
    ],
    title: 'Sewer Dungeon',
    dmNotes: 'Fighter the monsters and find secret passages.',
    misc: [],
    monsters: [
        {
            code: 'evil_tree',
            name: 'Evil Tree',
            armorClass: 15,    
            hitPoints: 90,
            speed: 20,
            passivePerception: 10,
            proficiencyBonus: 3,
            attack: {
                description: 'Branch',
                damage: '4d12 + 7',
                bonus: 9,
                range: 15,
                multi: 1,
            },         
            challengeRating: 7,   
            strength: 23,
            dexterity: 10,
            constitution: 20,
            intelligence: 6,
            wisdom: 10,
            charisma: 3,
            skills: [Skills.Perception]
        },
         {
        code: 't_rex',
        name: 'T-Rex',
        armorClass: 13,    
        hitPoints: 120,
        speed: 50,
        passivePerception: 14,
        proficiencyBonus: 3,
        attack: {
            description: 'Bite',
            damage: '4d12 + 7',
            bonus: 10,
            range: 10,
            multi: 1,
        },         
        challengeRating: 8,   
        strength: 25,
        dexterity: 10,
        constitution: 19,
        intelligence: 2,
        wisdom: 12,
        charisma: 9,
        skills: [Skills.Perception]
    },
    {
        code: 'giant_crab',
        name: 'Giant Crab',
        armorClass: 15,    
        hitPoints: 150,
        speed: 30,
        passivePerception: 9,
        proficiencyBonus: 2,
        attack: {
            description: 'Claw',
            damage: '4d10 + 5',
            bonus: 9,
            range: 10,
            multi: 1,
        },         
        challengeRating: 8,   
        strength: 20,
        dexterity: 15,
        constitution: 20,
        intelligence: 1,
        wisdom: 9,
        charisma: 3,
        skills: [Skills.Stealth]
    },
    {
        code: 'giant_ape',
        name: 'Giant Ape',
        armorClass: 12,    
        hitPoints: 150,
        speed: 40,
        passivePerception: 14,
        proficiencyBonus: 3,
        attack: {
            description: 'Fist',
            damage: '3d10 + 6',
            bonus: 9,
            range: 10,
            multi: 1,
        },         
        challengeRating: 7,   
        strength: 23,
        dexterity: 14,
        constitution: 18,
        intelligence: 7,
        wisdom: 12,
        charisma: 7,
        skills: [Skills.Athletics, Skills.Perception]
    }
],
},
// ==== VR Dungeon ==== 
{
    code: DC.vr,
    rooms: [
        {
            num: 1,
            title: "Owl bear Fight",
            desc: `A room that is magicall totally dark, and nothing will light it.`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 2,
            title: "Invisible Stalker",
            desc: `A room that is magicall totally dark, and nothing will light it.`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 3,
            title: "Young Blue Dragon",
            desc: `A room that is magicall totally dark, and nothing will light it.`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 4,
            title: "Vampire Fight",
            desc: `A room that is magicall totally dark, and nothing will light it.`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
    ],
    title: 'VR Dungeon',
    dmNotes: 'All the monsters one after the other.',
    misc: [],
    monsters: [
        {
            code: 'owl_bear',
            name: 'Owl Bear',
            armorClass: 13,    
            hitPoints: 60,
            speed: 40,
            passivePerception: 10,
            proficiencyBonus: 2,
            attack: {
                description: 'Beak',
                damage: '1d10 + 5',
                bonus: 7,
                range: 5,
                multi: 1,
            },         
            challengeRating: 3,   
            strength: 20,
            dexterity: 12,
            constitution: 17,
            intelligence: 3,
            wisdom: 12,
            charisma: 7,
            skills: [Skills.Perception]
        },
         {
        code: 'invisible',
        name: 'Invisible Monster',
        armorClass: 14,    
        hitPoints: 100,
        speed: 50,
        passivePerception: 18,
        proficiencyBonus: 3,
        attack: {
            description: 'Slam',
            damage: '2d6 + 3',
            bonus: 6,
            range: 5,
            multi: 1,
        },         
        challengeRating: 6,   
        strength: 16,
        dexterity: 19,
        constitution: 14,
        intelligence: 10,
        wisdom: 15,
        charisma: 11,
        skills: [Skills.Perception, Skills.Stealth]
    },
    {
        code: 'dragon',
        name: 'Dragon',
        armorClass: 18,    
        hitPoints: 150,
        speed: 40,
        passivePerception: 19,
        proficiencyBonus: 4,
        attack: {
            description: 'Claw',
            damage: '2d6 + 5',
            bonus: 9,
            range: 10,
            multi: 1,
        },         
        challengeRating: 9,   
        strength: 21,
        dexterity: 10,
        constitution: 19,
        intelligence: 14,
        wisdom: 12,
        charisma: 13,
        skills: [Skills.Stealth, Skills.Stealth]
    },
    {
        code: 'vampire',
        name: 'Vampire',
        armorClass: 16,    
        hitPoints: 150,
        speed: 30,
        passivePerception: 17,
        proficiencyBonus: 5,
        attack: {
            description: 'Strike',
            damage: '1d8',
            bonus: 9,
            range: 5,
            multi: 1,
        },         
        challengeRating: 13,   
        strength: 18,
        dexterity: 18,
        constitution: 18,
        intelligence: 17,
        wisdom: 15,
        charisma: 18,
        skills: [Skills.Athletics, Skills.Perception]
    }
],
},
// ==== Base Dungeon ==== 
{
    code: DC.base,
    rooms: [
        {
            num: 1,
            title: "Fake Barracks",
            desc: `A room that is magicall totally dark, and nothing will light it.`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 2,
            title: "Hallway 1",
            desc: `A room that is magicall totally dark, and nothing will light it.`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 3,
            title: "Hallway 2",
            desc: `A room that is magicall totally dark, and nothing will light it.`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 4,
            title: "Real Barracks",
            desc: `A room that is magicall totally dark, and nothing will light it.`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 5,
            title: "Main Office",
            desc: `A room that is magicall totally dark, and nothing will light it.`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 6,
            title: "Secret Docks",
            desc: `A room that is magicall totally dark, and nothing will light it.`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 7,
            title: "Dinning Hall",
            desc: `A room that is magicall totally dark, and nothing will light it.`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
    ],
    title: 'Cult Basement Dungeon',
    dmNotes: 'The Convoys secret warf they are planning to float to the surface.',
    misc: [],
    monsters: [
        {
            code: 'soldier',
            name: 'Convoy Knight',
            armorClass: 18,    
            hitPoints: 30,
            speed: 30,
            passivePerception: 10,
            proficiencyBonus: 2,
            attack: {
                description: 'Sword',
                damage: '2d6 + 5',
                bonus: 5,
                range: 5,
                multi: 1,
            },         
            challengeRating: 2,   
            strength: 16,
            dexterity: 12,
            constitution: 17,
            intelligence: 9,
            wisdom: 11,
            charisma: 9,
            skills: [Skills.Perception]
        },
         {
        code: 'archer',
        name: 'Convoy Archer',
        armorClass: 18,    
        hitPoints: 30,
        speed: 30,
        passivePerception: 18,
        proficiencyBonus: 3,
        attack: {
            description: 'Long Bow',
            damage: '2d6 + 3',
            bonus: 6,
            range: 60,
            multi: 1,
        },         
        challengeRating: 2,   
        strength: 11,
        dexterity: 18,
        constitution: 12,
        intelligence: 11,
        wisdom: 12,
        charisma: 11,
        skills: [Skills.Perception, Skills.Acrobatics]
    },
],
},
// ==== Ghost Cave Dungeon ==== 
{
    code: DC.caves,
    rooms: [
        {
            num: 1,
            title: "Entrance",
            desc: `Ghosts attack`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 2,
            title: "Ritual Room",
            desc: `Quized about DnD`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 3,
            title: "Statue Room",
            desc: `Quized About Profeciencies`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 4,
            title: "Meeting Hall",
            desc: `20 Zombies`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 5,
            title: "Treasuery",
            desc: `Quized about freeside lore.`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 6,
            title: "Weapons Room",
            desc: `Treasure Guarded by something`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },        
    ],
    title: 'Cave Base',
    dmNotes: 'Get through here to get to the Flower',
    misc: [],
    monsters: [
        {
            code: 'ghost',
            name: 'Ghost',
            armorClass: 11,    
            hitPoints: 45,
            speed: 30,
            passivePerception: 10,
            proficiencyBonus: 2,
            attack: {
                description: 'Touch',
                damage: '4d6 + 3',
                bonus: 5,
                range: 5,
                multi: 1,
            },         
            challengeRating: 4,   
            strength: 7,
            dexterity: 13,
            constitution: 10,
            intelligence: 10,
            wisdom: 12,
            charisma: 17,
            skills: [Skills.Perception]
        },
         {
        code: 'zombie',
        name: 'zombie',
        armorClass: 8,    
        hitPoints: 10,
        speed: 20,
        passivePerception: 8,
        proficiencyBonus: 2,
        attack: {
            description: 'Slam',
            damage: '1d6 + 1',
            bonus: 3,
            range: 5,
            multi: 1,
        },         
        challengeRating: 1,   
        strength: 13,
        dexterity: 6,
        constitution: 16,
        intelligence: 3,
        wisdom: 6,
        charisma: 5,
        skills: []
    },
],
},
{
    code: DC.area,
    rooms: [
        {
            num: 1,
            title: "Knight Fight",
            desc: `Ghosts attack`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 2,
            title: "Archer Fight",
            desc: `Quized about DnD`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 3,
            title: "Gladiator Fight",
            desc: `Quized About Profeciencies`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 4,
            title: "Mage Fight",
            desc: `20 Zombies`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
    ],
    title: 'Areana',
    dmNotes: 'Fight for fame and fortune',
    misc: [],
    monsters: [
        {
            code: 'knight',
            name: 'Knight',
            armorClass: 18,    
            hitPoints: 50,
            speed: 30,
            passivePerception: 10,
            proficiencyBonus: 2,
            attack: {
                description: 'Sword',
                damage: '2d6 + 3',
                bonus: 5,
                range: 5,
                multi: 1,
            },         
            challengeRating: 3,   
            strength: 16,
            dexterity: 11,
            constitution: 14,
            intelligence: 11,
            wisdom: 11,
            charisma: 15,
            skills: []
        },
         {
        code: 'gladiator',
        name: 'Gladiator',
        armorClass: 16,    
        hitPoints: 100,
        speed: 30,
        passivePerception: 15,
        proficiencyBonus: 2,
        attack: {
            description: 'Spear',
            damage: '2d6 + 4',
            bonus: 7,
            range: 20,
            multi: 1,
        },         
        challengeRating: 5,   
        strength: 18,
        dexterity: 15,
        constitution: 16,
        intelligence: 10,
        wisdom: 12,
        charisma: 15,
        skills: []
    },
    {
        code: 'mage',
        name: 'Mage',
        armorClass: 15,    
        hitPoints: 40,
        speed: 30,
        passivePerception: 15,
        proficiencyBonus: 2,
        attack: {
            description: 'Spells',
            damage: '2d6 + 4',
            bonus: 7,
            range: 20,
            multi: 1,
        },         
        challengeRating: 5,   
        strength: 9,
        dexterity: 14,
        constitution: 11,
        intelligence: 17,
        wisdom: 12,
        charisma: 11,
        skills: [Skills.Arcana, Skills.History]
    },
],
},           
{
    code: DC.fight,
    rooms: [
        {
            num: 1,
            title: "Pirate fist fight.",
            desc: `Everyone gets in a fight`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },        
    ],
    title: 'Landing Area Fight',
    dmNotes: 'A fight to open the adventure!',
    misc: [],
    monsters: [
        {
            code: 'sailor',
            name: 'Sailor',
            armorClass: 13,    
            hitPoints: 30,
            speed: 30,
            passivePerception: 10,
            proficiencyBonus: 2,
            attack: {
                description: 'Sword',
                damage: '1d8 + 2',
                bonus: 4,
                range: 5,
                multi: 1,
            },         
            challengeRating: 3,   
            strength: 16,
            dexterity: 11,
            constitution: 14,
            intelligence: 11,
            wisdom: 11,
            charisma: 15,
            skills: []
        },        
],
},   
{
    code: DC.nature,
    rooms: [
        {
            num: 1,
            title: "Get passed a river",
            desc: `Everyone gets in a fight`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },
        {
            num: 2,
            title: "Get Up a tall mountain",
            desc: `Everyone gets in a fight`,
            events: [`When players push the secret brick, a pedistal comes up with the Kaiju Summoning book.`]
        },                
    ],
    title: 'Nature Path to get to the flower',
    dmNotes: 'Get past these obsticles',
    misc: [],
    monsters: [],
},       
]


// Chracter Code.
export enum CC {
    ann="ann", 
    artok="artok", 
    ban="ban",
    bosph="bosph",
    boz="boz",
    caspian="caspian",
    chit="chit",
    cloaked="cloaked",
    conrad="conrad",
    crap="crap",
    dark="dark",
    dragon="dragon",
    lobi="lobi",
    gods="gods",
    master="master",
    may="may",
    planithr="planithr",
    scholars="scholars",
    torbin="torbin",
    trap="trap",
    queen="queen",
    yondo="yondo",
    wanwan="wanwan",
    zaza="zaza",
}    

// Dialogue Type.
export enum DT {
    introduction='introduction',
    lore="lore",    
    clue="clue",
    quest="quest",    
    loreClue="loreClue", 
    character="character",
    utility="utility" ,
    question="question",
    line="line",
    background="background",
    ideal="ideal",
    bond="bond",
    flaw="flaw",    
    favor="favor",
}

// Location Code.
export enum LC {
    ball="ball",
    bank="bank",
    club="club",
    comune="comune",
    convoy="convoy",
    court="court",
    gallery="gallery",
    gate="gate",
    glad="glad",
    land="land",
    mound="mound",
    library="library",
    merchant="merchant",
    orc="orc",
    opera="opera",
    pcafe="pcafe",
    yards="yards",
    ghost="ghost",
}

export interface RandomNpc {
    name: string;
    race: string;
    job: string;
    description: string;
    dialogue: string;
}

export interface Attack {
    description?: string;
    damage: string;
    bonus: number;
    range: number;
    multi?: number;
}

export interface Skill {
    [key: string]: number
}

export interface CharacterConnection {
    id: number;
    type: string;
    description: string;
}



  export enum Miscs {
    FlowerPlot = "FlowerPlot",    
    Utility = "Utility",
  }  


export type Character =  {    
    code: CC;
    age: number;
    race: string;
    detailOne: string;
    page: number;
    id?: number;
    dialogue: [DT, string][],
    name: string,
    title: string,
    strength: number;
    dexterity: number;
    constitution: number;    
    intelligence: number;    
    wisdom: number;    
    charisma: number;    
    challengeRating: number;
    armorClass: number;
    hitPoints: number;
    speed: number;
    passivePerception: number;
    proficiencyBonus: number;
    attack?: Attack;
    spells: string[];
    alignment: string;
    roleplayInspiration: string;
    motivation: string;
    dmNotes: string;
    visualDescription: string;    
    skills: Skills[]    
    quests: [string, string][];    
    misc: [string, string][]
}

// ===== Characters ======================

// Add a character that is going to get recruited by professor trap to find the book. 
// Isn't very smart and talks about it.
// I'm not sure where they should be.

export const characters: Character[] = [
    {
        code: CC.ann,        
        age: 19,
        misc: [
            ['Party Plot', `Her potion has a fun skin changing affect that could be fun at the party`],
        ],
        quests: [
            ["Her potion will make peoples skin have a swirl of colors for a couple hours and then stop. You can use to plan a party, or just sell it to an interested party.", 
            "A cut of whatever money you're able to ear"]
        ],
        race: "human",
        detailOne: "None, totally new, and a bit too timid to earn attention",    
        page: 1,
        id: 1,
        dialogue: [
            [DT.introduction, "Hello, I'm Ann. I'm looking to sell my cargo of potions"],
            [DT.lore, "It's been hard getting people's attention, I think they only like talking to people with enough jewlery."],
            [DT.background, "I came here to make it as a ship Captain."],
            [DT.quest, "If you think you can help me, I'll show you what my potion does."],
        ],
        name: "Ann",
        title: "Recent Cultist",
        strength: 10,        
        dexterity: 14,
        constitution: 10,                
        intelligence: 12,                
        wisdom: 9,        
        charisma: 9,
        challengeRating: 2,
        armorClass: 14,
        hitPoints: 45,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 2,
            damage: "2d6",                        
        },
        spells: [],
        alignment: "Lawful Good",
        roleplayInspiration: "Newvous Starlet, Princess Leia, Mulan",
        motivation: "Wants to command her own fleet one day",
        dmNotes: "She's looking to sell a ship full of a fun new potion",
        visualDescription: "A plainly dressed young woman, standing on her own and being ignored.",
        skills: [Skills.AnimalHandling, Skills.Athletics, Skills.Nature],    
    },

    // ++++  C1 - Bozfield, Pirate Captain ++++
    {
        code: CC.boz,
        misc: [
            ['Convoy Plot', `He'll be an ally in attacking the convoy.`],
            ['Utility', `He'll mostly do what the players want as long as is anti-Convoy.`],
        ],
        quests: [[`Help attack the Convoy Fleet when it arrives. This isn't very 
        good plan, and he'll fail on his own unless you help him.`, 
        `He'll give you a percentage of the spoiles you get from the Convoy Fleet.`]],
        dialogue: [
            [DT.introduction, "Hello, have you come here to help my destroy the Convoy?"],
            [DT.ideal, "Us pirates hate empires of all forms! By attacking the ships of the powerful, we keep the real criminals in check!"],
            [DT.clue, "We know a Convoy fleet will be arriving in everal days, and we plan to protect Freeside at all costs!"],
            [DT.quest, "Join us! we're concocting a plan right now!"],

        ],
        age: 28,
        race: "human",
        detailOne: "All Freeside",    
        page: 1,
        id: 1,
        name: "Bozfield",
        title: "Beautiful Pirate Captain",
        strength: 13,        
        dexterity: 12,
        constitution: 12,                
        intelligence: 8,                
        wisdom: 8,        
        charisma: 18,
        challengeRating: 2,
        armorClass: 14,
        hitPoints: 45,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 2,
            damage: "2d6",                        
        },
        spells: [],
        alignment: "Chaotic Good",
        roleplayInspiration: "Gaston, Che Guevara, Han Solo.",
        motivation: "Wants to recruit people to fight the Convoy.",
        dmNotes: "This is the most anti-Convoy NPC.",
        visualDescription: "The most attractive person any of the players have ever seen. A group of people swoon around him, doing whatever he wants.",
        skills: [Skills.Performance, Skills.Persuasion, Skills.Athletics],    
    },
    {
        code: CC.conrad,
        misc: [
            ['Convoy Plot', `He despertly wants to get promoted to Chief of a base, and has a chip on his shoulder.`],
            ['NPC', `He Hates Malinal`],
        ],
        quests: [
            [`Make Freeside have a more positive impression of the Convoy. Go to the Fool's court and 
            make people like the convoy.`, `100 Gold.`],
        ],
        age: 45,
        dialogue: [
            [DT.introduction, "Well, aren't you a fins bunch, what would you like to know about the Convy?"],
            [DT.lore, `The Convoy started 100 years ago as an aliance of cities.`],
            [DT.lore, `They ran groups of ships together in order to protext against pirates, but became more organized over time.`],
            [DT.quest, `Freeside needs to understand how beneficial the Convoy will be. 
                Go to the Fool's court and put in a good word for us.`]
        ],
        race: "human",
        detailOne: "No one really knows him, he could be any Convoy official to most people.",    
        page: 2,
        id: 2,
        name: "Conrad",
        title: "Soul Sucked Cultist",
        strength: 11,        
        dexterity: 11,
        constitution: 11,                
        intelligence: 13,                
        wisdom: 14,        
        charisma: 9,
        challengeRating: 2,
        armorClass: 12,
        hitPoints: 20,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Lawful Evil",
        roleplayInspiration: "Used Car Salesman, Convoy Fanboy, Chip on his Shoulder",
        motivation: "Want's to establish a new Convoy Port in Freeside, and be to promoted it's manager.",
        dmNotes: "He's a pro-Convoy mission giver. He's leading the building of the secert wharf.",
        visualDescription: "An aging but healthy sailor. Well kept, but lightly decorated uniform.",
        skills: [Skills.Insight, Skills.Survival, Skills.Stealth],    
    },
    {
        code: CC.crap,
        misc: [
            ['Convoy Plot', `He'll fight to proect the Orc utopia, but he could be swayed to relocate.`],
        ],
        quests: [[`Beat him in hand to hand combat.`, `Become leader of the Orc gang, and have 6-12 orcs available to do your bidding.`]],
        age: 100,
        dialogue: [
            [DT.introduction, "Me Crap Face, the strongest Orc in the world!"],
            [DT.ideal, `We don't fight for kings or for gold, only for strength!`],
            [DT.bond, "We're living a perfect life here, I'll do anything to protect that."],
            [DT.quest, "You think you're tough? Fight me bare handed!"],
        ],
        race: "orc",
        detailOne: "Most people know he's the current orc boss, but they know it changes frequently.",    
        page: 1,
        id: 1,
        name: "Crap Face",
        title: "Orc gang leader",
        strength: 18,        
        dexterity: 13,
        constitution: 15,                
        intelligence: 8,                
        wisdom: 10,        
        charisma: 9,
        challengeRating: 2,
        armorClass: 12,
        hitPoints: 20,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Chaotic Neutral",
        roleplayInspiration: "40k Orks, Cockny gang leader, boxing champ",
        motivation: "Wants to be the strongest, but also preserve the orc lifestyle.",
        dmNotes: "If the players beat him in hand-to-hand combat, they can lead an Orc gang.",
        visualDescription: "A huge orc with only a fewer tatters of clothes and no weapons.",
        skills: [Skills.Intimidation, Skills.Athletics, Skills.Survival],
    },
    {
        code: CC.cloaked,
        misc: [
            ['Flower Plot', `He's the main vilian of the flower plot, however she has little direct political influence`],
            ['Flower Plot', `She's also responsible for the disentigration incidents of the last 100 years.`],
            ['Flower Plot', `If the players kill her, they still may not know where the Flower is.`],
            ['Convoy Plot', `She doesn't like the convoy simply because she wants to maintain the status quo at all costs.`],
        ],
        quests: [
            [`Kill May and the 2-4 other current Flower Eaters`, 
        `She'll let you joing the Flower Eater immortality club.`],
        [`Destroy the Convoy base, or attack the Convoy when they come to the Freeeside, 
        or prevent them from staying on Freeside at all.`, 
        `If you don't, she'll try to kill you.`]
    ],
        age: 0,
        race: "human.",
        detailOne: "Only the other flower eaters know what she's doing. About a dozen people suspect she exists, but don't know her exact nature.",    
        dialogue: [
            [DT.introduction, "Hmmm, I havn't see you around here."],
            [DT.clue, `I've lived in a Freeside for a long time, I hope it never changes.`],
            [DT.question, `What gives you pleasure? What would you do anything for?`],
            [DT.quest, `I've got some people I need dealt with, perhaps you'd like to help me? 
                Your reward will be... imense.`],
        ],
        page: 1,
        id: 1,
        name: "Lapish",
        title: "Immortal Flower Tender",
        strength: 11,        
        dexterity: 11,
        constitution: 11,                
        intelligence: 13,                
        wisdom: 14,        
        charisma: 9,
        challengeRating: 2,
        armorClass: 12,
        hitPoints: 20,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Chaotic Evil",
        roleplayInspiration: "Joker, Serial Killer, Golum",
        motivation: "Wants to protect the flower at all costs, but has gone crazy from living so long and changing identities.",
        dmNotes: "Main Flower villian. They've been manipulating and disintigrating people for 300 years.",
        visualDescription: "Very innocuious in a purple cloak.",
        skills: [Skills.Insight, Skills.Perception, Skills.Persuasion],
    },
    {
        code: CC.artok,
        misc: [
            ['Lore', `He's meant to give a counter perspective on Freeside as being generally 
            dumb and seld aggrendizing`],
        ],
        quests: [[`Bring him a block of marbel from the Yards.`, 
        `Entrance into Club Deluxe`]],
        age: 60,
        race: "human",
        dialogue: [
            [DT.introduction, "Hello travellers, no doubt you're here to hear about my single world theory?"],
            [DT.background, "I was working on a sculpture one day, and I realized something!"],
            [DT.ideal, `All this talk about multiple universes, it's just a fantasy! 
                Everyone wants to believe there's some better world out there, but it's just a trick!
                A trick the powerful use to manipulate us!`],
            [DT.ideal, `Our villiage commune already is the ideal society! 
                It's not perfect but it's as good as it gets. Everyone in the districts thinks
                they're working towards something great, but we've already found it!`],
            [DT.clue, `Marbles been awfully hard to come by recently. 
                Someone's building something big, but I haven't seen any new buildings recently?`],
            [DT.background, "I was working on scultures one day, and I realized something!"],
        ],
        detailOne: "Considered a local eccentric in the comune who talks a little too much.",    
        page: 1,
        id: 1,
        name: "Artok",
        title: "Sculture shop owner.",
        strength: 13,        
        dexterity: 13,
        constitution: 10,                
        intelligence: 13,                
        wisdom: 14,        
        charisma: 9,
        challengeRating: 2,
        armorClass: 12,
        hitPoints: 20,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Chaotic Good",
        roleplayInspiration: "Ranty guy at a cafe.",
        motivation: "",
        dmNotes: "Gives clues about the Secret Wharf, Ghost House, and the politics of Freeside.",        
        visualDescription: "Burly and wearing workshop clothes and covered in dust and dirt.",
        skills: [Skills.Nature, Skills.History, Skills.Survival],
    },
    {
        code: CC.ban,
        misc: [
            ['Utility', `She'll give players the exact accurate aligment of any character they've encountered.`],
            ['Utility', `Depending on how well the players RP with her, she may do several times.`],
        ],
        quests: [['Roleplay and share a truth', 
            `She'll tell the PC's the true alignemnt of an NPC they've met. 
            If there's a monk in the party, she'll tell 2 NPCs.`]],
        age: 45,
        race: "human",
        detailOne: "Has a small group of followers, but she tries to not encourage them.",    
        dialogue: [
            [DT.introduction, "Welcome fellow beings."],
            [DT.lore, `Freeside has been a place of struggle for man generations.`],
            [DT.lore, `We live in an age of strife, there is nothing to do but watch it,
                and not let ourselves be consumed by the storm.`],
            [DT.question, `What truths do you wish to share?`],
            [DT.utility, `Hold my hand and think of someone you've met here. 
                I will tell you their true nature.`],
        ],
        page: 1,
        id: 1,
        name: "Ban",
        title: "Englighted Master",
        strength: 11,        
        dexterity: 11,
        constitution: 11,                
        intelligence: 13,                
        wisdom: 14,        
        charisma: 9,
        challengeRating: 2,
        armorClass: 12,
        hitPoints: 20,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Lawful Good",
        roleplayInspiration: "Aang, Splinter, Gainan",
        motivation: "",
        dmNotes: "She's a tool to reveal NPC alignments, and provide mood.",
        visualDescription: "A plain grey robbed woman mediating on a cushion.",
        skills: [],
    },
    {
        code: CC.bosph,
        misc: [
            ['Areana Plot', `She's the entry point to PC's fighting in the Areana.`],
            ['Areana Plot', `If the players are clever, they may learn information about future fights.`],
            ['Areana Plot', `She might get the fighters involved in gambling, and ask them to throw fights.`],
        ],
        quests: [[`Become fighters in the Areana`, 
        `A cut of the winnings, along with fame an influence.`],
        [`Win 3 or more Fightf`, 
        `Free entrance to Club Deluxe`]
    ],
        age: 25,
        race: "tiefling",
        detailOne: "Everyone who pays attention to the areana knows her as a promoter.",    
        dialogue: [
            [DT.introduction, "Welcome welcome! Come see the greatest warriors battle for fame and glory!"],
            [DT.lore, "Don't worry, we've got got healers all around the areana, no one gets hurt... perminetly."],
            [DT.loreClue, "Winning in the areana will lead to fame and influence throughout Freeside!"],
            [DT.quest, "You seen like a hearty bunch, why not sign up for a fight?"],
        ],
        page: 1,
        id: 1,
        name: "Bospherus",
        title: "Gladiator Promoter",
        strength: 15,        
        dexterity: 10,
        constitution: 12,                
        intelligence: 10,                
        wisdom: 10,        
        charisma: 13,
        challengeRating: 2,
        armorClass: 14,
        hitPoints: 20,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Neutral Neutral",
        roleplayInspiration: "Don King, Circus ring leader, Street magician.",
        motivation: "Wants to find hidden gem fighters and make money off them.",
        dmNotes: "She'll get the players fighting in the Gladiator Areana.",
        visualDescription: "A bousterous tiefling with exotic robes and causally casts cantrips while talking.",
        skills: [],
    },
    {
        code: CC.caspian,
        misc: [
            ['Convoy Plot', `He doesn't want war, and believes the merchants of Freeside can contain the Convoy`],
            ['Flower Plot', `If he finds out about the Flower, he'll try to keep it a secret, and possibly destroy it. 
                He'll see it as a threat to Freeside.`],
        ],
        quests: [[`See which of the PC's can make the monst money in a week.`, 
        `Become his new assistant. This will give alot of money, and a lot of wealthy.`]],
        age: 19,
        race: "Half Elf",
        detailOne: "Know in all as Freeside as a brilliant merchant and business person.",    
        page: 1,
        dialogue: [
            [DT.introduction, "Ah new friends, I am Caspian, a humble merchant."],
            [DT.ideal, "There are only 2 activities being engage in, trade, and war. And only trade brings peace."],
            [DT.lore, "The Convoy has become a powerful force. I doubt we could prevent them having a foothold in Freeside, but if we work with them, we may be able to contain them."],
            [DT.quest, "Come back to me in 5 days, whichever of you has the most money, I'll employ as my new advisor."],
        ],
        id: 1,
        name: "Caspian",
        title: "Brillaint Merchant",
        strength: 8,        
        dexterity: 10,
        constitution: 9,                
        intelligence: 20,                
        wisdom: 20,        
        charisma: 9,
        challengeRating: 2,
        armorClass: 9,
        hitPoints: 20,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Lawful Good",
        roleplayInspiration: "Business Sherlock Holms, Boy Genius, literally smarter than everyone else.",
        motivation: "Maintain trade, peace and the open exchange of ideas.",
        dmNotes: "He represents the moderate/middle ground in dealing with the Convoy.",
        visualDescription: "Short young man, smartly dressed with little adornment.",
        skills: [Skills.Insight, Skills.History, Skills.Investigation],
    },
    {
        code: CC.chit,
        misc: [
            ['Utility', `If the players do well, they can show their token to immeditely impress people.`],
            ['Utility', `If the players try ask it a question, he might give an answer`],
        ],
        quests: [[`Fight in his Pyschic VR encounter.`, 
        `A keychain that shows the strongest monster you fought.`]],
        age: 99999,
        race: "",
        detailOne: "",    
        dialogue: [
            [DT.quest, "Come, battle, struggle, and you shall be rewarded."],
            [DT.lore, "When the Void Heretic returns to consume the stars, the energy of your violent struggle shall sustain me at the infinite-infinitesimal-battle"],
            [DT.lore, "Feel blessed that your minute existence will aid me during the collapse of the helix dimension."],
            [DT.loreClue, "You would be driven mad if you lived for an ioata of my lifespan."],                        
        ],
        page: 1,
        id: 1,
        name: "Chitalogoth",
        title: "Elder Being",
        strength: 20,        
        dexterity: 20,
        constitution: 20,                
        intelligence: 20,                
        wisdom: 20,        
        charisma: 6,
        challengeRating: 2,
        armorClass: 25,
        hitPoints: 1000,
        speed: 30,
        passivePerception: 20,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Neutral Evil",
        roleplayInspiration: "Cthulu, Hellraiser, Dracula",
        motivation: "Gains power through the struggles of people in his VR simulation.",
        dmNotes: "A no stakes combat play area, and gives a token that will earn the PC's rcognition. Also mood.",
        visualDescription: "A blob of shifting colors and dimensions with tenticles that suction onto people's heads.",
        skills: [],
    },
    {
        code: CC.dark,
        misc: [
            ['Utility', `If the players hire him, he will kill his target withing a couple days, guarenteed.`],
            ['Utility', `He'll only kill someone if there's a reason for revenge.`],
        ],
        quests: [],
        age: 0,
        race: "human",
        detailOne: "Only a couple shady people know about him.",   
        dialogue: [
            [DT.introduction, "I'm Darkblade dispencer of holy vengence"],
            [DT.lore, "I'm the Revenger on Freeside. We used to be employed to kill for revenge. But our clients have dried up, and I'm the only one left."],
            [DT.loreClue, "Freeside used to be much more excited. Now there's just a disentigration every couple years."],
            [DT.utility, `Bring me 10,000 gold and someone who needs to be killed, and I'll do it.`],
        ], 
        page: 1,
        id: 1,
        name: "Dark Blade",
        title: "Avenging Assasin",
        strength: 11,        
        dexterity: 18,
        constitution: 12,                
        intelligence: 10,                
        wisdom: 12,        
        charisma: 9,
        challengeRating: 2,
        armorClass: 16,
        hitPoints: 20,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Lawful Neutral",
        roleplayInspiration: "Killer Batman, Faceless man, edgelord.",
        motivation: "Killer for hire, but only for revenge",
        dmNotes: "Players can pay him to kill other NPCs.",
        visualDescription: "A cloacked figure with a black bandana covering their lower face.",
        skills: [],
    },
    {
        code: CC.dragon,
        misc: [
            ['Plot Flower', `He's an entry point to the through May. The picture he shows 
                them will help the players recognize her at the Dead Gate.`],
            ['Plot Kaiju', `He'll help defend Freeside from the Kaiju, but won't risk his life.`],
            ['Plot Convoy', `He could be convinced to fight the Convoy if he things the Fire district is threatened.`],
        ],
        quests: [
            [`Find out what happened to his old Co-star May.`, 
            `1000 Gold.`]],
        age: 200,
        race: "dargon",
        detailOne: "He's a regular at this bar.",    
        dialogue: [
            [DT.introduction, "Ah, are you fellow lovers of the Opera? Tell me, what's you favorite?"],
            [DT.loreClue, `I was once a popular Opera performer, but about 100 years ago my co-star May disapeared. She always played the maiden while I played, well, the dragon!`],
            [DT.loreClue, `I suppose she's passed by now, but I wish I was able to say goodbye. It's weighed heavy on my heart the last 100 years, and I haven't been able to perform.`],
            [DT.quest, `Here's an old painting of her. If you could find out what happened to her, I would reward you greatly.`],
        ],
        page: 1,
        id: 1,
        name: "Dargor",
        title: "Retired Actor",
        strength: 18,        
        dexterity: 15,
        constitution: 16,                
        intelligence: 15,                
        wisdom: 14,        
        charisma: 14,
        challengeRating: 2,
        armorClass: 15,
        hitPoints: 50,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Neutral Good",
        roleplayInspiration: "Retired Actor, Dramitc Performer, Tragic Diva",
        motivation: "Want's to know what happened to his old co-star",
        dmNotes: "Gives clues about the Flower plot.",
        visualDescription: "A medium sized dragon wearing old, but well kept formal wear.",
        skills: [],
    },
    {
        code: CC.lobi,
        misc: [
            ['Utility', `Use her for lore dumps and answer PC's questions about Freeside`],
            ['Utility', `She can give lore related clues if needed.`],
        ],
        quests: [],
        age: 16,
        race: "halfling",
        dialogue: [
            [DT.introduction, "Hi! Did you know Freeside history goes back more thatn 2000 years?"],
            [DT.lore, `Feeside has never had a king, or any ruling body! For the last 
                200 years it's been roughly split into 3 districts, Fire for Entertainment,  Water for Commerce, and Earth for shipbuilding.`],
            [DT.loreClue, `Even though Freeside has never had it's own King or Queen, it's been conqured by 27 empires in 
                over it's history. If you haven't seen the Tomb of Empires at the Dead Gate, it tells you all the empires.
                Although if you want, I can tell you all of them!`],
            [DT.loreClue, `So the founders of Freeside are mostly mythical, there's no real record of who they were. 
                There is a story about a 'Guardian' they had to protect something valuable on the isalnd. 
                I'm sure it's true, but it was a so long ago, it could have been anything.`],
            [DT.loreClue, `Honestly I'm more interested in recording contempry Freeside history, 
            not many people care about preserving history here. I'm really interested in the 
            disentigrations that seem to happen every couple years. They've been going on for about 300
            years, but there haven't been any good clues about what happens. Since the body is destroyed, 
            there's no way to resurect the victim! Some people have confessed to them, but they're always shown to be lying.`],
        ],
        detailOne: "People are used to her talking their ears off at the library.",    
        page: 1,
        id: 1,
        name: "Lobi",
        title: "Lore nerd.",
        strength: 9,        
        dexterity: 8,
        constitution: 12,                
        intelligence: 18,                
        wisdom: 10,        
        charisma: 13,
        challengeRating: 2,
        armorClass: 12,
        hitPoints: 20,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Lawful Good",
        roleplayInspiration: "Sheldon, Fanboy, History Nerd.",
        motivation: "She wants to tell everything about all the amazing history she knows.",
        dmNotes: "Used as a lore mouthpiece, and to answer other questions about Freeside.",
        visualDescription: "You student with a pile of books occasanliy looking up and trying to say hi to people.",
        skills: [],
    },
    {
        code: CC.planithr,
        misc: [
            ['Plot Party', `He'll never commit to working with the players right away. 
                He'll always give them his card and leave at the first meeting, and ask to meet them later.`],
            ['Appeaance', `He can show up anywhere.`],
        ],
        quests: [[`Help throw a party that out does the Eternal Ball for 1 night.`, 
        `A cut of the profits.`]],
        age: 23,
        race: "Half elf",
        detailOne: "One of the most popular and coolest people in freeside.",    
        dialogue: [
            [DT.introduction, "I'm putting together a new party, what brings you to the bank?"],
            [DT.lore, `The Eternal Ball has been going contiuously for 100 years, 
                and it's been the largest party for the last 50. I Just think we could use something new.`],
            [DT.loreClue, `It just feels like things haven't been changing here as much 
            as they used to. Like someones keeping things the same. I almost WANT the convoy 
            to come here just to shake things up a litte`],
            [DT.quest, `Well if you're ever interested in shaking things up, feel free to look me up. 
                I'd love to have some help planning my party.`],
        ],
        page: 1,
        id: 1,
        name: "Planithir",
        title: "Party Promoter",
        strength: 11,        
        dexterity: 11,
        constitution: 11,                
        intelligence: 13,                
        wisdom: 14,        
        charisma: 9,
        challengeRating: 2,
        armorClass: 12,
        hitPoints: 20,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Chaotic Good",
        roleplayInspiration: "",
        motivation: "Want's to throw a party bigger than then Eternal Ball.",
        dmNotes: "Quest giver of the party planning sub-plot.",
        visualDescription: "A thing attrative man in a fashionable white suit.",
        skills: [],
    },
    {
        code: CC.scholars,
        misc: [
            ['Utility', `They're mostly here to give a roleplaying break.`],
        ],
        quests: [[`Just engage with them and answer their questions.`, 
        `A free pass to the library.`]],
        age: 75,
        race: "mixed",
        detailOne: "Known as regulars at the club",    
        page: 1,
        id: 1,
        dialogue: [
            [DT.introduction, "Ah yes, you bunch, come here, we've got a question for you. What is wrong with the world today?"],
            [DT.lore, "(First Scholar) Well see, I think people don't work hard enough, it's just have fun with this and that, but at the end of the day, what have they got!?"],
            [DT.lore, "(Second Scholar) No, no, no! The Problem is people work too hard! They're so focised on their goal, they miss out on life's small joys!"],
            [DT.lore, "(Thrid Scholar) You're both wrong! The problem is people have too many choices! They never feel confident if they're doing the right thing!"],
            [DT.lore, "Well, what do you think?"],
        ],
        name: "Pix, Wix, and Dix",
        title: "Arguing scholars",
        strength: 9,        
        dexterity: 9,
        constitution: 9,                
        intelligence: 18,                
        wisdom: 14,        
        charisma: 12,
        challengeRating: 2,
        armorClass: 12,
        hitPoints: 20,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Chaotic Good",
        roleplayInspiration: "Three old coots at a bar, Quarlsome academics",
        motivation: "They love asking strangers about life's biggest questions.",
        dmNotes: "Roleplaying, mood, and give a free pass to the Dog Library.",
        visualDescription: "The scholars shouting and interupting each other.",
        skills: [Skills.History, Skills.Insight, Skills.Arcana],
    },
 
    {
        code: CC.torbin,
        misc: [
            ['Plot Convoy', `He loves the Convoy and is secretly helping them build their secret base.`],
            ['Plot Convoy', `He's the most influcial person in the Earth district.`],
            ['Plot Convoy', `He wants to be King of Freeside, even though that's against the cities Ethos.`],
            ['Plot Flower', `If he discovers the flower he'll use it to gain power and wealth.`],
        ],
        quests: [[`Try to get the Orcs to move their bar and community.`, `1000 Gold.`]],
        age: 50,
        race: "Dwarf",
        detailOne: "Known as the head of the yards",    
        page: 1,
        dialogue: [
            [DT.introduction, "Get out of my way! Who are you anyways? you look like an enterprising bunch?"],
            [DT.lore, `I'm the head of the Yards, and all the ship building here. 
                They don't like leaders much in Freeside, but we're the ones who get things done!`],
            [DT.loreClue, `Ah, but the Convoy, they know how to get things done! They're organized,
            they promote trade, peace, and they keep those freeloading Pirates in check!`],
            [DT.loreClue, `I think people in Freeside could learn a lot from the Convoy, I hope 
            we get to work with them more and more.`],
            [DT.quest, `In fact, I could use a favor. There's this Orc bar that's right on some 
            prime real estate for where the Convoy might want to build a wharf. How about you
            go there, beat their chief in a fight, and then see if you can get them to move.`],
        ],
        id: 1,
        name: "Torbin",
        title: "Ship Building master",
        strength: 12,        
        dexterity: 10,
        constitution: 15,                
        intelligence: 13,                
        wisdom: 9,        
        charisma: 11,
        challengeRating: 2,
        armorClass: 12,
        hitPoints: 20,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Lawful Neutral",
        roleplayInspiration: "J. Jona Jameson, Thomas Edison, Gimli",
        motivation: "Wants the Yards to run Freeside",
        dmNotes: "He's the most Pro convoy Freesider.",
        visualDescription: "An overly serious dwarf wearing workers clothes but with an extra decorative hat.",
        skills: [],
    },
    {
        code: CC.trap,
        misc: [
            ['Plot Kaiju', `He's the entry point finding the book that summons the Kaiju.`],
            ['Plot Flower', `In going to the square dungeon, the PC's will learn about the Flower and the cult.`],
            ['Plot Flower', `He doesn't know about the Flower itself, he just likes the monster.`],
        ],
        quests: [[`Find the book that controls the guardian.`, `300 Gold.`]],
        age: 45,
        race: "Human",
        detailOne: "Seen as a regular loner eccentric.",    
        page: 1,
        id: 1,
        dialogue: [
            [DT.introduction, "Oh hello, would you be interested in helping a poor old scholar like me out?"],
            [DT.loreClue, "No one believes me, the fools! But I've found evidance, the Guardian of Freeside is real!"],
            [DT.lore, `The original founders of Freeside were an exiled cult from a forgotten empire. 
            They summoned the Guardian to protect them, but something happened to the cult, and the knowledge was forgotten.`],
            [DT.quest, `I've found a clue hard to evidence of the Guardian. There's a secret entrance nearby. 
            I can show you where. I've looked myself, but there were some kinda of creatures down there, and I'm far too frail 
            to go myself. Please, won't you help me?`],
        ],
        name: "Trap",
        title: "Obssesed scholar.",
        strength: 9,        
        dexterity: 10,
        constitution: 9,                
        intelligence: 16,                
        wisdom: 14,        
        charisma: 8,
        challengeRating: 2,
        armorClass: 12,
        hitPoints: 20,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Neutral Evil",
        roleplayInspiration: "Snape, Dr. Frankenstien, Evil genius.",
        motivation: "He want's to open the book Kaiju book and control it.",
        dmNotes: "Main quest giver for getting into the Square Dungeon, and the Kaiju subplot.",
        visualDescription: "A crazy looking scholar with tattered robes, unkept hair and a wild look in his eyes.",
        skills: [],
    },
    {
        code: CC.wanwan,
        misc: [
            ['Utility', `He can give vague clues, especially about the past.`],
            ['Utility', `He can show up anywhere.`],
        ],
        quests: [],
        age: 99999,
        race: "Diety",
        detailOne: "Most people in freeside recognize hime",    
        page: 1,
        id: 1,
        dialogue: [
            [DT.introduction, "Ah friends, so good to see you again, have a drink!"],
            [DT.lore, `Yes well if you didn't know, I'm actually an immortal god, hic. 
            I got kicked out of the heavenly kingdom 10,000 (?) years ago. I just ruined one too mnay baquets in the Heavenly Kingdom, and I was cast out!`],
            [DT.lore, "I've been all over, but I call Freeside home. It really does have the best parties in the world!"],
            [DT.loreClue, `Just watch out for a lady in a purple robe. They've been around a while, and they've never had a drink with me! I don't trust anyone who doesn't drink!`],
            [DT.loreClue, `Ah yes, I actually came here before the whole city was built, 
            there was some kind of flower everyone was so worried about? It wasn't something that interested me though!`],
        ],
        name: "Wanwan",
        title: "Exiled party god.",
        strength: 18,        
        dexterity: 18,
        constitution: 18,                
        intelligence: 18,                
        wisdom: 18,        
        charisma: 18,
        challengeRating: 2,
        armorClass: 20,
        hitPoints: 100,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Chaotic Neutral",
        roleplayInspiration: "Bachus, Mad Hatter, Monkey King",
        motivation: "Is contrantly drunk and just wants to have fun.",
        dmNotes: "A vague clue giver that can show up anywhere, anytime.",
        visualDescription: "A hearty 7 ft tall bearded man laughing with a cup in his hand.",
        skills: [],
    },
    {
        code: CC.zaza,
        misc: [
            ['Plot Flower', `She's an entry point to the disentigrations by way of the disentigrations.`],
            ['Plot Convoy', `She doesn't want the Convoy on Freeside at all, as she believes they'll take over the whole island eventually.`],
            ['Plot Convoy', `She will resist them, but doesn't believe in violence.`],
            ['Utility', `She's the most influencial person in the Fire district.`],
            ['Utility', `She knows almost everyone and everything in Freeside. 
                She can direct the players, or introduce them to other NPCs, and shape public opinion.`],
        ],
        age: 40,
        quests: [
            [`Sneak into the Convoy office.`, `1000 Gold.`]
        ],
        race: "Human",
        detailOne: "She's the most influencial task maker in the Fire district.",    
        page: 1,
        id: 1,
        dialogue: [
            [DT.introduction, "Hm, I haven't seen you before, do you know who I am? I'm one of Freesides biggest entertainment"],
            [DT.lore, `The Convoy claims they're not an empire, but that's what makes them so insidious.`],
            [DT.lore, `I've seen how the Convoy operates. First they set up a small base, then a port, 
            then they slowly expand until they control an entire city.`],
            [DT.ideal, `Freeside is uterly unique in the world, and is a center of art and creativity. I want to preserve that at all costs.`],
            [DT.quest, `I think we can find evidence that the Convoy has deeper plans. I want you to break into their office and see what you can find.`],
        ],
        name: "Zaza",
        title: "Top play priducer.",
        strength: 11,        
        dexterity: 11,
        constitution: 11,                
        intelligence: 13,                
        wisdom: 18,        
        charisma: 16,
        challengeRating: 2,
        armorClass: 12,
        hitPoints: 20,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Lawful Good",
        roleplayInspiration: "Oprah, Jackie O, Film Producer",
        motivation: "Wants to maintain the Fire district as a creative hub.",
        dmNotes: "Quest giver to investigate the disentigrations. She's a non-violent anti-Convoy Freesider.",
        visualDescription: "Smartly dressed business woman, is always drinking potions.",
        skills: [],
    },
    {
        code: CC.yondo,
        misc: [
            ['Utility', `Mostly for fun roleplaying, but has one clue about the Flower.`],
        ],
        quests: [["Bring him a petal from The Flower, although he doesn't really think it exists.", '']],
        age: 120,
        race: "3 headed person",
        detailOne: "One more the most popular food stalls.",    
        page: 1,
        id: 1,
        dialogue: [
            [DT.introduction, "Fried, Grilled, or steamed Berry patties?"],
            [DT.lore, "So, we've been argugin about the best way to prepare our dishes?"],
            [DT.lore, "(First head) I saw you plan everything out from the begining, then don't change anything, and see how it turns out."],
            [DT.lore, "(Second head) Well I say, you don't measure anything at all! Just taste and and adjust until you get it right!"],
            [DT.lore, "(Third head) I don't care either way! What do you all think?"],
        ],
        name: "Yondo",
        title: "3 headed chef.",
        strength: 13,        
        dexterity: 18,
        constitution: 12,                
        intelligence: 13,                
        wisdom: 15,        
        charisma: 12,
        challengeRating: 2,
        armorClass: 12,
        hitPoints: 20,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Neutral Good",
        roleplayInspiration: "TV Chef, but different personality per head.",
        motivation: "Wants to serve as many customers as possible.",
        dmNotes: "Roleplaying, party director, and vague Flower clue.",
        visualDescription: "3 heads and 6 arms, rotating cooking and serving customers.",
        skills: [],
    },
    {
        code: CC.may,
        misc: [
            ['Plot Flower', `If pressed, she'll explain how she's 150 years old, 
                and how Lapish keeps people hostage with the Flower.`],
            ['Plot Flower', `She'll explain how it can only support about 5 people at a time.`],
            ['Plot Flower', `She doesn't know where the flower grows.`],
            ['Plot Flower', `She afraid of innocent people getting hurt if they try to stop Lapish.`],
        ],
        quests: [[`Kill Lapish. If you corner her, she'll still the beans 
        about the Flower, but she warns you how dangerous they are.`, 
        `None.`]],
        age: 150,
        race: "human",
        dialogue: [
            [DT.introduction, "Oh, I'm sorry, I must be going."],
        ],
        detailOne: "Used to be famous, but now no one knows her.",    
        page: 1,
        id: 1,
        name: "May",
        title: "Reluctant flower eater",
        strength: 9,        
        dexterity: 9,
        constitution: 9,                
        intelligence: 12,                
        wisdom: 13,        
        charisma: 15,
        challengeRating: 2,
        armorClass: 12,
        hitPoints: 20,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Lawful Good",
        roleplayInspiration: "Frightened senior, Aunt May, scared victim.",
        motivation: "Wants to stop Lapish, but doesn't know how.",
        dmNotes: "She'll reluctantly reveal the Flower Plot",
        visualDescription: "Unassuming, but attrative 25 year old lady in a purple cloak.",
        skills: [Skills.Performance, Skills.Acrobatics, Skills.Insight],
    },
    {
        code: CC.queen,
        misc: [
            ['Utility', `Convincing here of something will affect the real life public opinion of Freeside.`],
            ['Utility', `She only appears in the Fools Court, and no one knows her true identiy.`],
        ],
        quests: [[`Do a good job roleplaying with her.`,
         `She'll let you speak to the court and support you ideas.`]],
        age: 60,
        race: "human",
        detailOne: "Everyone knows the current queen of the fools court, but they don't last more than a year or two.",    
        page: 1,
        dialogue: [
            [DT.introduction, "I am the Queen of all who enter this court, and just who are you!?"],
            [DT.lore, "I wish to occupy the island of Flib Flab, so that my makeup ships may tranfer supplies. They have no way of resisting my fleets!"],
            [DT.quest, "You seem to be from a small Kingdom too. What would you have me do with makeup factory? Would you deny me BEAUTY!"],
        ],
        id: 1,
        name: "The Queen",
        title: "Fools Court Monarch",
        strength: 10,        
        dexterity: 10,
        constitution: 10,                
        intelligence: 14,                
        wisdom: 8,        
        charisma: 15,
        challengeRating: 2,
        armorClass: 12,
        hitPoints: 20,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Chaotic Nuetral/Evil",
        roleplayInspiration: "The Red Queen, Bloody Mary, Ru Paul",
        motivation: "Wants to rule the court with an iron fist.",
        dmNotes: "Main character of the fools court.",
        visualDescription: "An extremely huge and elaborate dress that's hard for her to mvoe around in.",
        skills: [Skills.Performance, Skills.Intimidation, Skills.Insight],
    },
    {
        code: CC.gods,
        misc: [
            ['Utility', `Mostly fun roleplaying, mood, and giving a wish spell for fun.`],
            ['Utility', `They're meant to appear in a cave by the mound after the Kaiju emerges.`],
            ['Utility', `They can also appear anywhere after the PC's have entered a room and are in private.`],
        ],
        quests: [[`Roleplay and engage with them.`, `A Wish Scroll.`]],
        age: 99999,
        race: "gods",
        detailOne: "Possibly recognizable gods to the PC's",    
        page: 1,
        id: 1,
        dialogue: [
            [DT.introduction, "Welcome mortals, we've had such fun watching you."],
            [DT.quest, "Let me ask you? How do we react to watching you mortals live your lives?"],
            [DT.lore, "(First God) It makes me weep."],
            [DT.lore, "(Second God) It makes me smile."],
            [DT.lore, "(Third God) It makes me laugh."],
            [DT.quest, "Ah, very insightful. Here, take this gift for your troubles."],
        ],
        name: "The 3 Gods",
        title: "Watching Freeside",
        strength: 99,        
        dexterity: 99,
        constitution: 99,                
        intelligence: 99,                
        wisdom: 8,        
        charisma: 99,
        challengeRating: 2,
        armorClass: 12,
        hitPoints: 20,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Neutral Neutral",
        roleplayInspiration: "Greek, Hindu or Norse Gods with different qualities.",
        motivation: "Are gambling on the outcomes of Freeside.",
        dmNotes: "Roleplaying, Mood, and give a Wish scroll.",
        visualDescription: "3 20 ft dieties sitting around a large puddle that they're watching humans through.",
        skills: [Skills.Performance, Skills.Intimidation, Skills.Insight],
    },
    {
        code: CC.master,
        misc: [
            ['Plot Convoy', `He's meant to be the main Convoy Villian. Conrad is a good person on the wrong side, but not this guy.`],
            ['Plot Convoy', `After the larger Fleet has arrived, he'll become acting head of the Convoy on Freeside.`],
            ['Plot Convoy', `Conrad could side with the PC's out of resentment against him.`],
            ['Plot Flower', `If he finds out about the Flower, he'll try to use it to his own advantage, and make it public.`],
        ],
        age: 25,
        quests: [[`Burn down the pirate Base.`, `Conrads position and a cut of the trade.`]],
        race: "human",
        dialogue: [
            [DT.introduction, "What do you want. Do you know how valuable my time is?"],
            [DT.lore, "I'm from the 8 famlies of the foudning captains of the convoy."],
            [DT.lore, "Let's get things straight, when you're at the top like me, there's only one thing that matters, and that's money."],
            [DT.loreClue, "The Convoy has some big plans with Freeside, but that idiot Conrad sure is taking his sweet time."],
            [DT.quest, "You know that toilet all the Pirates get together at, you'd think some kind of accident might cause a fire there sooner or later?"],
        ],
        detailOne: "No one really knows him, he could be any Convoy official to most people.",    
        page: 2,
        id: 2,
        name: "Manlintine",
        title: "Cult leader / Litch",
        strength: 13,        
        dexterity: 12,
        constitution: 12,                
        intelligence: 13,                
        wisdom: 13,        
        charisma: 13,
        challengeRating: 2,
        armorClass: 12,
        hitPoints: 20,
        speed: 30,
        passivePerception: 10,
        proficiencyBonus: 2,        
        attack:{
            bonus: 5,
            range: 5,
            multi: 1,
            damage: "1d8",                        
        },
        spells: [],
        alignment: "Lawful Evil",
        roleplayInspiration: "Tech Bro, Wealthy Snobby Brat, King Joffery",
        motivation: "Wants to be known for great things himself.",
        dmNotes: "The main villain of the Convoy.",
        visualDescription: "An arrogant young man in a convoy uniform lined with gold thread on the seems.",
        skills: [Skills.Intimidation, Skills.Performance, Skills.Persuasion],
    },
]


export interface Location {
    code: LC;
    page?: number;
    id?: number;
    name: string;
    exterior: string;
    interior: string;
    detailOne: string;
    detailTwo: string;
    crowd: string;
    connectedAreas: LC[];
    namedNpcs: [CC, string][];
    dmNotes: string;
    events: string[];
    randomNpcs: RandomNpc[];
    inspiration: string;
}

// ===== Locations ======================
export const locations: Location[] = [
{
    // ++++  L1 - Landing Area ++++
    name: "Theives Port",
    inspiration: 'Disorganized port, busy crowds, carts coliding',
    code: LC.land,
    page: 1,
    id: 1,
    exterior: "A chaotic dock with no order. Boats are bumping and pushing.",
    interior: "People are loading and unloading goads quickly through a disorderly crowd.",
    crowd: "All kinds of people, generally a little shabby. Everyone\"s busy.",
    detailOne: "Across the bay you can see ships being easly guided into an organized port.",
    detailTwo: "There don't seem to be any kind of athorities managing the docks.",
    dmNotes: "Starting area of the adventure. Introduce Convoy tension, and direct the players.",
    connectedAreas: [LC.pcafe, LC.convoy],
    namedNpcs: [],
    events: [
        "When first getting off the boat, the playrs will be handed 3 different flyers. 1. A free entrance to The Eternal Ball. 2. A Free drink coupon to Yondos. 3. A 10% off coupn at the Grand Gallery.",
        "After getting aclimentaed, a fight between 3 Convoy Sailors and 3 Pirates will break out, catching the players in the middle. Both sides will attack the players, thinking they're with the other side.",    
    ],
    randomNpcs: [
        {
            name: "Baggins",
            race: "Gnome",
            job: "Refugee",
            description: "Angry",
            dialogue: "After my country was invaded by Orcs, this was the only place I could go.",
        },
        {
            name: "Toms",
            race: "Giant Bird",
            job: "Merchant",
            description: "Bossy",
            dialogue: "Carful getting those eggs of the boat!",
        },
        {
            name: "Candice",
            race: "Elf",
            job: "Mercenary",
            description: "Intense",
            dialogue: "I'm just here to find work, hopefully I don't have to stay in this pit too long.",
        }
    ]
},
{
    // ++++  L2 - Pirate Cafe ++++
    code: LC.pcafe,
    name: "Pirate Cafe",
    inspiration: 'pirate hideout, raucus tavern, plans laid',
    exterior: "A ramshackle building with an ruckus party going on outside.",
    interior: "A large tavern and meeting hall with hundreds of flags on all the walls.",
    detailOne: "When ever someone passes out, they\"re dragged into a big nap room in the back.",
    detailTwo: "People are betting on 2 crabs fighting with little fencing swords",
    connectedAreas: [LC.land, LC.orc],
    namedNpcs: [[CC.boz, 'An extremely handsome pirate pointing at a map with a group of fawning pirates.']],
    crowd: "2/3 Pirates of all kinds, and 1/3 a big variery of people.",
    dmNotes: "Meet organize anti-Convoy forces.",
    events: ["If the players approach Bozfiled, he\"ll try and recruit them to help fight the Convoy"],
    randomNpcs: [
        {
            name: "Cluster",
            race: "Goblin",
            job: "Pirate Map Maker",
            description: "Agitated",
            dialogue: "I hate the Convoy!",
        },
        {
            name: "Nigal",
            race: "Human",
            job: "Shabby Merchant",
            description: "Excited",
            dialogue: "Maybe when they Convoy comes, they\"ll hire me!?",
        },
        {
            name: "Boomer",
            race: "Dwarf",
            job: "Pirate Craftsman",
            description: "Joyful",
            dialogue: "The more Freeside changes, the more it stays the same!?",
        }
    ]

},
{
    // ++++  L3 - Convoy Building ++++
    name: "Cult Compund",
    code: LC.convoy,    
    inspiration: "Small and boring, too boring..., What's really behind the door?",
    exterior: "A small 1 floor, freshly painted building with a Convoy flag.",
    interior: "A single room with a door to a barracks and a desk with a man sitting at it.",
    crowd: "Only one person politely waiting at the desk.",
    detailOne: "No decorations except a painting of a fleet of Convoy ships.",
    detailTwo: "The door to the barracks is locked",
    dmNotes: "Meet the Convoy, and entrance to the Secret Wharf.",
    connectedAreas: [LC.land],
    namedNpcs: [[CC.conrad, 'A busy middle aged man sorting through papers. He puts on a smile for the PCs']],
    events: [
        "Conrad will try to recuit the Convoy. His first assigment is to do a pro-Convoy story at the Fools Court.",        
        "While talking to Conrad, 6 or Convoy guys come out from behind the door, but it seems like a lot for the size of the building.",        
    ],
    randomNpcs: 
        [
            {
                name: "Travis",
                race: "Human",
                job: "Guard",
                description: "Bored",
                dialogue: "Reporting Sir, no suspecious activity.",
            },
    ]
},
{
    // ++++  L4 - Orc Tavern ++++
    name: "Orc Tavern",
    code: LC.orc,    
    inspiration: "Dothraki camp, 40k orks, This is kinda fun!",
    exterior: " huge yurt with crude paintings on the exterior and orcs mullings around.",
    interior: "Orcs and a couple non orcs mull around. Orcs ocasinially get in fist fights.",
    crowd: "Mostly orcs, but a couple non orcs are socializing. The fighs all end without deaths.",
    detailOne: "The biggest orc sits on a thrown in one end of the yurt.",
    detailTwo: "After fights have stopped, the orcs go back to being friendly.",
    dmNotes: "Meet the Orcs.",
    connectedAreas: [LC.pcafe],
    namedNpcs: [[CC.crap, 'A large Orc sitting on throne.']],
    events: [
        "Crap Face will challenge the players to unarmed combat.",        
    ],
    randomNpcs: [
        {
            name: "Ug Muck",
            race: "Orc",
            job: "Bouncer",
            description: "Joyful",
            dialogue: "We jus' got paid, I just spent my money on the tastiest pus beetles I know!",
        },
        {
            name: "Dumb Butt",
            race: "Orc",
            job: "Docker Worker",
            description: "Harty",
            dialogue: "I don't like those convoy lugs moving in there. Have you seen how big their ships are, where they gonna put 'em!?",
        },
        {
            name: "Blorb Blorb",
            race: "Orc",
            job: "Bank Security Guard",
            description: "Harty",
        dialogue: "I used to fight in armies, but I didn't know true joy until I came here!",
        },
    ]
},
{
    name: "The Eternal Ball",
    code: LC.ball,    
    inspiration: "Fantasy Rave, best party ever, everyone loves it",
    exterior: "A block size orantely decorated warehouse.",
    interior: "A series of large rooms with differnt kinds of party activities going on.",
    crowd: "A huge variety of people, dancing, socializing, eating, listening to performaces.",
    detailOne: "A bar room with wizards float glasses around and making ice cubes with spells.",
    detailTwo: "There's a trio of giants playing huge drums in a big dance hall.",
    dmNotes: "Worldbuilding about how fun Freeside is. Meet Zaza.",
    connectedAreas: [LC.opera, LC.gate],
    namedNpcs: [
        [CC.ban, 'In a small corner, a monk and a half dozen followers sit praying.'], 
        [CC.zaza, 'A sharply dressed woman goes between tables, chatting and introducing people.'], 
        [CC.chit, 'People line of in front of an tenticle monster that connects to their foreheads.']
    ],
    events: [],
    randomNpcs: [
        {
            name: "Lindy",
            race: "Bird Person",
            job: "Mercenary",
            description: "joyful",
            dialogue: "this is my favorite place to come after a bit battle.",
        },        
        {
            name: "Bushi",
            race: "Crab Person",
            job: "Convoy Diver",
            description: "Sullen",
            dialogue: "They ran out of the drink I wanted",
        },        
        {
            name: "Dub Dub",
            race: "Human",
            job: "Wizard",
            description: "Excited",
            dialogue: "My dream is to become a party mage, know anyone I can talk to?",
        },        
    ]
},
{
    name: "The Bank",
    inspiration: "1920's bank, Friendly but firm, Imposing",
    code: LC.bank,    
    exterior: "An almost perfectly square building with a fewer windows and high ceilings, about the size of a city block.",
    interior: "A small seating area with a queue to let people in. Then dozens of desks wil bankers and clients talking.",
    crowd: "Not very packed, banks and merchants sitting at desks, making deals.",
    detailOne: "After shaking, the customers get a ring put on their finger.",
    detailTwo: "The bankers activate a zone of truth when around their desk when they start talking to you.",
    dmNotes: "Get loans for anything.",
    connectedAreas: [LC.merchant, LC.library],
    namedNpcs: [[CC.planithr, 'A slieght well dressed man in line at the bank scribbles in a notebook.']],
    events: [],
    randomNpcs: [
        {
            name: "Kol",
            race: "Halfling",
            job: "Banker",
            description: "A professional halfing in a unifrom.",
            dialogue: "So, what sort of loan are you interested in.",
        },        
    ]
},
{
    name: "Club Deluxe",
    inspiration: "Elite club, great food, Guards are down",
    code: LC.club,    
    exterior: "A3 story building totally covered in gold.",
    interior: "The nicest spa/resort/restuaunt/bar you've ever been in. There's a 1000 gold 1 year membership fee for the party.",
    crowd: "Not too packed, everyone's ",
    detailOne: "If someone is rude to the staff, they're escorted out immediately.",
    detailTwo: "",
    dmNotes: "Meet the most powerful people in Freeside. Discuss poltics with them, and possibly convince them.",
    connectedAreas: [LC.bank],
    namedNpcs: [
        [CC.zaza, 'She argues that the Convoy is so profit driven they\'ll stop supporting the arts.'], 
        [CC.torbin, 'He argues that the yards do all the real work that keep freeside going, and they should heavily involve the Convoy.'], 
        [CC.caspian, 'He argues that the Convoy can\'t be fully stopped, but can be contained in a way to keep them happy.']],
    events: [],
    randomNpcs: [
        {
            name: "Dorolp",
            race: "Dwarf",
            job: "Famous Sculptor",
            description: "Relaxed",
            dialogue: "Sorry, I don't want to talk about business while I'm here.",
        },        
        {
            name: "Charles",
            race: "Human",
            job: "Waiter",
            description: "Engaged",
            dialogue: "Welcome, would you like to be introduced to anyone?",
        },        
        {
            name: "Pippin",
            race: "Fairy",
            job: "Merchant",
            description: "Talkative",
            dialogue: "Wanna hear about the latest best sellers at the market?",
        },        
    ]
},
{
    name: "Hinterland Commune",
    inspiration: "Egalitarian, idylic villiage, slightly uncool",
    code: LC.comune,    
    exterior: "A cozy looking villaige",
    interior: "Not much decoration, but very well laid out villaige",
    crowd: "Everyone seems really happy and friendly, but some involved sounding debates over small stuff",
    detailOne: "A bulletin board with people requesting help with tasks.",
    detailTwo: "Another bulletin board with suggestions for adding or removing rules for the villiage.",
    dmNotes: "Get clues about the Kaiju and Ghost house. Mood.",
    connectedAreas: [LC.gate, LC.ghost],
    namedNpcs: [],
    events: [],
    randomNpcs: [
        {
            name: "Jambo",
            race: "Human",
            job: "Farmer",
            description: "Angry",
            dialogue: "Gabbins farm has been producing more than mine! Is he taking extra fertalizer?",
        },        
        {
            name: "Curtis",
            race: "Centaur",
            job: "Cart puller",
            description: "Helpful",
            dialogue: "I was never appreciated where I grew up, but now everyones always asking for help!",
        },        
        {
            name: "Casilla",
            race: "Tabxi",
            job: "Cart puller",
            description: "Lazy",
            dialogue: "I cook all the meals so I can just lay around in the sun all day.",
        },    
    ]
},
{
    name: "Fools Court",
    code: LC.court,    
    inspiration: "Fair tale LARP, gossip and drama, silly and serious",
    exterior: "A tiny fantasy castle, like disney land.",
    interior: "A huge count with high ceilings looking out over a fantasy landscape.",
    crowd: "Everys dressed crazy and overacting, pretending they're from fantasy kingdoms.",
    detailOne: "There's a semi-choaregraphed dance going on in one area with a band playing.",
    detailTwo: "There's a baquete table laid out in front of a throne.",
    dmNotes: "It's a LARP the players can roleplay through to influence Freeside.",
    connectedAreas: [LC.opera, LC.ball],
    namedNpcs: [[CC.queen, 'An extremely elaboeratly dressed queen sites on an ornate throne.']],
    // dmNotes: "It's a LARP. Players can come here to try and exert political influence over Freeside. Whatever's happening in Freeside, should be mirrored here, but in a silly way. If any fights happen, players must do perforamce and acrobatics checks.",
    events: ["When they arrive they're challenged to a dance fight as a duel."
        , "When the players first arrive, there's a drama being played out of the queen wanting to invade a small, sacred island to set up a new beauty salon.", 
"When the queen arrives, she'll she the players are new. She'll ask them whether or not she should invade the country and set up a new base."],
    randomNpcs: [
        {
            name: "Captain Fumblebum",
            race: "Draconic",
            job: "Royal Food ",
            description: "A vest of peacock feathers",
            dialogue: "Our queen doesn't care about other countries, she only wants power!",
        },        
        {
            name: "BiBum",
            race: "human",
            job: "Ambasador of FlipFlap",
            description: "A ragged peasant.",
            dialogue: "Please, your majesty, your makeup factory is right in a fishing cove we need to feed our families.",
        },        
        {
            name: "Floofy",
            race: "saytr",
            job: "Court Jester",
            description: "A bright red skin tight leather suit.",
            dialogue: "Maybe if the queen was prettier, this poor island could be saved!?",
        }, 
    ]
},
{
    name: "Ghost Caves",
    inspiration: "Spooky entrace, abandoned hideout, cobwebs",
    code: LC.ghost,    
    exterior: "A large decaying mansion blcoking a mountain pass. ",
    interior: "Rotting walls, cobwebs, damaged paintings and artifacts.",
    crowd: "Ghosts of the original Flower cult members.",
    detailOne: "Small flower patterns are drawn into some of the walls.",
    detailTwo: "You can hear voices coming from behind walls, but they seem to move around.",
    dmNotes: "Leads to the Ghost House Dungeon. Blocks the way to the Flower.",
    connectedAreas: [LC.comune],
    namedNpcs: [],
    events: [],
    randomNpcs: [
        {
            name: "",
            race: "",
            job: "",
            description: "",
            dialogue: "",
        },        
    ]
},
{
    name: "The Grand Gallery",
    code: LC.gallery,    
    inspiration: "Fantasy mall, everything's here, Guards are down",
    exterior: "A building built around the street with a glass sealing covering it.",
    interior: "3 stories of shops of all kinds ",
    crowd: "Well to do small groups of shoppers examining goods.",
    detailOne: "A large demon with 3 gremils carrying boxes for him",
    detailTwo: "A couple haggling over a talking sword, and the sword is also haggling over how much it's worth.",
    dmNotes: "THe players can purchase any official magic item here.",
    connectedAreas: [LC.yards, LC.gate, LC.merchant],
    namedNpcs: [],
    events: ['Make sure to call out the entrance to dungeon D2'],
    randomNpcs: [
        {
            name: "Blip",
            race: "Goblin",
            job: "Alchemist",
            description: "Searching",
            dialogue: "I just need to find the whisker shop, I know it's around here.",
        },        
        {
            name: "Thomas",
            race: "Elf",
            job: "Figher",
            description: "Satisfied",
            dialogue: "With this magic sword I can finally take on the ghosts plaguing my people.",
        },        
        {
            name: "Crystal",
            race: "Human",
            job: "Cleric",
            description: "Angry",
            dialogue: "They sold the last icon of my god, and they don't know when the next one is coming in.",
        },        
    ]
},
{
    name: "The Dead Gate",
    inspiration: "Sleepy ruins, sunny cemetary, relection",
    code: LC.gate,    
    exterior: "A crumbling wall and ruins around a crumbling doorless gate on the main road to the hinterlands.",
    interior: "Around the ruins is a huge old cemetary filled with statues and tombs.",
    crowd: "There's light foot traffic of people travelling to the hinter lands, or people visiting graves..",
    detailOne: "The Tomb of Empires is a large tomb that lists out all the empires that have ruled over freeside, includeing another dozen empty spaces.",
    detailTwo: "There seems to be a compettion around what gravesite can be made the most elaborate.",
    dmNotes: "Meet Patricia, and Mood.",
    connectedAreas: [LC.gallery, LC.ball],
    namedNpcs: [[CC.may, 'A shy woman leaves flowers on a grave from 150 years ago.']],
    events: ["The players can go examine the Tomb of empires.", "They players can see someone laying a flower on the grave of someone who's marked as dying 200 years ago."],
    randomNpcs: [
        {
            name: "Poom",
            race: "Human",
            job: "Farmer",
            description: "Satisfied",
            dialogue: "Just sold my entire harvest of green berries, I knew there was a fad!",
        },        
        {
            name: "Frank",
            race: "Turtle Person",
            job: "Fisherman",
            description: "Determinde",
            dialogue: "Not many people venture out to the comunes, it's a bit boring there. But I think that's why they'll pay a premium for these fish!",
        },        
    ]
},
{
    name: "Gladiator Areana",
    inspiration: "Roman Coliseum, WWF show, excitment",
    code: LC.glad,    
    exterior: "A huge areana like the Coliseum. Magic made illusions and fireworks play outside.",
    interior: "A colorful crowd with vendors walking around. It's like one big party.",
    crowd: "Everyone's excited and cheering at the fights.",
    detailOne: "Dancers and music play inbetween fights. Bet takers walking around and everyone's betting with each other.",
    detailTwo: "During fights the audeince will throw potions to the combatants. Healers save people from getting killed.",
    dmNotes: "If thr players joing the fights, they'll gain money and fame.",
    connectedAreas: [LC.pcafe, LC.land, LC.convoy],
    namedNpcs: [[CC.bosph, 'A woman host at the entrance greets and drirects people into the Arena.']],
    events: ["THe first time the players come, they'll try to be recuited as fighters."],
    randomNpcs: [
        {
            name: "Molly",
            race: "Dwarf",
            job: "Food Vendor",
            description: "Chearing",
            dialogue: "I can't wait until the whirling trio are up, I'm gonna bet my weeks wages on them! ",
        },        
        {
            name: "Dizonene",
            race: "Human",
            job: "Singer",
            description: "Sad",
            dialogue: "My brother just lost another fight.",
        },        
        {
            name: "Krandor",
            race: "Minotaur",
            job: "Bookie",
            description: "Friendly",
            dialogue: "Wanna make a bet? Makes watching a lot more fun.",
        },        
    ]
},
{
    name: "Dog Library",
    code: LC.library,    
    inspiration: "Old library, dog librarians, nervous ecitment",
    exterior: "A large library with a statue of a sitting dog with a book in it's mouth.",
    interior: "A reading area with people reading books. Next to it is a roped off area of endless seeming stacks of books. Visitors walk up to the ropes with offerings of food and a dog comes up to take. The dog then runs to fetch the book and bring it back. Books cannot be taken out of the library.",
    crowd: "A mix of scholars and students from all over.",
    detailOne: "Some people give the dogs new books, they'll then return with a small bag of gold.",
    detailTwo: "The dogs will snarl at anyone that gets too close to crossing the rope, but are otherwise very friendly.",
    dmNotes: "Meet Dr. Trap. Mood.",
    // No one knows when the library was built or where the dogs came from. Let players get creative with the books they might ask for.",
    connectedAreas: [LC.bank],
    namedNpcs: [
        [CC.lobi, 'A young student looks up occasioanlly from a pile of books, trying to engage passersby.'], 
        [CC.trap, 'A haggered looking Academic carefully eyes the PCs.']
    ],
    events: ['Trap will approach the players and try to get them to retrieve the lost book.'],
    randomNpcs: [
        {
            name: "Constance",
            race: "Lizard Person",
            job: "History Professor.",
            description: "Melancholy",
            dialogue: "I came here to reasearch the history of my people, but I've found little.",
        },        
    ]
},
{
    name: "Merchant Plaza.",
    code: LC.merchant,    
    inspiration: "Renesance Plaza, Fantasy food court, Deals made",
    exterior: "A large plaza with food stalls all around the edges.",
    interior: "Merchants are walking around making deals and signing contracts. Lots of foot traffic around the food stalls.",
    crowd: "All variety of merchants and sailors making deals. The more jewerlly people wear, the more attention they get.",
    detailOne: "All deals are public and a crowd watches the negotiants. When a deal is completed, a cheer goes up.",
    detailTwo: "There's a giant talking chicken making omletes from her own eggs.",
    dmNotes: "Players meet Ann or Caspian.",
    connectedAreas: [LC.glad, LC.gate, LC.bank],
    namedNpcs: [
        [CC.caspian, 'A young man, covered in jewels, stands at the center of a group of merchants, trying to make deals.'],
        [CC.ann, 'A confident, but unadorned female captain is failing to get anyones attention.'],
        [CC.yondo, 'One of the post popular food stalls being serviced by a 3 headed, 6 armed human.']
    ],
    events: ["Caspian will try to talk to the PC's"],
    randomNpcs: [
        {
            name: "Boris",
            race: "Elf",
            job: "Fruit Merchant",
            description: "Happy",
            dialogue: "Finally I found a good price on green berries.",
        },        
        {
            name: "Catherine",
            race: "Human",
            job: "Chef",
            description: "Inviting",
            dialogue: "Come try my green berry pie!",
        },        
        {
            name: "Burdo",
            race: "Half Orc",
            job: "Foodie",
            description: "Interested",
            dialogue: "I come to Freeside once a year just to see what new stalls have opened up.",
        },        
    ]
},
{
    name: "The Yards",
    inspiration: "Steampunk, Fantasy workshop, Busy workers",
    code: LC.yards,    
    exterior: "A buisey ship building aread full or warehouses and ports.",
    interior: "Hustling and busling, unloading ships, building new ones, and repairing them.",
    crowd: "Workers and sailors moving all over.",
    detailOne: "Giants and magicians are used for all kinds of physical labor.",
    detailTwo: "Workers wear different colors of uniform based on their role.",
    dmNotes: "Players meet Torbin, or Head Convoy guy.",
    connectedAreas: [LC.gate, LC.gallery],
    namedNpcs: [
        [CC.torbin,'A surly dwarf is walking around the yards barking orders at people. They all obey.' ],
        [CC.master, 'A high ranking Convoy officer loojs around, somewhat aloof and snearing.']
    ],
    events: ["When the players first arrive, Torbin can bump into them and he'll ne annoyed ny them."],
    randomNpcs: [
        {
            name: "Kazor",
            race: "Giant",
            job: "Lifter",
            description: "Happy",
            dialogue: "Nothing's as good for you as a hard days work.",
        },        
        {
            name: "Bondu",
            race: "Human",
            job: "Wizard",
            description: "Intense.",
            dialogue: "The price of granit and timber has been up a lot recently, but I havrn'y seen many more ships being nuolt. I wonder there it's all going.",
        },        
        {
            name: "Picky",
            race: "Gnome",
            job: "Accountant",
            description: "Flustered",
            dialogue: "The districts have been keeping things nice and stable for the last 200 years. I can only hope it continues.",
        },        
    ]
},
{
    name: "Casino Caberte",
    inspiration: "Speakeasy, Weimar Cabaret, Smokey lounge.",
    code: LC.opera,    
    exterior: "A bar you have to walk downstairs to.",
    interior: "A smokey lounge a caberete with opera being performed on a small stage.",
    crowd: "Groups of friends sitting at tables getting table service.",
    detailOne: "The host is a fairy, flying around to guests and checking on them, and collecting money for the performer inbetween songs.",
    detailTwo: "A group of bards are compising songs together at a table in the corner.",
    dmNotes: "Meet one of the 3 NPCs. Mood.",
    connectedAreas: [LC.ball, LC.gate],
    namedNpcs: [
        [CC.scholars, '3 academics shout and argue, sometimes polling other patrons in.'], 
        [CC.dragon, 'A dragon sites alone, drinking from a barrel of wine, looking melancholy'], 
        [CC.cloaked, 'A woman in a purple cloak, talking to herself and laughing.']
    ],
    events: [],
    randomNpcs: [
        {
            name: "Chris",
            race: "Dog person",
            job: "Construction wizard",
            description: "Content",
            dialogue: "I just come here to relax after a day of hard work.",
        },        
        {
            name: "Willis",
            race: "Human",
            job: "Actor",
            description: "Chatty",
            dialogue: "I always come here for a drink before going to the Eternal Ball.",
        },   
        {
            name: "Cozy",
            race: "Halfling",
            job: "Bard",
            description: "contemplative",
            dialogue: "There hasn't been a new opera in a while.",
        },             
    ]
},
{
    name: "Mound",
    inspiration: "Empty pasture, small stonhendge, quite",
    code: LC.mound,    
    exterior: "A small hill with a stone piller on it.",
    interior: "There's writting on the stone pillar",
    crowd: "Just some birds, and some kids playing.",
    detailOne: "The stone says 'The great protector'",
    detailTwo: "",
    dmNotes: "Clue about the Kaiju. Mood.",
    connectedAreas: [LC.comune, LC.ghost],
    namedNpcs: [],
    events: [],
    randomNpcs: [
        {
            name: "Julie",
            race: "Halfling",
            job: "child",
            description: "Playing",
            dialogue: "Uhm, the kids come here to play, it's fun to role down the hill.",
        },                      
    ]
},
]    


export const l = (code: LC) => {
    const loc = locations.filter((location) => {
        return location.code === code.toString();
    })[0]
    return  loc as Location    
}

export const c = (code: CC) => {   
    return characters.filter((npc) => {
        return npc.code === code.toString();
    })[0] as Character    
}

export const d = (code: DC) => {   
    const x = dungeons.filter((dungeon) => {
        console.log('========')
        console.log(dungeon.code, dungeon, code)
        return code === dungeon.code.toString();
    })[0] as Dungeon    
    return x;
}


const addId  = (arr: any[]) => {
    let lCount = 1;
    let cCount = 1; 
    let dCount = 1; 
    let newArr = [...arr];
    newArr.forEach((item, pageNumber) => {
        let page_step = 1;
        if(item.exterior || item.exterior === '') {
            item.id = lCount;
            lCount += 1;
        } else if(item.dialogue) {
            item.id = cCount;
            cCount += 1;
        } else if(item.rooms) {
            item.id = dCount;
            dCount += 2;
            page_step = 2;
        }
        item.page = pageNumber + page_step;
    });
    return newArr;
};


export const pages: any[] = addId([    


    l(LC.land),
    c(CC.wanwan),
    d(DC.fight),

    l(LC.pcafe),
    c(CC.boz),
    c(CC.crap),    
    c(CC.dark),

    l(LC.convoy),          
    c(CC.conrad),
    c(CC.master),
    d(DC.base), 
    
    l(LC.glad),
    c(CC.bosph),
    d(DC.area),

    l(LC.merchant),
    c(CC.caspian),
    c(CC.planithr),    
    c(CC.yondo),             

    l(LC.library),        
    c(CC.lobi),   
    c(CC.trap),
    d(DC.square), 
    
    l(LC.yards),    
    c(CC.torbin),        
    c(CC.ann),
    
    l(LC.gate),  
    // Will of the people. 
    // Sewer Workers.     
    d(DC.sewer), 
    
    l(LC.ball),      
    c(CC.ban),
    c(CC.zaza),    
    c(CC.chit),
    d(DC.vr),  

    l(LC.opera),
    c(CC.scholars),    // give you a wish spell for interacting with them.
    c(CC.dragon),
    // trap too

    l(LC.court),
    c(CC.queen),

    l(LC.comune),
    c(CC.artok),
    // commune leader too.
    l(LC.mound),

    l(LC.ghost),
    d(DC.caves),
    d(DC.nature),
])





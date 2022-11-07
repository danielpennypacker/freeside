import { CLIENT_RENEG_LIMIT } from "tls";

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


export const toTitle = (val: string) => {
    return val.replace(/([a-z])([A-Z])/g, "$1 $2");
  };


export enum CC {
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
    planithr="planithr",
    scholars="scholars",
    torbin="torbin",
    trap="trap",
    wanwan="wanwan",
    zaza="zaza",
}    

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
    library="library",
    merchant="merchant",
    orc="orc",
    opera="opera",
    pcafe="pcafe",
    yards="yards",
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

// const sizes = ["xs", "sm", "md", "lg", "xl"] as const

export type Attributes = "constitution" | "strength"


enum Skills {
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


export type Character =  {    
    code: CC;
    age: number;
    race: string;
    notoriety: string;
    page: number;
    id?: number;
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
    background: string;
    passivePerception: number;
    proficiencyBonus: number;
    attack?: Attack;
    spells: string[];
    alignment: string;
    roleplayInspiration: string;
    motivation: string;
    dmNotes: string;
    characterConnections: CharacterConnection[];
    visualDescription: string;
    introduction: string;
    question: string;
    ideal: string;
    bond: string;
    flaw: string;
    skills: Skills[]
    rewards: string;
    plotFlower: string;
    plotConvoy: string;
    plotParty: string;
    plotArena: string;
    plotKaiju: string;
}

// ===== Characters ======================


export const characters: Character[] = [
    // ++++  C1 - Bozfield, Pirate Captain ++++
    {
        code: CC.boz,
        age: 28,
        race: "human",
        notoriety: "All Freeside",    
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
        roleplayInspiration: "Gaston, Che Guevara, Han Solo. He’s so attractive no one ever says no to him.",
        motivation: "Wants to recruit people to fight the Convoy.",
        dmNotes: "This is the most anti-Convoy NPC.",
        characterConnections: [],
        visualDescription: "The most attractive person any of the players have ever seen. A group of people swoon around him, doing whatever he wants.",
        introduction: "I am Bozfield, the most famous pirate of the seas!",
        question: "What do you think of the Convoy",
        background: "I lived my whole life with the pirates",
        ideal: "My people fight all empires, shinning a beacon of freedom to the world.",
        bond: "I will gladly give my life for my people",
        flaw: "Im not used to people saying no to me.",
        skills: [Skills.Performance, Skills.Persuasion, Skills.Athletics],
        rewards: "We think there\"s a fleet of Convoy ships arriving soon.",
        plotFlower: "None. He would destory the flower if he found out about it.",
        plotConvoy: "He's the main anti-Convoy NPC/Leader.",
        plotParty: "will attend and try to be a big deal",
        plotArena: "Will meet the players after they get into club delux",
        plotKaiju: "hell try and fight"
    
    },
    {
        code: CC.conrad,
        age: 45,
        race: "human",
        notoriety: "No one really knows him, he could be any Convoy official to most people.",    
        page: 2,
        id: 2,
        name: "Conrad",
        title: "Local Convoy Chief",
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
        roleplayInspiration: "Used Car Salesman, Convoy Fanboy, Chip on his Shoulder",
        motivation: "Want's to establish a new Convoy Port in Freeside, and be to promoted it's manager.",
        dmNotes: "He's resentful about being passed up for promotion, but will act in a way that maintains the moral high ground as much as possible.",
        characterConnections: [],
        visualDescription: "An aging but healthy sailor. Well kept, but lightly decorated uniform.",
        introduction: "Hello, I'm Conrad, Chief of this outpost. How can the Convoy help you?",
        question: "How much do you know about the Convoy?",
        background: "I've been sailing merchant ships since I was a boy, and with the Convoy for the last 20 years.",
        ideal: "Adventure and Trade are the meaning of life.",
        bond: "The Convoy helps those who believe in peace and freedom.",
        flaw: "There have been certain cities where the Convoy became a dominant force, but you can't blame us for having the best system.",
        skills: [Skills.Insight, Skills.Survival, Skills.Stealth],
        rewards: "We think there\"s a fleet of Convoy ships arriving soon.",
        plotFlower: "If he finds out about it, he'll use it to get promoted.",
        plotConvoy: "He wants the secret port to sucede and becomes it's new chief.",
        plotParty: "Won't go, he works at night.",
        plotArena: "Thinks it's a waste of time.",
        plotKaiju: "He'll help organize to fight it. Even teaming up with enemies."
    
    },
    {
        code: CC.crap,
        age: 0,
        race: "",
        notoriety: "",    
        page: 1,
        id: 1,
        name: "",
        title: "",
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
        roleplayInspiration: "",
        motivation: "",
        dmNotes: "",
        characterConnections: [],
        visualDescription: "",
        introduction: "",
        question: "",
        background: "",
        ideal: "",
        bond: "",
        flaw: "",
        skills: [],
        rewards: "",
        plotFlower: "",
        plotConvoy: "",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },
    {
        code: CC.cloaked,
        age: 0,
        race: "",
        notoriety: "",    
        page: 1,
        id: 1,
        name: "",
        title: "",
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
        roleplayInspiration: "",
        motivation: "",
        dmNotes: "",
        characterConnections: [],
        visualDescription: "",
        introduction: "",
        question: "",
        background: "",
        ideal: "",
        bond: "",
        flaw: "",
        skills: [],
        rewards: "",
        plotFlower: "",
        plotConvoy: "",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },
    {
        code: CC.artok,
        age: 0,
        race: "",
        notoriety: "",    
        page: 1,
        id: 1,
        name: "",
        title: "",
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
        roleplayInspiration: "",
        motivation: "",
        dmNotes: "",
        characterConnections: [],
        visualDescription: "",
        introduction: "",
        question: "",
        background: "",
        ideal: "",
        bond: "",
        flaw: "",
        skills: [],
        rewards: "",
        plotFlower: "",
        plotConvoy: "",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },
    {
        code: CC.ban,
        age: 0,
        race: "",
        notoriety: "",    
        page: 1,
        id: 1,
        name: "",
        title: "",
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
        roleplayInspiration: "",
        motivation: "",
        dmNotes: "",
        characterConnections: [],
        visualDescription: "",
        introduction: "",
        question: "",
        background: "",
        ideal: "",
        bond: "",
        flaw: "",
        skills: [],
        rewards: "",
        plotFlower: "",
        plotConvoy: "",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },

    {
        code: CC.bosph,
        age: 0,
        race: "",
        notoriety: "",    
        page: 1,
        id: 1,
        name: "",
        title: "",
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
        roleplayInspiration: "",
        motivation: "",
        dmNotes: "",
        characterConnections: [],
        visualDescription: "",
        introduction: "",
        question: "",
        background: "",
        ideal: "",
        bond: "",
        flaw: "",
        skills: [],
        rewards: "",
        plotFlower: "",
        plotConvoy: "",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },
    {
        code: CC.caspian,
        age: 0,
        race: "",
        notoriety: "",    
        page: 1,
        id: 1,
        name: "",
        title: "",
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
        roleplayInspiration: "",
        motivation: "",
        dmNotes: "",
        characterConnections: [],
        visualDescription: "",
        introduction: "",
        question: "",
        background: "",
        ideal: "",
        bond: "",
        flaw: "",
        skills: [],
        rewards: "",
        plotFlower: "",
        plotConvoy: "",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },
    {
        code: CC.chit,
        age: 0,
        race: "",
        notoriety: "",    
        page: 1,
        id: 1,
        name: "",
        title: "",
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
        roleplayInspiration: "",
        motivation: "",
        dmNotes: "",
        characterConnections: [],
        visualDescription: "",
        introduction: "",
        question: "",
        background: "",
        ideal: "",
        bond: "",
        flaw: "",
        skills: [],
        rewards: "",
        plotFlower: "",
        plotConvoy: "",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },
    {
        code: CC.dark,
        age: 0,
        race: "",
        notoriety: "",    
        page: 1,
        id: 1,
        name: "",
        title: "",
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
        roleplayInspiration: "",
        motivation: "",
        dmNotes: "",
        characterConnections: [],
        visualDescription: "",
        introduction: "",
        question: "",
        background: "",
        ideal: "",
        bond: "",
        flaw: "",
        skills: [],
        rewards: "",
        plotFlower: "",
        plotConvoy: "",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },
    {
        code: CC.dragon,
        age: 0,
        race: "",
        notoriety: "",    
        page: 1,
        id: 1,
        name: "",
        title: "",
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
        roleplayInspiration: "",
        motivation: "",
        dmNotes: "",
        characterConnections: [],
        visualDescription: "",
        introduction: "",
        question: "",
        background: "",
        ideal: "",
        bond: "",
        flaw: "",
        skills: [],
        rewards: "",
        plotFlower: "",
        plotConvoy: "",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },
    {
        code: CC.lobi,
        age: 0,
        race: "",
        notoriety: "",    
        page: 1,
        id: 1,
        name: "",
        title: "",
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
        roleplayInspiration: "",
        motivation: "",
        dmNotes: "",
        characterConnections: [],
        visualDescription: "",
        introduction: "",
        question: "",
        background: "",
        ideal: "",
        bond: "",
        flaw: "",
        skills: [],
        rewards: "",
        plotFlower: "",
        plotConvoy: "",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },
    {
        code: CC.planithr,
        age: 0,
        race: "",
        notoriety: "",    
        page: 1,
        id: 1,
        name: "",
        title: "",
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
        roleplayInspiration: "",
        motivation: "",
        dmNotes: "",
        characterConnections: [],
        visualDescription: "",
        introduction: "",
        question: "",
        background: "",
        ideal: "",
        bond: "",
        flaw: "",
        skills: [],
        rewards: "",
        plotFlower: "",
        plotConvoy: "",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },
    {
        code: CC.scholars,
        age: 0,
        race: "",
        notoriety: "",    
        page: 1,
        id: 1,
        name: "",
        title: "",
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
        roleplayInspiration: "",
        motivation: "",
        dmNotes: "",
        characterConnections: [],
        visualDescription: "",
        introduction: "",
        question: "",
        background: "",
        ideal: "",
        bond: "",
        flaw: "",
        skills: [],
        rewards: "",
        plotFlower: "",
        plotConvoy: "",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },
 
    {
        code: CC.torbin,
        age: 0,
        race: "",
        notoriety: "",    
        page: 1,
        id: 1,
        name: "",
        title: "",
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
        roleplayInspiration: "",
        motivation: "",
        dmNotes: "",
        characterConnections: [],
        visualDescription: "",
        introduction: "",
        question: "",
        background: "",
        ideal: "",
        bond: "",
        flaw: "",
        skills: [],
        rewards: "",
        plotFlower: "",
        plotConvoy: "",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },
    {
        code: CC.trap,
        age: 0,
        race: "",
        notoriety: "",    
        page: 1,
        id: 1,
        name: "",
        title: "",
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
        roleplayInspiration: "",
        motivation: "",
        dmNotes: "",
        characterConnections: [],
        visualDescription: "",
        introduction: "",
        question: "",
        background: "",
        ideal: "",
        bond: "",
        flaw: "",
        skills: [],
        rewards: "",
        plotFlower: "",
        plotConvoy: "",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },
    {
        code: CC.wanwan,
        age: 0,
        race: "",
        notoriety: "",    
        page: 1,
        id: 1,
        name: "",
        title: "",
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
        roleplayInspiration: "",
        motivation: "",
        dmNotes: "",
        characterConnections: [],
        visualDescription: "",
        introduction: "",
        question: "",
        background: "",
        ideal: "",
        bond: "",
        flaw: "",
        skills: [],
        rewards: "",
        plotFlower: "",
        plotConvoy: "",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },
    {
        code: CC.zaza,
        age: 0,
        race: "",
        notoriety: "",    
        page: 1,
        id: 1,
        name: "",
        title: "",
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
        roleplayInspiration: "",
        motivation: "",
        dmNotes: "",
        characterConnections: [],
        visualDescription: "",
        introduction: "",
        question: "",
        background: "",
        ideal: "",
        bond: "",
        flaw: "",
        skills: [],
        rewards: "",
        plotFlower: "",
        plotConvoy: "",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },
 
 
 
 
]


export interface Location {
    code: LC;
    page: number;
    id: number;
    name: string;
    exterior: string;
    interior: string;
    detailOne: string;
    detailTwo: string;
    crowd: string;
    connectedAreas: LC[];
    namedNpcs: CC[];
    dmNotes: string;
    events: string[];
    randomNpcs: RandomNpc[];
}

// ===== Locations ======================
export const locations: Location[] = [
{
    // ++++  L1 - Landing Area ++++
    name: "Freeside Landing Area",
    code: LC.land,
    page: 1,
    id: 1,
    exterior: "A chaotic dock with no order. Boats are bumping and pushing.",
    interior: "People are loading and unloading goads quickly through a disorderly crowd.",
    crowd: "All kinds of people, generally a little shabby. Everyone\"s busy.",
    detailOne: "Across the bay you can see ships being easly guided into an organized port.",
    detailTwo: "There don't seem to be any kind of athorities managing the docks.",
    dmNotes: "This is just a starting area, there\"s no reason to come back here.",
    connectedAreas: [LC.pcafe, LC.convoy],
    namedNpcs: [],
    events: [
        "Palyers will get handed a discount to the Grand Galleria, and a free drink coupon to the Merchants plaza",
        "The players will get caught in the middle of a fight between Convoy sailors and a group od pirates.",    
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
    page: 1,
    id: 2,
    name: "Pirate Cafe",
    exterior: "A ramshackle building with an ruckus party going on outside.",
    interior: "A large tavern and meeting hall with hundreds of flags on all the walls.",
    detailOne: "When ever someone passes out, they\"re dragged into a big nap room in the back.",
    detailTwo: "People are betting on 2 crabs fighting with little fencing swords",
    connectedAreas: [LC.land, LC.orc],
    namedNpcs: [CC.boz],
    crowd: "2/3 Pirates of all kinds, and 1/3 a big variery of people.",
    dmNotes: "This cafe is known for unregulated deals. This can act as a base of anti-Convoy activities.",
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
    name: "Convoy Office",
    code: LC.convoy,
    page: 4,
    id: 3,
    exterior: "A small 1 floor, freshly painted building with a Convoy flag.",
    interior: "A single room with a door to a barracks and a desk with a man sitting at it.",
    crowd: "Only one person politely waiting at the desk.",
    detailOne: "No decorations except a painting of a fleet of Convoy ships.",
    detailTwo: "The door to the barracks is locked",
    dmNotes: "The locked door is an entrance to the secret Convoy base.",
    connectedAreas: [LC.land],
    namedNpcs: [CC.conrad],
    events: [
        "Conrad will try to recuit the Convoy. His first assigment is to do a pro-Convoy story at the Fools Court.",        
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
    page: 4,
    id: 4,
    exterior: " huge yurt with crude paintings on the exterior and orcs mullings around.",
    interior: "Orcs and a couple non orcs mull around. Orcs ocasinially get in fist fights.",
    crowd: "Mostly orcs, but a couple non orcs are socializing. The fighs all end without deaths.",
    detailOne: "The biggest orc sits on a thrown in one end of the yurt.",
    detailTwo: "After fights have stopped, the orcs go back to being friendly.",
    dmNotes: "THe orcs are a recrutible gang for the players. They won't kill ir die for them, but they'll beat people up and intimidate them.",
    connectedAreas: [LC.pcafe],
    namedNpcs: [],
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
    name: "",
    code: LC.ball,
    page: 4,
    id: 4,
    exterior: "",
    interior: "",
    crowd: "",
    detailOne: "",
    detailTwo: "",
    dmNotes: "",
    connectedAreas: [LC.pcafe],
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
    name: "",
    code: LC.bank,
    page: 4,
    id: 4,
    exterior: "",
    interior: "",
    crowd: "",
    detailOne: "",
    detailTwo: "",
    dmNotes: "",
    connectedAreas: [LC.pcafe],
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
    name: "",
    code: LC.club,
    page: 4,
    id: 4,
    exterior: "",
    interior: "",
    crowd: "",
    detailOne: "",
    detailTwo: "",
    dmNotes: "",
    connectedAreas: [LC.pcafe],
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
    name: "",
    code: LC.comune,
    page: 4,
    id: 4,
    exterior: "",
    interior: "",
    crowd: "",
    detailOne: "",
    detailTwo: "",
    dmNotes: "",
    connectedAreas: [LC.pcafe],
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
    name: "",
    code: LC.convoy,
    page: 4,
    id: 4,
    exterior: "",
    interior: "",
    crowd: "",
    detailOne: "",
    detailTwo: "",
    dmNotes: "",
    connectedAreas: [LC.pcafe],
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
    name: "",
    code: LC.court,
    page: 4,
    id: 4,
    exterior: "",
    interior: "",
    crowd: "",
    detailOne: "",
    detailTwo: "",
    dmNotes: "",
    connectedAreas: [LC.pcafe],
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
    name: "",
    code: LC.gallery,
    page: 4,
    id: 4,
    exterior: "",
    interior: "",
    crowd: "",
    detailOne: "",
    detailTwo: "",
    dmNotes: "",
    connectedAreas: [LC.pcafe],
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
    name: "",
    code: LC.gate,
    page: 4,
    id: 4,
    exterior: "",
    interior: "",
    crowd: "",
    detailOne: "",
    detailTwo: "",
    dmNotes: "",
    connectedAreas: [LC.pcafe],
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
    name: "",
    code: LC.glad,
    page: 4,
    id: 4,
    exterior: "",
    interior: "",
    crowd: "",
    detailOne: "",
    detailTwo: "",
    dmNotes: "",
    connectedAreas: [LC.pcafe],
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
    name: "",
    code: LC.library,
    page: 4,
    id: 4,
    exterior: "",
    interior: "",
    crowd: "",
    detailOne: "",
    detailTwo: "",
    dmNotes: "",
    connectedAreas: [LC.pcafe],
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
    name: "",
    code: LC.merchant,
    page: 4,
    id: 4,
    exterior: "",
    interior: "",
    crowd: "",
    detailOne: "",
    detailTwo: "",
    dmNotes: "",
    connectedAreas: [LC.pcafe],
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
    name: "",
    code: LC.yards,
    page: 4,
    id: 4,
    exterior: "",
    interior: "",
    crowd: "",
    detailOne: "",
    detailTwo: "",
    dmNotes: "",
    connectedAreas: [LC.pcafe],
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
    name: "",
    code: LC.opera,
    page: 4,
    id: 4,
    exterior: "",
    interior: "",
    crowd: "",
    detailOne: "",
    detailTwo: "",
    dmNotes: "",
    connectedAreas: [LC.pcafe],
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


const addId  = (arr: any[]) => {
    let lCount = 1;
    let cCount = 1; 
    let newArr = [...arr];
    newArr.forEach((item) => {
        // it's a location.
        if(item.exterior || item.exterior === '') {
            item.id = lCount;
            lCount += 1;
        } else if(item.ideal || item.ideal === '') {
            item.id = cCount;
            cCount += 1;
        }
    });
    return newArr;
};

export const pages: any[] = addId([
    l(LC.land),
    l(LC.pcafe),
    c(CC.boz),
    l(LC.convoy),
    c(CC.conrad),
    l(LC.orc),
    c(CC.crap),
    c(CC.dark),
    l(LC.glad),
    c(CC.bosph),
    l(LC.merchant),
    c(CC.caspian),
    // 3 headed, 6 armed chef. 
    l(LC.library),
    c(CC.trap),
    c(CC.lobi),
    l(LC.bank),
    c(CC.zaza),
    l(LC.yards),
    c(CC.torbin),
    l(LC.gallery),
    c(CC.wanwan),
    l(LC.gate),
    // Lady putting rose on a grave
    l(LC.comune),
    l(LC.opera),
    c(CC.artok),
    c(CC.dragon),
    c(CC.scholars),
    c(CC.cloaked),
    l(LC.ball),
    c(CC.ban),
    c(CC.planithr),
    l(LC.court),
])





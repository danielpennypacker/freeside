
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
    code: string;
    age: number;
    race: string;
    notoriety: string;
    page: number;
    id?: number;
    name: string,
    title: string,
    strength: number;
    dexterity: number;
    background: string;
    constitution: number;    
    intelligence: number;    
    wisdom: number;    
    charisma: number;    
    challengeRating: number;
    combatRoll: string;
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
    eventTriggers: string;
    characterConnections: CharacterConnection[];
    visualDescription: string;
    introduction: string;
    question: string;
    ideal: string;
    bond: string;
    flaw: string;
    information: string;
    skills: Skills[]
    rewards: string;
    plotFlower: string;
    plotConvoy: string;
    plotParty: string;
    plotGladiator: string;
    plotKaiju: string;
}

// ===== Characters ======================


export const characters: Character[] = [
    // ++++  C1 - Bozfield, Pirate Captain ++++
    {
        code: "boz",
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
        combatRoll: "melee",
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
        eventTriggers: "When the Convoy fleet arrives, we’ll sail out and attack them. He’ll fail unless the players help, as it’s one ship against 20.",
        characterConnections: [],
        visualDescription: "The most attractive person any of the players have ever seen. A group of people swoon around him, doing whatever he wants.",
        introduction: "I am Bozfield, the most famous pirate of the seas!",
        question: "What do you think of the Convoy",
        background: "I lived my whole life with the pirates",
        ideal: "My people fight all empires, shinning a beacon of freedom to the world.",
        bond: "I will gladly give my life for my people",
        flaw: "Im not used to people saying no to me.",
        information: "A fleet of a dozen Convoy ships are headed here in a couple of days. We’ll be attacking them. Will you help us",
        skills: [Skills.Performance, Skills.Persuasion, Skills.Athletics],
        rewards: "We think there\"s a fleet of Convoy ships arriving soon.",
        plotFlower: "None. He would destory the flower if he found out about it.",
        plotConvoy: "He's the main anti-Convoy NPC/Leader.",
        plotParty: "will attend and try to be a big deal",
        plotGladiator: "Will meet the players after they get into club delux",
        plotKaiju: "hell try and fight"
    
    },
    {
        code: "conrad",
        age: 45,
        race: "human",
        notoriety: "No one really knows him, he could be any Convoy official to most people.",    
        page: 1,
        id: 1,
        name: "Conrad",
        title: "Local Convoy Chief",
        strength: 11,        
        dexterity: 11,
        constitution: 11,                
        intelligence: 13,                
        wisdom: 14,        
        charisma: 9,
        challengeRating: 2,
        combatRoll: "melee",
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
        motivation: "Wants to recruit people to fight the Convoy.",
        dmNotes: "This is the most anti-Convoy NPC.",
        eventTriggers: "When the Convoy fleet arrives, we’ll sail out and attack them. He’ll fail unless the players help, as it’s one ship against 20.",
        characterConnections: [],
        visualDescription: "The most attractive person any of the players have ever seen. A group of people swoon around him, doing whatever he wants.",
        introduction: "I am Bozfield, the most famous pirate of the seas!",
        question: "What do you think of the Convoy",
        background: "I lived my whole life with the pirates",
        ideal: "My people fight all empires, shinning a beacon of freedom to the world.",
        bond: "I will gladly give my life for my people",
        flaw: "Im not used to people saying no to me.",
        information: "A fleet of a dozen Convoy ships are headed here in a couple of days. We’ll be attacking them. Will you help us",
        skills: [Skills.Performance, Skills.Persuasion, Skills.Athletics],
        rewards: "We think there\"s a fleet of Convoy ships arriving soon.",
        plotFlower: "None. He would destory the flower if he found out about it.",
        plotConvoy: "He's the main anti-Convoy NPC/Leader.",
        plotParty: "will attend and try to be a big deal",
        plotGladiator: "Will meet the players after they get into club delux",
        plotKaiju: "hell try and fight"
    
    },

 
]


export interface Location {
    code: string;
    page: number;
    id: number;
    name: string;
    exterior: string;
    interior: string;
    detailOne: string;
    detailTwo: string;
    detailThree: string;
    crowd: string;
    connectedAreas: number[];
    namedNpcs: number[];
    possibleNamedNpcs: number[];
    dmNotes: string;
    events: string[];
    randomNpcs: RandomNpc[];
}

// ===== Locations ======================
export const locations: Location[] = [
{
    // ++++  L1 - Landing Area ++++
    name: "Freeside Landing Area",
    code: "land",
    page: 1,
    id: 1,
    exterior: "A chaotic dock with no order. Boats are bumping and pushing.",
    interior: "People are loading and unloading goads quickly through a disorderly crowd.",
    crowd: "All kinds of people, generally a little shabby. Everyone\"s busy.",
    detailOne: "Across the bay you can see ships being easly guided into an organized port.",
    detailTwo: "There don't seem to be any kind of athorities managing the docks.",
    detailThree: "",
    dmNotes: "This is just a starting area, there\"s no reason to come back here.",
    connectedAreas: [],
    namedNpcs: [],
    possibleNamedNpcs: [],        
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
    code: "pcafe",
    page: 1,
    id: 2,
    name: "Pirate Cafe",
    exterior: "A ramshackle building with an ruckus party going on outside.",
    interior: "A large tavern and meeting hall with hundreds of flags on all the walls.",
    detailOne: "When ever someone passes out, they\"re dragged into a big nap room in the back.",
    detailTwo: "People are betting on 2 crabs fighting with little fencing swords",
    detailThree: "There are a couple booths were merchants are doing deals.",
    connectedAreas: [1],
    namedNpcs: [1],
    possibleNamedNpcs: [],
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
    code: "convoy",
    page: 4,
    id: 3,
    exterior: "A small 1 floor, freshly painted building with a Convoy flag.",
    interior: "A single room with a door to a barracks and a desk with a man sitting at it.",
    crowd: "Only one person politely waiting at the desk.",
    detailOne: "No decorations except a painting of a fleet of Convoy ships.",
    detailTwo: "The door to the barracks is locked",
    detailThree: "",
    dmNotes: "The locked door is an entrance to the secret Convoy base.",
    connectedAreas: [],
    namedNpcs: [],
    possibleNamedNpcs: [],        
    events: [
        "Conrad will try to recuit the Convoy. His first assigment is to do a pro-Convoy story at the Fools Court.",        
    ],
    randomNpcs: [
    ]
},
{
    // ++++  L4 - Orc Tavern ++++
    name: "Orc Tavern",
    code: "orc",
    page: 4,
    id: 4,
    exterior: " huge yurt with crude paintings on the exterior and orcs mullings around.",
    interior: "Orcs and a couple non orcs mull around. Orcs ocasinially get in fist fights.",
    crowd: "Mostly orcs, but a couple non orcs are socializing. The fighs all end without deaths.",
    detailOne: "The biggest orc sits on a thrown in one end of the yurt.",
    detailTwo: "After fights have stopped, the orcs go back to being friendly.",
    detailThree: "",
    dmNotes: "THe orcs are a recrutible gang for the players. They won't kill ir die for them, but they'll beat people up and intimidate them.",
    connectedAreas: [],
    namedNpcs: [],
    possibleNamedNpcs: [],        
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
]    


const l = (code: string) => {
    return locations.filter((location) => {
        return location.code === code
    })[0] as Location    
}

const c = (code: string) => {   
    return characters.filter((npc) => {
        return npc.code === code
    })[0] as Character    
}

export const pages: (Character|Location)[] = [
    l("land"),
    l("pcafe"),
    c("boz"),
    l("convoy"),
    c("conrad"),
    l("orc"),
]
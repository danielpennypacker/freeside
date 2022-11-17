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
        age: 100,
        race: "orc",
        notoriety: "Most people know he's the current orc boss, but they know it changes frequently.",    
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
        dmNotes: "He's the person to talk to if you need to convince the orcs to do anything.",
        characterConnections: [],
        visualDescription: "A huge orc with only a fewer tatters of clothes and no weapons.",
        introduction: "I'm Crap face, I'm the toughest orc in the world.",
        question: "You looking for a fight?",
        background: "Orcs from all over come here for the true purpose of life, fighting!",
        ideal: "We don't fight for kings or for gold, only for strength!",
        bond: "We're living a perfect life here, I'll do anything to protect that.",
        flaw: "I don't care what happens on the rest of the island as long as we're left alone.",
        skills: [Skills.Intimidation, Skills.Athletics, Skills.Survival],
        rewards: "If you beat him in a fist fight, you'll become the new Orc boss.",
        plotFlower: "He doesn't care about it at all, but thinks immortality is for weaklings.",
        plotConvoy: "He won't care about it unless he feels the orc neighborhood is threatened.",
        plotParty: "The orcs can be used to provide security.",
        plotArena: "He thinks fighting for prizes is stupid.",
        plotKaiju: "They'll rally to help defend the city."    
    },
    {
        code: CC.cloaked,
        age: 0,
        race: "human.",
        notoriety: "Only the other flower eaters know what she's doing. About a dozen people suspect she exists, but don't know her exact nature.",    
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
        dmNotes: "They're the main antagonist and having be trying to maintain the status quo on the island all these years.",
        characterConnections: [],
        visualDescription: "Very innocuious in a purple cloak.",
        introduction: "Hello there, don't worry about my name.",
        question: "I'm looking for some new friends, what brings you to Freeside?",
        background: "I've lived in Freeside a long time. I hope it never changes.",
        ideal: "I will live forever, and preserve the memories of those chosen to find the flower!",
        bond: "All that matters is that me and my memories continue.",
        flaw: "I was chosen to be the caretaker of the flower.",
        skills: [Skills.Insight, Skills.Perception, Skills.Persuasion],
        rewards: "",
        plotFlower: "She's gone crazy from eating the flower petals, and thinks she's been chosen as it's protector.",
        plotConvoy: "She doesn't want the Convoy moving",
        plotParty: "She'll show up, but keep to herself. She might try to sabotage it just to maintain the status quo of the Eternal Ball.",
        plotArena: "None.",
        plotKaiju: "she'll be happy that it gets summoned since it prevents people from coming to the island."    
    },
    {
        code: CC.artok,
        age: 60,
        race: "human",
        notoriety: "Considered a local eccentric in the comune who talks a little too much.",    
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
        dmNotes: "He's meant to give an alternate perspective on Freeside, and give players clues about the ghost house and secret base.",
        characterConnections: [],
        visualDescription: "Burly and wearing workshop clothes and covered in dust and dirt.",
        introduction: "Well hello, what brings you travllers to our community.",
        question: "Do you really think anyone in Freeside actually cares about each other?",
        background: "I came to Freeside as a refugee, and look at the community I've become a part of. ",
        ideal: "We work to help each other, we don't need laws to keep us inline.",
        bond: "I'll do anything to protect our commnue. It's my whole life.",
        flaw: "No one in the districts has any morales, they're a bunch of self centered adult children!",
        skills: [Skills.Nature, Skills.History, Skills.Survival],
        rewards: "",
        plotFlower: "He can point people towards the ghost house.",
        plotConvoy: "He doesn't actually care if the convoy moves in, he's not worried if the districts come or go.",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },
    {
        code: CC.ban,
        age: 45,
        race: "human",
        notoriety: "Has a small group of followers, but she tries to not encourage them.",    
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
        dmNotes: "She's here for mood, and to give players clues about other chatacters alignments.",
        characterConnections: [],
        visualDescription: "A plain grey robbed woman mediating on a cushion.",
        introduction: "Hello seekers, I am Ban.",
        question: "Who's true nature do you seek?",
        background: "I am only a witness to the comings and goings of the world.",
        ideal: "We live in an age of strife, bound to last another 10,00 years. All seek gain and conflict. What can we do but endure?",
        bond: "I must bare witness to the truth of the world, and spread compassion.",
        flaw: "None?",
        skills: [],
        rewards: "She'll tell players the alignment of one NPC. Players just have to hold her hand and think of the NPC.",
        plotFlower: "",
        plotConvoy: "",
        plotParty: "If the players throw a good party, she'll show up and complement then on spreading joy.",
        plotArena: "",
        plotKaiju: ""    
    },
    {
        code: CC.bosph,
        age: 25,
        race: "tiefling",
        notoriety: "Everyone who pays attention to the areana knows her as a promoter.",    
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
        dmNotes: "She's the entry point into the getting into galtiator fights.",
        characterConnections: [],
        visualDescription: "A bousterous tiefling with exotic robes and causally casts cantrips while talking.",
        introduction: "You look like a tough bunch, how about you take a swing in the areana?",
        question: "Don't you wanna make some money, maybe get some fame while you're at it?",
        background: "I've always been a bit flamboyant, this work suits me perfectly.",
        ideal: "Well it never hurts to make a bit of gold while you're having some fun.",
        bond: "Well, we've all got to look out for ourselves first.",
        flaw: "Perhaps you could lose a match, just this once.",
        skills: [],
        rewards: "",
        plotFlower: "If she finds out about it she might try to make a buck off it.",
        plotConvoy: "She can be swayed to whichever side makes more money, including rallying galdiators to fight for one side.",
        plotParty: "She'll try to make money off it one way or another.",
        plotArena: "She's the main entry to this plot.",
        plotKaiju: ""    
    },
    {
        code: CC.caspian,
        age: 19,
        race: "Half Elf",
        notoriety: "Know in all as Freeside as a brilliant merchant and business person.",    
        page: 1,
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
        dmNotes: "He's the middle ground opinion about the convoy. He thinks they're too big to fight.",
        characterConnections: [],
        visualDescription: "Short young man, smartly dressed with little adornment.",
        introduction: "Ah new friends, I am Caspian, a humble merchant.",
        question: "So how do you think the good people of Freeside should handle the Convoy?",
        background: "I was born here.",
        ideal: "There are only 2 ways people interact, trade, and conflict, which one do you think I believe in?",
        bond: "Freeside must continue no matter what. Just because it's survied many empires doesn't mean it'll go on forever.",
        flaw: "Sometimes we must be willing to give things up in order to keep what really matters.",
        skills: [Skills.Insight, Skills.History, Skills.Investigation],
        rewards: "",
        plotFlower: "Will want to use it as a bargaining chip to maintain Freeside's Autonomy.",
        plotConvoy: "Believes in letting them have some territory, but not too much.",
        plotParty: "Will invest if he thinks it's a good idea.",
        plotArena: "",
        plotKaiju: "Will help rally people to fight it."    
    },
    {
        code: CC.chit,
        age: 99999,
        race: "",
        notoriety: "",    
        page: 1,
        id: 1,
        name: "Chitalogoth",
        title: "Eldar Being",
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
        dmNotes: "Is meant as a fun combat encounter, and give players a reward that people in Freeside will recognize.",
        characterConnections: [],
        visualDescription: "A blob of shifting colors and dimensions with tenticles that suction onto people's heads.",
        introduction: "Come, battle, and you shall be rewarded.",
        question: "What do you struggle for?",
        background: "When the Void Heretic returns to consume the stars, the energy of your violent struggle shall sustain me at the infinite-infinitesimal-battle",
        ideal: "Feel blessed that your minute existence will aid me during the collapse of the helix dimension.",
        bond: "",
        flaw: "The time it would take you to tire of immortality is but a moment of my existence.",
        skills: [],
        rewards: "A small pedant for each player based on the toughest monster they fought.",
        plotFlower: "",
        plotConvoy: "",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },
    {
        code: CC.dark,
        age: 0,
        race: "human",
        notoriety: "Only a couple shady people know about him.",    
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
        dmNotes: "Players can use him to kill other NPCs.",
        characterConnections: [],
        visualDescription: "A cloacked figure with a black bandana covering their lower face.",
        introduction: "I'm dark ",
        question: "Do you ",
        background: "I worship the gods of revenge.",
        ideal: "I'll kill anyone for 1000 as long as you can tell me why the deserve vengence.",
        bond: "When I pass my god will judge me by the balance I've brought to the world.",
        flaw: "I don't care who my target is, as long as long as someone wants revenge on them.",
        skills: [],
        rewards: "He'll kill another NPC in a couple days after contracted. They can't be revived.",
        plotFlower: "",
        plotConvoy: "",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },
    {
        code: CC.dragon,
        age: 200,
        race: "dargon",
        notoriety: "He's a regular at this bar.",    
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
        dmNotes: "This is an another entry point to the flower plot.",
        characterConnections: [],
        visualDescription: "A medium sized dragon wearing old, but well kept formal wear.",
        introduction: "Hello, I am the great fading star of the old opera, Dragor.",
        question: "So, what's the plot of your favorite opera?",
        background: "Decades ago me and my co-star thrilled audiences. She played the maiden, and I the villianous dragon!",
        ideal: "Nothings better than helping people believe good can triumph over evil.",
        bond: "Clarissa disapeared 50 years ago, and I still think of her to this day.",
        flaw: "I haven't been able to move on after her disapearance.",
        skills: [],
        rewards: "He'll give the players 1000 gold if they can find out what happened to Clarissa.",
        plotFlower: "Clarissa is one of the 5 people Lapith is currently keeping alive with the flower. Trying to track her down is an entry point to the flower plot.",
        plotConvoy: "",
        plotParty: "",
        plotArena: "",
        plotKaiju: ""    
    },
    {
        code: CC.lobi,
        age: 0,
        race: "halfling",
        notoriety: "People are used to her talking their ears off at the library.",    
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
        dmNotes: "She can used for lore dumps, or any lore questions the players have. She can also give clues.",
        characterConnections: [],
        visualDescription: "You student with a pile of books occasanliy looking up and trying to say hi to people.",
        introduction: "Hi, I'm Lobi, do you know that Freeside has actually been occupied by people for more than 6000 years?",
        question: "Have you been to the Tomb of Empires yet? There you can see every Empire that's ever had control of Freeside!",
        background: "I grew up here, did you know only 1 and 5 inhabitants of Freeside were born here?",
        ideal: "Learning about history honors the lives and struggles of all those who came before us! Did you know that the districts only were solidified in the last 200 years?",
        bond: "Oh, I'll be happy to just keep writting history books. We actually don't know who built the library or where the dogs came from. But the oldest stories of Freeside talk about 2 cults fighting over an object of immense value.",
        flaw: "I could keep going all day! What else do you want to know about?",
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
        race: "Half elf",
        notoriety: "One of the most popular and coolest people in freeside.",    
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
        dmNotes: "He'll flirt with the highest charisma player in the party.",
        characterConnections: [],
        visualDescription: "A thing attrative man in a fashionable white suit.",
        introduction: "Well hello there, look at this handsome bunch. I'm Planithir. If you clearly weren't new, you'd know that.",
        question: "What fun things bring you to Freeside?",
        background: "I've been here for quite some time, I'm on the list for every party.",
        ideal: "Fun and friends, what more is ther to life?",
        bond: "Freeside is a place where people can be truely free. I want to keep it like that.",
        flaw: "I will go down in history as the greatest host Freeside has ever known.",
        skills: [],
        rewards: "",
        plotFlower: "",
        plotConvoy: "He doesn't like the Convoy and thinks they're boring, but tolerates them.",
        plotParty: "He's the main entry point for planning a big party.",
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
    name: "The Eternal Ball",
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
    // Ann with her skin changing potion
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
    c(CC.chit),
    c(CC.ban),
    c(CC.planithr),
    l(LC.court),
    // 3 Gods.
])





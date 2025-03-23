export type Need = 'sleep' | 'food' | 'social'

export type Npc = {
    name: string;
    needs: Record<Need, number>;
    location: {
        home: string;
        current: string;
        path: string[];
    }
}

export type Destination = {
    name: string;
    provides: {
        type: Need;
        ammount: number;
    };
}


export type ComplexNpc = {
    name: string,
    desires: Map<0 | 1 | 2, string>
    personalyties: string[]
    home: string,
    location: string,
    path: string[],
    destinataion: string,
}

export type Cycle = 'morning' | 'midday' | 'evening' | 'night'

export type ComplexLocations = {
    name: string;
    tags: string[]
}

export type Desires = 'hungry' | 'sleepy' | 'lonely' | ''


// Location tags could be:
// for food: [
// food, -> normal food, evrything that provides food has at leas this tag
// vegie-food, -> special food for chacrter type vegie
// luxury-food -> special food for chacrter type snobby
//]
// for sleep: [
// comfortable, -> a nice bed
// open-air, -> for camping beds for example
// sleep -> everthing that provides sleep should provide this
//]
// for lonely: [social, private]

// const predefinedDesires = {
// default: [food, sleep, social];
// classy: [luxury-food, sleep, social, private];
// homless: [food, open-air, social];
//}
// const npc = createNpc('bob', 'home', predefinedDesires['classy'], personality)

// pseudo code: desires steuern, welche orte für bedürfnisse genutzt werden können
// personality steuer was bei einem cycle wechsel passiert
// auf basis der personality werden needs errechnet
// unter berücksichtung der desires wird das nächste ziel ausgewählt
// npc verbingt den nächsten cyle am ziel
// zusätzlich könnten sleep, hunger, etc noch eine kleine mitsteuernde rolle übernemen, je niedirger der wert, desto höher die chance, dass npc sich um den wert kümmert 
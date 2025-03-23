import { dir, log } from "console";
import { createDestination, findPath, scoreDestinations } from "./destination-logic";
import { Destination, Npc } from "./types";
import { createNPC, fulfillNeed, getMostUrgentNeed, move, setPath, updateNeeds } from "./npc-logic";
import { pipe, withParams } from "./utils";

const street: Destination = createDestination('main-street', 'social', 10)

const fastFood: Destination = createDestination('mc-chicken', 'food', 50)
const restaurant: Destination = createDestination('fine-dining', 'food', 100)

const park: Destination = createDestination('local-park', 'social', 20)

const apartmentA: Destination = createDestination('apartment-a', 'sleep', 20)
// const apartmentB: Destination = createDestination('apartment-a', 'sleep', 20)

const world: Map<string, Destination[]> = new Map([
    ['main-street', [fastFood, apartmentA, park]],
    ['mc-chicken', [street]],
    ['fine-dining', [park]],
    ['local-park', [street, restaurant]],
    ['apartment-a', [street]],
])

const npcs: Npc[][] = [[
    createNPC('alice', 'apartment-a', { sleep: 100, food: 0, social: 100 }),
    createNPC('bob', 'apartment-a'),
    createNPC('shaun', 'apartment-a'),
]
]

export function runSimmulation() {
    for (let i = 0; i < 10; i++) {
        npcs.push(npcs[i].map(el => simmulateNpc(el, world)))
    }

    dir(npcs.flat().reduce((acc, npc) => {
        const name = npc.name.toLowerCase(); // Case-insensitive grouping
        acc[name] = acc[name] || [];
        acc[name].push({ location: npc.location.current, needs: npc.needs, path: npc.location.path });
        return acc;
    }, {} as Record<string, object[]>), { depth: null })
}

function simmulateNpc(npc: Npc, world: Map<string, Destination[]>): Npc {
    const destinations = Array.from(world.values().flatMap(el => el))
    const currentDestination = destinations.find(el => el.name === npc.location.current)

    const updatedNpc = pipe(
        npc,
        updateNeeds,
        withParams(fulfillNeed, currentDestination?.provides.type ?? 'social', currentDestination?.provides.ammount ?? 0),
        move
    )

    if (updatedNpc.location.path.length > 0) return updatedNpc
    const mostUrgentNeed = getMostUrgentNeed(updatedNpc)
    log(updatedNpc.name, updatedNpc.needs, mostUrgentNeed)
    const nextLocation = scoreDestinations(npc.location.current, world, mostUrgentNeed)
    const pathTo = findPath(npc.location.current, nextLocation, world)

    return setPath(updatedNpc, pathTo)
}
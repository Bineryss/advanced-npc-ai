import { Need, Npc } from "./types";

export function createNPC(name: string, homeLocation: string): Npc {
    return {
        name: name,
        needs: {
            sleep: 100,
            food: 100,
            social: 100,
        },
        location: {
            home: homeLocation,
            current: homeLocation,
            destination: undefined
        }
    }
}

export function updateNeeds(npc: Npc): Npc {
    const needMultiplier = 10
    return {
        ...npc,
        needs: {
            ...npc.needs,
            sleep: Math.max(0, npc.needs.sleep - 1 * needMultiplier),
            food: Math.max(0, npc.needs.food - 1 * needMultiplier),
            social: Math.max(0, npc.needs.social - 1 * needMultiplier)
        }
    }
}

export function fulfillNeed(npc: Npc, need: Need, ammount: number): Npc {
    return npc
}


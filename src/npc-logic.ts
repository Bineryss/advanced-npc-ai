import { Need, Npc } from "./types";
export const MAX_NEED_AMMOUNT = 100;

export function createNPC(name: string, homeLocation: string, needs: Record<Need, number> = {
    sleep: 100,
    food: 100,
    social: 100,
}): Npc {
    return {
        name: name,
        needs: needs,
        location: {
            home: homeLocation,
            current: homeLocation,
            path: []
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
            social: Math.max(0, npc.needs.social - 3 * needMultiplier)
        }
    }
}

export function fulfillNeed(npc: Npc, need: Need, ammount: number): Npc {
    return {
        ...npc,
        needs: {
            ...npc.needs,
            [need]: Math.min(MAX_NEED_AMMOUNT, npc.needs[need] + ammount)
        }
    }
}

export function getMostUrgentNeed(npc: Npc): Need {
    return Object.entries(npc.needs)
        .map(([key, value]) => ({ need: key, value: value }))
        .sort((a, b) => a.value - b.value)[0].need as Need
}

export function setPath(npc: Npc, path: string[]): Npc {
    return {
        ...npc,
        location: {
            ...npc.location,
            path: path
        }
    }
}

export function move(npc: Npc): Npc {
    if (npc.location.path.length === 0) return { ...npc }

    const currentPath = npc.location.path
    return {
        ...npc,
        location: {
            ...npc.location,
            current: currentPath[0],
            path: currentPath.slice(1)
        }
    }
}

//update lifecycle for npc, updates position, calls updateNeeds, set new destination, etc
export function update(npc: Npc): Npc {
    return npc
}

// export function 

//update current position -> wenn npc neuen ort betritt
//

//wie steuern wir, wann der npc ein neues ziel hat?

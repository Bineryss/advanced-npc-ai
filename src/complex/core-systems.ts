import { pipe } from "../utils";
import { createSim, interact, selectNextAction, updateMotives } from "./sim";
import { Sim, WorldObject } from "./types";
import { createWorldObject } from "./world-object";

export type SimmulationState = {
    cycle: number,
    sims: Sim[],
    worldObjects: WorldObject[]
}

export const INITIAL_SIM_POPULATION: Sim[] = [
    createSim('Oliver Brown', ['sleep', 'hunger', 'social', 'sport', 'hygene']),
    createSim('Astrid Raven', ['sleep', 'knowlegable', 'hygene']),
    createSim('Luna Cromwell', ['sleep', 'social', 'hygene', 'culinary', 'outdoor']),
    createSim('Melissa Langley', ['sleep', 'hygene', 'culinary']),
] as const

export const INITIAL_WORLD_OBJECTS: WorldObject[] = [
    createWorldObject('bed', [{ name: 'sleep', advertments: new Map([['sleep', 40]]), duration: 8 }]),
    createWorldObject('couch', [{ name: 'doze-of', advertments: new Map([['sleep', 20]]), duration: 1 }]),
    createWorldObject('fridge', [{ name: 'quick-snack', advertments: new Map([['hunger', 100]]), duration: 1 }]),
    createWorldObject('book-shelf', [{ name: 'read-book', advertments: new Map([['knowlegable', 50]]), duration: 2 }]),
    createWorldObject('forest', [{ name: 'jog', advertments: new Map([['sport', 20], ['outdoor', 40]]), duration: 2 }]),
    createWorldObject('forest', [{ name: 'walk', advertments: new Map([['outdoor', 50]]), duration: 2 }]),
    createWorldObject('restaurant', [{ name: 'eat', advertments: new Map([['social', 10], ['culinary', 50], ['hunger', 100]]), duration: 3 }]),
    createWorldObject('phone', [{ name: 'order-food', advertments: new Map([['culinary', 20], ['hunger', 100]]), duration: 3 }]),
    createWorldObject('bathroom', [{ name: 'wash-hands', advertments: new Map([['hygene', 80]]), duration: 1 }]),
    createWorldObject('club', [{ name: 'party', advertments: new Map([['social', 20]]), duration: 4 }]),
] as const

export function updateCylce(state: SimmulationState): SimmulationState {
    const { sims, worldObjects, cycle } = state

    return {
        cycle: cycle + 1,
        worldObjects: worldObjects,
        sims: sims.map(sim => {
            const updatedSim = pipe(sim, updateMotives)
            const { sim: simWithScores, object, action } = selectNextAction(updatedSim, worldObjects)
            if (!object || !action) return simWithScores

            return interact(simWithScores, object, action)
        })
    }
}
import { pipe } from "../utils";
import { attachStopListener, render } from "./interface";
import { createSim, interact, selectNextAction, updateMotives } from "./sim";
import { Sim, WorldObject } from "./types";
import { createWorldObject } from "./world-object";

let sims: Sim[] = [
    createSim('Oliver Brown', ['sleep', 'hunger', 'social', 'sport', 'hygene']),
    createSim('Astrid Raven', ['sleep', 'knowlegable', 'hygene']),
    createSim('Luna Cromwell', ['sleep', 'social', 'hygene', 'culinary', 'outdoor']),
    createSim('Melissa Langley', ['sleep', 'hygene', 'culinary']),
]

const world: WorldObject[] = [
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
]

export function startSimmulation() {
    let timer: number = 12

    const intervalId = setInterval(() => {
        timer = ++timer % 24;
        sims = updateCylce(sims, world)
        render(sims, `${timer}:00`)
        console.log('Enter "C" to stop execution');
    }, 1000)
    attachStopListener(intervalId)
}

function updateCylce(sims: Sim[], worldObjects: WorldObject[]): Sim[] {
    return sims.map(sim => {
        const updatedSim = pipe(sim, updateMotives)
        const nextAction = selectNextAction(sim, worldObjects)
        if (!nextAction) return updatedSim

        const interactingSim = interact(sim, nextAction.object, nextAction?.action)
        return interactingSim
    })
}
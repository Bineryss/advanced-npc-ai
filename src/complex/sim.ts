import { log } from "console"
import { rateInteractions } from "./motive-engine"
import { Motive, Sim, WorldObject } from "./types"

// const moods: Map<Motive, (value: number) => string> = new Map([
//     ['sleep', (value) => value >= 0 ? 'neutral' : 'sleepy'],
//     ['hungry', (value) => value >= 0 ? 'neutral' : 'hangry'],
//     ['social', (value) => value >= 0 ? 'happy' : 'lonley'],
// ])

export function createSim(name: string, motives: Motive[]): Sim {
    return {
        name: name,
        location: 0,
        motives: new Map(motives.map(motive => [motive, 0])),
        currentAction: { object: 'home', action: 'idle', timeLeft: 0 },
    }
}

function changeMotive(sim: Sim, motive: Motive, value: number): Sim {
    const oldValue = sim.motives.get(motive) ?? 0
    const newValue = Math.min(Math.max(oldValue + value, -100), 100)
    const newMotives = sim.motives
    newMotives.set(motive, newValue)
    return {
        ...sim,
        motives: newMotives
    }
}

export function updateMotives(sim: Sim): Sim {
    const updatedSim: Sim = {
        ...sim,
        currentAction: {
            ...sim.currentAction,
            timeLeft: --sim.currentAction.timeLeft
        }
    }
    const motives = updatedSim.motives.keys()
    return motives.reduce((accumulator, motive) => {
        return changeMotive(accumulator, motive, -5)
    }, updatedSim)
}

export function selectNextAction(sim: Sim, objects: WorldObject[]): { object: WorldObject, action: string } | undefined {
    const scoredActions = rateInteractions(sim.motives, objects, sim.currentAction);
    const selectedAction = scoredActions[0]
    const selectedObject = objects.find(el => el.name === scoredActions[0].name)
    if (!selectedAction || !selectedObject) return;

    return {
        object: selectedObject,
        action: selectedAction.interaction
    }
}

export function interact(sim: Sim, object: WorldObject, action: string): Sim {
    const isActiveAction = (sim.currentAction.object === object.name && sim.currentAction.action === action)
    const timeLeft = isActiveAction ? sim.currentAction.timeLeft : object.interactions.find(el => el.name == action)?.duration ?? 0

    const simWithAction = {
        ...sim, currentAction: {
            object: object.name,
            action: action,
            timeLeft: timeLeft
        }
    }

    const motives = object.interactions.find(el => el.name === action)?.advertments.entries()

    return motives?.reduce((accumulator, [motive, value]) => {
        return changeMotive(accumulator, motive, value)
    }, simWithAction) ?? simWithAction
}
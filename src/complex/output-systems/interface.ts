import { clear, log, table } from "console";
import { createInterface } from "readline";
import { INITIAL_SIM_POPULATION, INITIAL_WORLD_OBJECTS, updateCylce } from "../core-systems";
import { Sim } from "../types";

export function startConsoleSimmulation() {
    let simState = {
        cycle: 0,
        sims: INITIAL_SIM_POPULATION,
        worldObjects: INITIAL_WORLD_OBJECTS
    }

    const intervalId = setInterval(() => {
        simState = updateCylce(simState)
        render(simState.sims, simState.cycle)
        console.log('Enter "C" to stop execution');
    }, 1000)
    attachStopListener(intervalId)
}

function formatSimForTable(sim: Sim) {
    const { motives, currentAction, ...rest } = sim

    return {
        ...rest,
        currentAction: `${currentAction.object}->${currentAction.action}:${currentAction.timeLeft}`,
        ...Object.fromEntries(motives)
    }
}

function render(sims: Sim[], cycle: number): void {
    clear()
    log('====Simmulation====')
    log('Current time: ', `${cycle % 24}:00`)
    table(sims.map(formatSimForTable))
    table(sims[0].currentRatingMatrix)
}

function attachStopListener(intervalId: any) {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('line', (input) => {
        if (input.trim().toLowerCase() === 'c') {
            clearInterval(intervalId);
            rl.close();
            console.log('Simmulation stopped');
        }
    });
}
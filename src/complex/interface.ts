import { clear, log, table } from "console";
import { Sim } from "./types";
import { createInterface } from "readline";

function formatSimForTable(sim: Sim) {
    const { motives, currentAction, ...rest } = sim

    return {
        ...rest,
        currentAction: `${currentAction.object}->${currentAction.action}:${currentAction.timeLeft}`,
        ...Object.fromEntries(motives)
    }
}

export function render(sims: Sim[], time: string): void {
    clear()
    log('====Simmulation====')
    log('Current time: ', time)
    table(sims.map(formatSimForTable))
}

export function attachStopListener(intervalId: any) {
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
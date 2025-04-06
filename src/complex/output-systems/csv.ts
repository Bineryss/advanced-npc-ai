import { log } from "console";
import fs from 'fs';
import { INITIAL_SIM_POPULATION, INITIAL_WORLD_OBJECTS, SimmulationState, updateCycle } from "../core-systems";
import { motives, Sim } from "../types";

const FILE_NAME = 'simmulation.csv'
const HEADER = `cycle,name,current-object,current-action,time-left,${motives.join(',')}\n`
const SIMMULATION_CYCLES = 1000

export function startCSVSimmulation(): void {
    let data = HEADER
    let simState = {
        cycle: 0,
        sims: INITIAL_SIM_POPULATION,
        worldObjects: INITIAL_WORLD_OBJECTS
    }

    for (let i = 0; i < SIMMULATION_CYCLES; i++) {
        simState = updateCycle(simState)
        data += `${renderStateToCsv(simState)}\n`
    }

    fs.writeFile(FILE_NAME, data, (e) => { log(e) })

}

function renderStateToCsv(state: SimmulationState): string {
    return state.sims.map(sim => `${state.cycle},${renderCsvRow(sim)}`).join('\n')
}

function renderCsvRow(sim: Sim): string {
    return [
        sim.name,
        sim.currentAction.object,
        sim.currentAction.action,
        sim.currentAction.timeLeft,
        ...motives.map(motive => sim.motives.get(motive) ?? 0)
    ].join(',')
}
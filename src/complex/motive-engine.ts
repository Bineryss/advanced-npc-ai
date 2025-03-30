import { log } from "console";
import { ActiveAction, Motive, MotiveRatingFunction, ScoredInteraction, Sim, WorldObject } from "./types";

export type MotiveMap = Map<Motive, number>
export type MotiveRatingEngine = Map<Motive, MotiveRatingFunction>
// TODO die funktionen könnten um weitere paramter erwieter werden, so könnter man z.B. Zeit als parameter mit rein geben
export const motiveRatingEngine: MotiveRatingEngine = new Map([
    ['social', (value: number) => (value * value) / 2500 + 1],
    ['knowlegable', (value: number) => (value * value) / 2500 + 1.5],
    ['sleep', (value: number) => (value * value) / 4000 - (9 * value) / 200 + 3],
    ['hunger', (value: number) => (value * value) / 20000 - 0.045 * value + 5],
    ['hygene', (value: number) => (value * value) / 2500 + 1],
    ['culinary', (value: number) => -(Math.pow(value, 3)) / 200000 + 2],
    ['outdoor', (value: number) => (value * value) / 3000 + 2],
    ['sport', (value: number) => (value * value) / 2000 + 1],
])


export function rateInteractions(motiveValues: MotiveMap, objects: WorldObject[], currentAction?: ActiveAction, ratingEngine: MotiveRatingEngine = motiveRatingEngine): ScoredInteraction[] {
    return objects
        .flatMap(object => object.interactions
            .map(interaction => ({
                name: object.name,
                interaction: interaction.name,
                advertments: interaction.advertments
            })))
        .map(el => {
            const isCurrentAction: boolean = !!currentAction && currentAction.object === el.name && currentAction.action === el.interaction
            const timeMultiplyer: number = isCurrentAction ? currentAction?.timeLeft ?? 0 : 0
            return ({
                name: el.name,
                interaction: el.interaction,
                score: scoreInteraction(motiveValues, timeMultiplyer, el.advertments, ratingEngine)
            })
        })
        .sort((a, b) => b.score - a.score)
}

export function scoreInteraction(motiveValues: MotiveMap, multiplier: number, advertments: MotiveMap, ratingEngine: MotiveRatingEngine): number {
    return Array.from(advertments.entries()).reduce((accumulator, [motive, interactionValue]) => {
        const ratingFunction = ratingEngine.get(motive)
        const simMotiveValue = motiveValues.get(motive)
        if (!ratingFunction || simMotiveValue === undefined) return accumulator
        return Math.round(accumulator + (interactionValue * ratingFunction(simMotiveValue)) + multiplier * 20)
    }, 0)
}
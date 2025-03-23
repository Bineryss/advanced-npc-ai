import { describe, it } from "vitest"
import { MotiveMap, MotiveRatingEngine, rateInteractions, scoreInteraction } from "./motive-engine"
import { WorldObject } from "./types"

describe('motive engine', () => {
    it.each([
        {
            motives: [[
                'sleep', 0
            ]] as const,
            advertments: [[
                'sleep', 10
            ]] as const,
            ratingEngine: [['sleep', (value: number) => value + 10]] as const,
            expected: 100,
        },
        {
            motives: [
                ['sleep', 10],
                ['hunger', -10],
            ] as const,
            advertments: [
                ['sleep', -10],
                ['hunger', 10],
            ] as const,
            ratingEngine: [
                ['sleep', (value: number) => value - 9],
                ['hunger', (value: number) => value * -1],
            ] as const,
            expected: 90
        },
    ])('should score interaction for $advertments', ({ motives, advertments, ratingEngine, expected }) => {
        const currentMotives: MotiveMap = new Map(motives)
        const advertmentsMap: MotiveMap = new Map(advertments)
        const ratingEngineMap: MotiveRatingEngine = new Map(ratingEngine)

        const score = scoreInteraction(currentMotives, 0, advertmentsMap, ratingEngineMap)
        expect(score).toBe(expected)
    })

    it('should rate interactions', () => {
        const worldObjects: WorldObject[] = [
            {
                name: 'couche',
                location: 0,
                interactions: [
                    {
                        name: 'doze-of',
                        advertments: new Map([[
                            'sleep', 10
                        ]]),
                        duration: 1
                    },
                    {
                        name: 'watch-tv',
                        advertments: new Map([
                            ['social', 10],
                            ['hunger', -10]
                        ]),
                        duration: 1
                    },
                ]
            },
            {
                name: 'fridge',
                location: 0,
                interactions: [
                    {
                        name: 'eat', advertments: new Map([
                            ['hunger', 100]
                        ]),
                        duration: 1
                    }
                ]
            }
        ]
        const motiveValues: MotiveMap = new Map([
            ['sleep', 50],
            ['hunger', -10],
            ['social', 80]
        ])

        const ratedInteractions = rateInteractions(motiveValues, worldObjects)

        expect(ratedInteractions.map(el => ({ name: el.name, interaction: el.interaction }))).toStrictEqual([
            {
                interaction: "eat",
                name: "fridge",
            },
            {
                interaction: "doze-of",
                name: "couche",
            },
            {
                interaction: "watch-tv",
                name: "couche",
            },
        ])
    })
})
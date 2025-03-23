import { pipe } from "../utils"
import { createSim, updateMotives } from "./sim"

describe('Sim', () => {
    it('should creat a sim', () => {
        const sim = createSim('bob', ['sleep'])

        expect(sim).toStrictEqual({
            name: 'bob',
            currentAction: "idle",
            location: 0,
            motives: new Map([
                ['sleep', 0]
            ])
        })
    })
    it('should update motives', () => {
        const sim = pipe(
            createSim('bob', ['sleep']),
            updateMotives
        )

        expect(sim.motives).toStrictEqual(new Map([
            ['sleep', -10]
        ]))
    })
})
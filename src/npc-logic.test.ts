import { createNPC, fulfillNeed, getMostUrgentNeed, MAX_NEED_AMMOUNT, updateNeeds } from "./npc-logic"
import { pipe, withParams } from "./utils"

describe('npc logic', () => {
    const testNpc = createNPC('bob', 'under the bridge')
    it('should create a npc', () => {
        const npc = testNpc
        expect(npc).toStrictEqual({
            name: 'bob',
            needs: { sleep: 100, food: 100, social: 100 },
            location: {
                home: 'under the bridge',
                current: 'under the bridge',
                path: undefined
            }
        })
    })
    it('should reduce needs', () => {
        const npc = testNpc
        const updatedNpc = updateNeeds(npc)
        expect(updatedNpc).toStrictEqual({
            ...npc,
            needs: { sleep: 90, food: 90, social: 90 },
        })
    })
    it('should never reduce needs below 0', () => {
        const npc = testNpc
        let updatedNpc = npc;
        for (let i = 0; i < 11; i++) {
            updatedNpc = updateNeeds(updatedNpc)
        }
        expect(updatedNpc).toStrictEqual({
            ...npc,
            needs: { sleep: 0, food: 0, social: 0 },
        })
    })
    it('should fulfill needs', () => {
        const npc = pipe(
            testNpc,
            updateNeeds,
            withParams(fulfillNeed, 'sleep', 10)
        )
        expect(npc).toStrictEqual({
            ...npc,
            needs: {
                food: 90,
                social: 90,
                sleep: 100,
            }
        })
    })
    it('should not fill need over max', () => {
        const npc = pipe(
            testNpc,
            updateNeeds,
            withParams(fulfillNeed, 'sleep', 100)
        )

        expect(npc).toStrictEqual({
            ...npc,
            needs: {
                sleep: MAX_NEED_AMMOUNT,
                food: 90,
                social: 90
            }
        })
    })
    it('should return most urgent need', () => {
        const npc = pipe(testNpc,
            updateNeeds,
            updateNeeds,
            withParams(fulfillNeed, 'sleep', 20),
            withParams(fulfillNeed, 'social', 20),
        )

        const urgentNeed = getMostUrgentNeed(npc)

        expect(urgentNeed).toBe('food')
    })
})
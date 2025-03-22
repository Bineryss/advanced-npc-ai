import { createNPC, fulfillNeed, updateNeeds } from "./npc-logic"
import { Npc } from "./types"
import { pipe } from "./utils"

describe('npc logic', () => {
    it('should create a npc', () => {
        const npc = createNPC('bob', 'under the bridge')
        expect(npc).toStrictEqual({
            name: 'bob',
            needs: { sleep: 100, food: 100, social: 100 },
            location: {
                home: 'under the bridge',
                current: 'under the bridge',
                destination: undefined
            }
        })
    })
    it('should reduce needs', () => {
        const npc = createNPC('bob', 'under the bridge')
        const updatedNpc = updateNeeds(npc)
        expect(updatedNpc).toStrictEqual({
            ...npc,
            needs: { sleep: 90, food: 90, social: 90 },
        })
    })
    it('should never reduce needs below 0', () => {
        const npc = createNPC('bob', 'under the bridge')
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
        const npc = updateNeeds(createNPC('bob', 'under the bridge'))
        const fullFilledNpc = fulfillNeed(npc, 'sleep', 10)
    })
})
import { createNPC } from "./npc-logic"

describe('npc logic', () => {
    it('should create a npc', () => {
        const npc = createNPC('bob', 'under the bridge')
        console.log(npc)
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
})
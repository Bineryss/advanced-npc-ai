import { Npc } from "./types";

export function createNPC(name: string, homeLocation: string): Npc {
    return {
        name: name,
        needs: {
            sleep: 100,
            food: 100,
            social: 100,
        },
        location: {
            home: homeLocation,
            current: homeLocation,
            destination: undefined
        }
    }
}
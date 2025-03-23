import { Interaction, WorldObject } from "./types";

export function createWorldObject(name: string, interactions: Interaction[]): WorldObject {
    return {
        name: name,
        location: 0,
        interactions: interactions
    }
}
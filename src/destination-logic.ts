import { Destination, Need } from "./types";

export function createDestination(name: string, need: Need, ammount: number): Destination {
    return {
        name: name,
        provides: {
            type: need,
            ammount: ammount,
        }
    }
}

export function scoreDestinations(currentLocation: string, destinations: Map<string, Destination[]>, need: Need): string {
    const flatDestinations = Array.from(destinations.values().flatMap(el => el))
    const currentDestination = flatDestinations.find(el => el.name === currentLocation)
    if (currentDestination?.provides.type === need) return currentDestination.name

    return flatDestinations.filter(el => el.provides.type === need).sort((a, b) => a.provides.ammount - b.provides.ammount)[0].name
}

export function findPath(start: string, target: string, world: Map<string, Destination[]>): string[] {
    if (start === target) return []

    const visited = new Set<string>();
    const queue: Array<[string, string[]]> = [[start, [start]]];

    while (queue.length > 0) {
        const [currentLocation, currentPath] = queue.shift()!;

        // Get adjacent destinations from world map
        const neighbors = world.get(currentLocation) || [];

        for (const neighborDest of neighbors) {
            const neighborName = neighborDest.name;

            // Found target destination
            if (neighborName === target) {
                return [...currentPath, neighborName].slice(1);
            }

            // Continue searching if not visited
            if (!visited.has(neighborName)) {
                visited.add(neighborName);
                queue.push([neighborName, [...currentPath, neighborName]]);
            }
        }
    }
    return []
}
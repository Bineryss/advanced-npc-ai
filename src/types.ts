export type Need = 'sleep' | 'food' | 'social'

export type Npc = {
    name: string;
    needs: Record<Need, number>;
    location: {
        home: string;
        current: string;
        destination: string | undefined;
    }
}
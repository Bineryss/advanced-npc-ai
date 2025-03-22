export type Npc = {
    name: string;
    needs: {
        sleep: number;
        food: number;
        social: number;
    };
    location: {
        home: string;
        current: string;
        destination: string | undefined;
    }
}
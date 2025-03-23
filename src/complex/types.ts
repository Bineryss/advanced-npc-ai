
export type Motive =
    'sleep'
    | 'hunger'
    | 'social'
    | 'hygene'
    | 'culinary'
    | 'outdoor'
    | 'sport'
    | 'knowlegable'
/**
 * calculates the value of a motive
 */
export type MotiveRatingFunction = (value: number) => number

export type Sim = {
    name: string,
    location: number,
    motives: Map<Motive, number>,
    currentAction: ActiveAction,
}

export type WorldObject = {
    name: string,
    location: number,
    interactions: Interaction[]
}

export type Interaction = {
    name: string,
    advertments: Map<Motive, number>,
    duration: number, //how long this action will normally take
}

export type ActiveAction = {
    object: string,
    action: string,
    timeLeft: number
}
export const SexEnum = {
    Male: 0,
    Female: 1,
} as const;

export const SpecieEnum = {
    Dog: 0,
    Fox: 1,
    Duck: 2,
} as const;

export type Sex = (typeof SexEnum)[keyof typeof SexEnum];
export type Specie = (typeof SpecieEnum)[keyof typeof SpecieEnum];
export type DateOnly = string;

export const sexLabels: Record<Sex, string> = {
    [SexEnum.Male]: "Macho",
    [SexEnum.Female]: "Fêmea",
};

export const specieLabels: Record<Specie, string> = {
    [SpecieEnum.Dog]: "Cachorro",
    [SpecieEnum.Fox]: "Raposa",
    [SpecieEnum.Duck]: "Pato",
};

export interface IPet {
    id: string;
    ownerName: string;
    birthDate: DateOnly;
    weight: number;
    sex: Sex;
    specie: Specie;
    coat: string;
    vaccinated: boolean;
    ownerPhone: string;
}

export interface ICreatePet {
    ownerName: string;
    birthDate: DateOnly;
    weight: number;
    sex: Sex;
    specie: Specie;
    coat: string;
    vaccinated: boolean;
    ownerPhone: string;
}

export interface IUpdatePet {
    ownerName?: string;
    birthDate?: DateOnly;
    weight?: number;
    sex?: Sex;
    specie?: Specie;
    coat?: string;
    vaccinated?: boolean;
    ownerPhone?: string;
}

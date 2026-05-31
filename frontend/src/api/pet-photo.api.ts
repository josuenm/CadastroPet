import { SpecieEnum, type Specie } from "@/types/pet.type";

interface DogPhotoResponse {
    message: string;
}

interface FoxPhotoResponse {
    image: string;
}

interface DuckPhotoResponse {
    url: string;
}

const photoSources = {
    [SpecieEnum.Dog]: {
        url: "https://dog.ceo/api/breeds/image/random",
        getImage: (data: DogPhotoResponse) => data.message,
    },
    [SpecieEnum.Fox]: {
        url: "https://randomfox.ca/floof/",
        getImage: (data: FoxPhotoResponse) => data.image,
    },
    [SpecieEnum.Duck]: {
        url: "https://random-d.uk/api/v2/random",
        getImage: (data: DuckPhotoResponse) => data.url.replace(/^http:/, "https:"),
    },
} as const satisfies Record<
    Specie,
    { url: string; getImage: (data: never) => string }
>;

export const PetPhotoAPI = {
    getRandomBySpecie: async (specie: Specie) => {
        const source = photoSources[specie];
        const response = await fetch(source.url);

        if (!response.ok) {
            throw new Error("Falha ao carregar foto do pet");
        }

        const data = await response.json();
        return source.getImage(data);
    },
};

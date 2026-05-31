import { onlyNumbers } from "@/lib/phone";
import { SexEnum, SpecieEnum, type Sex, type Specie } from "@/types/pet.type";
import * as yup from "yup";

const sexValues: Sex[] = [SexEnum.Male, SexEnum.Female];
const specieValues: Specie[] = [SpecieEnum.Dog, SpecieEnum.Fox, SpecieEnum.Duck];

export interface CreatePetFormData {
    ownerName: string;
    birthDate: string;
    weight: number;
    sex: Sex;
    specie: Specie;
    coat: string;
    vaccinated: boolean;
    ownerPhone: string;
}

export const createPetSchema: yup.ObjectSchema<CreatePetFormData> = yup.object({
    ownerName: yup.string().trim().required("Nome do dono é obrigatório"),
    birthDate: yup
        .string()
        .required("Data de nascimento é obrigatória")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
    weight: yup
        .number()
        .typeError("Peso deve ser um número")
        .positive("Peso deve ser maior que zero")
        .required("Peso é obrigatório"),
    sex: yup
        .mixed<Sex>()
        .oneOf(sexValues, "Selecione um sexo válido")
        .required("Sexo é obrigatório"),
    specie: yup
        .mixed<Specie>()
        .oneOf(specieValues, "Selecione uma espécie válida")
        .required("Espécie é obrigatória"),
    coat: yup.string().trim().required("Pelagem é obrigatória"),
    vaccinated: yup.boolean().required("Informe se o pet está vacinado"),
    ownerPhone: yup
        .string()
        .trim()
        .required("Telefone é obrigatório")
        .test(
            "phone-digits",
            "O telefone com DDD deve ter 10 ou 11 dígitos",
            (value) => /^[0-9]{10,11}$/.test(onlyNumbers(value ?? "")),
        ),
});

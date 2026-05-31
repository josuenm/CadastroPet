import { PetAPI } from "@/api/pet.api";
import { getApiErrorMessage } from "@/lib/api-error";
import { maskPhone, onlyNumbers } from "@/lib/phone";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select";
import type { ICreatePet } from "@/types/pet.type";
import { SexEnum, SpecieEnum } from "@/types/pet.type";
import {
    createPetSchema,
    type CreatePetFormData,
} from "@/validations/create-pet.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller, type Resolver } from "react-hook-form";

interface CreatePetDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const defaultValues: CreatePetFormData = {
    ownerName: "",
    birthDate: "",
    weight: 0,
    sex: SexEnum.Male,
    specie: SpecieEnum.Dog,
    coat: "",
    vaccinated: false,
    ownerPhone: "",
};

export function CreatePetDialog({ open, onOpenChange }: CreatePetDialogProps) {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<CreatePetFormData>({
        resolver: yupResolver(createPetSchema) as Resolver<CreatePetFormData>,
        defaultValues,
    });

    const createMutation = useMutation({
        mutationFn: (payload: ICreatePet) => PetAPI.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pets"] });
            reset(defaultValues);
            onOpenChange(false);
        },
    });

    const onSubmit = handleSubmit((data) => {
        createMutation.mutate({
            ownerName: data.ownerName,
            birthDate: data.birthDate,
            weight: data.weight,
            sex: data.sex,
            specie: data.specie,
            coat: data.coat,
            vaccinated: data.vaccinated,
            ownerPhone: onlyNumbers(data.ownerPhone),
        });
    });

    const handleOpenChange = (nextOpen: boolean) => {
        if (!nextOpen) {
            reset(defaultValues);
            createMutation.reset();
        }
        onOpenChange(nextOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Adicionar pet</DialogTitle>
                    <DialogDescription>
                        Preencha os dados para cadastrar um novo pet.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit} className="grid gap-4">
                    <div className="grid gap-2 text-left">
                        <Label htmlFor="ownerName">Nome do dono</Label>
                        <Input
                            id="ownerName"
                            aria-invalid={!!errors.ownerName}
                            {...register("ownerName")}
                        />
                        {errors.ownerName && (
                            <p className="text-xs text-destructive">
                                {errors.ownerName.message}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2 text-left">
                        <Label htmlFor="ownerPhone">Telefone</Label>
                        <Controller
                            name="ownerPhone"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    id="ownerPhone"
                                    type="tel"
                                    inputMode="numeric"
                                    placeholder="(99) 99999-9999"
                                    aria-invalid={!!errors.ownerPhone}
                                    value={field.value}
                                    onChange={(event) => {
                                        field.onChange(maskPhone(event.target.value));
                                    }}
                                    onBlur={field.onBlur}
                                    ref={field.ref}
                                />
                            )}
                        />
                        {errors.ownerPhone && (
                            <p className="text-xs text-destructive">
                                {errors.ownerPhone.message}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2 text-left">
                            <Label htmlFor="specie">Espécie</Label>
                            <NativeSelect
                                id="specie"
                                className="w-full"
                                aria-invalid={!!errors.specie}
                                {...register("specie", { valueAsNumber: true })}
                            >
                                <NativeSelectOption value={SpecieEnum.Dog}>Cachorro</NativeSelectOption>
                                <NativeSelectOption value={SpecieEnum.Fox}>Raposa</NativeSelectOption>
                                <NativeSelectOption value={SpecieEnum.Duck}>Pato</NativeSelectOption>
                            </NativeSelect>
                            {errors.specie && (
                                <p className="text-xs text-destructive">
                                    {errors.specie.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2 text-left">
                            <Label htmlFor="sex">Sexo</Label>
                            <NativeSelect
                                id="sex"
                                className="w-full"
                                aria-invalid={!!errors.sex}
                                {...register("sex", { valueAsNumber: true })}
                            >
                                <NativeSelectOption value={SexEnum.Male}>Macho</NativeSelectOption>
                                <NativeSelectOption value={SexEnum.Female}>Fêmea</NativeSelectOption>
                            </NativeSelect>
                            {errors.sex && (
                                <p className="text-xs text-destructive">
                                    {errors.sex.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2 text-left">
                            <Label htmlFor="birthDate">Data de nascimento</Label>
                            <Input
                                id="birthDate"
                                type="date"
                                aria-invalid={!!errors.birthDate}
                                {...register("birthDate")}
                            />
                            {errors.birthDate && (
                                <p className="text-xs text-destructive">
                                    {errors.birthDate.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2 text-left">
                            <Label htmlFor="weight">Peso (kg)</Label>
                            <Input
                                id="weight"
                                type="number"
                                step="0.1"
                                min="0"
                                aria-invalid={!!errors.weight}
                                {...register("weight", { valueAsNumber: true })}
                            />
                            {errors.weight && (
                                <p className="text-xs text-destructive">
                                    {errors.weight.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-2 text-left">
                        <Label htmlFor="coat">Pelagem</Label>
                        <Input
                            id="coat"
                            aria-invalid={!!errors.coat}
                            {...register("coat")}
                        />
                        {errors.coat && (
                            <p className="text-xs text-destructive">
                                {errors.coat.message}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-left">
                        <input
                            id="vaccinated"
                            type="checkbox"
                            className="size-4 rounded border border-input"
                            {...register("vaccinated")}
                        />
                        <Label htmlFor="vaccinated">Vacinado</Label>
                    </div>
                    {errors.vaccinated && (
                        <p className="text-xs text-destructive text-left">
                            {errors.vaccinated.message}
                        </p>
                    )}

                    {createMutation.isError && (
                        <p className="text-sm text-destructive text-left">
                            {getApiErrorMessage(createMutation.error)}
                        </p>
                    )}

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOpenChange(false)}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={createMutation.isPending}>
                            {createMutation.isPending ? "Salvando..." : "Salvar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

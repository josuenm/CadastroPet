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
import type { IUpdatePet } from "@/types/pet.type";
import { SexEnum, SpecieEnum } from "@/types/pet.type";
import {
    createPetSchema,
    type CreatePetFormData,
} from "@/validations/create-pet.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm, type Resolver } from "react-hook-form";

interface UpdatePetDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    petId: string | null;
}

export function UpdatePetDialog({ open, onOpenChange, petId }: UpdatePetDialogProps) {
    const queryClient = useQueryClient();

    const { data: pet, isLoading } = useQuery({
        queryKey: ["pet", petId],
        queryFn: () => PetAPI.getById(petId!),
        enabled: open && !!petId,
    });

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<CreatePetFormData>({
        resolver: yupResolver(createPetSchema) as Resolver<CreatePetFormData>,
    });

    useEffect(() => {
        if (!pet) return;

        reset({
            ownerName: pet.ownerName,
            birthDate: pet.birthDate.split("T")[0],
            weight: pet.weight,
            sex: pet.sex,
            specie: pet.specie,
            coat: pet.coat,
            vaccinated: pet.vaccinated,
            ownerPhone: maskPhone(pet.ownerPhone),
        });
    }, [pet, reset]);

    const updateMutation = useMutation({
        mutationFn: (payload: IUpdatePet) => PetAPI.update(petId!, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pets"] });
            queryClient.invalidateQueries({ queryKey: ["pet", petId] });
            onOpenChange(false);
        },
    });

    const onSubmit = handleSubmit((data) => {
        updateMutation.mutate({
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
            updateMutation.reset();
        }
        onOpenChange(nextOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Atualizar pet</DialogTitle>
                    <DialogDescription>
                        Altere os dados do pet selecionado.
                    </DialogDescription>
                </DialogHeader>

                {isLoading && (
                    <p className="text-sm text-muted-foreground text-left">
                        Carregando pet...
                    </p>
                )}

                {pet && (
                    <form onSubmit={onSubmit} className="grid gap-4">
                        <div className="grid gap-2 text-left">
                            <Label htmlFor="update-ownerName">Nome do dono</Label>
                            <Input
                                id="update-ownerName"
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
                            <Label htmlFor="update-ownerPhone">Telefone</Label>
                            <Controller
                                name="ownerPhone"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        id="update-ownerPhone"
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
                                <Label htmlFor="update-specie">Espécie</Label>
                                <NativeSelect
                                    id="update-specie"
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
                                <Label htmlFor="update-sex">Sexo</Label>
                                <NativeSelect
                                    id="update-sex"
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
                                <Label htmlFor="update-birthDate">Data de nascimento</Label>
                                <Input
                                    id="update-birthDate"
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
                                <Label htmlFor="update-weight">Peso (kg)</Label>
                                <Input
                                    id="update-weight"
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
                            <Label htmlFor="update-coat">Pelagem</Label>
                            <Input
                                id="update-coat"
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
                                id="update-vaccinated"
                                type="checkbox"
                                className="size-4 rounded border border-input"
                                {...register("vaccinated")}
                            />
                            <Label htmlFor="update-vaccinated">Vacinado</Label>
                        </div>

                        {updateMutation.isError && (
                            <p className="text-sm text-destructive text-left">
                                {getApiErrorMessage(updateMutation.error)}
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
                            <Button type="submit" disabled={updateMutation.isPending}>
                                {updateMutation.isPending ? "Salvando..." : "Salvar"}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}

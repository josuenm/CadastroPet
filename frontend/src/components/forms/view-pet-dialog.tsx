import { PetAPI } from "@/api/pet.api";
import { PetPhotoAPI } from "@/api/pet-photo.api";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { maskPhone } from "@/lib/phone";
import { formatDateOnly } from "@/lib/utils";
import { sexLabels, specieLabels } from "@/types/pet.type";
import { useQuery } from "@tanstack/react-query";

interface ViewPetDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    petId: string | null;
}

function DetailItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="grid gap-1 text-left">
            <span className="text-xs text-muted-foreground">{label}</span>
            <span className="text-sm font-medium">{value}</span>
        </div>
    );
}

export function ViewPetDialog({ open, onOpenChange, petId }: ViewPetDialogProps) {
    const { data: pet, isLoading, isError } = useQuery({
        queryKey: ["pet", petId],
        queryFn: () => PetAPI.getById(petId!),
        enabled: open && !!petId,
    });

    const {
        data: photoUrl,
        isLoading: isPhotoLoading,
        isError: isPhotoError,
    } = useQuery({
        queryKey: ["pet-photo", pet?.specie, petId],
        queryFn: () => PetPhotoAPI.getRandomBySpecie(pet!.specie),
        enabled: open && !!pet,
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Detalhes do pet</DialogTitle>
                    <DialogDescription>
                        Informações completas do cadastro.
                    </DialogDescription>
                </DialogHeader>

                {isLoading && (
                    <p className="text-sm text-muted-foreground text-left">
                        Carregando pet...
                    </p>
                )}

                {isError && (
                    <p className="text-sm text-destructive text-left">
                        Erro ao carregar pet.
                    </p>
                )}

                {pet && (
                    <div className="grid gap-4">
                        <div className="overflow-hidden rounded-lg border bg-muted/30">
                            {isPhotoLoading && (
                                <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
                                    Carregando foto...
                                </div>
                            )}

                            {isPhotoError && (
                                <div className="flex h-48 items-center justify-center px-4 text-center text-sm text-destructive">
                                    Não foi possível carregar a foto.
                                </div>
                            )}

                            {photoUrl && !isPhotoLoading && (
                                <img
                                    src={photoUrl}
                                    alt={`Foto de ${specieLabels[pet.specie]}`}
                                    className="h-48 w-full object-contain"
                                />
                            )}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <DetailItem label="Dono" value={pet.ownerName} />
                            <DetailItem label="Telefone" value={maskPhone(pet.ownerPhone)} />
                            <DetailItem label="Espécie" value={specieLabels[pet.specie]} />
                            <DetailItem label="Sexo" value={sexLabels[pet.sex]} />
                            <DetailItem label="Pelagem" value={pet.coat} />
                            <DetailItem
                                label="Nascimento"
                                value={formatDateOnly(pet.birthDate)}
                            />
                            <DetailItem
                                label="Peso"
                                value={`${pet.weight}${pet.weight < 1 ? " gramas" : " kg"}`}
                            />
                            <DetailItem
                                label="Vacinado"
                                value={pet.vaccinated ? "Sim" : "Não"}
                            />
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

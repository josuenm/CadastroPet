import { PetAPI } from "@/api/pet.api";
import { CreatePetDialog } from "@/components/forms/create-pet-dialog";
import { PetActionsMenu } from "@/components/forms/pet-actions-menu";
import { UpdatePetDialog } from "@/components/forms/update-pet-dialog";
import { ViewPetDialog } from "@/components/forms/view-pet-dialog";
import { Button } from "@/components/ui/button";
import { maskPhone } from "@/lib/phone";
import { formatDateOnly } from "@/lib/utils";
import { specieLabels } from "@/types/pet.type";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PlusIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
    const [page, setPage] = useState(1);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
    const pageSize = 5;

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["pets", page, pageSize],
        queryFn: () => PetAPI.list({ page, pageSize }),
    });

    const totalPages = data ? Math.ceil(data.totalItems / data.pageSize) : 0;

    const handleView = (petId: string) => {
        setSelectedPetId(petId);
        setViewDialogOpen(true);
    };

    const handleUpdate = (petId: string) => {
        setSelectedPetId(petId);
        setUpdateDialogOpen(true);
    };

    return (
        <div className="max-w-4xl w-full mx-auto py-20 px-2 xl:px-0 flex flex-col">
            <h1 className="text-4xl w-full mb-12 text-center">
                Seja bem vindo(a) ao <strong className="text-primary">CadastroPet</strong>
            </h1>

            {isLoading && (
                <p className="mt-8 text-center text-muted-foreground">Carregando pets...</p>
            )}

            {isError && (
                <p className="mt-8 text-destructive text-center">
                    Erro ao carregar pets: {error.message}
                </p>
            )}

            {!isLoading && (
                <Button className="ml-auto" onClick={() => setCreateDialogOpen(true)}>
                    <PlusIcon />
                    Adicionar
                </Button>
            )}

            <CreatePetDialog
                open={createDialogOpen}
                onOpenChange={setCreateDialogOpen}
            />

            <ViewPetDialog
                open={viewDialogOpen}
                onOpenChange={setViewDialogOpen}
                petId={selectedPetId}
            />

            <UpdatePetDialog
                open={updateDialogOpen}
                onOpenChange={setUpdateDialogOpen}
                petId={selectedPetId}
            />

            {data && (
                <Table className="mt-8">
                    <TableCaption className="text-center">Essa é sua lista de pets.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Dono</TableHead>
                            <TableHead>Espécie</TableHead>
                            <TableHead>Pelagem</TableHead>
                            <TableHead>Nascimento</TableHead>
                            <TableHead>Peso (kg)</TableHead>
                            <TableHead>Vacinado</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead className="w-[50px]" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.items.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center text-muted-foreground">
                                    Nenhum pet cadastrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.items.map((pet) => (
                                <TableRow key={pet.id}>
                                    <TableCell className="font-medium">{pet.ownerName}</TableCell>
                                    <TableCell>{specieLabels[pet.specie]}</TableCell>
                                    <TableCell>{pet.coat}</TableCell>
                                    <TableCell>
                                        {formatDateOnly(pet.birthDate)}
                                    </TableCell>
                                    <TableCell>{pet.weight}{pet.weight < 1 ? " gramas" : " kg"}</TableCell>
                                    <TableCell>{pet.vaccinated ? "Sim" : "Não"}</TableCell>
                                    <TableCell>{maskPhone(pet.ownerPhone)}</TableCell>
                                    <TableCell className="text-right">
                                        <PetActionsMenu
                                            petId={pet.id}
                                            onView={handleView}
                                            onUpdate={handleUpdate}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={6}>
                                Página {data.page} de {totalPages || 1}
                            </TableCell>
                            <TableCell colSpan={2} className="text-right">
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        className="text-sm disabled:opacity-50"
                                        disabled={page <= 1}
                                        onClick={() => setPage((p) => p - 1)}
                                    >
                                        Anterior
                                    </button>
                                    <button
                                        type="button"
                                        className="text-sm disabled:opacity-50"
                                        disabled={page >= totalPages}
                                        onClick={() => setPage((p) => p + 1)}
                                    >
                                        Próxima
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            )}
        </div>
    );
}

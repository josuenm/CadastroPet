import { PetAPI } from "@/api/pet.api";
import { getApiErrorMessage } from "@/lib/api-error";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsThreeVerticalIcon, EyeIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface PetActionsMenuProps {
    petId: string;
    onView: (petId: string) => void;
    onUpdate: (petId: string) => void;
}

export function PetActionsMenu({ petId, onView, onUpdate }: PetActionsMenuProps) {
    const queryClient = useQueryClient();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const deleteMutation = useMutation({
        mutationFn: () => PetAPI.deleteById(petId),
        onSuccess: () => {
            setErrorMessage(null);
            queryClient.invalidateQueries({ queryKey: ["pets"] });
        },
        onError: (error) => {
            setErrorMessage(getApiErrorMessage(error));
        },
    });

    const handleDelete = () => {
        const confirmed = window.confirm("Deseja remover este pet?");
        if (!confirmed) return;

        deleteMutation.mutate();
    };

    return (
        <div className="flex flex-col items-end gap-1">
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button variant="secondary" size="sm" aria-label="Ações do pet">Ação</Button>
                    }
                >
                    <DotsThreeVerticalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-40">
                    <DropdownMenuItem onClick={() => onView(petId)}>
                        <EyeIcon />
                        Ver
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onUpdate(petId)}>
                        <PencilSimpleIcon />
                        Atualizar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                    >
                        <TrashIcon />
                        {deleteMutation.isPending ? "Removendo..." : "Remover"}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {errorMessage && (
                <span className="text-xs text-destructive">{errorMessage}</span>
            )}
        </div>
    );
}

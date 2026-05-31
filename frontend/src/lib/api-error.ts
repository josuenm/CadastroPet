import axios from "axios";

const defaultMessages: Partial<Record<number, string>> = {
    400: "Erro: campos inválidos, verifique os campos",
};

export function getApiErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status && defaultMessages[status]) {
            return defaultMessages[status]!;
        }
    }

    if (error instanceof Error && error.message) {
        return error.message;
    }

    return "Erro inesperado, tente novamente";
}

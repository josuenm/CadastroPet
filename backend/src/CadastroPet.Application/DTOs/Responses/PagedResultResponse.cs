namespace CadastroPet.Application.DTOs.Responses;

public record PagedResultResponse<T>(
    IEnumerable<T> Items,
    int totalItems,
    int page,
    int pageSize
);
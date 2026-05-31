using CadastroPet.Application.DTOs.Requests;
using CadastroPet.Application.DTOs.Responses;

namespace CadastroPet.Application.Interfaces;

public interface IPetService
{
    public Task<PetResponse> CreatePetAsync(CreatePetRequest data);
    public Task<PetResponse?> FindPetByIdAsync(Guid id);
    public Task<PagedResultResponse<PetResponse>> FindAllPetsPagedAsync(int page, int pageSize);
    public Task<bool> DeletePetByIdAsync(Guid id);
    public Task<PetResponse?> UpdatePetByIdAsync(Guid id, UpdatePetRequest data);
}
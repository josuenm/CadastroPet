using CadastroPet.Application.DTOs.Requests;
using CadastroPet.Application.DTOs.Responses;
using CadastroPet.Domain.Entities;

namespace CadastroPet.Application.Interfaces;

public interface IPetService
{
    public Task<PetResponse> CreatePetAsync(CreatePetRequest data);
    public Task<PetResponse?> FindPetByIdAsync(Guid id);
    public Task<PagedResultResponse<PetResponse>> FindAllPetsPagedAsync(int page, int pageSize);
    public Task<bool> DeletePetById(Guid id);
    public Task<PetResponse?> UpdatePetById(Guid id, UpdatePetRequest data);
}
using CadastroPet.Domain.Entities;

namespace CadastroPet.Domain.Repositories;

public interface IPetRepository
{
    public Task CreateAsync(Pet pet);
    public Task<Pet?> FindByIdAsync(Guid id);
    public Task<(IEnumerable<Pet> Items, int TotalCount)> FindAllPagedAsync(int page, int pageSize);
    public void DeleteByPet(Pet pet);
    public void UpdateByPet(Pet pet);
    public Task UnitOfWorkAsync();
}
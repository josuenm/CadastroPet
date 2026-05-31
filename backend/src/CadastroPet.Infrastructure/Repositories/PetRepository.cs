using CadastroPet.Domain.Entities;
using CadastroPet.Domain.Repositories;
using CadastroPet.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace CadastroPet.Infrastructure.Repositories;

public class PetRepository : IPetRepository
{
    private readonly ApplicationDbContext _context;

    public PetRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<(IEnumerable<Pet> Items, int TotalCount)> FindAllPagedAsync(int page, int pageSize)
    {
        if (page <= 0) page = 1;
        if (pageSize <= 0) pageSize = 1;

        var totalCount = await _context.Pets.CountAsync();

        var items = await _context.Pets
            .AsNoTracking()
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }


    public async Task CreateAsync(Pet pet)
    {
        await _context.Pets.AddAsync(pet);
        await _context.SaveChangesAsync();
    }

    public async Task<Pet?> FindByIdAsync(Guid id)
    {
        return await _context.Pets.FindAsync(id);
    }

    public void DeleteByPet(Pet pet)
    {
        _context.Pets.Remove(pet);
    }

    public void UpdateByPet(Pet pet)
    {
        _context.Pets.Update(pet);
    }

    public async Task UnitOfWorkAsync()
    {
        await _context.SaveChangesAsync();
    }
}
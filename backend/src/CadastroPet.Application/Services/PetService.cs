using CadastroPet.Application.DTOs.Requests;
using CadastroPet.Application.DTOs.Responses;
using CadastroPet.Application.Interfaces;
using CadastroPet.Domain.Entities;
using CadastroPet.Domain.Repositories;

namespace CadastroPet.Application.Services;

public class PetService : IPetService
{
    private readonly IPetRepository _petRepository;

    public PetService(IPetRepository petRepository)
    {
        _petRepository = petRepository;
    }

    public async Task<PagedResultResponse<PetResponse>> FindAllPetsPagedAsync(int page, int pageSize)
    {
        var (items, totalCount) = await _petRepository.FindAllPagedAsync(page, pageSize);

        var dtos = items.Select(pet => new PetResponse(
            pet.Id,
            pet.OwnerName,
            pet.BirthDate,
            pet.Weight,
            pet.Sex,
            pet.Specie,
            pet.Coat,
            pet.Vaccinated,
            pet.OwnerPhone
        ));

        return new PagedResultResponse<PetResponse>(
            dtos,
            totalCount,
            page,
            pageSize
        );
    }

    public async Task<PetResponse> CreatePetAsync(CreatePetRequest data)
    {
        var pet = new Pet(
            data.ownerName,
            data.birthDate,
            data.weight,
            data.sex,
            data.specie,
            data.coat,
            data.vaccinated,
            data.ownerPhone
        );

        await _petRepository.CreateAsync(pet);

        return new PetResponse(
            pet.Id,
            pet.OwnerName,
            pet.BirthDate,
            pet.Weight,
            pet.Sex,
            pet.Specie,
            pet.Coat,
            pet.Vaccinated,
            pet.OwnerPhone
        );
    }

    public async Task<PetResponse?> FindPetByIdAsync(Guid id)
    {
        var pet = await _petRepository.FindByIdAsync(id);

        if (pet == null) return null;

        return new PetResponse(
            pet.Id,
            pet.OwnerName,
            pet.BirthDate,
            pet.Weight,
            pet.Sex,
            pet.Specie,
            pet.Coat,
            pet.Vaccinated,
            pet.OwnerPhone
        );
    }

    public async Task<bool> DeletePetById(Guid id)
    {
        var pet = await _petRepository.FindByIdAsync(id);
        if (pet == null) return false;

        _petRepository.DeleteByPet(pet);
        await _petRepository.UnitOfWorkAsync();

        return true;
    }

    public async Task<PetResponse?> UpdatePetById(Guid id, UpdatePetRequest data)
    {
        var pet = await _petRepository.FindByIdAsync(id);
        if (pet == null) return null;

        pet.Update(
            data.ownerName,
            data.birthDate,
            data.weight,
            data.sex,
            data.specie,
            data.coat,
            data.vaccinated,
            data.ownerPhone
        );

        _petRepository.UpdateByPet(pet);
        await _petRepository.UnitOfWorkAsync();

        return new PetResponse(
            pet.Id,
            pet.OwnerName,
            pet.BirthDate,
            pet.Weight,
            pet.Sex,
            pet.Specie,
            pet.Coat,
            pet.Vaccinated,
            pet.OwnerPhone
        );
    }
}

using CadastroPet.Domain.Enums;

namespace CadastroPet.Application.DTOs.Requests;

public record UpdatePetRequest(
    string? ownerName,
    DateOnly? birthDate,
    decimal? weight,
    Sex sex,
    Specie specie,
    string? coat,
    bool? vaccinated,
    string? ownerPhone
);
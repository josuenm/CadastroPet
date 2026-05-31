
using CadastroPet.Domain.Enums;

namespace CadastroPet.Application.DTOs.Responses;

public record PetResponse(
    Guid id,
    string ownerName,
    DateOnly birthDate,
    decimal weight,
    Sex sex,
    Specie specie,
    string coat,
    bool vaccinated,
    string ownerPhone
);
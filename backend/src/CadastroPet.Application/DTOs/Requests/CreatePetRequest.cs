
using CadastroPet.Domain.Enums;

namespace CadastroPet.Application.DTOs.Requests;

public record CreatePetRequest(
    string ownerName,
    DateOnly birthDate,
    Sex sex,
    Specie specie,
    decimal weight,
    string coat,
    bool vaccinated,
    string ownerPhone
);
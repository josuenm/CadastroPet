

using CadastroPet.Application.DTOs.Requests;
using FluentValidation;

namespace CadastroPet.Application.Validations;

public class CreatePetRequestValidator : AbstractValidator<CreatePetRequest>
{
    public CreatePetRequestValidator()
    {
        RuleFor(x => x.ownerName)
            .NotEmpty().WithMessage("O nome do responsável é obrigatório")
            .MaximumLength(255).WithMessage("O nome do responsável precisa ter no máximo 255 caracteres");
        RuleFor(x => x.birthDate)
            .NotEmpty().WithMessage("A data de nascimento é obrigatória")
            .LessThanOrEqualTo(DateOnly.FromDateTime(DateTime.Today)).WithMessage("A data de nascimento não pode ser maior que hoje");
        RuleFor(x => x.weight)
            .NotEmpty().WithMessage("O peso é obrigatório")
            .GreaterThan(0).WithMessage("O peso deve ser maior que zero")
            .PrecisionScale(5, 3, true);
        RuleFor(x => x.sex)
            .IsInEnum().WithMessage("O sexo esta incorreta");
        RuleFor(x => x.specie)
            .IsInEnum().WithMessage("A especie esta incorreta");
        RuleFor(x => x.coat)
            .NotEmpty().WithMessage("A pelagem é obrigatório")
            .MaximumLength(255).WithMessage("A pelagem precisa ter no máximo 255 caracteres");
        RuleFor(x => x.ownerPhone)
            .NotEmpty().WithMessage("O telefone do responsável é obrigatório")
            .Matches(@"^[0-9]+$").WithMessage("O telefone deve conter apenas números.")
            .Length(10, 11).WithMessage("O telefone com DDD deve ter 10 ou 11 dígitos.");
    }
}
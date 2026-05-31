using CadastroPet.Domain.Enums;

namespace CadastroPet.Domain.Entities;

public class Pet
{
    protected Pet() { }

    public Pet(string ownerName, DateOnly birthDate, decimal weight, Sex sex, Specie specie, string coat, bool vaccinated, string ownerPhone)
    {
        Id = Guid.NewGuid();
        OwnerName = ownerName;
        BirthDate = birthDate;
        Weight = weight;
        Sex = sex;
        Specie = specie;
        Coat = coat;
        Vaccinated = vaccinated;
        OwnerPhone = ownerPhone;
    }

    public void Update(string? ownerName, DateOnly? birthDate, decimal? weight, Sex? sex, Specie? specie, string? coat, bool? vaccinated, string? ownerPhone)
    {
        OwnerName = ownerName ?? OwnerName;
        BirthDate = birthDate ?? BirthDate;
        Weight = weight ?? Weight;
        Sex = sex ?? Sex;
        Specie = specie ?? Specie;
        Coat = coat ?? Coat;
        Vaccinated = vaccinated ?? Vaccinated;
        OwnerPhone = ownerPhone ?? OwnerPhone;
    }

    public Guid Id { get; private set; }
    public string OwnerName { get; private set; } = null!;
    public DateOnly BirthDate { get; private set; }
    public decimal Weight { get; private set; }
    public Sex Sex { get; private set; } = Sex.Male;
    public Specie Specie { get; private set; } = Specie.Dog;
    public string Coat { get; private set; } = null!;
    public bool Vaccinated { get; private set; }
    public string OwnerPhone { get; private set; } = null!;
}
using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CadastroPet.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CampoSexoAdicionadoESpecieComOpcao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OwnerName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    BirthDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Weight = table.Column<decimal>(type: "decimal(5,3)", nullable: false),
                    Sex = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: false),
                    Specie = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Coat = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Vaccinated = table.Column<bool>(type: "bit", nullable: false),
                    OwnerPhone = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pets", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pets");
        }
    }
}

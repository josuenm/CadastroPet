using CadastroPet.Application.DTOs.Requests;
using CadastroPet.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CadastroPet.API.Controllers;

[ApiController]
[Route("/api/v1/[controller]")]
public class PetController : ControllerBase
{
    private readonly IPetService _petService;

    public PetController(IPetService petService)
    {
        _petService = petService;
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdatePetById(Guid id, [FromBody] UpdatePetRequest request)
    {
        var result = await _petService.UpdatePetById(id, request);
        if (result == null) return NotFound("O pet não foi encontrado");

        return Ok(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeletePetById(Guid id)
    {
        var result = await _petService.DeletePetById(id);
        if (result == false) return NotFound("O pet não foi encontrado");

        return NoContent();
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> FindById(Guid id)
    {
        return Ok(await _petService.FindPetByIdAsync(id));
    }

    [HttpGet]
    public async Task<IActionResult> FindAllPaged([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        return Ok(await _petService.FindAllPetsPagedAsync(page, pageSize));
    }

    [HttpPost]
    public async Task<CreatedAtActionResult> Create([FromBody] CreatePetRequest request)
    {
        var petCreated = await _petService.CreatePetAsync(request);
        return CreatedAtAction(nameof(FindById), new { petCreated.id }, petCreated);
    }
}

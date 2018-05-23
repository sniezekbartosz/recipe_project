using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using recipes_project.DTO;
using recipes_project.Entities;
using recipes_project.Repositories.Abstract;

namespace recipes_project.Controllers
{
    [Produces("application/json")]
    [Route("api/Category")]
    public class CategoryController : Controller
    {
        private readonly ICategoryRepository _categoryRepo;
        private readonly IMapper _mapper;
        public CategoryController(ICategoryRepository categoryRepo, IMapper mapper)
        {
            this._categoryRepo = categoryRepo;
            this._mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            var cat = await _categoryRepo.GetByIdAsync(id);
            var result = _mapper.Map<CategoryDTO>(cat);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CategoryDTO category)
        {
            var categoryEntity = _mapper.Map<Category>(category);
            await _categoryRepo.AddAsync(categoryEntity);
            return Ok(category);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await _categoryRepo.DeleteAsync("ss",id);
            return Ok();
        }
    }
}
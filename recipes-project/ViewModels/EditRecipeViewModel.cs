using recipes_project.DTO;
using recipes_project.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace recipes_project.ViewModels
{
    public class EditRecipeViewModel
    {
        public Recipe Recipe { get; set; }
        public IEnumerable<CategoryDTO> Categories { get; set; }
    }
}

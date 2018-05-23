using recipes_project.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace recipes_project.DTO
{
    public class RecipeDTO
    {
        public int RecipeId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CategoryName { get; set; }
        public string Author { get; set; }
        public DateTime Added { get; set; }
        public Ingredient[] Ingredients { get; set; }
        public string ImgPath { get; set; }


    }
}

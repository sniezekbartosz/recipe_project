using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace recipes_project.Entities
{
    public class Recipe
    {
        public Recipe()
        {
            this.Ingredients = new HashSet<Ingredient>();
        }
        public int RecipeId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public DateTime Added { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
        public ICollection<Ingredient> Ingredients { get; set; }
        public string ImgPath { get; set; }
    }
}

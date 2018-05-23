namespace recipes_project.Entities
{
    public class Ingredient
    {
        public int IngredientId { get; set; }
        public string Name { get; set; }
        public int RecipeId { get; set; }
    }
}
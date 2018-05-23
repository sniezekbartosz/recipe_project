using AutoMapper;
using recipes_project.DTO;
using recipes_project.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace recipes_project.Profiles
{
    public class RecipeProfile : Profile
    {
        public RecipeProfile()
        {
            CreateMap<Recipe, RecipeDTO>()
                .ForMember(dest => dest.CategoryName, m => m.MapFrom(src => src.Category.Name));
        }
    }
}

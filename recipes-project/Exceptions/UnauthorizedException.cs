using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace recipes_project.Exceptions
{
    public class UnauthorizedException : CustomException
    {
        public UnauthorizedException() : base("Nieautoryzowane żądanie")
        {
        }
    }
}

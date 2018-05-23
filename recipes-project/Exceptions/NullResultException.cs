using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace recipes_project.Exceptions
{
    public class NullResultException : CustomException
    {
        public NullResultException() : base("Zasób nie istnieje")
        {
        }
    }
}

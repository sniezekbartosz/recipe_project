﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace recipes_project.Exceptions
{
    public class CustomException : Exception
    {
        public CustomException(string message): base(message)
        {

        }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kooboo.Dom
{
 public  enum enumHtmlTokenType
    {
     StartTag=1,
     EndTag=2,
     EOF=3,
     DocType=4,
     Comment=5, 
     Character=6
    }
}
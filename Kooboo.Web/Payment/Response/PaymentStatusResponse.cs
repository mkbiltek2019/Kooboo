﻿using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kooboo.Web.Payment.Models
{
   public class PaymentStatusResponse
    { 
        public bool HasResult { get; set; }

        private bool SetPaid;
        private bool SetFailed;

        private bool _paid; 
        public bool Paid {
            get
            {

            } 
            set
            {
                _paid = value;
                SetPaid = true; 
            }
        }

        public bool Failed { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public  PaymentStatus Status
        {
            get;set;
        }

        public string Message { get; set; }
    }
}

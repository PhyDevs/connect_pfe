﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Connect.Models
{
    public enum Roles
    {
        Admin,
        Teacher,
        Student
    }

    public class ConnectUser
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }

        public int NInscription { get; set; }

        public string Password { get; set; }

        public Roles Role { get; set; }
    }
}

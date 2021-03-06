﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect.Models
{
    public enum Roles
    {
        Student,
        Teacher,
        Admin
    }

    public class ConnectUser
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int NInscription { get; set; }

        public byte[] Salt { get; set; }

        public byte[] Password { get; set; }

        public Roles Role { get; set; }

        public List<UserDepartment> Departments { get; set; }
    }
}

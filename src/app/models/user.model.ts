export interface Role {
  roleId: number;
  roleName: string;
  isActive: boolean;
  createdAt: string;
  createdOn: string;
  modifiedAt: string | null;
  modifiedOn: string | null;
  companyId: number;
}

export interface Company {
  companyId: number;
  profilePic: string;
  name: string;
  phone: string;
  address: string;
  createdAt: string;
  createdOn: string;
  modifiedAt: string | null;
  modifiedOn: string | null;
  isActive: boolean;
}

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  profilePic: string;
  gender: string;
  email: string;
  companyId: number;
  company: Company;
  createdAt: string;
  createdOn: string;
  modifiedAt: string | null;
  modifiedOn: string | null;
  isActive: boolean;
  createdBy: string;
  modifiedBy: string;
  role: Role; // Single role object
  roles: Role[]; // Array of roles
}

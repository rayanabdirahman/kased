export interface ISignUpModel {
  firstName: string;
  lastName: string;
  vatNumber?: string;
  email: string;
  password: string;
  organisationName?: string;
  businessType?: string;
  occupationTitle?: string;
  role?: number;
  history?: [];
}

export interface ILoginModel {
  email: string;
  password: string;
}

export interface ICreateCategoryModel {
  name: string;
}

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

export interface ICreateProductModel {
  name: string | string[];
  description: string | string[];
  price: string | string[];
  category: string | string[];
  quantity: string | string[];
  photo: any;
  shipping?: string | string[];
  sold?: string | string[];
}

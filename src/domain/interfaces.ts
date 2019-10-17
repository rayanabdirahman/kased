export interface ISignUpModel {
  firstName: string;
  lastName: string;
  vatNumber?: string;
  email: string;
  password: string;
  confirmPassword: string;
  organisationName?: string;
  businessType?: string;
  occupationTitle?: string;
  role?: number;
  history?: [];
}

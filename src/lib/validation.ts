import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const firstSectionSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
});

export const secondSectionSchema = Yup.object({
  companyName: Yup.string().required('Company name is required'),
  industry: Yup.string().required('Industry is required'),
  registrationNumber: Yup.string().required('Registration number is required'),
  emailDomain: Yup.string().email('Invalid email domain').required('Email domain is required'),
  companyType: Yup.string().required('Company type is required'),
  departments: Yup.array().of(Yup.string().required('Please add at least one department')),

});


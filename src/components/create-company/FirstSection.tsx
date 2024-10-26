"use client";
const FirstSection = ({ formik }: { formik: any }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <h1 className="text-main text-2xl font-semibold">Company Owner Account</h1>
        <p className="text-base font-normal text-[#6F6C90]">This section concerns the company owner's personal account details.</p>
      </div>
      <form className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-2">
          <div>
            <label htmlFor="firstName" className="label-style">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}  
              value={formik.values.firstName}
              className="text-black input-style w-full"
              placeholder="Enter your first name"
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="lastName" className="label-style">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}  
              value={formik.values.lastName}
              className="text-black input-style w-full"
              placeholder="Enter your last name"
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="label-style">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}  
            value={formik.values.email}
            className="text-black input-style w-full"
            placeholder="Enter your email address"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="password" className="label-style">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}  
            value={formik.values.password}
            className="text-black input-style w-full"
            placeholder="Create a password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="label-style">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}  
            value={formik.values.confirmPassword}
            className="text-black input-style w-full"
            placeholder="Confirm your password"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default FirstSection;

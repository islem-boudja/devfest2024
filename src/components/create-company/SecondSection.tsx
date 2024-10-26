"use client";
const SecondSection = ({ formik }: { formik: any }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <h1 className="text-main text-2xl font-semibold">Company account</h1>
        <p className="text-base font-normal text-[#6F6C90]">This section concerns the company infromation.</p>
      </div>
      <form className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-2">
          <div>
            <label htmlFor="companyName" className="label-style">
              company name
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}  
              value={formik.values.companyName}
              className="text-black input-style w-full"
              placeholder="Enter your company name"
            />
            {formik.touched.companyName && formik.errors.companyName ? (
              <div className="text-red-500 text-sm">{formik.errors.companyName}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="industry" className="label-style">
              industry
            </label>
            <input
              id="industry"
              name="industry"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}  
              value={formik.values.industry}
              className="text-black input-style w-full"
              placeholder="Enter your industry"
            />
            {formik.touched.industry && formik.errors.industry ? (
              <div className="text-red-500 text-sm">{formik.errors.industry}</div>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="registrationNumber" className="label-style">
            registration number
          </label>
          <input
            id="registrationNumber"
            name="registrationNumber"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}  
            value={formik.values.registrationNumber}
            className="text-black input-style w-full"
            placeholder="Enter your registration number"
          />
          {formik.touched.registrationNumber && formik.errors.registrationNumber ? (
            <div className="text-red-500 text-sm">{formik.errors.registrationNumber}</div>
          ) : null}
        </div>
        <div className="flex items-center gap-x-2">

        <div>
          <label htmlFor="emailDomain" className="label-style">
            email Domain
          </label>
          <input
            id="emailDomain"
            name="email Domain"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}  
            value={formik.values.emailDomain}
            className="text-black input-style w-full"
            placeholder="Create a email Domain"
          />
          {formik.touched.emailDomain && formik.errors.emailDomain ? (
            <div className="text-red-500 text-sm">{formik.errors.emailDomain}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="companyType" className="label-style">
            Company type
          </label>
          <input
            id="companyType"
            name="companyType"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}  
            value={formik.values.companyType}
            className="text-black input-style w-full"
            placeholder="Enter your company type"
          />
          {formik.touched.companyType && formik.errors.companyType ? (
            <div className="text-red-500 text-sm">{formik.errors.companyType}</div>
          ) : null}
        </div>
        </div>
      </form>
    </div>
  );
};

export default SecondSection;

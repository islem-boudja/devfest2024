"use client";
import Image from "next/image";
import { useState } from "react";
import FirstSection from "~/components/create-company/FirstSection";
import SecondSection from "~/components/create-company/SecondSection";
import ThirdSection from "~/components/create-company/ThirdSection";
import FourthSection from "~/components/create-company/FourthSection";
import { firstSectionSchema, secondSectionSchema } from "~/lib/validation";
import Header from "~/components/ui/Header";
import { useFormik } from "formik";

const createCompanyPage = () => {
  const [currentSection, setCurrentSection] = useState(1);

  const handleSectionValidation = () => {
    switch (currentSection) {
      case 1:
        return firstSectionSchema;
      case 2:
        return secondSectionSchema;
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      industry: "",
      registrationNumber: "",
      emailDomain: "",
      companyType: "",
      departments: ["Marketing", "Sales", "Finance", "Human Resources"],
    },
    validationSchema: handleSectionValidation(), // Dynamically set schema based on current section
    validateOnChange: true,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  const handleNextStep = () => {
    formik.setTouched(
      Object.keys(formik.values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as any) // Mark all fields as touched
    );
    formik.validateForm().then((errors) => {
      console.log("errors", errors);
      if (Object.keys(errors).length === 0) {
        setCurrentSection(currentSection + 1);
      }
    });
  };

  const handlePreviousStep = () => {
    setCurrentSection(currentSection - 1);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Header />
      <div className="flex flex-col items-center gap-y-6 p-4">
        <div className="self-start">
          <Image src="/fiscailogo.svg" alt="fiscAI" width={150} height={150} />
        </div>
        <div className="max-w-[40%] self-center flex flex-col items-center gap-y-4 ">
          <div className="flex flex-col gap-y-2 text-center">
            <h1 className="text-2xl font-bold text-main ">
              Create a company account
            </h1>
            <p className="text-wrap text-base font-normal text-[#6F6C90]">
              Please fill the form below to your company in our system. Make
              sure to fill all the details.
            </p>
          </div>
          <div className="bg-white flex items-center justify-between gap-x-2 rounded-2xl p-4">
            {[1, 2, 3, 4].map((section, index) => (
              <>
                <div
                  className={`font-main flex size-10 cursor-pointer items-center justify-center rounded-full p-2 text-center text-base font-medium transition-all ${
                    section <= currentSection
                      ? "text-white bg-second"
                      : "bg-[#EFF0F6] text-[#6F6C90]"
                  } `}
                  onClick={() => setCurrentSection(section)}
                >
                  {section}
                </div>
                {section < 4 && (
                  <div
                    className={`h-1 w-20 rounded-xl transition-all ${
                      section < currentSection ? "bg-second" : "bg-[#EFF0F6]"
                    }`}
                  ></div>
                )}
              </>
            ))}
          </div>
          <div className="h-[2px] w-full rounded-lg bg-[#66666640]"></div>
          <div>
            {currentSection === 1 ? (
              <FirstSection formik={formik} />
            ) : currentSection === 2 ? (
              <SecondSection formik={formik} />
            ) : currentSection === 3 ? (
              <ThirdSection formik={formik} />
            ) : (
              <FourthSection formik={formik} />
            )}
          </div>
          <div className="flex gap-x-2 self-end font-semibold text-base">
            {(currentSection === 2 || currentSection === 3) && (
              <div
                className="bg-white cursor-pointer px-4 rounded-full border border-solid border-[#4A3AFF] p-2 text-center text-[#4A3AFF]"
                onClick={() => handlePreviousStep()}
              >
                Previous Step
              </div>
            )}
            {currentSection < 4 && (
              <div
                className="text-white cursor-pointer px-4 rounded-full bg-second p-2 text-center"
                onClick={() => handleNextStep()}
              >
                {currentSection < 3 ? "Next Step" : "Validate"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default createCompanyPage
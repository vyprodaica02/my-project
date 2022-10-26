/* eslint-disable jsx-a11y/anchor-is-valid */
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
// import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import useLocalStorage from "../../hook/useLocalStorage";
import RouterPage from "./RouterPage";
const Register = () => {
  const navigate = useNavigate();

  const { storedValue, setValue } = useLocalStorage("users", {});
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        passWord: "",
        conFirmPassWord: "",
        wasLogin: false,
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(20, "Must be 20  characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(10, "Must be 20  characters or less")
          .min(7, "Enter at least 10 characters")
          .required("Required"),
        email: Yup.string().email().required("Required"),
        passWord: Yup.string()
          .required("No password provided.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
        conFirmPassWord: Yup.string().oneOf(
          [Yup.ref("passWord"), null],
          "Passwords must match"
        ),
      })}
      onSubmit={(values) => {
        setValue(values);
        alert("bạn đăng kí thành công");
        navigate("/login");
      }}
      autoComplete="off"
    >
      <div>
        <Form className="p-10 w-full max-w-[500px] mx-auto bg-white mt-[50px] mb-8">
          <div className="flex flex-col gap-2 mb-5 ">
            <label htmlFor="firstName">First Name</label>
            <Field
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              className="p-4 border rounded-md border-gray-600 text-black"
            ></Field>
            <div className="text-sm text-red-500">
              <ErrorMessage name="firstName"></ErrorMessage>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-5 ">
            <label htmlFor="lastName">Last Name</label>
            <Field
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              className="p-4 border rounded-md border-gray-600 text-black"
            ></Field>
            <div className="text-sm text-red-500">
              <ErrorMessage name="lastName"></ErrorMessage>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-5 ">
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              type="email"
              placeholder="Enter your email"
              className="p-4 border rounded-md border-gray-600 text-black"
            ></Field>
            <div className="text-sm text-red-500">
              <ErrorMessage name="email"></ErrorMessage>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-5 ">
            <label htmlFor="passWord">Pass Word</label>
            <Field
              name="passWord"
              type="password"
              placeholder="Enter your pass word"
              className="p-4 border rounded-md border-gray-600 text-black"
            ></Field>
            <div className="text-sm text-red-500">
              <ErrorMessage name="passWord"></ErrorMessage>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-5 ">
            <label htmlFor="conFirmPassWord">First Name</label>
            <Field
              name="conFirmPassWord"
              type="password"
              placeholder="Enter your confirm pass word"
              className="p-4 border rounded-md border-gray-600 text-black"
            ></Field>
            <div className="text-sm text-red-500">
              <ErrorMessage name="conFirmPassWord"></ErrorMessage>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-blue-600 text-white rounded-lg"
          >
            Register
          </button>
          <RouterPage child={"Go to login"} router={"login"}></RouterPage>
        </Form>
      </div>
    </Formik>
  );
};

// function GoHomePage() {
//   const navigate = useNavigate();

//   const handleGotoLogin = () => {
//     navigate("/login");
//   };
//   return (
//     <div className="relative">
//       <div
//         className="fixed cursor-pointer p-5 bg-primary rounded-2xl"
//         onClick={() => handleGotoLogin()}
//       >
//         Login
//       </div>
//     </div>
//   );
// }
export default Register;

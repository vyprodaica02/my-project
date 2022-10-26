/* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import RouterPage from "./RouterPage";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  console.log(data);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users"));
    if (data) {
      setData(data);
    }
  }, [setData]);
  // console.log(data);
  return (
    <Formik
      initialValues={{
        email: "",
        passWord: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email().required("Required"),
        passWord: Yup.string()
          .min(7, "Must be 7  characters or less")
          .required("Required"),
      })}
      onSubmit={(values) => {
        if (values.email === data.email && values.passWord === data.passWord) {
          const newUpdate = {
            ...data,
            wasLogin: true,
          };
          localStorage.setItem("users", JSON.stringify(newUpdate));
          navigate("/");
        } else {
          alert("tai khoan mk khong chinh xac");
        }
      }}
      autoComplete="off"
    >
      <div>
        <RouterPage
          child={"Home Page"}
          router={""}
          className={`text-primary border border-gray-600 p-4 rounded-lg bg-slate-200`}
        ></RouterPage>
        <Form className="p-10 w-full max-w-[500px] m-auto bg-white mt-[200px]">
          <div className="flex flex-col gap-2 mb-5 ">
            <label htmlFor="email" className="text-black">
              Email
            </label>
            <Field
              name="email"
              type="email"
              placeholder="Enter your first name"
              className="p-4 border rounded-md border-gray-600 text-black"
            ></Field>
            <div className="text-sm text-red-500">
              <ErrorMessage name="email"></ErrorMessage>
            </div>
          </div>
          <div className="flex  flex-col gap-2 mb-5">
            <label htmlFor="passWord" className="text-black">
              Pass word
            </label>
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
          <button
            type="submit"
            className="w-full p-4 bg-blue-600 text-white rounded-lg"
          >
            Submit
          </button>
          <span
            onClick={() => navigate("/resister")}
            className="text-blue-600 cursor-pointer flex justify-center items-center p-4 mt-10 underline "
          >
            Create Account
          </span>
        </Form>
      </div>
    </Formik>
  );
};

export default Login;

import { Link, useNavigate } from "react-router-dom";
import socialMedia from "../../assets/social-media.png";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../redux/apiRequests";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.register.message);
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, "Maximun 20 characters")
        .min(6, "Mininum 6 characters")
        .required("Required"),
      email: Yup.string()
        .max(50, "Maximum 50 character")
        .required("Required")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter valid email address"
        ),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{6,19}$/,
          "Minimum 6 characters, at least one letter, one number, one special character"
        ),
    }),
    onSubmit: (values) => {
      const newUser = {
        email: values.email,
        username: values.username,
        password: values.password,
      };
      registerUser(newUser, dispatch, navigate);
    },
  });

  return (
    <div className="flex items-center justify-center bg-slate-50 h-screen">
      <div className="flex flex-col w-9/12 items-center justify-center">
        <img src={socialMedia} alt="brand" className="rounded-full p-2 w-40" />
        <span className="text-3xl mb-4">Sign up</span>
        <div className="flex flex-col items-center">
          <form onSubmit={formik.handleSubmit} className="w-40rem">
            <label className="w-full block"> EMAIL </label>
            <input
              required
              id="email"
              name="email"
              type="text"
              className="w-full h-10 border-input block"
              placeholder="Enter email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />

            <label className="w-full mt-4 block"> USERNAME </label>
            <input
              required
              id="username"
              name="username"
              type="text"
              className="w-full h-10 border-input block"
              placeholder="Enter username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.errors.username && (
              <p className="errMsg mb-2">{formik.errors.username}</p>
            )}

            <label className="w-full mt-4 block"> PASSWORD </label>
            <input
              required
              id="password"
              name="password"
              type="password"
              className="w-full h-10 border-input block"
              placeholder="Enter password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && (
              <p className="errMsg">{formik.errors.password}</p>
            )}
            {error && (
              <p className="errMsg">
                {" "}
                {error
                  .substr(50)
                  .replace("to be unique", "already existed")}{" "}
              </p>
            )}

            <button
              type="submit"
              className="text-center w-full bg-green-400 h-10 mt-4"
            >
              Create account
            </button>
          </form>
          <span className="my-4">Already have an account?</span>
          <Link
            className="text-blue-400 text-xl underline underline-offset-2 hover:text-blue-600 mb-4"
            to="/login"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react'
import { useFormik } from "formik"
import * as yup from "yup"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Spinner } from "react-bootstrap"
import { useLoginAdminMutation } from '../../redux/api/authApi'
import { handleClassess } from '../../utils/handleClassess'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [adminLogin,{isSuccess,isError,isLoading,error}] = useLoginAdminMutation()
    const formik = useFormik({
          initialValues: {
              email: "",
              password: "",
          },
          validationSchema: yup.object({
              email: yup.string().required("Enter Email"),
              password: yup.string().required("Enter Password"),
          }),
          onSubmit: (values, { resetForm }) => {
            adminLogin(values)
              resetForm()
          }
      })

      useEffect(()=>{
        if(isSuccess){
          toast.success("admin login success")
          navigate("/admin")
        }
      },[isSuccess])

      useEffect(()=>{
        if(isError){
          toast.error(error?.data?.message || "something went wrong")
        }
      },[isError])
      
      useEffect(()=>{
        const admin = localStorage.getItem("admin")
        if(admin){
          navigate("/admin")
        }
      },[navigate])

      if(isLoading){
        return <>
        please wait.... <Spinner></Spinner>
        </>
      }
      
  return <>
  <form onSubmit={formik.handleSubmit}>
  <div class="container">
        <div class="row">
          <div class="col-sm-6 offset-sm-3">
            <div class="card">
              <div class="card-header">Admin Login</div>
              <div class="card-body">
                <div>
                  <label for="email" class="form-label">First Email</label>
                  <input
                    type="text"
                    className={handleClassess(formik,"email")}
                    {...formik.getFieldProps("email")}
                    id="email"
                    placeholder="Enter Your Email"
                    />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">{formik.errors.email}</div>
                </div>
                <div class="mt-2">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    className={handleClassess(formik,"password")}
                    {...formik.getFieldProps("password")}
                    id="password"
                    placeholder="Enter Your Password"
                  />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">{formik.errors.password}</div>
                </div>
                <button type="submit" class="btn btn-primary w-100 mt-3">
                  Login
                </button>
                <p class="text-center mt-3">
                  Dont Have Account? <a href="#">Create Account</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </>
}

export default AdminLogin
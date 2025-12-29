import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useRegisterRentalMutation } from '../../redux/api/authApi'
import { handleClassess } from '../../utils/handleClassess'
import { Spinner } from 'react-bootstrap'

const RentalRegister = () => {
   const navigate = useNavigate()
      const [rentalRegister,{isSuccess,isError,isLoading,error}] = useRegisterRentalMutation()
        const formik = useFormik({
              initialValues: {
                  name: "",
                  email: "",
                  mobile: "",
                  password: "",
              },
              validationSchema: yup.object({
                  name: yup.string().required("Enter Name"),
                  email: yup.string().required("Enter Email"),
                  mobile: yup.string().required("Enter Mobile"),
                  password: yup.string().required("Enter Password"),
              }),
              onSubmit: (values, { resetForm }) => {
                rentalRegister(values)
                  resetForm()
              }
          })
    
          useEffect(()=>{
            if(isSuccess){
              toast.success("admin login success")
              navigate("/rental")
            }
          },[isSuccess])
    
          useEffect(()=>{
            if(isError){
              toast.error(error?.data?.message || "something went wrong")
            }
          },[isError])
          
    
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
                  <div class="card-header">Rental Register</div>
                  <div class="card-body">
                    <div>
                      <label for="name" class="form-label">Name</label>
                      <input
                        type="text"
                        className={handleClassess(formik,"name")}
                        {...formik.getFieldProps("name")}
                        id="name"
                        placeholder="Enter Your name"
                        />
                      <div class="valid-feedback">Looks good!</div>
                      <div class="invalid-feedback">{formik.errors.name}</div>
                    </div>
                    <div class="mt-2">
                      <label for="email" class="form-label">Email</label>
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
                      <label for="mobile" class="form-label">Mobile</label>
                      <input
                        type="text"
                        className={handleClassess(formik,"mobile")}
                        {...formik.getFieldProps("mobile")}
                        id="mobile"
                        placeholder="Enter Your mobile"
                        />
                      <div class="valid-feedback">Looks good!</div>
                      <div class="invalid-feedback">{formik.errors.mobile}</div>
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
                      Register
                    </button>
                    <p class="text-center mt-3">
                       Have Account? <Link to="/rental-login"><a href="#">Login account</a></Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
}

export default RentalRegister
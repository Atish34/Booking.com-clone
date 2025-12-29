import { useFormik } from 'formik'
import React from 'react'
import * as yup from "yup"
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterCustomerMutation } from '../../redux/api/authApi'
import { handleClassess } from '../../utils/handleClassess'
import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'

const CustomerRegister = () => {
   const [customerRegister,{isSuccess,isError,isLoading,error}] = useRegisterCustomerMutation()
    const navigate = useNavigate()
      const formik = useFormik({
            initialValues: {
                name: "",
                email: "",
                mobile: "",
            },
            validationSchema: yup.object({
                name: yup.string().required("Enter Name"),
                email: yup.string().required("Enter Name"),
                mobile: yup.string().required("Enter Name"),
            }),
            onSubmit: (values, { resetForm }) => {
                customerRegister(values)
                resetForm()
            }
        })

        useEffect(()=>{
            if(isSuccess){
                toast.success("customer register success")
                navigate("/customer-login")
            }
        },[isSuccess])

        // useEffect(()=>{
        //     if(isError){
        //         toast.error(data.error.message || "something went wrong")
        //     }
        // },[isError])

        if(isLoading){
            return<>
            please Wait...<Spinner></Spinner>
            </>
        }

  return <>
  <form onSubmit={formik.handleSubmit}>
  <div class="container">
        <div class="row">
          <div class="col-sm-6 offset-sm-3">
            <div class="card">
              <div class="card-header">Signup</div>
              <div class="card-body">
                <div>
                  <label for="name" class="form-label">name</label>
                  <input
                    type="text"
                    className={handleClassess(formik,"name")}
                    {...formik.getFieldProps("name")}
                    id="name"
                    placeholder="Enter your name"
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
                    id="Mobile"
                    placeholder="Enter Your Mobile"
                  />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">{formik.errors.mobile}</div>
                </div>
               
                <button type="submit" class="btn btn-primary w-100 mt-3">
                  Signup
                </button>
                <p class="text-center mt-3">
                  Already Have Account? <Link to="/customer-login"><a href="#">Login</a></Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </form>
  </>
}

export default CustomerRegister
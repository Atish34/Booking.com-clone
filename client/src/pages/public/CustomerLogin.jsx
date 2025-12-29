import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginCustomerMutation, useVerifyCustomerMutation } from '../../redux/api/authApi'
import { useState } from 'react'
import * as yup from "yup"
import { handleClassess } from '../../utils/handleClassess'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Spinner } from 'react-bootstrap'

const CustomerLogin = () => {
    const [showOtp, setShowOtp] = useState(false)
    const navigate = useNavigate()
   const [LoginIn,{isSuccess,isError,isLoading,error}] = useLoginCustomerMutation()
   const [verifyCustomerOtp,{isSuccess:customerIsSuccess,isError:customerIsError,isLoading:customerIsLoading,error:customerError}] = useVerifyCustomerMutation()

     const formik = useFormik({
           initialValues: {
               userName: "",
               otp: "",
           },
           validationSchema: yup.object({
               userName: yup.string().required("Enter userName"),
               otp: yup.string()
           }),
           onSubmit: (values, { resetForm }) => {
            if(showOtp){
                verifyCustomerOtp(values)
            }else{
                LoginIn(values)
            }
               //resetForm()
           }
       })

       useEffect(()=>{
        if(isSuccess){
            formik.setFieldValue("otp","")
            setShowOtp(true)
            toast.success("please verify otp")
        }
       },[isSuccess])

       useEffect(()=>{
        if(isError){
            toast.error(error.message)
        }
       },[isError])

       useEffect(()=>{
        if(customerIsSuccess){
            toast.success("login success")
            navigate("/")
        }
       },[customerIsSuccess])

        useEffect(()=>{
        if(customerIsError){
            toast.error(customerError.message)
        }
       },[customerIsError])

       useEffect(()=>{
        const customer = localStorage.getItem("customer")
        if(customer){
            navigate("/")
        }
       },[navigate])

       if(customerIsLoading || isLoading){
        return<>
        please wait...<Spinner></Spinner>
        </>
       }

  return <>
  <form onSubmit={formik.handleSubmit}>
  <div class="container">
        <div class="row">
          <div class="col-sm-6 offset-sm-3">
            <div class="card">
              <div class="card-header">Login</div>
              <div class="card-body">
                {
                    showOtp
                    ?
                    <div>
                     <label for="email" class="form-label">Otp</label>
                     <input
                      type="text"
                      className={handleClassess(formik,"otp")}
                      {...formik.getFieldProps("otp")}
                      id="otp"
                       placeholder="Enter Otp send to you"
                     />
                     <div class="valid-feedback">Looks good!</div>
                     <div class="invalid-feedback">{formik.errors.otp}</div>
                     </div>
                    :
                    <div>
                     <label for="email" class="form-label">UserName</label>
                     <input
                      type="text"
                      className={handleClassess(formik,"userName")}
                       {...formik.getFieldProps("userName")}
                      id="userName"
                       placeholder="Enter Your Email or Mobile"
                     />
                     <div class="valid-feedback">Looks good!</div>
                     <div class="invalid-feedback">{formik.errors.userName}</div>
                     </div>
                }
              

                <button type="submit" className={`btn w-100 mt-3 ${showOtp ? "btn-warning" : "btn-primary"}`}>
                  {showOtp ? "verify otp" : "Login"}
                </button>
                <p class="text-center mt-3">
                  Dont Have Account? <Link to="/customer-register"><a href="#">Create Account</a></Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </form>
</>
}

export default CustomerLogin
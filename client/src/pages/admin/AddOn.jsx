import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { handleClassess } from '../../utils/handleClassess'
import { useAddAdminAirplaneMutation, useUpdateAdminAirplaneMutation } from '../../redux/api/adminApi'
import { toast } from 'react-toastify'

const AddOn = () => {
  const navigate = useNavigate()
  const {state} = useLocation()
  const editData = state?.editData
  const isEdit = Boolean(editData)


   const [addVehicle,{isSuccess,isLoading}] = useAddAdminAirplaneMutation()
  const [updateVehicle,{isSuccess:updateSuccess}] = useUpdateAdminAirplaneMutation()

  const formik = useFormik({
    initialValues: {
      name: editData?.name || "",
      from: editData?.from || "",
      to: editData?.to || "",
      departDate: editData?.departDate || "",
      departTime: editData?.departTime || "",
      arriveDate: editData?.arriveDate || "",
      arriveTime: editData?.arriveTime || "",
      number: editData?.number || "",
      amount: editData?.amount || "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Enter airline Name"),
      from: yup.string().required("Enter leaving from location"),
      to: yup.string().required("Enter going to location"),
      departDate: yup.string().required("Select leaving date"),
      departTime: yup.string().required("Select leaving time"),
      arriveDate: yup.string().required("Select arrival date"),
      arriveTime: yup.string().required("Select arrival time"),
      number: yup.string().required("Enter passanger capacity number"),
      amount: yup.string().required("Enter amount"),

    }),
    onSubmit: (values, { resetForm }) => {
      if(isEdit){
        updateVehicle({id:editData._id,...values})
      }else{
        addVehicle(values)
      }
      resetForm()
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("airplane added successfully");
      navigate("/admin/flight")
    }
   }, [isSuccess]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success("airplane update successfully");
      navigate("/admin/flight")
    }
  }, [updateSuccess]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container mt-3">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div className="card">
              <div className="card-header">Register Airplane</div>
              <div className="card-body">
                <div className="mt-2">
                  <label htmlFor="name" className="form-label">Airline Name</label>
                  <select
                    id="name"
                    className={handleClassess(formik, "name")}
                    {...formik.getFieldProps("name")}
                  >
                    <option value="">-- Select Airline Name --</option>
                    <option value="IndiGo">IndiGo</option>
                    <option value="AirIndia">AirIndia</option>
                    <option value="Akasa">Akasa</option>
                  </select>
                  <div className="invalid-feedback">{formik.errors.name}</div>
                </div>

                <div className="mt-2">
                  <label htmlFor="from" className="form-label">leaving From</label>
                  <input
                    type="text"
                    id="from"
                    className={handleClassess(formik, "from")}
                    placeholder="Enter leaving from location"
                    {...formik.getFieldProps("from")}
                  />
                  <div className="invalid-feedback">{formik.errors.from}</div>
                </div>

                <div className="mt-2">
                  <label htmlFor="to" className="form-label">going to</label>
                  <input
                    type="text"
                    id="to"
                    className={handleClassess(formik, "to")}
                    placeholder="Enter going to location"
                    {...formik.getFieldProps("to")}
                  />
                  <div className="invalid-feedback">{formik.errors.to}</div>
                </div>

                 {/* Leaving Date & Time */}
                <div className="mt-2">
                  <label className="form-label">Leaving Date</label>
                  <input
                    type="date"
                    className={handleClassess(formik, "departDate")}
                    {...formik.getFieldProps("departDate")}
                  />
                  <div className="invalid-feedback">
                    {formik.errors.departDate}
                  </div>
                </div>

                 {/* Leaving Date & Time */}
                <div className="mt-2">
                  <label className="form-label">Leaving Time</label>
                  <input
                    type="time"
                    className={handleClassess(formik, "departTime")}
                    {...formik.getFieldProps("departTime")}
                  />
                  <div className="invalid-feedback">
                    {formik.errors.departTime}
                  </div>
                </div>

                {/* Arrival Date & Time */}
                <div className="mt-2">
                  <label className="form-label">Going To Date</label>
                  <input
                    type="date"
                    className={handleClassess(formik, "arriveDate")}
                    {...formik.getFieldProps("arriveDate")}
                  />
                  <div className="invalid-feedback">
                    {formik.errors.arriveDate}
                  </div>
                </div>

                <div className="mt-2">
                  <label className="form-label">Going To Time</label>
                  <input
                    type="time"
                    className={handleClassess(formik, "arriveTime")}
                    {...formik.getFieldProps("arriveTime")}
                  />
                  <div className="invalid-feedback">
                    {formik.errors.arriveTime}
                  </div>
                </div>

                 <div className="mt-2">
                  <label htmlFor="number" className="form-label">passanger capacity</label>
                  <input
                    type="text"
                    id="number"
                    className={handleClassess(formik, "number")}
                    placeholder="Enter passanger capacity"
                    {...formik.getFieldProps("number")}
                  />
                  <div className="invalid-feedback">{formik.errors.number}</div>
                </div>

                 <div className="mt-2">
                  <label htmlFor="amount" className="form-label">Amount</label>
                  <input
                    type="text"
                    id="amount"
                    className={handleClassess(formik, "amount")}
                    placeholder="Enter amount"
                    {...formik.getFieldProps("amount")}
                  />
                  <div className="invalid-feedback">{formik.errors.amount}</div>
                </div>
                 
                

                <button   type="submit" className={`btn w-100 mt-3 ${isEdit ? "btn-warning" : "btn-primary"}`}>
                  {isEdit ? "Update airplane" : "Add airplane"}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </form>
  );
}

export default AddOn
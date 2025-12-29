import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { handleClassess } from "../../utils/handleClassess";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddRentalVehicleMutation, useUpdateRentalPropertyMutation } from "../../redux/api/rentalApi";

const RHome = () => {
  const navigate = useNavigate()
  const {state} = useLocation()
  const editData = state?.editData
  const isEdit = Boolean(editData)

  const [addVehicle,{isSuccess,isLoading}] = useAddRentalVehicleMutation()
  const [updateVehicle,{isSuccess:updateSuccess}] = useUpdateRentalPropertyMutation()
  

  const formik = useFormik({
    initialValues: {
      name: editData?.name || "",
      vtype: editData?.vtype || "",
      number: editData?.number ||"",
      capacity: editData?.capacity ||"",
      ftype: editData?.ftype ||"",
    },
    validationSchema: yup.object({
      name: yup.string().required("Enter vehicle Name"),
      vtype: yup.string().required("Enter vehicle type"),
      number: yup.string().required("Enter vehicle number"),
      capacity: yup.string().required("Enter vehicle capacity"),
      ftype: yup.string().required("Enter vehicle fuel type"),

    }),
    onSubmit: (values, { resetForm }) => {
      if(isEdit){
        updateVehicle({id:editData._id,...values})
      }else{
        addVehicle(values).unwrap()
      }
      resetForm()
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("vehicle added successfully");
      navigate("/rental/allrental")
    }
  }, [isSuccess]);
  useEffect(() => {
    if (updateSuccess) {
      toast.success("Property update successfully");
      navigate("/rental/allrental")
    }
  }, [updateSuccess]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div className="card">
              <div className="card-header">Register Vehicle</div>
              <div className="card-body">
                {/* Property Name */}
                <div>
                  <label htmlFor="name" className="form-label">vehical Name</label>
                  <input
                    type="text"
                    id="name"
                    className={handleClassess(formik, "name")}
                    placeholder="Enter vehicle name"
                    {...formik.getFieldProps("name")}
                  />
                  <div className="invalid-feedback">{formik.errors.name}</div>
                </div>

                <div className="mt-2">
                  <label htmlFor="vtype" className="form-label">Vehicle Type</label>
                  <select
                    id="vtype"
                    className={handleClassess(formik, "vtype")}
                    {...formik.getFieldProps("vtype")}
                  >
                    <option value="">-- Select Vehicle Type --</option>
                    <option value="2 wheeler">2 wheeler</option>
                    <option value="3 wheeler">3 wheeler</option>
                    <option value="4 wheeler">4 wheeler</option>
                  </select>
                  <div className="invalid-feedback">{formik.errors.vtype}</div>
                </div>

                <div className="mt-2">
                  <label htmlFor="number" className="form-label">Vehicle number</label>
                  <input
                    type="text"
                    id="number"
                    className={handleClassess(formik, "number")}
                    placeholder="Enter vehicle number"
                    {...formik.getFieldProps("number")}
                  />
                  <div className="invalid-feedback">{formik.errors.number}</div>
                </div>

                <div className="mt-2">
                  <label htmlFor="capacity" className="form-label">Vehicle Capacity</label>
                  <input
                    type="text"
                    id="capacity"
                    className={handleClassess(formik, "capacity")}
                    {...formik.getFieldProps("capacity")}
                    placeholder="Enter vehicle capacity"
                  />
                  <div className="invalid-feedback">{formik.errors.capacity}</div>
                </div>

                 <div className="mt-2">
                  <label htmlFor="ftype" className="form-label">Vehicle Fuel Type</label>
                  <select
                    id="ftype"
                    className={handleClassess(formik, "ftype")}
                    {...formik.getFieldProps("ftype")}
                  >
                    <option value="">-- Select Vehicle Fuel Type --</option>
                    <option value="petrol">petrol</option>
                    <option value="disel">disel</option>
                    <option value="cng">cng</option>
                  </select>
                  <div className="invalid-feedback">{formik.errors.ftype}</div>
                </div>
                 
                

                <button   type="submit" className={`btn w-100 mt-3 ${isEdit ? "btn-warning" : "btn-primary"}`}>
                  {isEdit ? "Update Vehicle" : "Add Vehicle"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RHome;

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { handleClassess } from "../../utils/handleClassess";
import { useAddOwnerPropertyMutation, useUpdateOwnerPropertyMutation } from "../../redux/api/ownerApi";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const OHome = () => {
  const navigate = useNavigate()
  const {state} = useLocation()
  const editData = state?.editData
  const isEdit = Boolean(editData)

  const [addProperty, { isSuccess,isLoading }] = useAddOwnerPropertyMutation();
  const [updateProperty, { isSuccess:updateSuccess,isLoading:updateLoading }] = useUpdateOwnerPropertyMutation();

   const [licensePreview, setLicensePreview] = useState(editData?.license || null);
  const [imgPreview, setImgPreview] = useState(editData?.img || []);

  const formik = useFormik({
    initialValues: {
      name: editData?.name || "",
      ptype: editData?.ptype || "",
      address: editData?.address ||"",
      license: "", // single file
      img: [],       // multiple files
    },
    validationSchema: yup.object({
      name: yup.string().required("Enter property Name"),
      ptype: yup.string().required("Enter property type"),
      address: yup.string().required("Enter property address"),
      license: yup.mixed().test(
    "license-validation",
    "Only JPG, PNG images are allowed",
    function (file) {
      if (!file) {
        // no file selected
        return isEdit ? true : false;
      }
      return ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
    }
  ),

  img: yup.mixed().test(
    "img-validation",
    "Only JPG, PNG images are allowed",
    function (files) {
      if (!files || files.length === 0) {
        // no images selected
        return isEdit ? true : false;
      }
      return files.every(file =>
        ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
      );
    }
  ),
    }),
    onSubmit: (values, { resetForm }) => {
       const fd = new FormData();

  // common fields
  fd.append("name", values.name);
  fd.append("ptype", values.ptype);
  fd.append("address", values.address);

  if (isEdit) {
    // ⚠️ license & img only append if user selected new files
    if (values.license) {
      fd.append("license", values.license);
    }

    if (values.img && values.img.length > 0) {
      values.img.forEach(file => fd.append("img", file));
    }

     updateProperty({id:editData._id,formData:fd})
  } else {
    // ADD MODE → files are required
    fd.append("license", values.license);
    values.img.forEach(file => fd.append("img", file));

    addProperty(fd);
  }
  resetForm();
},
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Property added successfully");
      navigate("/owner/allproperty")
    }
  }, [isSuccess]);
  useEffect(() => {
    if (updateSuccess) {
      toast.success("Property update successfully");
      navigate("/owner/allproperty")
    }
  }, [updateSuccess]);

  return (
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div className="card">
              <div className="card-header">Register Property</div>
              <div className="card-body">
                {/* Property Name */}
                <div>
                  <label htmlFor="name" className="form-label">Property Name</label>
                  <input
                    type="text"
                    id="name"
                    className={handleClassess(formik, "name")}
                    placeholder="Enter property name"
                    {...formik.getFieldProps("name")}
                  />
                  <div className="invalid-feedback">{formik.errors.name}</div>
                </div>

                {/* Property Type */}
                <div className="mt-2">
                  <label htmlFor="ptype" className="form-label">Property Type</label>
                  <select
                    id="ptype"
                    className={handleClassess(formik, "ptype")}
                    {...formik.getFieldProps("ptype")}
                  >
                    <option value="">-- Select Property Type --</option>
                    <option value="hotel">Hotel</option>
                    <option value="hostel">Hostel</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                  </select>
                  <div className="invalid-feedback">{formik.errors.ptype}</div>
                </div>

                {/* Address */}
                <div className="mt-2">
                  <label htmlFor="address" className="form-label">Property Address</label>
                  <input
                    type="text"
                    id="address"
                    className={handleClassess(formik, "address")}
                    placeholder="Enter property address"
                    {...formik.getFieldProps("address")}
                  />
                  <div className="invalid-feedback">{formik.errors.address}</div>
                </div>

                {/* License */}
                 {licensePreview && (
              <img src={licensePreview} height="80" alt="license" />
            )}
                <div className="mt-2">
                  <label htmlFor="license" className="form-label">Property License</label>
                  <input
                    type="file"
                    id="license"
                    className={handleClassess(formik, "license")}
                    onChange={(e) => formik.setFieldValue("license", e.target.files[0])}
                  />
                  <div className="invalid-feedback">{formik.errors.license}</div>
                </div>

                {/* Property Images */}
                 <div className="d-flex gap-2 flex-wrap">
              {imgPreview.map((img, i) => (
                <img key={i} src={img} height="60" alt="property" />
              ))}
            </div>
                <div className="mt-2">
                  <label htmlFor="img" className="form-label">Property Images</label>
                  <input
                    type="file"
                    id="img"
                    className={handleClassess(formik, "img")}
                    multiple
                    onChange={(e) => formik.setFieldValue("img", Array.from(e.target.files))}
                  />
                  <div className="invalid-feedback">{formik.errors.img}</div>
                </div>

                <button disabled={isLoading || updateLoading}  type="submit" className={`btn w-100 mt-3 ${isEdit ? "btn-warning" : "btn-primary"}`}>
                  {isEdit ? "Update Property" : "Add Property"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default OHome;

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  useDeleteRentalBookMutation,
  useGetRentalVehicleBookQuery,
  useUpdateRentalAmountMutation,
  useUpdateRentalBookMutation,
} from "../../redux/api/rentalApi";

const Bookings = () => {
  const rental = useSelector((state) => state.auth.rental);
  const rentalId = rental?._id;

  // ✅ store amount per booking
  const [amounts, setAmounts] = useState({});

  const { data, isLoading, isSuccess } =
    useGetRentalVehicleBookQuery(rentalId);

  const [updateRental, { isSuccess: updateSuccess }] =
    useUpdateRentalBookMutation();

  const [deleteVehicle, { isSuccess: deleteSuccess }] =
    useDeleteRentalBookMutation();

  const [updateAmount, { isSuccess: amountSuccess }] =
    useUpdateRentalAmountMutation();

  useEffect(() => {
    if (isSuccess) toast.success("booking get success");
  }, [isSuccess]);

  useEffect(() => {
    if (deleteSuccess) toast.success("booking delete success");
  }, [deleteSuccess]);

  useEffect(() => {
    if (updateSuccess) toast.success("booking update success");
  }, [updateSuccess]);

  useEffect(() => {
    if (amountSuccess) toast.success("amount updated successfully");
  }, [amountSuccess]);

  const handleAmountChange = (id, value) => {
    setAmounts((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleUpdateAmount = (id) => {
    if (!amounts[id]) {
      toast.error("Please enter amount");
      return;
    }

    updateAmount({
      id,
      amount: amounts[id],
    });
  };

  if (isLoading) {
    return (
      <>
        please wait... <Spinner />
      </>
    );
  }

  return (
    <>
      {data && (
        <table
          style={{ maxWidth: "80%" }}
          className="table table-light table-hover table-bordered mt-5 mx-auto"
        >
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Vehicle</th>
              <th>Type</th>
              <th>Number</th>
              <th>Capacity</th>
              <th>Fuel</th>
              <th>Pickup</th>
              <th>Pickup Time</th>
              <th>Drop</th>
              <th>Drop Time</th>
              <th>Amount</th>
              <th>Confirm</th>
              <th>Cancel</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.result.map((item) => (
              <tr key={item._id}>
                <td>{item.customerId?.name}</td>
                <td>{item.customerId?.email}</td>
                <td>{item.customerId?.mobile}</td>
                <td>{item.name}</td>
                <td>{item.vtype}</td>
                <td>{item.number}</td>
                <td>{item.capacity}</td>
                <td>{item.ftype}</td>
                <td>{item.pickup}</td>
                <td>{item.pickupTime}</td>
                <td>{item.drop}</td>
                <td>{item.dropTime}</td>

                {/* ✅ Amount */}
                <td>
                  {item.amount ? (
                    <strong>₹{item.amount}</strong>
                  ) : (
                    <>
                      <input
                        type="number"
                        className="form-control mb-1"
                        placeholder="Enter amount"
                        value={amounts[item._id] || ""}
                        onChange={(e) =>
                          handleAmountChange(item._id, e.target.value)
                        }
                      />
                      <button
                        className="btn btn-sm btn-primary w-100"
                        onClick={() => handleUpdateAmount(item._id)}
                      >
                        Add
                      </button>
                    </>
                  )}
                </td>

                {/* ✅ Confirm */}
                <td>
                  <select
                    className="form-control"
                    value={item.isConfirm}
                    onChange={(e) =>
                      updateRental({
                        id: item._id,
                        isConfirm: e.target.value === "true",
                      })
                    }
                  >
                    <option value={true}>Confirm</option>
                    <option value={false}>Not Confirm</option>
                  </select>
                </td>

                <td>{item.isCancel ? "cancel" : "not cancel"}</td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteVehicle(item._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Bookings;

import React from 'react'
import { useDeleteHotelBookMutation, useGetOwnerHotelBookQuery, useOwnerChangeStatusMutation } from '../../redux/api/ownerApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

const Bookings = () => {
  const owner = useSelector((state) => state.auth.owner);
    const ownerId = owner?._id;
  
  
    const { data, isLoading, isSuccess } = useGetOwnerHotelBookQuery(ownerId);
  
    const [changeStatus,{ isSuccess: updateSuccess }] = useOwnerChangeStatusMutation();
  
    const [deleteHotel, { isSuccess: deleteSuccess }] = useDeleteHotelBookMutation();
  
  
    useEffect(() => {
      if (isSuccess) toast.success("booking get success");
    }, [isSuccess]);
  
    useEffect(() => {
      if (deleteSuccess) toast.success("booking delete success");
    }, [deleteSuccess]);
  
    useEffect(() => {
      if (updateSuccess) toast.success("booking update success");
    }, [updateSuccess]);
  
  
  
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
            style={{ maxWidth: "90%" }}
            className="table table-light table-hover table-bordered mt-5 mx-auto"
          >
            <thead>
        <tr>
          <th scope="col">customer name</th>
          <th scope="col">customer email</th>
          <th scope="col">customer mobile</th>
          <th scope="col">name</th>
          <th scope="col">address</th>
          <th scope="col">type</th>
          <th scope="col">room type</th>
          <th scope="col">room price</th>
          <th scope="col">from Date</th>
          <th scope="col">to Date</th>
          <th scope="col">totalAmount</th>
          <th scope="col">isCancel</th>
          <th scope="col">Status</th>
          <th scope="col">updateStatus</th>
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody>
        {
          data && data.result.map(item => <tr
          key={item.id}>
            <td>{item.customerId?.name}</td>
            <td>{item.customerId?.email}</td>
            <td>{item.customerId?.mobile}</td>
            <td>{item.hotelId?.name}</td>
            <td>{item.hotelId?.address}</td>
            <td>{item.hotelId?.ptype}</td>
            <td>{item.room.roomType}</td>
            <td>{item.room.price}</td>
            <td>{item.fromDate}</td>
            <td>{item.toDate}</td>
            <td>{item.hamount}</td>
            <td>{item.isCancel ? "cancel" : "not-cancel"}</td>
            <td>{item.bookingStatus}</td>
            <td>
                <select onChange={e=>changeStatus({bookingStatus:e.target.value,id:item._id})} className='form-control'>
                    <option value=''>choose status</option>
                    <option value='pending'>pending</option>
                    <option value='confirmed'>confirmed</option>
                    <option value='cancelled'>cancelled</option>
                </select>
            </td>
            <td>
              <button onClick={()=>deleteHotel(item._id)} className='btn btn-sm btn-danger'>delete</button>
            </td>
          </tr>)
        }
      </tbody>
          </table>
        )}
      </>
    );
}

export default Bookings
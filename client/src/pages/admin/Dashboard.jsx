import React from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAdminGetAirplaneBookQuery, useAdminGetHotelBookQuery, useAdminGetRentalBookQuery, useDeleteAdminAirplaneBookMutation, useUpdateAdminAirplaneBookMutation } from '../../redux/api/adminApi'

const Dashboard = () => {
  const navigate = useNavigate()
  
  const {data,isSuccess,isLoading} = useAdminGetAirplaneBookQuery()
  const {data:rentalData,isSuccess:rentalSuccess,isLoading:rentalLoading} = useAdminGetRentalBookQuery()
  const {data:hotelData,isSuccess:hotelSuccess,isLoading:hotelLoading} = useAdminGetHotelBookQuery()
  const [updateAdminBook,{isSuccess:updateSuccess}] = useUpdateAdminAirplaneBookMutation()
  const [deleteAdminBook,{isSuccess:deleteSuccess}] = useDeleteAdminAirplaneBookMutation()
  console.log(hotelData);
  
    useEffect(()=>{
      if(isSuccess){
        toast.success("airplane book get success")
      }
    },[isSuccess])
    useEffect(()=>{
      if(updateSuccess){
        toast.success("airplane book update success")
      }
    },[updateSuccess])
    useEffect(()=>{
      if(deleteSuccess){
        toast.success("airplane book delete success")
      }
    },[deleteSuccess])

  
    if(isLoading){
      return <>
      please wait...<Spinner></Spinner>
      </>
    }
    
    return <>
    <div className='container mt-3'>
    <h1>All Airplane Booking</h1>
    </div>
    { data && <table style={{maxWidth:"80%"}} class="table table-light table-hover table-bordered mt-3 mx-auto">
      <thead>
        <tr>
          <th scope="col">customer name</th>
          <th scope="col">customer email</th>
          <th scope="col">customer mobile</th>
          <th scope="col">name</th>
          <th scope="col">from</th>
          <th scope="col">to</th>
          <th scope="col">departDate</th>
          <th scope="col">departTime</th>
          <th scope="col">arriveDate</th>
          <th scope="col">arriveTime</th>
          <th scope="col">flightNo.</th>
          <th scope="col">passangers</th>
          <th scope="col">amount</th>
          <th scope="col">isCancel</th>
          <th scope="col">confirmation</th>
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody>
        {
          data && data.result.map(item => <tr
          key={item.id}>
            <td>{item.customerId.name}</td>
            <td>{item.customerId.email}</td>
            <td>{item.customerId.mobile}</td>
            <td>{item.name}</td>
            <td>{item.from}</td>
            <td>{item.to}</td>
            <td>{item.departDate}</td>
            <td>{item.departTime}</td>
            <td>{item.arriveDate}</td>
            <td>{item.arriveTime}</td>
            <td>{item.number}</td>
            <td>{item.passengers}</td>
            <td>{item.totalAmount}</td>
            <td>{item.isCancel ? "cancel" : "not cancel"}</td>
            <td>
               <select onChange={e => updateAdminBook({id:item._id,isConfirm:e.target.value})}
            value={item.isConfirm} className="form-control">
              <option value={true}>Confirm</option>
              <option value={false}>not Confirm</option>
            </select>
            </td>
            <td>
              <button onClick={() => deleteAdminBook(item._id)} className='btn btn-sm btn-danger'>delete</button>
            </td>
          </tr>)
        }
      </tbody>
    </table>
    }

    <div className='container mt-3'>
    <h1>All Rental Booking</h1>
    </div>
    { rentalData && <table style={{maxWidth:"80%"}} class="table table-light table-hover table-bordered mt-3 mx-auto">
      <thead>
        <tr>
          <th scope="col">customer name</th>
          <th scope="col">customer email</th>
          <th scope="col">customer mobile</th>
          <th scope="col">rental name</th>
          <th scope="col">rental email</th>
          <th scope="col">rental mobile</th>
          <th scope="col">name</th>
          <th scope="col">number</th>
          <th scope="col">capacity</th>
          <th scope="col">fuel type</th>
          <th scope="col">vehicle type</th>
          <th scope="col">pickup</th>
          <th scope="col">pickup Time</th>
          <th scope="col">drop</th>
          <th scope="col">drop Time</th>
          <th scope="col">amount</th>
          <th scope="col">isCancel</th>
          <th scope="col">confirmation</th>
        </tr>
      </thead>
      <tbody>
        {
          rentalData && rentalData.result.map(item => <tr
          key={item.id}>
            <td>{item.customerId.name}</td>
            <td>{item.customerId.email}</td>
            <td>{item.customerId.mobile}</td>
            <td>{item.rentalId.name}</td>
            <td>{item.rentalId.email}</td>
            <td>{item.rentalId.mobile}</td>
            <td>{item.name}</td>
            <td>{item.number}</td>
            <td>{item.capacity}</td>
            <td>{item.ftype}</td>
            <td>{item.vtype}</td>
            <td>{item.pickup}</td>
            <td>{item.pickupTime}</td>
            <td>{item.drop}</td>
            <td>{item.dropTime}</td>
            <td>{item.amount}</td>
            <td>{item.isCancel ? "cancel" : "not cancel"}</td>
            <td>{item.isConfirm ? "confirm" : "not confirm"}</td>
          </tr>)
        }
      </tbody>
    </table>
    }

    <div className='container mt-3'>
    <h1>All Hotel Booking</h1>
    </div>
    { hotelData && <table style={{maxWidth:"90%"}} class="table table-light table-hover table-bordered mt-3 mx-auto">
      <thead>
        <tr>
          <th scope="col">customer name</th>
          <th scope="col">customer email</th>
          <th scope="col">customer mobile</th>
          <th scope="col">owner name</th>
          <th scope="col">owner email</th>
          <th scope="col">name</th>
          <th scope="col">address</th>
          <th scope="col">type</th>
          <th scope="col">room type</th>
          <th scope="col">room price</th>
          <th scope="col">from date</th>
          <th scope="col">to date</th>
          <th scope="col">total amount</th>
          <th scope="col">isCancel</th>
          <th scope="col">book status</th>
        </tr>
      </thead>
      <tbody>
        {
          hotelData && hotelData.result.map(item => <tr
          key={item.id}>
            <td>{item.customerId.name}</td>
            <td>{item.customerId.email}</td>
            <td>{item.customerId.mobile}</td>
            <td>{item.ownerId.name}</td>
            <td>{item.ownerId.email}</td>
            <td>{item.hotelId.name}</td>
            <td>{item.hotelId.address}</td>
            <td>{item.hotelId.ptype}</td>
            <td>{item.room.roomType}</td>
            <td>{item.room.price}</td>
            <td>{item.fromDate}</td>
            <td>{item.toDate}</td>
            <td>{item.hamount}</td>
            <td>{item.isCancel ? "cancel" : "not cancel"}</td>
            <td>{item.bookingStatus}</td>
          </tr>)
        }
      </tbody>
    </table>
    }
    </>
}

export default Dashboard
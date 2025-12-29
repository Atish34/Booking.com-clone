import React from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCustomerCancelAirplaneBookMutation, useCustomerCancelHotelBookMutation, useCustomerCancelRentalBookMutation, useGetCustomerAirplaneBookQuery, useGetCustomerHotelBookQuery, useGetCustomerRentalBookQuery } from '../../redux/api/customerApi'

const Cart = () => {
  const navigate = useNavigate()
  const customer = useSelector(state => state.auth.customer)
  const customerId = customer?.customer
  
  const {data,isSuccess,isLoading} = useGetCustomerAirplaneBookQuery(customerId)
  const {data:rentalData,isSuccess:rentalSuccess,isLoading:rentalLoading} = useGetCustomerRentalBookQuery(customerId)
  const {data:hotelData,isSuccess:hotelSuccess,isLoading:hotelLoading} = useGetCustomerHotelBookQuery(customerId)
  const [updateCustomer,{isSuccess:updateSuccess}] = useCustomerCancelAirplaneBookMutation()
  const [updateRentalCustomer,{isSuccess:updateRentalSuccess}] = useCustomerCancelRentalBookMutation()
  const [updateHotelCustomer,{isSuccess:updateHotelSuccess}] = useCustomerCancelHotelBookMutation()
  
    useEffect(()=>{
      if(isSuccess){
        toast.success("property get success")
      }
    },[isSuccess])
    useEffect(()=>{
      if(rentalSuccess){
        toast.success("rental get success")
      }
    },[rentalSuccess])
    useEffect(()=>{
      if(hotelSuccess){
        toast.success("hotel get success")
      }
    },[hotelSuccess])

  
    if(isLoading){
      return <>
      please wait...<Spinner></Spinner>
      </>
    }
    if(rentalLoading){
      return <>
      please wait...<Spinner></Spinner>
      </>
    }
    if(hotelLoading){
      return <>
      please wait...<Spinner></Spinner>
      </>
    }
    
    return <>
    <div className='container mt-3'>
    <h1>Airplane Booking</h1>
    </div>
    { data && <table style={{maxWidth:"80%"}} class="table table-light table-hover table-bordered mt-3 mx-auto">
      <thead>
        <tr>
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
          <th scope="col">confirmation</th>
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody>
        {
          data && data.result.map(item => <tr
          key={item.id}>
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
            <td>{item.isConfirm ? "confirm" : "not confirm"}</td>
            <td>
              <button disabled={updateSuccess || (item.isCancel === true)} onClick={e => updateCustomer({_id:item._id,isCancel:true})} className='btn btn-sm btn-danger'>Cancel</button>
            </td>
          </tr>)
        }
      </tbody>
    </table>
    }

    <div className='container mt-3'>
    <h1>Rental Booking</h1>
    </div>
    { rentalData && <table style={{maxWidth:"80%"}} class="table table-light table-hover table-bordered mt-3 mx-auto">
      <thead>
        <tr>
          <th scope="col">rental name</th>
          <th scope="col">rental email</th>
          <th scope="col">rental mobile</th>
          <th scope="col">vehicle name</th>
          <th scope="col">vehicle number</th>
          <th scope="col">vehicle capacity</th>
          <th scope="col">vehicle type</th>
          <th scope="col">pickup</th>
          <th scope="col">pickup Time</th>
          <th scope="col">drop</th>
          <th scope="col">drop Time</th>
          <th scope="col">passanger</th>
          <th scope="col">amount</th>
          <th scope="col">confirmation</th>
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody>
        {
          rentalData && rentalData.result.map(item => <tr
          key={item.id}>
            <td>{item.rentalId?.name}</td>
            <td>{item.rentalId?.email}</td>
            <td>{item.rentalId?.mobile}</td>
            <td>{item.name}</td>
            <td>{item.number}</td>
            <td>{item.capacity}</td>
            <td>{item.vtype}</td>
            <td>{item.pickup}</td>
            <td>{item.pickupTime}</td>
            <td>{item.drop}</td>
            <td>{item.dropTime}</td>
            <td>{item.passanger}</td>
            <td>{item.amount}</td>
            <td>{item.isConfirm ? "confirm" : "not confirm"}</td>
            <td>
              <button disabled={updateRentalSuccess || (item.isCancel === true)} onClick={e => updateRentalCustomer({_id:item._id,isCancel:true})} className='btn btn-sm btn-danger'>Cancel</button>
            </td>
          </tr>)
        }
      </tbody>
    </table>
    }

    <div className='container mt-3'>
    <h1>Hotel Booking</h1>
    </div>
    { hotelData && <table style={{maxWidth:"80%"}} class="table table-light table-hover table-bordered mt-3 mx-auto">
      <thead>
        <tr>
          <th scope="col">owner name</th>
          <th scope="col">owner email</th>
          <th scope="col">name</th>
          <th scope="col">address</th>
          <th scope="col">type</th>
          <th scope="col">room type</th>
          <th scope="col">room price</th>
          <th scope="col">from Date</th>
          <th scope="col">to Date</th>
          <th scope="col">totalAmount</th>
          <th scope="col">Status</th>
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody>
        {
          hotelData && hotelData.result.map(item => <tr
          key={item.id}>
            <td>{item.ownerId?.name}</td>
            <td>{item.ownerId?.email}</td>
            <td>{item.hotelId?.name}</td>
            <td>{item.hotelId?.address}</td>
            <td>{item.hotelId?.ptype}</td>
            <td>{item.room.roomType}</td>
            <td>{item.room.price}</td>
            <td>{item.fromDate}</td>
            <td>{item.toDate}</td>
            <td>{item.hamount}</td>
            <td>{item.bookingStatus}</td>
            <td>
              <button disabled={updateHotelSuccess || (item.isCancel === true)} onClick={e => updateHotelCustomer({_id:item._id,isCancel:true})} className='btn btn-sm btn-danger'>Cancel</button>
            </td>
          </tr>)
        }
      </tbody>
    </table>
    }
    </>
}

export default Cart
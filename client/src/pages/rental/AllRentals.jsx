import React from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDeleteRentalPropertyMutation, useGetRentalVehicleQuery } from '../../redux/api/rentalApi'

const AllRentals = () => {
  const navigate = useNavigate()
  const rental = useSelector(state => state.auth.rental)
  const rentalId = rental?._id
  
  const {data,isSuccess,isLoading} = useGetRentalVehicleQuery(rentalId)
  const [deleteVehicle,{isSuccess:deleteSuccess}] = useDeleteRentalPropertyMutation()
  
    useEffect(()=>{
      if(isSuccess){
        toast.success("vehicle get success")
      }
    },[isSuccess])

    useEffect(()=>{
      if(deleteSuccess){
        toast.success("vehicle delete success")
      }
    },[deleteSuccess])
  
    if(isLoading){
      return <>
      please wait...<Spinner></Spinner>
      </>
    }
    
    return <>
    { data && <table style={{maxWidth:"80%"}} class="table table-light table-hover table-bordered mt-5 mx-auto">
      <thead>
        <tr>
          <th scope="col">name</th>
          <th scope="col">type</th>
          <th scope="col">number</th>
          <th scope="col">capacity</th>
          <th scope="col">fuel type</th>
          <th scope="col">allow</th>
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody>
        {
          data && data.result.map(item => <tr
          key={item.id}>
            <td>{item.name}</td>
            <td>{item.vtype}</td>
            <td>{item.number}</td>
            <td>{item.capacity}</td>
            <td>{item.ftype}</td>
            <td>{item.isAllow ? "Allowed" : "Not Allowed"}</td>
            <td>
              <button onClick={()=>navigate("/rental",{state:{editData:item}})} type="button" class="btn btn-warning">edit</button>
              <button onClick={e => deleteVehicle(item._id)} type="button" class="btn btn-danger">delete</button>
            </td>
          </tr>)
        }
      </tbody>
    </table>
    }
    </>
}

export default AllRentals
import React from 'react'
import {  useAdminBlockUnblockVehicleMutation,  useAdminGetVehicleQuery } from '../../redux/api/adminApi'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Spinner } from 'react-bootstrap'

const Vehicle = () => {
  const {data,isSuccess,isLoading} = useAdminGetVehicleQuery()
  const [updateAdminVehicle,{isSuccess:updateSuccess}] = useAdminBlockUnblockVehicleMutation()
    useEffect(()=>{
      if(isSuccess){
        toast.success("vehicle get success")
      }
    },[isSuccess])
    useEffect(()=>{
      if(updateSuccess){
        toast.success("vehicle update success")
      }
    },[updateSuccess])
   
  
    if(isLoading){
      return <>
      please wait...<Spinner></Spinner>
      </>
    }
    
    return <>
    { data && <table style={{maxWidth:"80%"}} class="table table-light table-hover table-bordered mt-5 mx-auto">
      <thead>
        <tr>
          <th scope="col">owner name</th>
          <th scope="col">owner email</th>
          <th scope="col">vehicle name</th>
          <th scope="col">vehicle type</th>
          <th scope="col">vehicle number</th>
          <th scope="col">vehicle fuel type</th>
          <th scope="col">isAllow</th>
        </tr>
      </thead>
      <tbody>
        {
          data && data.result.map(item => <tr className={`${item.isAllow ? "table-success" : "table-danger"}`}
          key={item.id}>
            <td>{item.rentalId.name}</td>
            <td>{item.rentalId.email}</td>
            <td>{item.name}</td>
            <td>{item.vtype}</td>
            <td>{item.number}</td>
            <td>{item.ftype}</td>
            <td>
              <select onChange={e => updateAdminVehicle({_id:item._id,isAllow:e.target.value})}
              value={item.isAllow} className="form-control">
                <option value={true}>Allow</option>
                <option value={false}>Not allow</option>
              </select>
            </td>
          </tr>)
        }
        
      </tbody>
    </table>
    }
    </>
}

export default Vehicle
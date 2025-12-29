import React, { useEffect } from 'react'
import { useAdminBlockUnblockRentalMutation, useAdminGetRentalQuery } from '../../redux/api/adminApi'
import { toast } from 'react-toastify'
import { Spinner } from 'react-bootstrap'

const Rentals = () => {
   const {data,isSuccess,isLoading} = useAdminGetRentalQuery()
    const [updateAdmin,{isSuccess:updateSuccess,isError,error}] = useAdminBlockUnblockRentalMutation()
  
    useEffect(()=>{
      if(isSuccess){
        toast.success("rental get success")
      }
    },[isSuccess])
    useEffect(()=>{
      if(isError){
        toast.error(error.data.message)
      }
    },[isError])
  
    useEffect(()=>{
      if(updateSuccess){
        toast.success("customer update success")
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
          <th scope="col">name</th>
          <th scope="col">email</th>
          <th scope="col">is active</th>
        </tr>
      </thead>
      <tbody>
        {
          data && data.result.map(item => <tr className={`${item.isActive ? "table-success" : "table-danger"}`}
          key={item.id}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>
              <select onChange={e => updateAdmin({_id:item._id,isActive:e.target.value})}
              value={item.isActive} className="form-control">
                <option value={true}>Active</option>
                <option value={false}>InActive</option>
              </select>
            </td>
          </tr>)
        }
      </tbody>
    </table>
    }
    </>
}

export default Rentals
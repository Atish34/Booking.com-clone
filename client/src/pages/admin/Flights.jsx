import React, { useEffect } from 'react'
import { useAdminGetAirplaneQuery, useDeleteAdminAirplaneMutation } from '../../redux/api/adminApi'
import { toast } from 'react-toastify'
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Flights = () => {
  const navigate = useNavigate()
   const {data,isSuccess,isLoading} = useAdminGetAirplaneQuery()
   const [deleteAirplane,{isSuccess:deleteSuccess}] = useDeleteAdminAirplaneMutation()
   
      useEffect(()=>{
        if(isSuccess){
          toast.success("airplane get success")
        }
      },[isSuccess])
      useEffect(()=>{
        if(deleteSuccess){
          toast.success("airplane delete success")
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
            <th scope="col">from</th>
            <th scope="col">to</th>
            <th scope="col">depart date</th>
            <th scope="col">depart time</th>
            <th scope="col">arrive Date</th>
            <th scope="col">arrive Time</th>
            <th scope="col">passanger capacity</th>
            <th scope="col">amount</th>
            <th scope="col">Action</th>
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
              <td>{item.amount}</td>
              <td>
                <button onClick={()=>navigate("/admin/addon",{state:{editData:item}})} type="button" class="btn btn-warning">edit</button>
                <button onClick={() => deleteAirplane(item._id)} type="button" class="btn btn-danger">delete</button>
              </td>
            </tr>)
          }
          
        </tbody>
      </table>
      }
      </>
}

export default Flights
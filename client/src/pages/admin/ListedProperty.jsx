import React from 'react'
import { useAdminBlockUnblockPropertyMutation, useAdminGetPropertyQuery } from '../../redux/api/adminApi'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Spinner } from 'react-bootstrap'

const ListedProperty = () => {
  const {data,isSuccess,isLoading} = useAdminGetPropertyQuery()
  const [updateAdminProperty,{isSuccess:updateSuccess}] = useAdminBlockUnblockPropertyMutation()
    useEffect(()=>{
      if(isSuccess){
        toast.success("property get success")
      }
    },[isSuccess])
    useEffect(()=>{
      if(updateSuccess){
        toast.success("property update success")
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
          <th scope="col">property name</th>
          <th scope="col">property type</th>
          <th scope="col">property address</th>
          <th scope="col">property license</th>
          <th scope="col">property image</th>
          <th scope="col">isAllow</th>
        </tr>
      </thead>
      <tbody>
        {
          data && data.result.map(item => <tr className={`${item.isAllow ? "table-success" : "table-danger"}`}
          key={item.id}>
            <td>{item.ownerId.name}</td>
            <td>{item.ownerId.email}</td>
            <td>{item.name}</td>
            <td>{item.ptype}</td>
            <td>{item.address}</td>
            <td><img height={"100px"} src={item.license} alt="" /></td>
             <td>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              {Array.isArray(item.img) &&
                item.img.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="property"
                    height="60"
                    style={{ borderRadius: "5px" }}
                  />
                ))}
            </div>
            </td>
            <td>
              <select onChange={e => updateAdminProperty({_id:item._id,isAllow:e.target.value})}
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

export default ListedProperty
import React from 'react'
import { useAddOwnerRoomMutation, useDeleteOwnerPropertyMutation, useDeleteOwnerRoomMutation, useGetOwnerPropertyQuery } from '../../redux/api/ownerApi'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const AllProperty = () => {
  const navigate = useNavigate()
  const owner = useSelector(state => state.auth.owner)
  const ownerId = owner?._id
  
  const {data,isSuccess,isLoading} = useGetOwnerPropertyQuery(ownerId)
  const [deleteProduct,{isSuccess:deleteSuccess}] = useDeleteOwnerPropertyMutation()
  const [bookRoom,{isSuccess:roomSuccess}] = useAddOwnerRoomMutation()
  const [deleteRoom] = useDeleteOwnerRoomMutation();
  
  const [roomType, setRoomType] = useState("")
  const [price, setPrice] = useState("")
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);


  const handleAdd = async () => {
    await bookRoom({
      _id: selectedPropertyId,
      roomType,
      price,
    });
  };

  
  

    useEffect(()=>{
      if(isSuccess){
        toast.success("property get success")
      }
    },[isSuccess])

    useEffect(()=>{
      if(deleteSuccess){
        toast.success("property delete success")
      }
    },[deleteSuccess])

    useEffect(() => {
  if (roomSuccess) {
    toast.success("Room added successfully");

    // clear inputs
    setRoomType("");
    setPrice("");
    setSelectedPropertyId(null);

    // close bootstrap modal programmatically
    const modalEl = document.getElementById("exampleModal");
    const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
    modalInstance?.hide();
  }
}, [roomSuccess]);
  
    if(isLoading){
      return <>
      please wait...<Spinner></Spinner>
      </>
    }
    
    return <>
    { data && <table style={{maxWidth:"90%"}} class="table table-light table-hover table-bordered mt-5 mx-auto">
      <thead>
        <tr>
          <th scope="col">name</th>
          <th scope="col">type</th>
          <th scope="col">address</th>
          <th scope="col">license</th>
          <th scope="col">images</th>
          <th scope="col">room</th>
          <th scope="col">add</th>
          <th scope="col">allow</th>
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody>
        {
          data && data.result.map(item => <tr
          key={item.id}>
            <td>{item.name}</td>
            <td>{item.ptype}</td>
            <td>{item.address}</td>
            <td><img height={"100px"} src={item.license} alt="" /></td>
            <td><div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
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
        </div></td>
        <td>
          {item.room && item.room.length > 0 ? (
            <div>
              {item.room.map((room) => (
                <div
                  key={room._id}
                  className="d-flex justify-content-between align-items-center border rounded p-1 mb-1"
                >
                  <span>
                    {room.roomType} – ₹{room.price}
                  </span>
        
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() =>
                      deleteRoom({
                        propertyId: item._id,
                        roomId: room._id,
                      })
                    }
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-muted">No rooms</span>
          )}
        </td>

        <td><button className='btn btn-sm btn-info' onClick={() => setSelectedPropertyId(item._id)} data-bs-toggle="modal" data-bs-target="#exampleModal">Add</button></td>
            <td>{item.isAllow ? "Allowed" : "Not Allowed"}</td>
            <td>
              <button onClick={()=>navigate("/owner",{state:{editData:item}})} type="button" class="btn btn-warning">edit</button>
              <button onClick={e => deleteProduct(item._id)} type="button" class="btn btn-danger">delete</button>
            </td>
          </tr>)
        }
      </tbody>
    </table>
    }

    
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Rooms</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div className="mt-3 d-flex flex-column gap-2">
           <input type="text" value={roomType} onChange={(e)=>setRoomType(e.target.value)} className='form-control' placeholder='enter room'/>
           <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} className='form-control'placeholder='enter price'/>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onClick={handleAdd} >Save changes</button>
          </div>
        </div>
      </div>
    </div>
    </>
}

export default AllProperty
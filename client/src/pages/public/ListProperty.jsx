import React, { useEffect } from 'react'
import { GoogleLogin } from "@react-oauth/google"
import { useOauthMutation } from '../../redux/api/authApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ListProperty = () => {
    const navigate = useNavigate()
    const [signIn, { isSuccess }] = useOauthMutation()

    useEffect(() => {
        if (isSuccess) {
            toast.success("login success")
            navigate("/owner")
        }
    }, [isSuccess])

    return (
        <div className="mx-auto" style={{
        maxWidth: "400px",
        marginTop: "50px",
          minHeight: "300px",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
        backgroundColor: "#fff",
      }}>
        <div className="login-wrapper">
            <div className="login-card">
                <h3>Login With Google</h3>

                <GoogleLogin
                    onError={e => console.log(e)}
                    onSuccess={({ credential }) => signIn({ credential })}
                    />

                <p className='mt-3'>Continue to access your owner dashboard.then you can add your own property</p>
                <p className='mt-3 text-success'>100% trusted by users</p>
            </div>
        </div>
         </div>
    )
}

export default ListProperty

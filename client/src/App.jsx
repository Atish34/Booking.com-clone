import React, { lazy, Suspense } from 'react'
import {ErrorBoundary} from "react-error-boundary"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ErrorFeedback from './components/share/ErrorFeedback'
import LoadingFeedback from './components/share/LoadingFeedback'
import {ToastContainer} from "react-toastify"
import "react-toastify/ReactToastify.css"
import AdminProtected from './components/admin/AdminProtected'
import OwnerProtected from './components/owner/OwnerProtected'
import InActive from './components/public/InActive'
import RentalProtected from './components/rental/RentalProtected'
import CustomerProtected from './components/public/CustomerProtected'

const AdminLayout = lazy(()=> import("./components/admin/AdminLayout"))
const PublicLayout = lazy(()=> import("./components/public/PublicLayout"))
const OwnerLayout = lazy(()=> import("./components/owner/OwnerLayout"))
const RentalLayout = lazy(()=> import("./components/rental/RentalLayout"))


const PHome = lazy(()=>import("./pages/public/Home"))
const Stays = lazy(()=>import("./pages/public/Stays"))
const Flight = lazy(()=>import("./pages/public/Flights"))
const Rental = lazy(()=>import("./pages/public/Rentals"))
const OHome = lazy(()=>import("./pages/owner/OHome"))
const Booking = lazy(()=>import("./pages/owner/Bookings"))
const RHome = lazy(()=>import("./pages/rental/RHome"))
const AllRentals = lazy(()=>import("./pages/rental/AllRentals"))
const Book = lazy(()=>import("./pages/rental/Bookings"))
const AllProperty = lazy(()=>import("./pages/owner/AllProperty"))
const ListProperty = lazy(()=>import("./pages/public/ListProperty"))

const Home = lazy(()=> import("./pages/admin/Home"))
const Cart = lazy(()=> import("./pages/public/Cart"))
const Check = lazy(()=> import("./pages/public/CheckOut"))
const HCheck = lazy(()=> import("./pages/public/Check"))
const Acheckout = lazy(()=> import("./pages/public/Acheck"))
const Hsuccess = lazy(()=> import("./pages/public/Hsuccess"))
const Asuccess = lazy(()=> import("./pages/public/Asuccess"))
const Rcheck = lazy(()=> import("./pages/public/Rcheckout"))
const Rcheckout = lazy(()=> import("./pages/public/Rcheck"))
const Rsuccess = lazy(()=> import("./pages/public/Rsuccess"))
const Acheck = lazy(()=> import("./pages/public/AcheckOut"))
const Dashboard = lazy(()=> import("./pages/admin/Dashboard"))
const AddOn = lazy(()=> import("./pages/admin/AddOn"))
const Flights = lazy(()=> import("./pages/admin/Flights"))
const ListedProperty = lazy(()=> import("./pages/admin/ListedProperty"))
const Vehicle = lazy(()=> import("./pages/admin/Vehicle"))
const Users = lazy(()=> import("./pages/admin/Users"))
const Owner = lazy(()=> import("./pages/admin/Owner"))
const Rentals = lazy(()=> import("./pages/admin/Rentals"))
const AdminLogin = lazy(()=> import("./pages/admin/AdminLogin"))
const CustomerRegister = lazy(()=>import("./pages/public/CustomerRegister"))
const CustomerLogin = lazy(()=>import("./pages/public/CustomerLogin"))
const RentalRegister = lazy(()=>import("./pages/public/RentalRegister"))
const RentalLogin = lazy(()=>import("./pages/public/RentalLogin"))


const App = () => {
  const uniqueRoutes = [
    {path:"admin-login", element:<AdminLogin/>},  
    {path:"customer-register", element:<CustomerRegister/>}, 
    {path:"rental-register", element:<RentalRegister/>}, 
    {path:"listProperty",element:<ListProperty/>},
    {path:"customer-login", element:<CustomerLogin/>}, 
    {path:"rental-login", element:<RentalLogin/>},  
  ]
  
  const publicRoutes = [
    { isIndex: true, path: "", element: <Stays /> },
    {path:"/stays",element:<Stays/>},
    {path:"/flight",element:<Flight/>},
    {path:"/rentals",element:<Rental/>},
    {path:"/cart", element:<Cart/>},  
    {path:"/acheckout",element:<Acheck/>},
    {path:"/acheck",element:<Acheckout/>},
    {path:"/asuccess",isIndex: false,
      element: <CustomerProtected compo={<Asuccess />} />,},
      {path:"/rcheckout",element:<Rcheck/>},
      {path:"/rcheck",element:<Rcheckout/>},
      {path:"/rsuccess",isIndex: false,
        element: <CustomerProtected compo={<Rsuccess />} />,},
        {path:"/checkout",element:<Check/>},
        {path:"/check",element:<HCheck/>},
      {path:"/hsuccess",isIndex: false,
        element: <CustomerProtected compo={<Hsuccess />} />,},
      
  ]

  const ownerRoutes = [
    {isIndex:true,path:"ownerhome",element:<OHome/>},
    {isIndex:false,path:"allproperty",element:<AllProperty/>},
    {isIndex:false,path:"booking",element:<Booking/>},
  ]

  const rentalRoutes = [
    {isIndex:true,path:"rentalhome",element:<RHome/>},
    {isIndex:false,path:"allrental",element:<AllRentals/>},
    {isIndex:false,path:"rentalbook",element:<Book/>},
  ]
  
  const adminRoutes = [
    {isIndex:true,path:"/", element:<Home/>},
    {isIndex:false,path:"dashboard", element:<Dashboard/>},
    {isIndex:false,path:"addon", element:<AddOn/>},
    {isIndex:false,path:"flight", element:<Flights/>},
    {isIndex:false,path:"listedproperty", element:<ListedProperty/>},
    {isIndex:false,path:"vehicle", element:<Vehicle/>},
    {isIndex:false,path:"users", element:<Users/>},
    {isIndex:false,path:"owner", element:<Owner/>},
    {isIndex:false,path:"rental", element:<Rentals/>},
  ]
  
  return <>
  <ToastContainer/>
   <BrowserRouter>
        <Routes>

          <Route path='/' element={<PublicLayout/>}>
            {
              publicRoutes.map(item =><Route
              key={`public-${item.path}`}
              index={item.isIndex}
              path={item.isIndex ? "":item.path}
              element={<ErrorBoundary FallbackComponent={ErrorFeedback}>
                   <Suspense fallback={LoadingFeedback}>
                      {item.element}
                   </Suspense>
              </ErrorBoundary>}
              />)
            }
          </Route>

          <Route path='/admin' element={<AdminProtected compo={<AdminLayout/>}/>}>
            {
              adminRoutes.map(item =><Route
              key={`admin-${item.path}`}
              index={item.isIndex}
              path={item.isIndex ? "":item.path}
              element={<ErrorBoundary FallbackComponent={ErrorFeedback}>
                   <Suspense fallback={LoadingFeedback}>
                      {item.element}
                   </Suspense>
              </ErrorBoundary>}
              />)
            }
          </Route>

          <Route path='/owner' element={<OwnerProtected compo={<OwnerLayout/>}/>}>
            {
              ownerRoutes.map(item =><Route
              key={`admin-${item.path}`}
              index={item.isIndex}
              path={item.isIndex ? "":item.path}
              element={<ErrorBoundary FallbackComponent={ErrorFeedback}>
                   <Suspense fallback={LoadingFeedback}>
                      {item.element}
                   </Suspense>
              </ErrorBoundary>}
              />)
            }
          </Route>

          <Route path='/rental' element={<RentalProtected compo={<RentalLayout/>}/>}>
            {
              rentalRoutes.map(item =><Route
              key={`rental-${item.path}`}
              index={item.isIndex}
              path={item.isIndex ? "":item.path}
              element={<ErrorBoundary FallbackComponent={ErrorFeedback}>
                   <Suspense fallback={LoadingFeedback}>
                      {item.element}
                   </Suspense>
              </ErrorBoundary>}
              />)
            }
          </Route>

          {
            uniqueRoutes.map(item =><Route
            path={item.isIndex ? "":item.path}
            index={item.isIndex}
            element={<ErrorBoundary FallbackComponent={ErrorFeedback}>
                   <Suspense fallback={LoadingFeedback}>
                      {item.element}
                   </Suspense>
              </ErrorBoundary>}

            />)
          }


          <Route path='*' element={<h1>Page Not Found</h1>} />
          <Route path='inactive' element={<InActive/>} />
        </Routes>
      </BrowserRouter>
  </>
}

export default App
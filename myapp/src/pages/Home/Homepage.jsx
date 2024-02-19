import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown'; 
import {useNavigate} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import './home.css'
import Tables from '../../component/Tables/Tables';
import Spinners from '../../component/Spinner/Spinners';
import { addData, updateData } from '../../component/context/ContextProvider';
import { usergetfunc,deletefunc } from '../../services/Apis';
import toast from "react-hot-toast"

const Homepage = () => {

  const [userdata,setUserData] = useState([])

  const [showspin,setShowSpin] = useState(true)

  const {useradd,setUseradd} = useContext(addData)
  const {update,setUpdate} = useContext(updateData)
  const [search,setSearch] = useState("");
  const [gender,setGender] = useState("All");
  const [status,setStatus] = useState("All")

  const navigate = useNavigate()

  const adduser = ()=>{
    navigate("/register")
  }

  const userGet = async()=>{
     const response = await usergetfunc(search,gender,status)
    if(response.status === 200){
      setUserData(response.data)
    }else{
      console.log("error for get user data")
    }
  }

  //user delete
  const deleteUser = async (id)=>{
     const response = await deletefunc(id);
     if(response.status === 200){
      userGet();
     }else{
        toast.error("error")
     }
  }

  useEffect(()=>{
    userGet();
    setTimeout(()=>{
        setShowSpin(false)
    },1200)
  },[search,gender,status])
  return (
    <>
    {
      useradd? <Alert variant="success" onClose={() => setUseradd("")} dismissible>{useradd.fname.toUpperCase()} Succesfully Added</Alert>:"" 
    }
    {
      update ? <Alert variant="primary" onClose={() => setUpdate("")} dismissible>{update.fname.toUpperCase()} Succesfully update</Alert>:"" 
    }
      <div className="container">
        <div className="main_div">
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e)=>setSearch(e.target.value)}
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button onClick={adduser} variant="primary"><i class="fa-solid fa-plus"></i>&nbsp;Add User</Button>
            </div>
          </div>

          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <Button className='export_btn'>&nbsp; export csv</Button>
            </div> 
            <div className="filter_gender">
              <div className="filter">
                <h3>filter by gender</h3>
                <div className="gender d-flex justify-content-between">
                <Form.Check // prettier-ignore
                  type={"radio"}
                  label={`All`}
                  name='gender'
                  value={"All"}
                  onChange={(e)=>setGender(e.target.value)}
                  defaultChecked
                />
                <Form.Check // prettier-ignore
                  type={"radio"}
                  label={`Male`}
                  name='gender'
                  value={"Male"}
                  onChange={(e)=>setGender(e.target.value)}
                  
                />
                <Form.Check // prettier-ignore
                  type={"radio"}
                  label={`Female`}
                  name='gender'
                  value={"Female"}
                  onChange={(e)=>setGender(e.target.value)}
                  
                />
                
               
                </div>
              </div>
            </div>
            <div className="filter_newold">
              <h3>Short By Value</h3>
              <Dropdown className='text-center'>
                 <Dropdown.Toggle variant="success" id="dropdown-basic">
                 <i class="fa-solid fa-sort"></i>
                 </Dropdown.Toggle>

                  <Dropdown.Menu>
                   <Dropdown.Item >New</Dropdown.Item>
                   <Dropdown.Item >old</Dropdown.Item>
                   
                  </Dropdown.Menu>
                  </Dropdown> 
            </div>

            <div className="filter_status">
              <div className="status">
                <h3>Filter By Status</h3>
                 <div className="status_radio d-flex  justify-content-around flex-wrap">
                 <Form.Check // prettier-ignore
                  type={"radio"}
                  label={`All`}
                  name='status'
                  value={"All"}
                  onChange={(e)=>setStatus(e.target.value)}
                  defaultChecked
                />
                <Form.Check // prettier-ignore
                  type={"radio"}
                  label={`Active`}
                  name='status'
                  value={"Active"}
                  onChange={(e)=>setStatus(e.target.value)}
                />
                <Form.Check // prettier-ignore
                  type={"radio"}
                  label={`Inactive`}
                  name='status'
                  value={"Inactive"}
                  onChange={(e)=>setStatus(e.target.value)}
                />
                 </div>
              </div>
            </div>
          </div>
           {
             showspin ? <Spinners/> : <Tables
                                  userdata={userdata}
                                  deleteUser={deleteUser}

             />
           }
          {/* <Tables/> */}
        </div>
      </div>
    </>
  )
}

export default Homepage
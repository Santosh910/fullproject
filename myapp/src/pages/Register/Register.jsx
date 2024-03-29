import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import toast from 'react-hot-toast';
import {useNavigate} from "react-router-dom"

import Spinners from '../../component/Spinner/Spinners';
import { registerfunc } from '../../services/Apis';
import './register.css'
import { addData } from '../../component/context/ContextProvider';



const Register = () => {

  const [inputdata,setInputData] = useState({
       fname:"",
       lname:"",
       email:"",
       mobile:"",
       gender:"",
       location:""
  })

  const navigate = useNavigate();

  const {useradd,setUseradd} = useContext(addData)

  const [status,setStatus] = useState("Active");
  const [image,setImage] =useState("");
  const [preview,setPreview] = useState("");
  const [showspin,setShowSpin] = useState(true);

   // status optios
   const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];

//setInput
  const setInputValue =(e)=>{
      const {name,value} = e.target;
      setInputData({...inputdata,[name]:value})
  }

  //status set
  const setStatusValue = (e)=>{
        setStatus(e.value)
  }

  //profile set
  const setProfile = (e) =>{
     setImage(e.target.files[0])
  }

  const submitUserData = async(e)=>{
    e.preventDefault()
    const { fname,lname,email,mobile,gender,location} = inputdata;

    if (fname === "") {
      toast.error("First name is Required !")
    } else if (lname === "") {
      toast.error("Last name is Required !")
    } else if (email === "") {
      toast.error("Email is Required !")
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !")
    } else if (mobile === "") {
      toast.error("Mobile is Required !")
    } else if (mobile.length > 10) {
      toast.error("Enter Valid Mobile!f")
    } else if (gender === "") {
      toast.error("Gender is Required !")
    } else if (status === "") {
      toast.error("Status is Required !")
    } else if (image === "") {
      toast.error("Prfile is Required !")
    } else if (location === "") {
      toast.error("location is Required !")
    } else {
      
      const data = new FormData();
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("status",status)
      data.append("user_profile",image)
      data.append("location",location)
      
      const config = {
        "content-Type":"multipart/form-data"
      }

      const response = await registerfunc(data,config);
      if(response.status === 200){
        setInputData({...inputdata,
          fname:"",
          lname:"",
          email:"",
          mobile:"",
          gender:"",
          location:""
        });
        setStatus("");
        setImage("");
        setUseradd(response.data)
        navigate("/");
      }else{
        toast.error()
      }
  }
}

  useEffect(()=>{
     if(image){
      setPreview(URL.createObjectURL(image))
     }
     setTimeout(()=>{
      setShowSpin(false)
  },1200)
  },[image])


  return (
    <>
    {
      showspin ? <Spinners/> :<div className="container">
      <h2 className='text-center mt-1'>Register Your Details</h2>
      <Card className='shadow mt-3 p-3'>
        <div className="profile_div text-center">
          <img src={preview ? preview : "/man.png"} alt="img" />
        </div>

        <Form>
          <Row>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="fname" onChange={setInputValue} value={inputdata.fname} />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lname" onChange={setInputValue} value={inputdata.lname}/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name='email'  value={inputdata.email} onChange={setInputValue}/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Mobile</Form.Label>
              <Form.Control type="text" name="mobile" onChange={setInputValue} value={inputdata.mobile}/>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Select Your Gender</Form.Label>
              
              <Form.Check // prettier-ignore
                type={"radio"}
                label={`Male`}
                name='gender'
                value={"Male"}
                onChange={setInputValue}
              />
              <Form.Check // prettier-ignore
                type={"radio"}
                label={`Female`}
                name='gender'
                value={"Female"}
                onChange={setInputValue}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Status</Form.Label>
                <Select options={options}  onChange={setStatusValue} />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Profile</Form.Label>
                <Form.Control type="file" name='user_profile'  placeholder='Select Your Profile' onChange={setProfile}/>
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Enter Your Location</Form.Label>
                <Form.Control type="text" name='location'  placeholder='Enter Your Location' onChange={setInputValue} value={inputdata.location}/>
              </Form.Group>

            <Button variant="primary" type="submit" onClick={submitUserData}>
              Submit
            </Button>

          </Row>
        </Form>
      </Card>
    </div >
    }
      
    </>
  )
}

export default Register
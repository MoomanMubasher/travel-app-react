 
import React,{useState,useRef} from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
import axios from 'axios';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";



const Login = (props) => {
  
  const navigate =  useNavigate()

  const toast = useRef(null);
  const [formValues, setFormValues] = useState({
    password:'',
    email:''
  })




  const handleLogin = async (e) => {

    e.preventDefault();
    console.log(formValues)
     // Validation check
     if (formValues.email === '' || formValues.password === '') {
       toast.current.show({severity:'info', summary: 'Info', detail:'Please fill out all the values', life: 3000});
       return;
     }
     try {
       // Make a POST request using Axios
       const response = await axios.post(`http://localhost:8000/api/login`, {
         email:formValues.email,
         password:formValues.password,
       });
 
       toast.current.show({severity:'success', summary: 'Success', detail:'Success Login', life: 3000});
       console.log('User Login:', response.data.data);
       JSON.stringify(localStorage.setItem('islogin',true));
       localStorage.setItem('user', JSON.stringify(response.data.data));
       setTimeout(() => {   
          navigate('/admin/landmarks');
          window.location.reload()
       }, 300);
     } catch (error) {
       toast.current.show({severity:'error', summary: 'Error!', detail:error.response.data.data, life: 3000});
       console.error('Error login user:', error.response.data.data);
     }
  }
   
  return (
    <>
    <Toast ref={toast} />
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-0">
              {/* <small>Sign in with</small> */}
              <h1>Sign In</h1>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleLogin}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    name="email"
                    value={formValues.email}
                    onChange={e => setFormValues({...formValues,email:e.target.value})}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    value={formValues.password}
                    onChange={e => setFormValues({...formValues,password:e.target.value})}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-right" xs="12">
            <a
              className="text-light"
              href="register"
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;

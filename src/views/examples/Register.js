 
import React,{useState,useRef} from "react";
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
  Col,
} from "reactstrap";

const Register = (props) => {
  const toast = useRef(null);
  const [formValues, setFormValues] = useState({
    name : '',
    password:'',
    email:''
  })


  const handleSubmit = async (e) => {
    e.preventDefault();
   console.log(formValues)
    // Validation check
    if (formValues.email === '' || formValues.password === '' || formValues.name === '') {
      toast.current.show({severity:'info', summary: 'Info', detail:'Please fill out all the values', life: 3000});
      return;
    }

    try {
      // Make a POST request using Axios
      const response = await axios.post(`http://localhost:8000/api/register`, {
        name: formValues.name,
        email:formValues.email,
        password:formValues.password,
      });

      toast.current.show({severity:'success', summary: 'Success', detail:'Success Regsitered', life: 3000});
      console.log('User registered:', response.data.data);
      props.history.push('login')
    } catch (error) {
      toast.current.show({severity:'error', summary: 'Error!', detail:error.response.data.data, life: 3000});
      console.error('Error registering user:', error.response.data.data);
    }
  }

  return (
    <>
      <Toast ref={toast} />
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <h1>Sign up</h1>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Name" type="text" name="name" value={formValues.name} required onChange={(e) => setFormValues({ ...formValues, name: e.target.value})} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    autoComplete="new-email"
                    required
                    value={formValues.email}
                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value})} 
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
                    required
                    value={formValues.password}
                    onChange={(e) => setFormValues({ ...formValues, password: e.target.value})} 
                  />
                </InputGroup>
              </FormGroup>
              
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Create account
                </Button>
              </div>
         
            </Form>
          
          </CardBody>
         
        </Card>
        <Col className="text-right" xs="12">
            <a
              className="text-light"
              href="login"
            >
              <small>Already have an account?</small>
            </a>
          </Col>
      </Col>
    </>
  );
};

export default Register;

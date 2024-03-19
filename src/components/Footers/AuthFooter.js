/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

const Login = () => {
  return (
      <footer className="py-5 footer">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {new Date().getFullYear()}{" "}
                <a
                  className="font-weight-bold ml-1"
                  href="#"
                  // target="_blank"
                >
                  Ibtehaj Gulzar
                </a>
              </div>
            </Col> 
          </Row>
        </Container>
      </footer>
  );
};

export default Login;

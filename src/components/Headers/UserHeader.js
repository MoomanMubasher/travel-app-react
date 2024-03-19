 

// reactstrap components
import React from "react";
import { Container, Row, Col } from "reactstrap";

const UserHeader = () => {

  let _user = JSON.parse(localStorage.getItem('user'))
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="10" md="10">
              <h1 className="display-3 text-white text-capitalize">{_user?.name}</h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can see the details about yourself.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;

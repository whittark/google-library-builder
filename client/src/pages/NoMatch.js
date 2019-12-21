import React from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import "./index.css";

function NoMatch() {
  return (
    <Jumbotron>
        <h1 className="text-center">
          <strong>Google Library Builder</strong>
          </h1>
          <h4 className="text-center">Search and save your favorite reads</h4>
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1 className="text-center">Page Not Found</h1>
            <h1 className="text-center">
            </h1>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
    </Jumbotron>
  );
}

export default NoMatch;

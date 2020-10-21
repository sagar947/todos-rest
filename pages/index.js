import { Container, Row, Col } from "react-bootstrap";
import TodosForm from "../components/todos/TodosForm.jsx";
import TodosList from "../components/todos/TodosList.jsx";

const Index = () => {
  return (
    <>
      <Container>
        <Row className="pt-5">
          <Col xs={12} md={6}>
            <TodosForm />
          </Col>
          <Col xs={12} md={6}>
            <TodosList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;

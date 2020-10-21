import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, editTask } from "../../actions";

const priorities = {
  1: "Low",
  2: "Medium",
  3: "High",
};

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDeleteTask = () => {
    dispatch(deleteTask(selectedTask.id)).then(() => {
      setShowDeleteModal(false);
    });
  };

  const handleFieldChange = (e, name) => {
    setSelectedTask({
      ...selectedTask,
      [name]: e.target.value,
    });
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    dispatch(editTask(selectedTask)).then(() => {
      setShowEditModal(false);
    });
  };

  return (
    <Row>
      <Col sm={9}>
        <i>
          <strong>{task.message}</strong>
        </i>
        <small>
          <p>Assigned to: {task.assigned_name}</p>
        </small>
        <small>
          <p>
            Priority:{" "}
            <span
              className={
                task.priority === "1"
                  ? "text-success"
                  : task.priority === "2"
                  ? "text-warning"
                  : task.priority === "3"
                  ? "text-danger"
                  : ""
              }
            >
              {priorities[task.priority]}
            </span>
          </p>
        </small>
      </Col>
      <Col sm={3} className="text-right">
        <Button
          variant="outline-dark"
          size="sm"
          className="mr-2"
          onClick={() => {
            setSelectedTask(task);
            setShowEditModal(!showEditModal);
          }}
        >
          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
        </Button>
        <Button
          variant="outline-dark"
          size="sm"
          onClick={() => {
            setSelectedTask(task);
            setShowDeleteModal(!showDeleteModal);
          }}
        >
          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
        </Button>
      </Col>
      <Modal
        show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false);
          setSelectedTask(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this task?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowDeleteModal(false);
              setSelectedTask(null);
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDeleteTask}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setSelectedTask(null);
        }}
      >
        <Modal.Header>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditFormSubmit}>
            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedTask?.message}
                onChange={(e) => handleFieldChange(e, "message")}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                defaultValue={selectedTask?.priority}
                onChange={(e) => handleFieldChange(e, "priority")}
              >
                <option value="" disabled>
                  Select one
                </option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Assign To</Form.Label>
              <Form.Control
                as="select"
                defaultValue={selectedTask?.assigned_to}
                onChange={(e) => handleFieldChange(e, "assigned_to")}
              >
                <option value="" disabled>
                  Select one
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Due date</Form.Label>
              <Form.Control
                type="date"
                defaultValue={selectedTask?.due_date}
                onChange={(e) => handleFieldChange(e, "due_date")}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Button type="submit" className="mr-2">
                Submit
              </Button>
              <Button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedTask(null);
                }}
                variant="secondary"
              >
                Cancel
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </Row>
  );
};

export default TaskItem;

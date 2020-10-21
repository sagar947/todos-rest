import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { fetchUsers, addNewTask } from "../../actions";

const TodosForm = () => {
  let dispatch = useDispatch();
  const [state, setState] = useState({
    message: "",
    assigned_to: "",
    priority: "",
    due_date: "",
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFieldChange = (event, name) => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleAddNewTask = (event) => {
    event.preventDefault();
    dispatch(addNewTask(state));
  };

  const users = useSelector((state) => state.users);
  return (
    <Form onSubmit={handleAddNewTask}>
      <Form.Group>
        <Form.Label>Message</Form.Label>
        <Form.Control
          type="text"
          placeholder="Task title"
          defaultValue={state.message}
          required
          onChange={(e) => handleFieldChange(e, "message")}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Priority</Form.Label>
        <Form.Control
          as="select"
          defaultValue={state.priority}
          onChange={(e) => handleFieldChange(e, "priority")}
        >
          <option value="">Select one</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Assign To</Form.Label>
        <Form.Control
          as="select"
          defaultValue={state.assigned_to}
          onChange={(e) => handleFieldChange(e, "assigned_to")}
        >
          <option value="">Select one</option>
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
          defaultValue={state.due_date}
          onChange={(e) => handleFieldChange(e, "due_date")}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Button type="submit">Submit</Button>
      </Form.Group>
    </Form>
  );
};

export default TodosForm;

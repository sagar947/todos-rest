import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../../actions";
import { ListGroup } from "react-bootstrap";
import TaskItem from "./TaskItem.jsx";

const TodosList = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const tasks = useSelector((state) => state.tasks);

  return (
    <>
      <div className="text-center">
        <h2>Tasks List</h2>
      </div>
      <ListGroup>
        {tasks.map((task) => (
          <ListGroup.Item key={task.id}>
            <TaskItem task={task} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default TodosList;

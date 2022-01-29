import { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Button from "./Button";

const TaskDetails = () => {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({});
  const [error, setError] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`http://localhost:5000/tasks/${params.id}`);

      if (res.status === 404) {
        navigate("/");
      }
      const data = await res.json();

      setTask(data);
      setLoading(false);
    };

    fetchTask();
  });

  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <div>
      <h3>{task.text}</h3>
      <p>{task.day}</p>
      <Button
        text="Go Back"
        onClick={() => {
          navigate(-1);
        }}
      />
    </div>
  );
};

export default TaskDetails;

import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import "./todoList.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Button,
  Grid,
  Paper,
  makeStyles,
  Tooltip,
  Divider,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

const LOCAL_STORAGE_KEY = "todoApp.todos";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const stored_todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)); // we need to turn it from string to array, so use JSON parse.
    if (stored_todos) {
      setTodos(stored_todos);
    }
  }, []); // this second arugment the dependency, this empty array will run only once when we first load the page(i think)

  useEffect(() => {
    // useEffect is for when we want to make state sticky, so the value wont disappear when we press Refresh. and it should be the first function to be called. (1) this first one is for storage, we need another UseEffect to load it on our page!
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)); // JSON turn the value into string
  }, [todos]); // this second argument determine that useEffect will run everytime something inside todos changed

  function toggleTodo(id) {
    const newTodos = [...todos]; // we make a copy of todos instead of modifying it firectly
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddToDo(button_event) {
    const name = todoNameRef.current.value; // this is whatever value that are in the text input right now, and will be sent to us when they press the button
    if (name === "") {
      return "";
    }

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodo() {
    //clear completed todos
    const currentTodo = todos.filter((todo) => todo.complete === false); //!todo.complete is todo that has complete value of false
    setTodos(currentTodo);
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid
        container
        direction="rows"
        justify="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Paper className={classes.paper} style={{ textAlign: "center" }}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              id="standard-basic"
              label="Enter tasks!"
              inputRef={todoNameRef}
              id="input-text"
              type="text"
            />
            {/* <input ref={todoNameRef} type="text" id="input-text" /> */}
          </Grid>
          <Grid item>
            <Tooltip title="Add task">
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleAddToDo}
                disableElevation
              >
                <AddIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Clear completed task">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClearTodo}
                disableElevation
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          </Grid>
          <Grid item style={{ textAlign: "center" }}>
            <div>
              {todos.filter((each) => each.complete !== true).length} left to
              do!
            </div>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid item style={{ textAlign: "left" }}>
            What to do!
            <Divider />
            <TodoList todos_state={todos} toggleTodo={toggleTodo} />
          </Grid>
        </Paper>
      </Grid>
    </div> // this </> is called fragment
  );
}

export default App;

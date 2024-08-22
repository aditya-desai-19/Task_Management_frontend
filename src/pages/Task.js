//@ts-check
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Container, Row, Col } from 'react-bootstrap';
import CardContainer from '../components/CardContainer';
import AddEditModal, { taskStatus } from '../components/AddEditModal';
import axiosInstance from '../utils/api';
import { toast } from 'react-toastify';
import { addTodoItem, clearTasks } from '../redux/slices/cardSlice';

const loginMessage = "Please login";

const Task = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const user = useSelector((state) => state.user.user);
    const todos = useSelector((state) => state.card.todo);
    const inProgressTodos = useSelector((state) => state.card.inProgress);
    const doneTodos = useSelector((state) => state.card.done);
    
    const dispatch = useDispatch();

    const toggleAddModal = useCallback(() => {
        setShowAddModal(prev => !prev);
    }, []);

    const clearAllTasks = useCallback(() => {
        dispatch(clearTasks());
    }, [clearTasks]);

    const callTasksApi = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/api/task");
            if(response.status === 200) {
                console.log({tasks: response.data.tasks});
                const todos = response.data.tasks.filter(task => task.status === taskStatus.todo);
                const inProgress = response.data.tasks.filter(task => task.status === taskStatus.inProgress);
                const done = response.data.tasks.filter(task => task.status === taskStatus.done);
                console.log({todos, inProgress, done})
                dispatch(addTodoItem(todos));
                dispatch(addTodoItem(inProgress));
                dispatch(addTodoItem(done));
            } else {
                throw new Error();
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }, []);

    useEffect(() => {
        clearAllTasks();
        callTasksApi(); 
    }, []);

    return (
        <div>
            <AddEditModal title={"Add"} show={showAddModal} handleClose={toggleAddModal}/>
            {Object.keys(user).length ? 
                <Container style={{marginTop: "20px"}}>
                    <Row style={{margin: 5}}>
                        <Col>
                            <Button variant='primary' onClick={toggleAddModal}>Add task</Button>
                        </Col>
                    </Row>
                    <Row style={{margin: 5, border: "1px solid gray", padding: "10px"}}>
                        <Col lg={8}>
                            <div>
                                <label style={{marginRight: 10}}>Search</label>
                                <input type="text" placeholder="Search" />
                            </div>
                        </Col>
                        <Col></Col>
                        <Col lg={3}>
                            <div>
                                <label style={{marginRight: 10}}>Sort by</label>
                                <select>
                                    <option value="desc">Recent</option>
                                    <option value="asc">First to last</option>
                                </select>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CardContainer key={"Todo"} title={"Todo"} cards={todos}/>
                        </Col>
                        <Col>
                            <CardContainer key={"progress"} title={"In progress"} cards={inProgressTodos}/>
                        </Col>
                        <Col>
                            <CardContainer key={"Done"} title={"Done"} cards={doneTodos}/>
                        </Col>
                    </Row>
                </Container>
                : 
                loginMessage
            }
        </div>
    )
}

export default Task
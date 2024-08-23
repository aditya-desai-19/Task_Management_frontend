//@ts-check
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Container, Row, Col } from 'react-bootstrap';
import CardContainer from '../components/CardContainer';
import AddEditModal, { taskStatus } from '../components/AddEditModal';
import axiosInstance from '../utils/api';
import { toast } from 'react-toastify';
import { addDoneItem, addInProgressItem, addTodoItem, clearTasks } from '../redux/slices/cardSlice';
import Styles from './Task.module.css';
import { useNavigate } from 'react-router-dom'


const Task = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    
    const user = useSelector((state) => state.user.user);
    const todos = useSelector((state) => state.card.todo);
    const inProgressTodos = useSelector((state) => state.card.inProgress);
    const doneTodos = useSelector((state) => state.card.done);
    
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

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
                const todos = response.data.tasks.filter(task => task.status === taskStatus.todo);
                const inProgress = response.data.tasks.filter(task => task.status === taskStatus.inProgress);
                const done = response.data.tasks.filter(task => task.status === taskStatus.done);
                dispatch(addTodoItem(todos));
                dispatch(addInProgressItem(inProgress));
                dispatch(addDoneItem(done));
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
        <div style={{height: "calc(100% - 70px"}}>
            <AddEditModal title={"Add"} show={showAddModal} handleClose={toggleAddModal}/>
            {Object.keys(user).length ? 
                <Container className={Styles.container}>
                    <Row className={Styles.addButtonRow}>
                        <Col>
                            <Button variant='primary' onClick={toggleAddModal}>Add task</Button>
                        </Col>
                    </Row>
                    <Row className={Styles.searchRow}>
                        <Col lg={8} className={Styles.searchCol}>
                            <div>
                                <label className={Styles.searchLabel}>Search</label>
                                <input type="text" placeholder="Search"  className={Styles.searchInput}/>
                            </div>
                        </Col>
                        <Col></Col>
                        <Col lg={3}>
                            <div>
                                <label className={Styles.searchLabel}>Sort by</label>
                                <select className={Styles.searchInput}>
                                    <option value="desc">Recent</option>
                                    <option value="asc">First to last</option>
                                </select>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8} md={6} lg={4}>
                            <CardContainer key={"Todo"} title={"Todo"} status={taskStatus.todo} cards={todos}/>
                        </Col>
                        <Col sm={8} md={6} lg={4}>
                            <CardContainer key={"progress"} title={"In progress"} status={taskStatus.inProgress} cards={inProgressTodos}/>
                        </Col>
                        <Col sm={8} md={6} lg={4}>
                            <CardContainer key={"Done"} title={"Done"} status={taskStatus.done} cards={doneTodos}/>
                        </Col>
                    </Row>
                </Container>
                : 
                <div className={Styles.home}>
                    <h2 className={Styles.title}>Welcome to Taskly</h2>
                    <h4 className={Styles.tagline}>Streamline Your Workflow, Achieve More</h4>
                    <Button type='button' className={Styles.redirectBtn} variant='primary' onClick={() => navigate("/login")}>Get started</Button>
                </div>
            }
        </div>
    )
}

export default Task
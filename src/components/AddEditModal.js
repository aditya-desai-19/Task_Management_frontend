//@ts-check
import React, { useCallback } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axiosInstance from '../utils/api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addDoneItem, addInProgressItem, addTodoItem, clearTasks } from '../redux/slices/cardSlice';

export const taskStatus = {
    todo: "todo",
    inProgress: "inProgress",
    done: "done"
}

const AddEditModal = ({ show, handleClose, title, id, defaultValues, isReadOnly }) => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm({ defaultValues: defaultValues});

    const dispatch = useDispatch();

    const callAddTaskApi = useCallback(async (values) => {
        try {
            const response = await axiosInstance.post("/api/task", values);
            if(response.status == 201) {
                if(values.status === taskStatus.todo) {
                    dispatch(addTodoItem([response.data.task]));
                } else if(values.status === taskStatus.done) {
                    dispatch(addDoneItem([response.data.task]));
                } else {
                    dispatch(addInProgressItem([response.data.task]));
                }
                toast.success("Successfully added task");
                handleClose();
            } else {
                throw new Error();
            }
        } catch (error) {
            toast.error("Some error occured");
        }
    }, [handleClose]);

    const updateReduxStore = useCallback(async () => {
        try {
            dispatch(clearTasks());
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
    }, [clearTasks, addTodoItem, addInProgressItem, addDoneItem]);

    const callUpdateTaskApi = useCallback(async (values, id) => {
        try {
            const response = await axiosInstance.put(`/api/task/${id}`, values);
            if(response.status == 200) {
                updateReduxStore();
                toast.success("Successfully updated task");
                handleClose();
            } else {
                throw new Error();
            }
        } catch (error) {
            toast.error("Some error occured");
        }
    }, [handleClose, updateReduxStore]);

    const onSubmit = useCallback(async (values) => {
        id ? callUpdateTaskApi(values, id) : callAddTaskApi(values);
        reset();
    }, [callUpdateTaskApi, callAddTaskApi]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)} style={{height: "300px", display: 'flex', flexDirection: "column", alignItems: "center"}}>
                    <Form.Control type='text' placeholder='Title' style={{marginBottom: 10}} readOnly={isReadOnly} {...register("name", { required: true })}/>
                    <Form.Control as="textarea" rows={5} placeholder='Description' style={{marginBottom: 10, resize: "none"}} readOnly={isReadOnly} {...register("description")}/>
                    <Form.Select defaultValue={taskStatus.todo} style={{marginBottom: 10}} readOnly={isReadOnly} {...register("status", { required: true})}>
                        <option value={taskStatus.todo}>To do</option>
                        <option value={taskStatus.inProgress}>In progress</option>
                        <option value={taskStatus.done}>Done</option>
                    </Form.Select>
                    {!isReadOnly && <Button type='submit' style={{width: "100px"}}>Submit</Button>}
                </Form>
            </Modal.Body>
        </Modal>

    )
}

export default AddEditModal
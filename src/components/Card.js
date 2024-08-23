//@ts-check
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Styles from './Card.module.css';
import DeleteModal from './DeleteModal';
import axiosInstance from '../utils/api';
import { useDispatch } from 'react-redux';
import AddEditModal, { taskStatus } from './AddEditModal';
import { deleteDoneItem, deleteInProgressItem, deleteTodoItem } from '../redux/slices/cardSlice';
import { toast } from 'react-toastify';
import { useDrag } from 'react-dnd';

const Card = ({id, name, description, createdDate, status}) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'item',
        item: { id, name, description, createdDate, status },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const dispatch = useDispatch();

    const toggleDeleteModal = useCallback(() => {
        setShowDeleteModal(prev => !prev);
    }, []);

    const toggleEditModal = useCallback(() => {
        setShowEditModal(prev => !prev);
    }, []);

    const toggleViewModal = useCallback(() => {
        setShowViewModal(prev => !prev);
    }, []);

    const onDelete = useCallback(async () => {
        try {
            const response = await axiosInstance.delete(`/api/task/${id}`);
            if(response.status === 200) {
                if(status = taskStatus.todo) {
                    dispatch(deleteTodoItem(id));
                } else if(status = taskStatus.inProgress) {
                    dispatch(deleteInProgressItem(id));
                } else {
                    dispatch(deleteDoneItem(id));
                }
                toast.success("Successfully deleted");
                toggleDeleteModal();
            } else {
                throw new Error();
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }, [deleteTodoItem, deleteInProgressItem, deleteDoneItem, status]);

    return (
        <div className={Styles.main} ref={drag} style={{opacity: isDragging ? 0.5 : 1, cursor: "move"}}>
            <DeleteModal 
                show={showDeleteModal} 
                handleClose={toggleDeleteModal}
                title={"Delete item"}
                body={`Are you sure you want to delete ${name} task?`}
                onDelete={onDelete}
            />
            <AddEditModal 
                show={showEditModal}
                handleClose={toggleEditModal}
                id={id}
                defaultValues={{name, description, status}}
                title={"Edit task"}
            />
            <AddEditModal
                show={showViewModal}
                handleClose={toggleViewModal}
                defaultValues={{name, description, status}}
                title={"View details"}
                isReadOnly={true}
                />
            <h4>{name}</h4>
            <p>{description}</p>
            <p>{`Created on ${createdDate}`}</p>
            <div className={Styles.buttonContainer}>
                <Button type='button' className={Styles.button} variant='danger' onClick={toggleDeleteModal}>Delete</Button>
                <Button type='button' className={Styles.button} variant='info' onClick={toggleEditModal}>Edit</Button>
                <Button type='button' className={Styles.button} variant='primary' onClick={toggleViewModal}>View</Button>
            </div>
        </div>
    )
}

export default Card
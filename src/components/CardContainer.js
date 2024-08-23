//@ts-check
import React, { useCallback, useMemo } from 'react'
import Card from './Card'
import Styles from './CardContainer.module.css';
import { useDrop } from 'react-dnd';
import axiosInstance from '../utils/api';
import { useDispatch } from 'react-redux';
import { addDoneItem, addInProgressItem, addTodoItem, clearTasks } from '../redux/slices/cardSlice';
import { taskStatus } from './AddEditModal';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';

const CardContainer = ({ title, cards = [], status }) => {
	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'item',
		drop: (item) => onDrop(item),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	}));

	const dispatch = useDispatch();

	const updateReduxStore = useCallback(async () => {
		try {
			dispatch(clearTasks());
			const response = await axiosInstance.get("/api/task");
			if (response.status === 200) {
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
			if (response.status == 200) {
				updateReduxStore();
			} else {
				throw new Error();
			}
		} catch (error) {
			toast.error("Some error occured");
		}
	}, [updateReduxStore]);


	const onDrop = useCallback((task) => {
		if (task.status !== status) {
			const values = { ...task, status };
			callUpdateTaskApi(values, task.id);
		}
	}, [callUpdateTaskApi]);

	const getFormattedDate = useCallback((isoDate) => {
		if(isoDate)  {
			const date = parseISO(isoDate);
			const formattedDate = format(date, 'dd/MM/yyyy HH:mm:ss');
			return formattedDate;
		}
		return null;
	}, []);

	return (
		<div className={Styles.main}>
			<div className={Styles.body} ref={drop}>
				<h5 className={Styles.title}>{title}</h5>
				{isOver &&
					<div className={Styles.dropZone}>
						Drop here
					</div>}
				{cards?.map(card =>
					<Card
						key={card._id}
						id={card._id}
						name={card.name}
						description={card.description}
						createdDate={getFormattedDate(card.createdAt)}
						status={card.status}
					/>)
				}
			</div>
		</div>
	)
}

export default CardContainer
import React from 'react'
import Card from './Card'
import Styles from './CardContainer.module.css';

const CardContainer = ({ title, cards = [] }) => {
	return (
		<div className={Styles.main}>
			<h5 className={Styles.title}>{title}</h5>
			<div className={Styles.body}>
				{cards.map(card =>
					<Card
						key={card._id}
						id={card._id}
						name={card.name}
						description={card.description}
						createdDate={card.createdAt}
					/>)
				}
			</div>
		</div>
	)
}

export default CardContainer
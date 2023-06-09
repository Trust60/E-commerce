import { Link } from 'react-router-dom';
import styles from '../../styles/modules/CardShops.module.scss';

const MeatShopCard = () => {
	return (
		<Link to={'/grilled-meat'} className={styles.card__shop}>
			<img
				src="https://images.unsplash.com/photo-1626790291085-19a27173773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
				alt="Grilled meat"
				className={styles.card__image}
			/>
			<p className={styles.card__text}>Grilled meat</p>
		</Link>
	);
};

export default MeatShopCard;

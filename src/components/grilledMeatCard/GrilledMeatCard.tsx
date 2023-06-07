import { useActions } from '../../hooks/useCartActions';
import styles from '../../styles/modules/GrilledMeatPage.module.scss';
const GrilledMeatCard = ({ title, image, price, data, weight }) => {
	const { addItemToCart } = useActions();
	return (
		<div className={styles.product__card}>
			<img className={styles.product__card__image} src={image} alt={title} />
			<svg
				width="35"
				height="35"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={styles.product__card__svg}
				onClick={() => addItemToCart(...data)}
			>
				<path
					d="M12 1.5C6.20156 1.5 1.5 6.20156 1.5 12C1.5 17.7984 6.20156 22.5 12 22.5C17.7984 22.5 22.5 17.7984 22.5 12C22.5 6.20156 17.7984 1.5 12 1.5ZM16.5 12.5625C16.5 12.6656 16.4156 12.75 16.3125 12.75H12.75V16.3125C12.75 16.4156 12.6656 16.5 12.5625 16.5H11.4375C11.3344 16.5 11.25 16.4156 11.25 16.3125V12.75H7.6875C7.58437 12.75 7.5 12.6656 7.5 12.5625V11.4375C7.5 11.3344 7.58437 11.25 7.6875 11.25H11.25V7.6875C11.25 7.58437 11.3344 7.5 11.4375 7.5H12.5625C12.6656 7.5 12.75 7.58437 12.75 7.6875V11.25H16.3125C16.4156 11.25 16.5 11.3344 16.5 11.4375V12.5625Z"
					fill="black"
				/>
			</svg>
			<p className={styles.product__card__title}>{title}</p>
			<p className={styles.product__card__price}>
				Price: {price} UAH <span>{weight} g.</span>
			</p>
		</div>
	);
};

export default GrilledMeatCard;

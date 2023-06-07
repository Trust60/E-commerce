import { useSubmitOrderMutation } from '../../store/services/shopApi';
import { useCart } from '../../hooks/useCart';
import CartItem from './cartItem/CartItem';
import CartForm from './cartForm/CartForm';
import CartEmpty from './cartEmpty/CartEmpty';
import styles from '../../styles/modules/Cart.module.scss';
import { Link } from 'react-router-dom';

const Cart = () => {
	const { cart } = useCart();
	const shopId = cart.items.find((item) => item.hasOwnProperty('shop'))?.shop;
	const [submitOrder] = useSubmitOrderMutation();

	return (
		<>
			{cart && cart.items.length > 0 ? (
				<>
					<div className={styles.container}>
						<div className={styles.container__title}>
							<p className={styles.title__order}>Your order</p>
							<Link to={'/order-history'}>
								<p className={styles.title__history}>
									Order history <span aria-hidden="true">&rarr;</span>
								</p>
							</Link>
						</div>
						<hr />
						<div className={styles.container__wrapper}>
							<div className={styles.container__cart}>
								{cart.items.map((tovar) => (
									<CartItem
										key={tovar.id}
										title={tovar.title}
										image={tovar.image}
										price={tovar.price}
										weight={Number(tovar.weight) === 1 ? undefined : Number(tovar.weight)}
										quantity={tovar.quantity}
										id={tovar.id}
									/>
								))}
								<p className={styles.container__sum}>In total: {cart.totalAmount} UAH</p>
							</div>
							<div className={styles.container__form}>
								<p className={styles.container__order}>Customer</p>
								<CartForm shopId={shopId} submitOrder={submitOrder} />
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<CartEmpty />
				</>
			)}
		</>
	);
};

export default Cart;

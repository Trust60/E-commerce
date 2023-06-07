import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useGetOrdersQuery } from '../store/services/shopApi';
import Header from '../components/header/Header';
import OrderHistoryList from '../components/orderHistoryList/OrderHistoryList';
import Loader from '../components/loader/PageLoader';
import styles from '../styles/modules/OderHistory.module.scss';

const OrderHistory = () => {
	const initialValues = {
		phone: '',
		email: '',
	};
	const validateForm = (values) => {
		const errors = {};
		if (!values.phone) {
			errors.phone = 'Phone number is required';
		} else if (!/^(\+380)\d{9}$/.test(values.phone)) {
			errors.phone = 'Invalid phone number format';
		}
		if (!values.email) {
			errors.email = 'Email is required';
		} else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(values.email)) {
			errors.email = 'Invalid email address!';
		}
		return errors;
	};
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');

	const { data, isLoading } = useGetOrdersQuery({ phone, email });

	const handleSubmit = async (values) => {
		try {
			setPhone(values.phone);
			setEmail(values.email);
			console.log('Найденные заказы:', data);
		} catch (error) {
			console.log('Ошибка при выполнении запроса:', error);
		}
	};
	return (
		<>
			<Header />
			<div className={styles.container}>
				<div className={styles.container__orderHistory}>
					<div className={styles.title}>
						<p>Enter phone number and email to search for your order</p>
					</div>
					<div className={styles.container__form}>
						<Formik initialValues={initialValues} validate={validateForm} onSubmit={handleSubmit}>
							<Form>
								<Field
									className={styles.form__input}
									type="text"
									id="phone"
									name="phone"
									placeholder="Phone number"
								/>
								<ErrorMessage className={styles.form__error} name="phone" component="div" />
								<Field
									className={styles.form__input}
									type="text"
									id="email"
									name="email"
									placeholder="Email address"
								/>
								<ErrorMessage className={styles.form__error} name="email" component="div" />
								<div className={styles.container__button}>
									<button type="submit">Search</button>
								</div>
							</Form>
						</Formik>
					</div>
					<div className={styles.orders__container}>
						{isLoading ? (
							<div className={styles.loader}>
								<Loader />
							</div>
						) : (
							data?.map((order) => (
								<div className={styles.history__list__container}>
									<OrderHistoryList key={order.id} id={order.id} items={order.items} />
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default OrderHistory;

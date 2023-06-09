import { useGetProductsQuery } from '../store/services/shopApi';
import Header from '../components/header/Header';
import GrilledMeatCard from '../components/grilledMeatCard/GrilledMeatCard';
import Loader from '../components/loader/PageLoader';
import styles from '../styles/modules/GrilledMeatPage.module.scss';

const GrilledMeatListPage = () => {
	const { data, isLoading } = useGetProductsQuery(0);

	return (
		<>
			<Header />
			{isLoading ? (
				<div className={styles.loader}>
					<Loader />
				</div>
			) : (
				<>
					<div className={styles.title}>
						<p className={styles.title__paragraph}>
							<span>BBQ</span> House
						</p>
						<div className={styles.title__roof} />
						<div className={styles.title__roof_2} />
					</div>
					<div className={styles.container}>
						{data?.map((products) => (
							<div key={products.id}>
								<GrilledMeatCard
									data={data.filter((product) => product.id === products.id)}
									title={products.title}
									image={products.image}
									price={products.price}
									weight={products.weight}
								/>
							</div>
						))}
					</div>
				</>
			)}
		</>
	);
};

export default GrilledMeatListPage;

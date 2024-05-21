import styles from './DataEmpty.module.css'
interface DataEmptyProps {
	hText: string
	sText: string
}
const DataEmpty = ({ hText, sText }: DataEmptyProps) => {
	return (
		<div className={styles.data_load}>
			<span className={styles.status_load}>{hText}</span>
			<span className={styles.hint}>{sText}</span>
		</div>
	)
}

export default DataEmpty

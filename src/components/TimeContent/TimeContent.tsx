import styles from './TimeContent.module.css'
interface Props {
	pinInfo: {
		value: number
		time: number
	}
	openInfo: {
		value: number
		time: number
	}
	closeInfo: {
		value: number
		time: number
	}
	visible: boolean
}
const TimeContent = ({ pinInfo, openInfo, closeInfo, visible }: Props) => {
	return (
		<div className={`${styles.content} ${visible ? styles.show : ''}`}>
			<div className={styles.item}>
				<div className={styles.name_item}>Закреплено: {pinInfo.value}</div>
				<div className={styles.divider}></div>
				<div className={styles.name_value}>2 дня 11 часов 3 минуты 58 секунд</div>
			</div>
			<div className={styles.item}>
				<div className={styles.name_item}>Закрыто: {closeInfo.value}</div>
				<div className={styles.divider}></div>
				<div className={styles.name_value}>2 дня 11 часов 3 минуты 58 секунд</div>
			</div>
			<div className={styles.item}>
				<div className={styles.name_item}>Открыто: {openInfo.value}</div>
				<div className={styles.divider}></div>
				<div className={styles.name_value}>2 дня 11 часов 3 минуты 58 секунд</div>
			</div>
		</div>
	)
}

export default TimeContent

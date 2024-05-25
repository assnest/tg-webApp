/* eslint-disable @typescript-eslint/no-explicit-any */
import { convertTime } from '../../utils/Functions'
import styles from './TimeContent.module.css'

interface Theme {
	length: number
	oldTheme: any
}

interface Props {
	pinInfo: {
		themes: Theme
	}
	openInfo: {
		themes: Theme
	}
	closeInfo: {
		themes: number
		time: number
	}
	visible: boolean
}
const TimeContent = ({ pinInfo, openInfo, closeInfo, visible }: Props) => {
	console.log(closeInfo)
	return (
		<div className={`${styles.content} ${visible ? styles.show : ''}`}>
			<div className={styles.item}>
				<div className={styles.name_item}>Закреплено: {pinInfo.themes.length}</div>
				<div className={styles.divider}></div>
				<div className={styles.name_value}>{pinInfo.themes.length == 0 ? ' Нет жалоб' : ' ' + convertTime(Math.floor(Date.now() / 1000) - pinInfo.themes.oldTheme.created.createdAt.timestamp).text}</div>
			</div>
			<div className={styles.item}>
				<div className={styles.name_item}>Закрыто: {closeInfo.themes}</div>
				<div className={styles.divider}></div>
				<div className={styles.name_value}>{closeInfo.themes == 0 ? ' Нет жалоб' : ' ' + convertTime(closeInfo.time).text}</div>
			</div>
			<div className={styles.item}>
				<div className={styles.name_item}>Открыто: {openInfo.themes.length}</div>
				<div className={styles.divider}></div>
				<div className={styles.name_value}>{openInfo.themes.length == 0 ? ' Нет жалоб' : ' ' + convertTime(Math.floor(Date.now() / 1000) - openInfo.themes.oldTheme.created.createdAt.timestamp).text}</div>
			</div>
		</div>
	)
}

export default TimeContent

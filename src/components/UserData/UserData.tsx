import { BiChevronDown } from 'react-icons/bi'
import styles from './UserData.module.css'
import { useState } from 'react'

interface Props {
	avatar: string
	username: string
	countThemes: number
	averageCloseTime: number
}

const UserData = ({ averageCloseTime, countThemes, avatar, username }: Props) => {
	const [isShow, setIsShow] = useState(false)
	return (
		<div className={styles.container + ` ${isShow ? styles.show : ''}`} onBlur={() => setIsShow(false)} tabIndex={1}>
			<div
				className={styles.header}
				onClick={(e) => {
					e.stopPropagation()
					setIsShow((prev) => !prev)
				}}
			>
				<div className={styles.avatar}>{avatar ? '' : username[0]}</div>
				<div className={styles.name}>{username}</div>
				<BiChevronDown
					className={styles.dropdown_icon + ` ${isShow ? styles.show : ''}`}
					onClick={(e) => {
						e.stopPropagation()
						setIsShow((prev) => !prev)
					}}
				/>
			</div>
			<div className={styles.data_сontent}>
				<div className={styles.data_items}>
					<span className={styles.data_item}>Закрытых тем</span>
					<span className={styles.data_item}>Среднее время закрытия</span>
				</div>
				<div className={styles.divider}></div>
				<div className={styles.data_items}>
					<span className={styles.data_item}>{countThemes}</span>
					<span className={styles.data_item}>{averageCloseTime} часов</span>
				</div>
			</div>
		</div>
	)
}

export default UserData

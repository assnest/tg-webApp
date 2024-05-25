import { IconType } from 'react-icons'
import styles from './ThemeInfo.module.css'
import { useState, useEffect } from 'react'

interface Props {
	Icon: IconType
	value: string | number
	// onClick: () => void
}

const ThemesInfo = ({ Icon, value }: Props) => {
	const [isLongValue, setIsLongValue] = useState(false)

	useEffect(() => {
		setIsLongValue(value.toString().length > 3) // Установить флаг, если значение длиннее 5 символов
	}, [value])

	return (
		<div className={styles.container}>
			<span className={styles.icon}>
				<Icon />
			</span>
			<div className={styles.divider}></div>
			<span className={`${styles.value} ${isLongValue ? styles.small : ''}`}>{value}</span>
		</div>
	)
}

export default ThemesInfo

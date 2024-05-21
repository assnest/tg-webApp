import ThemeInfo from '../ThemeInfo/ThemeInfo'
import UserData from '../UserData/UserData'
import styles from './DataLoaded.module.css'
import { FaApple, FaLock, FaThumbtack, FaUnlock } from 'react-icons/fa6'

interface Props {
	data: {
		themes: {
			type: 'pin' | 'close' | 'open'
			value: number
		},
    users: {
      username: string
      countThemes: number
      averageClosingTime: number
    }[]
	}[]
}

const DataLoaded = ({ data }: Props) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				{data.map((v, index) => {
					let IconComponent
					switch (v.themes.type) {
						case 'pin':
							IconComponent = FaThumbtack
							break
						case 'close':
							IconComponent = FaLock
							break
						case 'open':
							IconComponent = FaUnlock
							break
						default:
							IconComponent = FaApple
					}
					return <ThemeInfo key={index} Icon={IconComponent} value={v.themes.value} />
				})}
			</div>
			<UserData username="Даня" countThemes={123} averageClosingTime={12} avatar="" />
		</div>
	)
}

export default DataLoaded

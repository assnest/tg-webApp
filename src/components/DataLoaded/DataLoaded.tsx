/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios'
import ThemeInfo from '../ThemeInfo/ThemeInfo'
import UserData from '../UserData/UserData'
import styles from './DataLoaded.module.css'
import { FaAngleDown, FaApple, FaLock, FaThumbtack, FaUnlock } from 'react-icons/fa6'
import { useState } from 'react'
import TimeContent from '../TimeContent/TimeContent'

interface IDataUser {
	username: string
	countThemes: number
	avgClosingTime: number
}

interface IData {
	themes: {
		type: string
		value: number
	}[]
	users: IDataUser[]
}
interface Props {
	data: AxiosResponse
}
const DataLoaded = ({ data }: Props) => {
	const [themesInfoVisible, setVisible] = useState(false)
	const forumsData = data?.data
	const themes = forumsData.themes
	const users: IDataUser[] = forumsData.users
	const content: IData = {
		themes: [
			{ type: 'pin', value: themes.pinned.length || 0 },
			{ type: 'close', value: themes.closed.length || 0 },
			{ type: 'open', value: themes.open.length || 0 },
		],
		users: users.sort((a, b) => b.countThemes - a.countThemes),
	}
	return (
		<div className={styles.container}>
			{content.themes.map((v, index) => {
				let IconComponent
				switch (v.type) {
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
				return <ThemeInfo key={index} Icon={IconComponent} value={v.value} />
			})}

			<div className={styles['themes-info']}>
				<TimeContent pinInfo={{ time: 1, themes: { length: themes.pinned.length || 0, oldTheme: themes.pinned.sort((a: any, b: any) => a.created.createdAt.timestamp - b.created.createdAt.timestamp)[0]}}} openInfo={{ time: 1, themes: { length: themes.open.length || 0, oldTheme: themes.open.sort((a: any, b: any) => a.created.createdAt.timestamp - b.created.createdAt.timestamp)[0]}  }} closeInfo={{ time: 1, themes: {length: themes.closed.length || 0, oldTheme: themes.closed.sort((a: any, b: any) => a.created.createdAt.timestamp - b.created.createdAt.timestamp)[0]} }} visible={themesInfoVisible} />
				<span className={styles.btn} onClick={() => setVisible((prev) => !prev)}>
					<FaAngleDown className={`${styles.icon} ${themesInfoVisible ? styles.show : ''}`} />
				</span>
			</div>

			{content.users.map((v, index) => (
				<UserData key={index} username={v.username} countThemes={v.countThemes} avgClosingTime={v.avgClosingTime} avatar="" />
			))}
		</div>
	)
}

export default DataLoaded

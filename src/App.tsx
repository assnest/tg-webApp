/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import styles from './App.module.css'
import { SelectOption } from './components/cselect/cselect'
import Selects from './components/Selects/Selects.tsx'
import DataLoaded from './components/DataLoaded/DataLoaded.tsx'
// import Request from './utils/Request.ts'

const options_servers: SelectOption[] = [
	{ label: 'Sedona', value: 22 },
	{ label: 'Red Rock', value: 8 },
]

const options_times: SelectOption[] = [
	{ label: 'Год', value: 365 },
	{ label: 'Пол года', value: Math.floor(365 / 2) },
	{ label: 'Месяц', value: 30 },
	{ label: 'Неделя', value: 7 },
]

const options_forums: SelectOption[] = [
	{
		label: 'Технический раздел',
		value: 2353,
	},
	{ label: 'Жалобы на администрацию', value: 2300 },
]

// const tg = window.Telegram.WebApp

function App() {
	const [value_servers, setValueServer] = useState<SelectOption>(options_servers[0])
	const [value_times, setValueTimer] = useState<SelectOption>(options_times[3])
	const [value_forums, setValueForums] = useState<SelectOption>(options_forums[0])
	// const [hText, setHText] = useState<string>('Пусто...')
	// const [sText, setSText] = useState<string>('Получить информацию по кнопке')
	// ############################## СДЕЛАТЬ ПОЛУЧЕНИЕ ДАННЫХ С АПИ И СДЕЛАТЬ КОМПОНЕНТЫ ###################################
	// const response = await Request.get(`https://643c-31-173-170-144.ngrok-free.app/getforums?link=${value_forums.value}&days=${value_times.value}`, {
	// 	'ngrok-skip-browser-warning': '1',
	// })

	return (
		<>
			<div className={styles.content}>
				<Selects
					options={[options_servers, options_times, options_forums]}
					values={[value_servers, value_times, value_forums]}
					onChanges={[
						(o: any) => {
							setValueServer(o)
						},
						(o: any) => {
							setValueTimer(o)
						},
						(o: any) => {
							setValueForums(o)
						},
					]}
				/>
				<DataLoaded
					data={[
						{
							type: 'pin',
							value: 0,
						},
						{
							type: 'close',
							value: 0,
						},
						{
							type: 'open',
							value: 0,
						},
					]}
				/>
				{/* <DataEmpty hText={hText} sText={sText} />
				<LoadButton label="Получить" disabled={false} onClick={() => {}} /> */}
			</div>
		</>
	)
}

export default App

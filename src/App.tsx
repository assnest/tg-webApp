/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { SelectOption } from './components/cselect/cselect';
import Selects from './components/Selects/Selects.tsx';
import DataLoaded from './components/DataLoaded/DataLoaded.tsx';
import DataEmpty from './components/DataEmpty/DataEmpty.tsx';
import { LoadButton } from './components/LoadButton/loadButton.tsx';
import { useMutation } from '@tanstack/react-query';
import Request from './utils/Request.ts';

const options_servers: SelectOption[] = [
	{ label: 'Sedona', value: 22 },
	{ label: 'Red Rock', value: 8 },
];

const options_times: SelectOption[] = [
	{ label: 'Год', value: 365 },
	{ label: 'Пол года', value: Math.floor(365 / 2) },
	{ label: 'Месяц', value: 30 },
	{ label: 'Неделя', value: 7 },
];

const forums_by_server: { [key: number]: SelectOption[] } = {
	22: [
		{ label: 'Технический раздел', value: 2353 },
		{ label: 'Жалобы на администрацию', value: 2300 },
	],
	8: [
		{ label: 'Технический раздел', value: 1199 },
		{ label: 'Жалобы на игроков не сост', value: 840 },
		{ label: 'Жалобы на игроков сост в гос', value: 841 },
		{ label: 'Жалобы на мафии', value: 842 },
		{ label: 'Жалобы на бандитов', value: 843 },
	],
};

function App() {
	const [value_servers, setValueServer] = useState<SelectOption>(options_servers[0]);
	const [value_times, setValueTimer] = useState<SelectOption>(options_times[3]);
	const [value_forums, setValueForums] = useState<SelectOption>(forums_by_server[options_servers[0].value][0]);

	const { mutate, data, status, isError, error, isSuccess } = useMutation({
		mutationFn: async () => {
			const response = await Request.get(`https://2657-31-173-170-144.ngrok-free.app/getforums?link=${value_forums.value}&days=${value_times.value}`, { 'ngrok-skip-browser-warning': '1' });
			return response.data;
		},
	});

	const handleLoad = () => {
		mutate();
	};

	useEffect(() => {
		setValueForums(forums_by_server[value_servers.value][0]);
	}, [value_servers]);

	return (
		<>
			<div className={styles.content}>
				<Selects
					options={[options_servers, options_times, forums_by_server[value_servers.value]]}
					values={[value_servers, value_times, value_forums]}
					onChanges={[
						(o: any) => {
							setValueServer(o);
						},
						(o: any) => {
							setValueTimer(o);
						},
						(o: any) => {
							setValueForums(o);
						},
					]}
				/>
				{isSuccess ? (
					<DataLoaded data={data} />
				) : status == "pending" ? (
					<DataEmpty hText="Загрузка..." sText="Информация загружается" />
				) : isError ? (
					<DataEmpty hText="Ошибка..." sText={`${error}`} />
				) : (
					<DataEmpty hText="Получить..." sText="Получить информацию по кнопке" />
				)}
				<LoadButton loaded={isSuccess} label={status == "pending" ? 'Загружается..' : isSuccess ? 'Обновить' : 'Получить'} disabled={status == "pending"} onClick={handleLoad} />
			</div>
		</>
	);
}

export default App;

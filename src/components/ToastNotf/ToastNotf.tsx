/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import styles from './ToastNotf.module.css';
import { FaBell } from 'react-icons/fa6';

interface ToastNotificationProps {
	message: string;
	duration: number;
	onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ message, duration, onClose }) => {
	const [visible, setVisible] = useState(false);
	const [shake, setShake] = useState(false);
	const hideTimerRef = useRef<any>(null);
	const shakeResetTimerRef = useRef<any>(null);
	const closeTimerRef = useRef<any>(null);

	useEffect(() => {
		// Показываем тост
		setVisible(true);
		setShake(true);

		// Сброс анимации тряски
		shakeResetTimerRef.current = setTimeout(() => setShake(false), 500); // соответствуем продолжительности CSS анимации

		// Устанавливаем таймер для скрытия тоста
		hideTimerRef.current = setTimeout(() => {
			setVisible(false);
			// Закрываем тост после завершения анимации скрытия
			closeTimerRef.current = setTimeout(() => {
				onClose();
			}, 500); // соответствуем продолжительности CSS перехода
		}, duration);

		// Очистка таймеров при размонтировании компонента или изменении сообщения
		return () => {
			if (shakeResetTimerRef.current) clearTimeout(shakeResetTimerRef.current);
			if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
			if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
		};
	}, [duration, onClose, message]);

	return (
		<div className={`${styles['toast-notification']} ${visible ? styles.show : ''}`}>
			<div className={styles['toast-content']}>
				<span className={`${styles.icon} ${shake ? styles['icon-shake'] : ''}`}><FaBell /></span>
				<span>{message}</span>
			</div>
		</div>
	);
};

export default ToastNotification;

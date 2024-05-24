import React, { useEffect, useState } from 'react';
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

	useEffect(() => {
		// Show the toast
		setVisible(true);
		setShake(true);

		// Reset shake animation
		const shakeResetTimer = setTimeout(() => setShake(false), 500); // match this duration with the CSS animation duration

		// Set a timer to hide the toast
		const hideTimer = setTimeout(() => {
			setVisible(false);
			// Close the toast after the hiding animation is complete
			setTimeout(() => {
				onClose();
			}, 500); // match this duration with the CSS transition duration
		}, duration);

		// Cleanup timers
		return () => {
			clearTimeout(shakeResetTimer);
			clearTimeout(hideTimer);
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

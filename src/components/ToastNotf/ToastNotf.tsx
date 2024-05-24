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
		// Show the toast
		setVisible(true);
		setShake(true);

		// Reset shake animation
		shakeResetTimerRef.current = setTimeout(() => setShake(false), 500); // match this duration with the CSS animation duration

		// Set a timer to hide the toast
		hideTimerRef.current = setTimeout(() => {
			setVisible(false);
			// Close the toast after the hiding animation is complete
			closeTimerRef.current = setTimeout(() => {
				onClose();
			}, 500); // match this duration with the CSS transition duration
		}, duration);

		// Cleanup timers on component unmount or when message changes
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

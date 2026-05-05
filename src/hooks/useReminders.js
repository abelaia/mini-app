import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'turko_reminders';

export const useReminders = () => {
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setReminders(JSON.parse(saved));
        }
        setLoading(false);
    }, []);

    const saveReminders = useCallback((newReminders) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newReminders));
        setReminders(newReminders);
    }, []);

    const isReminderExists = useCallback((seriesName, eventType, eventTime) => {
        return reminders.some(reminder => 
            reminder.seriesName === `${seriesName} (${eventType})` ||
            (reminder.seriesName.includes(seriesName) && reminder.eventType === eventType)
        );
    }, [reminders]);

    const addReminder = useCallback((seriesName, eventType, eventTime) => {
        if (isReminderExists(seriesName, eventType, eventTime)) {
            showToast(`Напоминание о "${seriesName}" (${eventType}) уже добавлено!`);
            return null;
        }

        const now = new Date();
        const targetDate = new Date();
        
        const currentHour = now.getHours();
        if (currentHour >= 21) {
            targetDate.setDate(targetDate.getDate() + 1);
        }
        
        const [hour] = eventTime.split(':');
        targetDate.setHours(parseInt(hour), 0, 0, 0);
        
        const newReminder = {
            id: Date.now(),
            seriesName: `${seriesName} (${eventType})`,
            eventType: eventType,
            eventTime: eventTime,
            targetTimestamp: targetDate.getTime(),
            targetDateStr: targetDate.toLocaleDateString('ru-RU'),
            createdAt: now.toISOString(),
        };
        
        const updated = [...reminders, newReminder];
        saveReminders(updated);
        
        showToast(`🔔 Напоминание о "${seriesName}" (${eventType}) установлено!`);
        
        return newReminder;
    }, [reminders, saveReminders, isReminderExists]);

    const removeReminder = useCallback((id) => {
        const updated = reminders.filter(r => r.id !== id);
        saveReminders(updated);
        showToast('Напоминание удалено');
    }, [reminders, saveReminders]);

    const clearAllReminders = useCallback(() => {
        saveReminders([]);
        showToast('Все напоминания удалены');
    }, [saveReminders]);

    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'toast-msg';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 20px;
            right: 20px;
            background: $bg-toast;
            color: $text-toast;
            padding: $space-md;
            border-radius: $radius-toast;
            text-align: center;
            font-size: $font-toast;
            z-index: $z-toast;
            box-shadow: $shadow-toast;
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
    };

    return {
        reminders,
        loading,
        addReminder,
        removeReminder,
        clearAllReminders,
    };
};

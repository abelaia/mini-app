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
        const existingToast = document.querySelector('.toast-msg');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast-msg';
        toast.textContent = message;
        
        toast.style.cssText = `
            position: fixed;
            bottom: 90px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--vkui--color_background_float);
            color: var(--vkui--color_text_primary);
            padding: 8px 16px;
            border-radius: 24px;
            text-align: center;
            font-size: 13px;
            font-weight: 500;
            z-index: 10000;
            max-width: 90%;
            white-space: normal;
            word-break: break-word;
            box-shadow: var(--vkui--elevation_2);
            font-family: var(--vkui--font_family_base);
            border: 1px solid var(--vkui--color_separator_primary);
            backdrop-filter: blur(20px);
            animation: fadeInUp 0.2s ease-out;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(10px)';
            toast.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            setTimeout(() => {
                if (toast.parentNode) toast.remove();
            }, 200);
        }, 2500);
    };

    return {
        reminders,
        loading,
        addReminder,
        removeReminder,
        clearAllReminders,
    };
};

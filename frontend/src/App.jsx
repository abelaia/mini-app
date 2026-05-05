import React, { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, Panel, Tabbar, TabbarItem, Group } from '@vkontakte/vkui';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header/Header';
import { TodayTab } from './components/TodayTab/TodayTab';
import { ScheduleTab } from './components/ScheduleTab/ScheduleTab';
import { RemindersTab } from './components/RemindersTab/RemindersTab';
import { InfoTab } from './components/InfoTab/InfoTab';
import { useReminders } from './hooks/useReminders';
import './assets/styles/global.scss';

const requestNotificationPermission = async () => {
    try {
        const result = await bridge.send('VKWebAppAllowNotifications');
        console.log('Разрешение получено:', result);
        return true;
    } catch (error) {
        console.error('Пользователь запретил уведомления:', error);
        return false;
    }
};

bridge.send('VKWebAppInit').then(() => {
    requestNotificationPermission();
});

const tabItems = [
    { id: 'today', icon: <img src="/icons/today.svg" alt="today" width={20} height={20} />, label: 'Сегодня' },
    { id: 'schedule', icon: <img src="/icons/calendar.svg" alt="calendar" width={20} height={20} />, label: 'Расписание' },
    { id: 'reminders', icon: <img src="/icons/bell.svg" alt="bell" width={20} height={20} />, label: 'Уведомления' },
    { id: 'info', icon: <img src="/icons/information.svg" alt="info" width={20} height={20} />, label: 'О паблике' },
];

export const App = () => {
    const [activeTab, setActiveTab] = useState('today');
    const { reminders, addReminder, removeReminder, clearAllReminders } = useReminders();

    const checkReminderExists = (seriesName, eventType, eventTime) => {
        return reminders.some(reminder => 
            reminder.seriesName === `${seriesName} (${eventType})` ||
            (reminder.seriesName.includes(seriesName) && reminder.eventType === eventType)
        );
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'today': return <TodayTab onRemind={addReminder} checkReminderExists={checkReminderExists} />;
            case 'schedule': return <ScheduleTab onRemind={addReminder} checkReminderExists={checkReminderExists} />;
            case 'reminders': return <RemindersTab reminders={reminders} onRemoveReminder={removeReminder} onClearAll={clearAllReminders} />;
            case 'info': return <InfoTab />;
            default: return <TodayTab onRemind={addReminder} />;
        }
    };

    return (
        <View activePanel="main">
            <Panel id="main">
                <Header />
                <Group className="content-group">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                        >
                            {renderTabContent()}
                        </motion.div>
                    </AnimatePresence>
                </Group>
                <Tabbar className="custom-tabbar">
                    {tabItems.map(item => (
                        <TabbarItem
                            key={item.id}
                            selected={activeTab === item.id}
                            onClick={() => setActiveTab(item.id)}
                            aria-label={item.label}
                        >
                            {item.icon}
                        </TabbarItem>
                    ))}
                </Tabbar>
            </Panel>
        </View>
    );
};

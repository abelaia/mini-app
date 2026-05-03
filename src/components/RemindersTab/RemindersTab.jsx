import React from 'react';
import { Card, Button, Group, Box, Title, Text, Caption } from '@vkontakte/vkui';
import './RemindersTab.scss';

export const RemindersTab = ({ reminders, onRemoveReminder, onClearAll }) => {
    if (!reminders || reminders.length === 0) {
        return (
            <Group className="reminders-tab">
                <Card mode="shadow" className="reminders-tab__card">
                    <Box className="reminders-tab__empty">
                        <img src="/icons/bell-off.svg" alt="no reminders" width={48} height={48} />
                        <Text>У вас нет активных напоминаний</Text>
                        <div className="reminders-tab__empty-hint">
                            <img src="/icons/bell.svg" alt="bell" width={14} height={14} />
                            <span>Нажмите на колокольчик на вкладке "Сегодня" или "Расписание"</span>
                        </div>
                    </Box>
                </Card>
            </Group>
        );
    }
    
    return (
        <Group className="reminders-tab">
            <Card mode="shadow" className="reminders-tab__card">
                <Box className='reminders-tab__box'>
                    <div className="reminders-tab__title">
                        <img src="/icons/bell.svg" alt="reminders" width={18} height={18} />
                        <Title level="3" weight="2">Ваши активные напоминания</Title>
                    </div>
                    
                    <div className="reminders-tab__list">
                        {reminders.map(reminder => (
                            <div key={reminder.id} className="reminders-tab__item">
                                <div className="reminders-tab__info">
                                    <div className="reminders-tab__name">{reminder.seriesName}</div>
                                    <div className="reminders-tab__time">
                                        <img src="/icons/clock.svg" alt="time" width={12} height={12} />
                                        <span>{reminder.eventTime} (МСК) · {reminder.targetDateStr || 'сегодня'}</span>
                                    </div>
                                </div>
                                <Button
                                    size="s"
                                    mode="secondary"
                                    before={<img src="/icons/bell-off.svg" alt="turn-off" width={14} height={14} />}
                                    onClick={() => onRemoveReminder(reminder.id)}
                                    className="reminders-tab__button"
                                >
                                    Отключить
                                </Button>
                            </div>
                        ))}
                    </div>
                    
                    <Button
                        size="s"
                        mode="secondary"
                        onClick={onClearAll}
                        className="reminders-tab__button-clear"
                    >
                        Отключить все
                    </Button>
                </Box>
            </Card>
        </Group>
    );
};

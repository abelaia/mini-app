import React from 'react';
import { Card, Button, Group, Box, Title, Caption } from '@vkontakte/vkui';
import { scheduleData, weekDaysOrder, dayNamesRu } from '../../store/scheduleData';
import './TodayTab.scss';

export const TodayTab = ({ onRemind, checkReminderExists }) => {
    const now = new Date();
    const todayKey = weekDaysOrder[now.getDay() === 0 ? 6 : now.getDay() - 1];
    const tomorrowKey = weekDaysOrder[(now.getDay() === 0 ? 6 : now.getDay() - 1) + 1] || weekDaysOrder[0];
    
    const today = scheduleData[todayKey];
    const tomorrow = scheduleData[tomorrowKey];

    const handleRemind = (seriesName, eventType, eventTime) => {
        if (checkReminderExists && checkReminderExists(seriesName, eventType, eventTime)) {
            return;
        }
        onRemind(seriesName, eventType, eventTime);
    };
    
    const renderSeriesCard = (series, dayName) => {
        if (!series) {
            return (
                <Card key={dayName} mode="shadow" className="today-tab__card">
                    <Box className="today-tab__empty">
                        <img src="/icons/flower.svg" alt="no series" width={24} height={24} />
                        <span>Нет сериала</span>
                    </Box>
                </Card>
            );
        }
        
        return (
            <Card key={dayName} mode="shadow" className="today-tab__card">
                <Box className="today-tab__box">
                    <Caption level="1" weight="2" caps className="today-tab__badge">
                        {dayName}
                    </Caption>
                    
                    <Title level="2" weight="3" className="today-tab__title">
                        {series.name}
                    </Title>
                    
                    <div className="today-tab__translator">
                        <img src="/icons/microphone.svg" alt="translator" width={14} height={14} style={{ marginRight: 4 }} />
                        Перевод: {series.translator}
                    </div>
                    
                    <div className="today-tab__row">
                        <span className="today-tab__row-label">
                            <img src="/icons/repeat.svg" alt="repeat" width={16} height={16} />
                            Повтор 20:00
                        </span>
                        <Button
                            size="s"
                            mode="secondary"
                            before={<img src="/icons/bell.svg" alt="remind" width={14} height={14} />}
                            onClick={() => handleRemind(series.name, 'повтор', '20:00')}
                            className="today-tab__button"
                        >
                            Напомнить
                        </Button>
                    </div>
                    
                    <div className="today-tab__row">
                        <span className="today-tab__row-label">
                            <img src="/icons/star.svg" alt="new" width={16} height={16} />
                            Новая серия 21:00
                        </span>
                        <Button
                            size="s"
                            mode="secondary"
                            before={<img src="/icons/bell.svg" alt="remind" width={14} height={14} />}
                            onClick={() => handleRemind(series.name, 'новая серия', '21:00')}
                            className="today-tab__button"
                        >
                            Напомнить
                        </Button>
                    </div>
                </Box>
            </Card>
        );
    };
    
    return (
        <Group className="today-tab">
            {renderSeriesCard(today, `СЕГОДНЯ · ${dayNamesRu[todayKey]}`)}
            {renderSeriesCard(tomorrow, `ЗАВТРА · ${dayNamesRu[tomorrowKey]}`)}
        </Group>
    );
};

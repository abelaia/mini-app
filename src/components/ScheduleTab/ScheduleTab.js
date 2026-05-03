import React from 'react';
import { Card, Button, Group, Box, Title } from '@vkontakte/vkui';
import { scheduleData, weekDaysOrder, dayNamesRu } from '../../store/scheduleData';
import './ScheduleTab.scss';

export const ScheduleTab = ({ onRemind }) => {
    const renderScheduleList = () => {
        return weekDaysOrder.map(dayKey => {
            const series = scheduleData[dayKey];
            if (!series) return null;
            
            return (
                <div key={dayKey} className="schedule-tab__item">
                    <div className="schedule-tab__day">
                        {dayNamesRu[dayKey]}
                    </div>
                    <div className="schedule-tab__details">
                        <div className="schedule-tab__series-row">
                            <div className="schedule-tab__series-info">
                                <span className="schedule-tab__series-name">{series.name}</span>
                                <span className="schedule-tab__translator">({series.translator})</span>
                                <span>— {series.time}</span>
                            </div>
                            <Button
                                size="s"
                                mode="secondary"
                                before={<img src="/icons/bell.svg" alt="remind" width={14} height={14} />}
                                onClick={() => onRemind(series.name, 'новая серия', series.time)}
                                className="schedule-tab__button"
                            >
                                Напомнить
                            </Button>
                        </div>
                        
                        {series.secondSeries && (
                            <div className="schedule-tab__series schedule-tab__series--second">
                                <span className="schedule-tab__emoji">{series.secondSeries.emoji}</span>
                                <span className="schedule-tab__series-name">{series.secondSeries.name}</span>
                                <span className="schedule-tab__translator">({series.secondSeries.translator})</span>
                                <span>— 21:00</span>
                            </div>
                        )}
                    </div>
                </div>
            );
        });
    };
    
    return (
        <Group className="schedule-tab">
            <Card mode="shadow" className="schedule-tab__card">
                <Box className="schedule-tab__box" >
                    <div className="schedule-tab__title">
                        <img src="/icons/calendar.svg" alt="schedule" width={20} height={20} />
                        <Title level="3" weight="2">Расписание на неделю</Title>
                    </div>
                    
                    <div className="schedule-tab__list">
                        {renderScheduleList()}
                    </div>
                    
                    <div className="schedule-tab__note">
                        <div className="schedule-tab__note-line">
                            <img src="/icons/repeat.svg" alt="repeat" width={14} height={14} />
                            <span>Повтор каждой серии — в 20:00</span>
                        </div>
                        <div className="schedule-tab__note-line">
                            <img src="/icons/clock.svg" alt="clock" width={14} height={14} />
                            <span>Московское время</span>
                        </div>
                    </div>
                </Box>
            </Card>
        </Group>
    );
};

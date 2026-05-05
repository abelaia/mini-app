import React from 'react';
import { Card, Group, Box, Title, Text, Caption } from '@vkontakte/vkui';
import './InfoTab.scss';

export const InfoTab = () => {
    const links = [
        { 
            href: 'https://t.me/sabqard',
            icon: '/icons/user.svg',
            text: 'Владелец и переводчик: Сабина',
        },
        { 
            href: 'https://m.vk.com/topic-190076650_49511760',
            icon: '/icons/rules.svg',
            text: 'Правила сообщества',
        },
        { 
            href: 'https://m.vk.com/topic-190076650_49519152',
            icon: '/icons/faq.svg',
            text: 'Часто задаваемые вопросы',
        },
        { 
            href: 'https://t.me/turkdizionline', 
            icon: '/icons/channel.svg',
            text: 'Наш Telegram-канал',
        },
    ];
    
    return (
        <Group className="info-tab">
            <Card mode="shadow" className="info-tab__card">
                <Box className="info-tab__box" >
                    <div className="info-tab__logo">📺</div>
                    <Title level="2" weight="3" className="info-tab__title">TürkDiziOnline</Title>
                    <Text className="info-tab__desc">Турецкие сериалы с онлайн-переводом</Text>
                    
                    <div className="info-tab__links">
                        {links.map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                className="info-tab__link"
                                rel="noopener noreferrer"
                            >
                                <img src={link.icon} alt={link.text} width={20} height={20} className="info-tab__link-icon" />
                                <span>{link.text}</span>
                                <img src="/icons/arrow-right.svg" alt="arrow" width={16} height={16} className="info-tab__link-arrow" />
                            </a>
                        ))}
                    </div>
                    
                    <div className="info-tab__footer">
                        <Caption level="2" weight="1">© Все права защищены. Сериалы публикуются в информационных целях.</Caption>
                        <div className="info-tab__mail">
                            <img src="/icons/mailbox.svg" alt="mailbox" width={14} height={14} />
                            <Caption level="2" weight="1">По вопросам рекламы — в личку группы.</Caption>
                        </div>
                    </div>
                </Box>
            </Card>
        </Group>
    );
};

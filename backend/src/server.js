import express from 'express';
import schedule from 'node-schedule';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const SERVICE_TOKEN = process.env.VK_SERVICE_TOKEN;
const APP_ID = process.env.VK_APP_ID;

if (!SERVICE_TOKEN) {
    console.error('VK_SERVICE_TOKEN не найден в .env файле!');
    process.exit(1);
}

console.log('Backend запускается с APP_ID:', APP_ID);

const scheduledJobs = new Map();

app.post('/api/schedule', async (req, res) => {
    const { user_id, series_name, event_type, event_time } = req.body;
    
    console.log(`Получен запрос: user=${user_id}, series=${series_name}, time=${event_time}`);

    const [hour] = event_time.split(':');
    const sendDate = new Date();
    sendDate.setHours(parseInt(hour), 0, 0, 0);
    
    if (sendDate <= new Date()) {
        sendDate.setDate(sendDate.getDate() + 1);
    }
    
    console.log(`Запланировано на: ${sendDate}`);
    
    const jobId = `${user_id}_${series_name}_${Date.now()}`;
    const job = schedule.scheduleJob(sendDate, async () => {
        await sendVKNotification(user_id, series_name, event_type, event_time);
        scheduledJobs.delete(jobId);
    });
    
    scheduledJobs.set(jobId, job);
    
    res.json({ 
        status: 'scheduled', 
        scheduledTime: sendDate.toISOString(),
        jobId: jobId
    });
});

app.get('/api/status', (req, res) => {
    res.json({
        activeJobs: scheduledJobs.size,
        appId: APP_ID,
        serviceTokenConfigured: !!SERVICE_TOKEN
    });
});

async function sendVKNotification(userId, seriesName, eventType, eventTime) {
    console.log(`🔔 Отправка уведомления пользователю ${userId} о "${seriesName}"`);
    
    const message = `🔔 Напоминание!\n\nСериал: ${seriesName}\nСобытие: ${eventType}\nВремя: ${eventTime} (МСК)`;
    
    const url = 'https://api.vk.com/method/secure.sendNotification';
    const params = new URLSearchParams({
        user_ids: userId,
        message: message,
        access_token: SERVICE_TOKEN,
        v: '5.199'
    });
    
    try {
        const response = await fetch(`${url}?${params}`);
        const data = await response.json();
        
        if (data.error) {
            console.error('Ошибка VK API:', data.error);
        } else {
            console.log('Уведомление отправлено:', data);
        }
    } catch (error) {
        console.error('Ошибка при отправке:', error);
    }
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Backend запущен на http://localhost:${PORT}`);
    console.log(`Эндпоинты:`);
    console.log(`POST /api/schedule - создать напоминание`);
    console.log(`GET  /api/status  - статус сервера`);
});

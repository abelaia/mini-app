import React from 'react';
import { createRoot } from 'react-dom/client';
import vkBridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import { App } from './App.jsx';

vkBridge.send('VKWebAppInit');

createRoot(document.getElementById('root')).render(<App />);

if (import.meta.env.MODE === 'development') {
    import('./eruda.js');
}

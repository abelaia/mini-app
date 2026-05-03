import React from 'react';
import './Header.scss';

export const Header = () => {
    return React.createElement('div', { className: 'header' },
        React.createElement('div', { className: 'header__top' },
            React.createElement('div', { className: 'header__logo' }, 
                React.createElement('img', 
                    { src: '/icons/logo.png', className: 'header__logo-icon', alt: 'logo' }
                ),
            ),
            React.createElement('div', { className: 'header__title' },
                React.createElement('h1', null, 'TürkDiziOnline'),
                React.createElement('p', null, 'Напоминалка'),
            ),
        ),
    );
};

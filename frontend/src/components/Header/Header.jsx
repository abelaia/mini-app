import React from 'react';
import './Header.scss';

export const Header = () => {
    return (
        <div className="header">
            <div className="header__top">
                <div className="header__logo">
                    <img src="/icons/logo.png" className="header__logo-icon" alt="logo" />
                </div>
                <div className="header__title">
                    <h1>TürkDiziOnline</h1>
                    <p>Напоминалка</p>
                </div>
            </div>
        </div>
    );
};

import MountainIcon from '../assets/icons/mountain.svg?react';
import FamilyIcon from '../assets/icons/family.svg?react';
import MoneyIcon from '../assets/icons/money.svg?react';
import HeartIcon from '../assets/icons/heart.svg?react';
import CrownIcon from '../assets/icons/crown.svg?react';
import WaveIcon from '../assets/icons/wave.svg?react';
import RoseIcon from '../assets/icons/rose.svg?react';
import GirlIcon from '../assets/icons/girl.svg?react';

export const scheduleData = {
    monday: {
        name: "Далекий город",
        translator: "Сабина",
        time: "21:00",
        icon: MountainIcon,
    },
    tuesday: {
        name: "A.B.İ.: Семья — это испытание",
        translator: "Сабина",
        time: "21:00",
        icon: FamilyIcon,
    },
    wednesday: {
        name: "Под землей",
        translator: "Диана",
        time: "21:00",
        icon: MoneyIcon,
    },
    thursday: {
        name: "Ты — тот, кого я люблю",
        translator: "Диана",
        time: "21:00",
        icon: HeartIcon,
        secondSeries: {
            name: "Преемник",
            translator: "Севинч",
            icon: CrownIcon,
        },
    },
    friday: {
        name: "Переполненное море",
        translator: "Севинч",
        time: "21:00",
        icon: WaveIcon,
    },
    saturday: {
        name: "Розы и грехи",
        translator: "Сабина",
        time: "21:00",
        icon: RoseIcon,
    },
    sunday: {
        name: "Дурнушка",
        translator: "Диана",
        time: "21:00",
        icon: GirlIcon,
    },
};

export const weekDaysOrder = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
];

export const dayNamesRu = {
    monday: "Понедельник",
    tuesday: "Вторник",
    wednesday: "Среда",
    thursday: "Четверг",
    friday: "Пятница",
    saturday: "Суббота",
    sunday: "Воскресенье",
};

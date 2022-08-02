import React, { FC, useRef, useState } from 'react';
import { Tooltip } from '../Tooltip/Tooltip';

import { cnForm } from './Form.classname';

type FormProps = {

};

const noop = () => {};

function isSelectElement(element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): element is HTMLSelectElement {
    return element.tagName === 'SELECT';
}

function isTextAreaElement(element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): element is HTMLTextAreaElement {
    return element.tagName === 'TEXTAREA';
}

export const Form: FC<FormProps> = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        'cats-breed': undefined,
        agree: false,
        review: '',
        color: undefined,
        avatar: '',
    });
    const ref = useRef(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const { username, password, 'cats-breed': catsBreed, agree, review, color, avatar } = form;

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { target } = event;

        if (isSelectElement(target)) {
            setForm(prev => ({ ...prev, [target.name]: target.value }));

            return;
        }

        if (isTextAreaElement(target)) {
            setForm(prev => ({ ...prev, [target.name]: target.value }));

            return;
        }

        setForm(prev => ({ ...prev, [target.name]: target.type === 'checkbox' ? target.checked : target.value }));
    };


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        console.log(form);
    }

    const handleAvatarChange = () => {
        const fileElement = fileRef.current;

        if (!fileElement) {
            return;
        }

        const file = fileElement.files && fileElement.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.addEventListener('load', (event: ProgressEvent<FileReader>) => {
            console.log(event.target?.result);

            setForm(prev => ({ ...prev, avatar: event.target?.result as string }));
        });

        reader.readAsDataURL(file);
    };

    return <form className={cnForm()} onSubmit={handleSubmit}>
        <div>
            {avatar && <img src={avatar} alt="avatar"/>}
            <label htmlFor="avatar">Аватарка</label>
            <input
                ref={fileRef}
                type="file"
                id="avatar"
                name="avatar"
                className={cnForm('input', cnForm('avatar'))}
                onChange={handleAvatarChange}
            />
        </div>

        <div>
            <label htmlFor="username">Имя пользователя</label>
            <input
                id="username"
                name="username"
                className={cnForm('input', cnForm('username'))}
                value={username}
                onChange={handleFieldChange}
            />
        </div>
        <div>
            <label htmlFor="password">Пароль</label>
            <input
                type="password"
                id="password"
                name="password"
                className={cnForm('input', cnForm('password'))}
                value={password}
                onChange={handleFieldChange}
            />
        </div>
        <div>
            <label htmlFor="cats-breed">Порода котиков</label>
            <select
                id="cats-breed"
                name="cats-breed"
                className={cnForm('input', cnForm('cats-breed'))}
                value={catsBreed}
                onChange={handleFieldChange}
            >
                <option value="">Выберите....</option>
                <option value="pers">Персидские</option>
                <option value="siam">Сиамские</option>
                <option value="lysye">Сфинксы</option>
            </select>
        </div>
        <div>
            <label htmlFor="agree">Согласен мыть кота</label>
            <input
                type="checkbox"
                id="agree"
                name="agree"
                className={cnForm('input', cnForm('agree'))}
                checked={agree}
                onChange={handleFieldChange}
            />
        </div>
        <div>
            <label htmlFor="review">Отзыв</label>
            <textarea
                ref={ref}
                id="review"
                name="review"
                className={cnForm('input', cnForm('review'))}
                value={review}
                onChange={handleFieldChange}
            />
            <Tooltip anchorRef={ref}/>
        </div>
        <div>
            <label>Окрас</label>
            <label htmlFor="stripes">Полосатый</label>
            <input
                type="radio"
                id="stripes"
                name="color"
                className={cnForm('input', cnForm('color'))}
                value="stripes"
                checked={color === 'stripes'}
                onChange={handleFieldChange}
            />
            <label htmlFor="dots">Пятнистый</label>
            <input
                type="radio"
                id="dots"
                name="color"
                className={cnForm('input', cnForm('color'))}
                value="dots"
                checked={color === 'dots'}
                onChange={handleFieldChange}
            />
            <label htmlFor="fill">Однородный</label>
            <input
                type="radio"
                id="fill"
                name="color"
                className={cnForm('input', cnForm('color'))}
                value="fill"
                checked={color === 'fill'}
                onChange={handleFieldChange}
            />
        </div>
        <button>Отправить</button>
    </form>;
};

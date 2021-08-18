import React, { FormEvent } from 'react';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
    onChange: (e: FormEvent<HTMLInputElement>) => void,
    type: 'tables' | 'rooms',
}

export function SearchBar(props: SearchBarProps): JSX.Element {
    const { t } = useTranslation();

    return (
        <Input onChange={props.onChange} placeholder={t(`${props.type}.searchBarPlaceholder`)}/>
    );
}

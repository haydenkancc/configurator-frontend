'use client'
import s from './title.module.scss'

export default function Title({ title } : Readonly<{ title : string }>) {
    return (
        <h1 className={s.title}>
            {title}
        </h1>
    )
}
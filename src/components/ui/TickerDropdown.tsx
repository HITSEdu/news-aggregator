import {useEffect, useRef, useState} from 'react'
import {type ITicker} from '../../constants/interfaces.ts'
import {useTranslation} from "react-i18next";
import DropTickerItem from "./DropTickerItem.tsx";

interface IProps {
    tickers: ITicker[]
    onSelect: (ticker: ITicker) => void
}

const TickerDropdown = ({tickers, onSelect}: IProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const wrapperRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const {t} = useTranslation('translations')

    const filtered = tickers.filter(t =>
        t.name.toUpperCase().includes(query.trim().toUpperCase())
    )

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div ref={wrapperRef} className="relative mt-4">
            <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                    setIsOpen(true)
                }}
                onFocus={() => setIsOpen(true)}
                placeholder={t('selectTicker')}
                className="w-full px-3 py-2 rounded-md bg-alt-light dark:bg-alt-dark text-text border border-[#555] outline-none focus:ring-2 focus:ring-[#4CAF50]"
            />

            {isOpen && (
                <ul
                    className="absolute z-10 w-full bg-bg-nd-light dark:bg-bg-nd-dark border border-[#444] mt-1 rounded-md max-h-60 overflow-y-auto shadow-lg"
                >
                    {filtered.length > 0 ? (
                        filtered.map((ticker) => (
                            <DropTickerItem
                                key={ticker.name}
                                ticker={ticker}
                                onClick={() => {
                                    onSelect(ticker)
                                    setIsOpen(false)
                                    setQuery('')
                                }}
                            />
                        ))
                    ) : (
                        <li className="px-3 py-2 text-text opacity-50 text-sm">{t('noMatchingTickers')}</li>
                    )}
                </ul>
            )}
        </div>
    )
}

export default TickerDropdown

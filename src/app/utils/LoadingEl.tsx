"use client"
import { memo, useEffect, useRef } from "react";
import loadingElStyle from '../styles/loadingEl.module.css';

function LoadingEl() {
    const loadingRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        const isLoadingElWords: string[] | undefined = loadingRef.current?.textContent?.split('');
        const loadingWords: string[] | undefined = isLoadingElWords?.map((word, i) => {
            return `<span class="${loadingElStyle.LoadingElChildren} ${loadingElStyle.txtFrames}" style="animation-delay:${(i + 1) * 0.025}s">${word}</span>`;
        });

        if (
            loadingRef.current !== null &&
            typeof loadingWords !== "undefined"
        ) {
            loadingRef.current.innerHTML = loadingWords?.join('');
        }
    }, []);

    return <div className={loadingElStyle.LoadingEl}><p ref={loadingRef}>...データを取得中</p></div>
}

export default memo(LoadingEl);
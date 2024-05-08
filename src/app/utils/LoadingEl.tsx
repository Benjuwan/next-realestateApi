"use client"

import loadingElStyle from '../styles/loadingEl.module.css';
import { memo, useEffect } from "react";

function LoadingEl() {
    /* ローディングテキストのアニメーション演出の準備と補助 */
    useEffect(() => {
        const isLoadingEl: HTMLParagraphElement | null = document.querySelector(".isLoading");
        const isLoadingElWords: string[] | undefined = isLoadingEl?.textContent?.split('');
        const loadingWords: string[] | undefined = isLoadingElWords?.map((word, i) => {
            return `<span class="${loadingElStyle.LoadingElChildren} ${loadingElStyle.txtFrames}" style="animation-delay:${(i + 1) * 0.025}s">${word}</span>`;
        });

        if (
            isLoadingEl !== null &&
            typeof loadingWords !== "undefined"
        ) {
            isLoadingEl.innerHTML = loadingWords?.join('');
        }
    }, []);

    return <div className={loadingElStyle.LoadingEl}><p className="isLoading">...データを取得中</p></div>
}

export default memo(LoadingEl);
import { memo, useState, ChangeEvent } from "react";
import filterStyle from "../../styles/filter.module.css";
import { useFilterMethod } from "../hooks/useFilterMethod";
import { useSortMethod } from "../hooks/useSortMethod";

function FilterActionBtns() {
    const { ascClick, deskClick } = useSortMethod();
    const { FilterPlace, ResetFilter } = useFilterMethod();

    /* 場所フィルター機能の input テキスト関連の処理 */
    const [isInputValue, setInputValue] = useState<string>('');
    const changeInputValue: (inputEl: ChangeEvent<HTMLInputElement>) => void = (inputEl: ChangeEvent<HTMLInputElement>) => {
        const inputElValue: string = inputEl.currentTarget.value;
        setInputValue(inputElValue);
    }

    /* フィルターのリセット・初期化 */
    const filterReset: () => void = () => {
        setInputValue('');
        ResetFilter();
    }

    return (
        <div className={filterStyle.FilterActionBtns}>
            <button type="button" className={filterStyle.askBtn} onClick={ascClick}>昇順</button>
            <button type="button" className={filterStyle.deskBtn} onClick={deskClick}>降順</button>
            <div className={filterStyle.filterPlace}>
                <form action="" onSubmit={(formEl: ChangeEvent<HTMLFormElement>) => {
                    formEl.preventDefault();
                    FilterPlace(isInputValue);
                }}>
                    <input type="text" value={isInputValue} onInput={(inputEl: ChangeEvent<HTMLInputElement>) => {
                        changeInputValue(inputEl);
                    }} />
                    <button type="button" className={filterStyle.placeBtn} disabled={isInputValue.length <= 0} onClick={() => { FilterPlace(isInputValue); }}>入力した地区で検索</button>
                </form>
            </div>
            <button type="button" className={filterStyle.resetBtn} onClick={filterReset}>リセット</button>
        </div>
    );
}

export default memo(FilterActionBtns);
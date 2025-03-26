// "use client"
/* 親コンポーネント（SelectEls.tsx）でクライアントコンポーネントの宣言済みなので再度 "use client" は不要 */

import { memo, useState, useEffect, useContext, ChangeEvent } from "react"
import selectElsStyles from "../../styles/selectEls.module.css";
import { GetFetchEachCode } from "@/app/providers/filter/GetFetchEachCode";

type SelectTermType = {
    SelectTermClassName: string;
    explainSentence?: string;
}

function SelectTerm({ props }: { props: SelectTermType }) {
    const { SelectTermClassName, explainSentence } = props;

    const { setGetFetchYearValue, setGetFetchQuarterValue } = useContext(GetFetchEachCode);

    const startYear: number = 1999;
    const getPresentYear: number = new Date().getFullYear();

    const [isSelectYears, setSelectYears] = useState<string[]>(['']);
    const selectYearsAry: string[] = [];
    for (let i = 0; i <= (getPresentYear - startYear); i++) {
        selectYearsAry.push(`${startYear + i}`);
    }
    useEffect(() => {
        setSelectYears(selectYearsAry);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectQuarter: number[] = [1, 2, 3, 4]; // 1:1月～3月、2:4月～6月、3:7月～10月、4:11月～12月

    return (
        <div className={`${selectElsStyles.termEls} ${SelectTermClassName}`}>
            {explainSentence && <p className={selectElsStyles.explainSentence}>{explainSentence}</p>}
            <select name="" id="yearsLists" onChange={(e: ChangeEvent<HTMLSelectElement>) => setGetFetchYearValue(e.target.value)}>
                {isSelectYears.map((yearsEls, i) => (
                    <option key={i} value={yearsEls}>{yearsEls}</option>
                ))}
            </select>
            <select name="" id="quarterLists" onChange={(e: ChangeEvent<HTMLSelectElement>) => setGetFetchQuarterValue(e.target.value)}>
                {selectQuarter.map((quarterEl, i) => (
                    <option key={i} value={quarterEl}>{quarterEl}</option>
                ))}
            </select>
        </div>
    );
}

export default memo(SelectTerm);
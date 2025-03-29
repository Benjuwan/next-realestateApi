import { memo, useState, ChangeEvent, useRef, useMemo } from "react";
import compareStyle from "../../styles/compare.module.css";
import { AverageCalcListType } from "./CompareComponent";
import AppStartBtn from "./AppStartBtn";

type CompareSelectTermType = {
    isViewChart: boolean;
    setViewChart: React.Dispatch<React.SetStateAction<boolean>>;
    averageCalcLists: AverageCalcListType[];
    setAverageCalcLists: React.Dispatch<React.SetStateAction<AverageCalcListType[]>>;
}

function CompareSelectTerm({ props }: { props: CompareSelectTermType }) {
    const { isViewChart, setViewChart, averageCalcLists, setAverageCalcLists } = props;

    const startYear: number = 2010;
    const getPresentYear: number = new Date().getFullYear();

    const selectYears: string[] = useMemo(() => {
        const result: string[] = [];
        for (let i = 0; i <= (getPresentYear - startYear); i++) {
            result.push(`${startYear + i}`);
        }
        return result;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ----- CompareSelectTerm 固有機能 ----- */
    const [termLists_from, setTermLists_from] = useState<number>(startYear);
    const [termLists_to, setTermLists_to] = useState<number>(startYear);
    const [isAppStartBtn, setAppStartBtn] = useState<boolean>(true);

    const termLists_from_Ref = useRef<HTMLSelectElement | null>(null);
    const termLists_to_Ref = useRef<HTMLSelectElement | null>(null);

    /* 計測開始・終了期間の State 更新を行う select イベント */
    const selectTermEvent: (selectEl: ChangeEvent<HTMLSelectElement>, setTermLists: React.Dispatch<React.SetStateAction<number>>) => void = (
        selectEl: ChangeEvent<HTMLSelectElement>,
        setTermLists: React.Dispatch<React.SetStateAction<number>>
    ) => {
        const selectElValue: number = parseInt(selectEl.currentTarget.value);
        setTermLists(selectElValue);
    }

    /* 計測スタートボタンの disabled 関連の処理 */
    const formEvent: (formEl: ChangeEvent<HTMLFormElement>) => void = (formEl: ChangeEvent<HTMLFormElement>) => {
        formEl.preventDefault();
        const fromValue: number = Number(termLists_from_Ref.current?.value);
        const toValue: number = Number(termLists_to_Ref.current?.value);

        /* 計測期間が同じでなく終了期間の方が大きい（過去 < 未来となっている）場合は disabled 解除。そうでない場合は disabled 付与 */
        if (fromValue !== toValue && fromValue < toValue) {
            setAppStartBtn(false);
        } else {
            setAppStartBtn(true);
        }
    }

    return (
        <>
            <form action="" className={compareStyle.CompareSelectTerm} onChange={formEvent}>
                <select
                    name="termLists_from"
                    id="TERMLISTS_FROM"
                    ref={termLists_from_Ref}
                    onChange={(selectEl: ChangeEvent<HTMLSelectElement>) => {
                        selectTermEvent(selectEl, setTermLists_from);
                    }}
                >
                    {selectYears.map((optionEl, i) => (
                        <option key={i} value={optionEl}>{optionEl}</option>
                    ))}
                </select>
                <select
                    name="termLists_to"
                    id="TERMLISTS_TO"
                    ref={termLists_to_Ref}
                    onChange={(selectEl: ChangeEvent<HTMLSelectElement>) => {
                        selectTermEvent(selectEl, setTermLists_to);
                    }}
                >
                    {selectYears.map((optionEl, i) => (
                        <option key={i} value={optionEl}>{optionEl}</option>
                    ))}
                </select>
                <AppStartBtn
                    props={{
                        isAppStartBtn: isAppStartBtn,
                        termLists_from: termLists_from,
                        termLists_to: termLists_to,
                        isViewChart: isViewChart,
                        setViewChart: setViewChart,
                        averageCalcLists: averageCalcLists,
                        setAverageCalcLists: setAverageCalcLists
                    }}
                />
            </form>
        </>
    );
}

export default memo(CompareSelectTerm);
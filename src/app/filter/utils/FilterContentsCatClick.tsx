import { memo } from "react";
import { EstateInfoJsonDataContents } from "../../ts/estateInfoJsonData";
import { useFilterMethod } from "../hooks/useFilterMethod";

type FilterAryProps = {
    aryEl: EstateInfoJsonDataContents;
    classNameStr?: string;
}

function FilterContentsCatClick({ props }: { props: FilterAryProps }) {
    const { aryEl, classNameStr = 'simpleBtn' } = props;

    const { FilterType } = useFilterMethod();

    return (
        <button type="button" className={classNameStr} onClick={(btnEl: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            FilterType(btnEl.currentTarget.textContent);
        }}>{aryEl.Type}</button>
    );
}

export default memo(FilterContentsCatClick);
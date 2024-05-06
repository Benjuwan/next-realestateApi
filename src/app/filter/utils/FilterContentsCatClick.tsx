import { memo } from "react";
import { estateInfoJsonDataContents } from "../../ts/estateInfoJsonData";
import { useFilterMethod } from "../hooks/useFilterMethod";

type filterAryProps = {
    aryEl: estateInfoJsonDataContents;
    classNameStr?: string;
}

function FilterContentsCatClick({ props }: { props: filterAryProps }) {
    const { aryEl, classNameStr = 'simpleBtn' } = props;
    
    const { FilterType } = useFilterMethod();

    return (
        <button type="button" className={classNameStr} onClick={(btnEl: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            FilterType(btnEl.currentTarget.textContent);
        }}>{aryEl.Type}</button>
    );
}

export default memo(FilterContentsCatClick);
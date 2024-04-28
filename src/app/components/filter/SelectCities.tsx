import { cityAry } from "@/app/ts/filterType/cityDataAryEls";

export default async function ({ resObjDataAry }: { resObjDataAry: cityAry[] }) {
    return (
        <form action="">
            <select name="" id="citiesLists">
                {resObjDataAry.map((city, i) => (
                    <option key={i} label={city.name} value={city.id}>{city.name}</option>
                ))}
            </select>
        </form>
    );
}
import { cityAry } from "@/app/ts/filterType/cityDataAryEls";

export default async function ({ cities }: { cities: cityAry[] }) {
    return (
        <form action="">
            <select name="" id="citiesLists">
                {cities.map((city, i) => (
                    <option key={i} label={city.name} value={city.id}>{city.name}</option>
                ))}
            </select>
        </form>
    );
}
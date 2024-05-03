import { cityAry } from "@/app/ts/cityDataAryEls";

export default function ({ cities }: { cities: cityAry[] }) {
    return (
        <form action="">
            <select name="" id="citiesLists">
                {cities.map(city => (
                    <option key={city.id} label={city.name} value={city.id}>{city.name}</option>
                ))}
            </select>
        </form>
    );
}
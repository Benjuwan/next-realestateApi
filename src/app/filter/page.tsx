import baseStyles from "../styles/page.module.css";
import FilterComponent from "./utils/FilterComponent";

export default async function FilterPage() {
  return (
    <div className={baseStyles.baseContent}>
      <h2 className={baseStyles.pageTitle_heading2}>検索（filter）</h2>
      <FilterComponent />
    </div>
  );
}
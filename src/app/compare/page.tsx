import baseStyles from "../styles/page.module.css";
import CompareComponent from "./utils/CompareComponent";

export default async function comparePage() {
  return (
    <div className={baseStyles.baseContent}>
      <h2 className={baseStyles.pageTitle_heading2}>比較（compare）</h2>
      <CompareComponent />
    </div>
  );
}
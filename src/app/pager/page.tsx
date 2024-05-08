import baseStyles from "../styles/page.module.css";
import { PagerBaseComponent } from "./utils/PagerBaseComponent";

export default async function PagerPage() {
  return (
    <div className={baseStyles.baseContent}>
      <h2 className={baseStyles.pageTitle_heading2}>pagerPage</h2>
      <PagerBaseComponent />
    </div>
  );
}
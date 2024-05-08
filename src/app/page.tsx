import baseStyles from "./styles/page.module.css";
import ProjectExplain from "./components/elements/ProjectExplain";
import SelectAction from "./utils/SelectAction";
import SelectEls from "./components/elements/SelectEls";

export default async function Home() {
  return (
    <main className={`${baseStyles.baseContent} ${baseStyles.contentWidth}`}>
      <h1 style={{ 'textAlign': 'center', 'fontSize': '20px', 'padding': '1em 0', 'fontWeight': 'normal' }}>不動産取引データ取得機能</h1>
      <section>
        <ProjectExplain />
        <SelectAction />
        <SelectEls />
      </section>
    </main>
  );
}
import SelectEls from "./components/filter/SelectEls";

export default async function Home() {
  return (
    <>
      <h1 style={{ 'textAlign': 'center', 'fontSize': '20px', 'padding': '1em 0', 'fontWeight': 'normal' }}>不動産取引データ取得機能</h1>
      <SelectEls />
    </>
  );
}

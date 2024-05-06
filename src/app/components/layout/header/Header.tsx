import { memo } from "react";
import Link from "next/link";

function Header() {
    return (
        <header>
            <Link href={'/'}>Topへ</Link>
        </header>
    );
}

export default memo(Header);
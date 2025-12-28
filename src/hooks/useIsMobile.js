import { useState } from "react";

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    window.addEventListener('resize', () => {
        if(window.innerWidth < 768){
            setIsMobile(true);
        }else{
            setIsMobile(false);
        }
    });
    return isMobile;
}
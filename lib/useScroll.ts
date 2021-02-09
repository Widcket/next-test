import { useEffect } from 'react';

export default function useScroll(id: string) {
    useEffect(() => {
        const element = document.getElementById(id);
        element.scrollTop = element.scrollHeight;
    });
}

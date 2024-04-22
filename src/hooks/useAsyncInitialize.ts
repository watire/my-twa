import { useEffect,useState } from "react";

export function useAsyncInitialize<T>(asyncFunction: () => Promise<T>, deps: any[] = []) {
    const [state, setState] = useState<T | undefined>();
        useEffect(() => {
            (async () => {
                setState(await asyncFunction());
            })();
        }, deps);
        return state;
    }

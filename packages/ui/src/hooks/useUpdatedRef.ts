import { useEffect, useRef, MutableRefObject } from 'react';

export const useUpdatedRef = <T>(value: T): MutableRefObject<T> => {
    const ref = useRef(value);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref;
};

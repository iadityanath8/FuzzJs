declare module rdom {
    type Element = string;
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}
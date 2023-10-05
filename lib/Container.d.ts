/// <reference types="react" />
import { TModal } from "./types";
declare const Container: import("react").ForwardRefExoticComponent<import("./types").TConfig & {
    name: string;
    title: string;
    children: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
    onHide?: (() => void) | undefined;
} & import("react").RefAttributes<TModal>>;
export { Container };

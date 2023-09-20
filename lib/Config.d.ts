/// <reference types="react" />
import { TConfigComponent } from "./types";
declare const Config: ({ children, ...props }: TConfigComponent) => import("react").ReactPortal | null;
export { Config };

import type { IOptionsColor } from "../IOptionsColor";
export interface IBackground {
    color: string | IOptionsColor;
    image: string;
    opacity: number;
    position: string;
    repeat: string;
    size: string;
}

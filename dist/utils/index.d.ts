import { ButtonTexts, SlideShowType, TimelineMode } from '@models/TimelineModel';
export declare const hexToRGBA: (hex: string, alpha: number) => string;
export declare const getDefaultThemeOrDark: (isDark?: boolean) => import("../models/Theme").Theme;
export declare const getDefaultClassNames: () => {
    card: string;
    cardMedia: string;
    cardSubTitle: string;
    cardText: string;
    cardTitle: string;
    controls: string;
    title: string;
};
export declare const getDefaultButtonTexts: () => ButtonTexts;
export declare const getSlideShowType: (mode: TimelineMode) => SlideShowType;
export declare const isTextArray: (text: string | string[]) => text is string[];
export declare const sanitizeHtmlText: (text: string | string[]) => string | string[];
export declare const getUniqueID: () => string;

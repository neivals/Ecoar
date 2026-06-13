import { createContext, useContext, useState } from "react";

const IDENTITY = [1,0,0,0,0, 0,1,0,0,0, 0,0,1,0,0, 0,0,0,1,0];

const FILTER_MATRICES = {
    grayscale:    [0.299,0.587,0.114,0,0, 0.299,0.587,0.114,0,0, 0.299,0.587,0.114,0,0, 0,0,0,1,0],
    deuteranopia: [0.625,0.375,0,0,0,     0.7,0.3,0,0,0,         0,0.3,0.7,0,0,         0,0,0,1,0],
    protanopia:   [0.567,0.433,0,0,0,     0.558,0.442,0,0,0,     0,0.242,0.758,0,0,     0,0,0,1,0],
    tritanopia:   [0.95,0.05,0,0,0,       0,0.433,0.567,0,0,     0,0.475,0.525,0,0,     0,0,0,1,0],
};

export const FONT_SCALES = [0.85, 1, 1.2];

const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children }) {
    const [fontSizeIndex, setFontSizeIndex] = useState(1);
    const [filterEnabled, setFilterEnabled] = useState(false);
    const [filterValues, setFilterValues] = useState({
        grayscale: 0,
        deuteranopia: 0,
        protanopia: 0,
        tritanopia: 0,
    });

    return (
        <AccessibilityContext.Provider value={{
            fontSizeIndex, setFontSizeIndex,
            filterEnabled, setFilterEnabled,
            filterValues, setFilterValues,
            FILTER_MATRICES,
            IDENTITY,
        }}>
            {children}
        </AccessibilityContext.Provider>
    );
}

export function useAccessibility() {
    return useContext(AccessibilityContext);
}

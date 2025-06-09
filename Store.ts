import { create } from "zustand";

type Output = {
    colorScheme:'light' | 'dark',
    isDarkMode:boolean,
    setDarkMode:(dark:boolean)=>any
}

export const useTheme = create<Output>((set) => ({ 
        colorScheme: 'light' as 'light' | 'dark',
        isDarkMode: false,
        setDarkMode: (dark: boolean) => {
            set({colorScheme: dark?"dark":"light", isDarkMode: dark});
        },
    }))
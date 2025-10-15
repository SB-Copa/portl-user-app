export default function useSessionStorage() {

    const setValue = (key: string, value: Record<string, unknown> | unknown[]) => {
        if (typeof window !== 'undefined') {
            window.sessionStorage.setItem(key, JSON.stringify(value))
        }
    }

    const getValue = (key: string) => {
        if (typeof window !== 'undefined') {
            return window.sessionStorage.getItem(key)
        }
    }

    const removeValue = (key: string) => {
        if (typeof window !== 'undefined') {
            window.sessionStorage.removeItem(key)
        }
    }

    const clear = () => {
        if (typeof window !== 'undefined') {
            window.sessionStorage.clear()
        }
    }


    return {
        setValue,
        getValue,
        removeValue,
        clear
    }

}

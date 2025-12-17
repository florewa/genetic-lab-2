export {}

declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

declare global {
    interface Window {
        BASE_URL: string
        TIMEOUT: number
    }
}

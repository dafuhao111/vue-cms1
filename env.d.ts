/// <reference types="vite/client" />

declare module '@wangeditor/editor-for-vue'

declare module '*.vue' {
    import type {DefineComponent} from 'vue'

    const component: DefineComponent<object, object, any>
    export default component
}
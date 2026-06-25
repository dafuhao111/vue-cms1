export interface NewsAttachment {
    name: string
    url: string
    size?: number
    type?: string
}

export interface NewsItem {
    id: string
    title: string
    category: string
    supplier?: string
    reviewer?: string
    content: string
    status: string
    createTime?: string
    updateTime?: string
    publishTime?: string
    attachments?: NewsAttachment[]
}

export interface NewsPage<T> {
    records: T[]
    total: number
    size: number
    current: number
    pages: number
}

interface ApiResult<T> {
    code?: number
    msg?: string
    message?: string
    data: T
}

interface NewsPageQuery {
    currentPage: number
    pageSize: number
    params?: Array<{
        name: string
        value: string
    }>
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    })

    if (!response.ok) {
        throw new Error(`请求失败：${response.status}`)
    }

    const result = (await response.json()) as ApiResult<T>
    if (result.code !== undefined && result.code !== 200) {
        throw new Error(result.message || result.msg || '请求失败')
    }

    return result.data
}

export const getPublicNewsPage = (data: NewsPageQuery) => {
    return request<NewsPage<NewsItem>>('/api/news/public/page', {
        method: 'POST',
        body: JSON.stringify(data),
    })
}

export const getPublicNewsDetail = (id: string) => {
    return request<NewsItem>(`/api/news/public/${id}`)
}

export const getAttachmentUrl = (url: string) => {
    if (!url) return '#'
    if (/^https?:\/\//i.test(url)) return url
    return `${API_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`
}
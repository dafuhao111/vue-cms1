import axios from "@/http/axios.ts";

export interface NewsPayload {
    title: string
    category: string
    supplier?: string
    reviewer?: string
    content: string
}

export const createNews = (data: NewsPayload) => {
    return axios({
        url: '/api/news',
        method: 'POST',
        data
    })
}
export const updateNews = (id: string, data: NewsPayload) => {
    return axios({
        url: `/api/news/${id}`,
        method: 'PUT',
        data
    })
}
export const deleteNews = (id: string) => {
    return axios({
        url: `/api/news/${id}`,
        method: 'DELETE'
    })
}
export interface NewsPageQuery {
    currentPage: number
    pageSize: number
    params: Array<{
        name: string
        value: string
    }>
}

export const getNewsPage = (data: NewsPageQuery) => {
    return axios({
        url: '/api/news/page',
        method: 'POST',
        data
    })
}

export const approveNews = (id: string) => {
    return axios({
        url: `/api/news/${id}/approve`,
        method: 'PUT'
    })
}
export interface NewsPayload {
    title: string
    category: string
    supplier?: string
    reviewer?: string
    content: string
    attachments?: Array<{
        name: string
        url: string
        size?: number
        type?: string
    }>
}
export const rejectNews = (id: string) => {
    return axios({
        url: `/api/news/${id}/reject`,
        method: 'PUT'
    })
}
export const createNewsWithFiles = (data: FormData) => {
    return axios({
        url: '/api/news/form',
        method: 'POST',
        data
    })
}
export const updateNewsWithFiles = (id: string, data: FormData) => {
    return axios({
        url: `/api/news/${id}/form`,
        method: 'POST',
        data
    })
}
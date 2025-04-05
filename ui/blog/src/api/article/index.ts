import request from '@/config/axios'

export interface IArticle {
    id?: number,
    title?: string,
    imageUrl?: string,
    introduction?: string,
    content?: string,
    pubTime?: string,
    tagList?: string[], 
}

export const getArticleList = async (params: any) => {
    return await request.get({ url: `/article/list`, params})
}

export const getArticleDetail = async (id: string | string[]) => {
    return await request.get({ url: `/article/${id}`})
}
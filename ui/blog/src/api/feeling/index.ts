import request from '@/config/axios'

export interface Timeline {
    name?: string,
    icon?: string,
    content?: string,
    images?: string[],
    interval?: number
}

export const getFeelingList = async () => {
    return await request.get({ url: `/feeling/list`})
}

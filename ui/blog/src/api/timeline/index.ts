import request from '@/config/axios'

export interface TimelineDetail {
    pubDate?: string,
    type?: number,
    tId?: number,
    title?: string,
    pubTime?: string,
}

export interface Timeline {
    pubDate?: string,
    timelineList?: TimelineDetail[],
}

export const getTimelineList = async () => {
    return await request.get({ url: `/timeline/list`})
}

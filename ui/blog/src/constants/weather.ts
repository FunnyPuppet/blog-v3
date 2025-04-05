export const WeatherMap: Record<string, string> = {
    "icon-weather_qing": "晴",
    "icon-weather_duoyun": "多云",
    "icon-weather_yin": "阴"
}

export function getWeatherName(code: string): string {
    return WeatherMap[code] || "未知"
}

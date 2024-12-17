// convert time like 3d stands for 3 days into seconds
export function convertTimeToSeconds(time: string): number {
    const timeUnit = time.slice(-1)
    const timeValue = parseInt(time.slice(0, -1))
    switch (timeUnit) {
        case 'd':
            return timeValue * 24 * 60 * 60
        case 'h':
            return timeValue * 60 * 60
        case 'm':
            return timeValue * 60
        case 's':
            return timeValue
        default:
            return 0
    }
}

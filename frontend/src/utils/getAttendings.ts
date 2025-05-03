type AttendingsResponse = Array<string>

type UseLastAttendingsResponse = AttendingsResponse

export const lastAttendingsName = "lastAttendings"

export function getAttendings(): UseLastAttendingsResponse {
    const lastAttendingsString: Maybe<string> = localStorage.getItem(lastAttendingsName)
    return lastAttendingsString ? JSON.parse(lastAttendingsString) : []
}
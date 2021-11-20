const KEYS = {
    sessions: 'sessions',
    sessionId: 'sessionId'
}


export function insertSession(data) {
    let sessions = getAllSessions();
    data['id'] = generateSessionId()
    sessions.push(data)
    localStorage.setItem(KEYS.sessions, JSON.stringify(sessions))
}

export function generateSessionId() {
    if (localStorage.getItem(KEYS.sessionId) === null)
        localStorage.setItem(KEYS.sessionId, '0')
    var id = parseInt(localStorage.getItem(KEYS.sessionId))
    localStorage.setItem(KEYS.sessionId, (++id).toString())
    return id;
}

export function getAllSessions() {
    if (localStorage.getItem(KEYS.sessions) === null)
        localStorage.setItem(KEYS.sessions, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.sessions))
}

export function updateSession(data) {
    let sessions = getAllSessions();
    let recordIndex = sessions.findIndex(x => x.id === data.id);
    sessions[recordIndex] = { ...data }
    localStorage.setItem(KEYS.sessions, JSON.stringify(sessions));
}

export function deleteSession(id) {
    let sessions = getAllSessions();
    sessions = sessions.filter(x => x.id !== id)
    localStorage.setItem(KEYS.sessions, JSON.stringify(sessions));
}
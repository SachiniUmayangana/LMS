const KEYS = {
    subjects: 'subjects',
    subjectId: 'subjectId'
}

export const getDepartmentCollection = () => ([
    { id: '1', title: 'Development' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' },
])

export function insertSubject(data) {
    let subjects = getAllSubjects();
    data['id'] = generateSubjectId()
    subjects.push(data)
    localStorage.setItem(KEYS.subjects, JSON.stringify(subjects))
}

export function generateSubjectId() {
    if (localStorage.getItem(KEYS.subjectId) === null)
        localStorage.setItem(KEYS.subjectId, '0')
    var id = parseInt(localStorage.getItem(KEYS.subjectId))
    localStorage.setItem(KEYS.subjectId, (++id).toString())
    return id;
}

export function getAllSubjects() {
    if (localStorage.getItem(KEYS.subjects) === null)
        localStorage.setItem(KEYS.subjects, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.subjects))
}

export function updateSubject(data) {
    let subjects = getAllSubjects();
    let recordIndex = subjects.findIndex(x => x.id === data.id);
    subjects[recordIndex] = { ...data }
    localStorage.setItem(KEYS.subjects, JSON.stringify(subjects));
}

export function deleteSubject(id) {
    let subjects = getAllSubjects();
    subjects = subjects.filter(x => x.id !== id)
    localStorage.setItem(KEYS.subjects, JSON.stringify(subjects));
}
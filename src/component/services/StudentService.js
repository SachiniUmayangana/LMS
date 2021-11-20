const KEYS = {
    students: 'students',
    studentId: 'studentId'
}

export function insertStudent(data) {
    let students = getAllStudents();
    data['id'] = generateStudentId()
    students.push(data)
    localStorage.setItem(KEYS.students, JSON.stringify(students))
}


export function generateStudentId() {
    if (localStorage.getItem(KEYS.studentId) === null)
        localStorage.setItem(KEYS.studentId, '0')
    var id = parseInt(localStorage.getItem(KEYS.studentId))
    localStorage.setItem(KEYS.studentId, (++id).toString())
    return id;
}

export function getAllStudents() {
    if (localStorage.getItem(KEYS.students) === null)
        localStorage.setItem(KEYS.students, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.students))
}

export function updateStudents(data) {
    let students = getAllStudents();
    let recordIndex = students.findIndex(x => x.id === data.id);
    students[recordIndex] = { ...data }
    localStorage.setItem(KEYS.students, JSON.stringify(students));
}

export function deleteStudents(id) {
    let students = getAllStudents();
    students = students.filter(x => x.id !== id)
    localStorage.setItem(KEYS.students, JSON.stringify(students));
}
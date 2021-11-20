const KEYS = {
    courses: 'courses',
    courseId: 'courseId'
}

export const getDepartmentCollection = () => ([
    { id: '1', title: 'Biological Science' },
    { id: '2', title: 'Physical Science' },
    { id: '3', title: 'Medicine' },
    { id: '4', title: 'Engineering' },
])

export function insertCourse(data) {
    let courses = getAllCourses();
    data['id'] = generatecourseId()
    courses.push(data)
    localStorage.setItem(KEYS.courses, JSON.stringify(courses))
}

export function generatecourseId() {
    if (localStorage.getItem(KEYS.courseId) === null)
        localStorage.setItem(KEYS.courseId, '0')
    var id = parseInt(localStorage.getItem(KEYS.courseId))
    localStorage.setItem(KEYS.courseId, (++id).toString())
    return id;
}

export function getAllCourses() {
    if (localStorage.getItem(KEYS.courses) === null)
        localStorage.setItem(KEYS.courses, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.courses))
}

export function updateCourse(data) {
    let courses = getAllCourses();
    let recordIndex = courses.findIndex(x => x.id === data.id);
    courses[recordIndex] = { ...data }
    localStorage.setItem(KEYS.courses, JSON.stringify(courses));
}

export function deleteCourses(id) {
    let courses = getAllCourses();
    courses = courses.filter(x => x.id !== id)
    localStorage.setItem(KEYS.courses, JSON.stringify(courses));
}
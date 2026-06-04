// ============================================================
//  demo-student.js — Демо-аккаунт Алексея Студентова
// ============================================================
(function() {
    'use strict';

    const user = JSON.parse(localStorage.getItem('nextstep_current_user') || '{}');
    if (!user.email || user.email !== 'student@nextstep.ru') {
        return;
    }

    console.log('👤 Алексей Студентов: загружаю данные...');

    // ============================================================
    // 1. Профиль
    // ============================================================
    const profile = {
        fullName: 'Алексей Студентов',
        email: 'student@nextstep.ru',
        phone: '+7 (999) 123-45-67',
        group: 'ИС-41',
        specialty: 'Информационные системы и программирование'
    };
    localStorage.setItem('student_profile_student@nextstep.ru', JSON.stringify(profile));

    // ============================================================
    // 2. Курсы (частично пройденные)
    // ============================================================
    const courses = [
        { id: 1, key: 'course3d_final', title: '3D-моделирование', blocks: 3, done: 2 },
        { id: 2, key: 'courseMath_final', title: 'Высшая математика', blocks: 4, done: 3 },
        { id: 3, key: 'coursePhilo_final', title: 'Основы философии', blocks: 3, done: 3 }, // завершён
        { id: 4, key: 'courseHtml_final', title: 'HTML-вёрстка', blocks: 3, done: 1 },
        { id: 5, key: 'courseBusiness_final', title: 'Бизнес-планирование', blocks: 3, done: 2 },
        { id: 6, key: 'courseProbTheory_final', title: 'Теория вероятностей', blocks: 3, done: 0 },
        { id: 7, key: 'courseOptimization_final', title: 'Оптимизация приложений', blocks: 3, done: 0 },
        { id: 8, key: 'courseSpeech_final', title: 'Культура речи', blocks: 3, done: 1 },
        { id: 9, key: 'courseSecurity_final', title: 'Безопасность IT', blocks: 3, done: 0 }
    ];

    const myCourses = [];

    courses.forEach(c => {
        if (!localStorage.getItem(c.key)) {
            const blocks = [];
            for (let i = 0; i < c.blocks; i++) {
                const completed = i < c.done;
                blocks.push({
                    id: i,
                    completed: completed,
                    unlocked: i === 0 || i <= c.done,
                    tests: Array(4).fill(null).map(() => ({
                        userAnswer: completed ? Math.floor(Math.random() * 4) : null,
                        answered: completed
                    })),
                    assignments: Array(2).fill(null).map(() => ({
                        submitted: completed,
                        reviewed: completed && i < c.done - 1,
                        feedback: completed && i < c.done - 1 ? 'Отлично, принято!' : '',
                        grade: completed && i < c.done - 1 ? Math.floor(Math.random() * 20) + 80 : null
                    })),
                    videos: Array(2).fill(null).map(() => ({ watched: completed })),
                    lectures: Array(3).fill(null).map(() => ({ downloaded: completed }))
                });
            }
            localStorage.setItem(c.key, JSON.stringify(blocks));
        }

        const progress = Math.round((c.done / c.blocks) * 100);
        myCourses.push({
            courseId: c.id,
            courseTitle: c.title,
            progress: progress,
            completed: progress >= 100
        });
    });

    localStorage.setItem('nextstep_my_courses', JSON.stringify(myCourses));

    // ============================================================
    // 3. Сертификаты
    // ============================================================
    const dates = {};
    const completedCourses = ['coursePhilo_final'];
    const dateStrings = ['25 января 2026 года'];
    completedCourses.forEach((key, i) => {
        dates[key] = dateStrings[i % dateStrings.length];
    });
    const existing = JSON.parse(localStorage.getItem('certificate_dates') || '{}');
    Object.assign(existing, dates);
    localStorage.setItem('certificate_dates', JSON.stringify(existing));

    // ============================================================
    // 4. Задачи и дедлайны
    // ============================================================
    const tasks = [
        { id: 1, text: 'Завершить модуль по HTML', completed: true },
        { id: 2, text: 'Сдать проект по 3D-моделированию', completed: true },
        { id: 3, text: 'Подготовить презентацию по бизнес-плану', completed: false },
        { id: 4, text: 'Изучить тему "Условная вероятность"', completed: false },
        { id: 5, text: 'Сдать тест по безопасности IT', completed: false }
    ];
    const deadlines = [
        { id: 1, date: '2026-06-15', title: 'Сдача финального проекта по философии' },
        { id: 2, date: '2026-06-20', title: 'Тест по безопасности IT' },
        { id: 3, date: '2026-06-25', title: 'Защита дипломной работы' }
    ];
    localStorage.setItem('student_tasks_student@nextstep.ru', JSON.stringify(tasks));
    localStorage.setItem('student_deadlines_student@nextstep.ru', JSON.stringify(deadlines));

    // ============================================================
    // 5. Сообщения с преподавателями
    // ============================================================
    let messages = JSON.parse(localStorage.getItem('nextstep_messages') || '[]');
    messages = messages.filter(m => m.from !== 'student@nextstep.ru' && m.to !== 'student@nextstep.ru');

    const nowMsg = new Date().toISOString();
    const msgList = [
        // С Розалией
        {
            id: Date.now() + 1,
            from: 'student@nextstep.ru',
            fromName: 'Алексей Студентов',
            fromRole: 'student',
            to: 'roza@nextstep.ru',
            toName: 'Розалия Ахтямова',
            toRole: 'teacher',
            text: 'Здравствуйте, Розалия Ахтямова! У меня вопрос по текстурированию в Blender.',
            timestamp: nowMsg,
            read: false
        },
        {
            id: Date.now() + 2,
            from: 'roza@nextstep.ru',
            fromName: 'Розалия Ахтямова',
            fromRole: 'teacher',
            to: 'student@nextstep.ru',
            toName: 'Алексей Студентов',
            toRole: 'student',
            text: 'Привет, Алексей! Конечно, пиши, что именно не понятно.',
            timestamp: nowMsg,
            read: true
        },
        // С Елизаветой
        {
            id: Date.now() + 3,
            from: 'student@nextstep.ru',
            fromName: 'Алексей Студентов',
            fromRole: 'student',
            to: 'liza@nextstep.ru',
            toName: 'Елизавета Лытаева',
            toRole: 'teacher',
            text: 'Здравствуйте, Елизавета Лытаева! У меня вопрос по заданию. Можете подсказать?',
            timestamp: nowMsg,
            read: false
        },
        {
            id: Date.now() + 4,
            from: 'liza@nextstep.ru',
            fromName: 'Елизавета Лытаева',
            fromRole: 'teacher',
            to: 'student@nextstep.ru',
            toName: 'Алексей Студентов',
            toRole: 'student',
            text: 'Алексей, по математике у тебя твёрдая четвёрка. Молодец!',
            timestamp: nowMsg,
            read: true
        },
        // С Никитой
        {
            id: Date.now() + 5,
            from: 'student@nextstep.ru',
            fromName: 'Алексей Студентов',
            fromRole: 'student',
            to: 'nikita@nextstep.ru',
            toName: 'Никита Орлов',
            toRole: 'teacher',
            text: 'Никита Орлов, спасибо за ваш отзыв на моё эссе!',
            timestamp: nowMsg,
            read: false
        },
        {
            id: Date.now() + 6,
            from: 'nikita@nextstep.ru',
            fromName: 'Никита Орлов',
            fromRole: 'teacher',
            to: 'student@nextstep.ru',
            toName: 'Алексей Студентов',
            toRole: 'student',
            text: 'Алексей, твоё эссе по философии — одно из лучших в группе! Молодец.',
            timestamp: nowMsg,
            read: true
        }
    ];

    messages.push(...msgList);
    localStorage.setItem('nextstep_messages', JSON.stringify(messages));

    // ============================================================
    // 6. Проекты
    // ============================================================
    let submissions = JSON.parse(localStorage.getItem('nextstep_submissions') || '[]');
    submissions = submissions.filter(s => s.userEmail !== 'student@nextstep.ru');

    const now = new Date().toISOString();
    const demos = [
        {
            id: Date.now() + 100,
            userEmail: 'student@nextstep.ru',
            studentName: 'Алексей Студентов',
            courseName: '3D-моделирование',
            blockName: 'Блок 2',
            assignmentTitle: 'Персонаж',
            fileName: 'character.blend',
            fileData: '',
            submitted: true,
            submittedAt: now,
            reviewed: true,
            grade: 98,
            feedback: 'Потрясающая работа! Отличная детализация.'
        },
        {
            id: Date.now() + 101,
            userEmail: 'student@nextstep.ru',
            studentName: 'Алексей Студентов',
            courseName: 'HTML-вёрстка',
            blockName: 'Блок 1',
            assignmentTitle: 'Лендинг',
            fileName: 'landing.zip',
            fileData: '',
            submitted: true,
            submittedAt: now,
            reviewed: false,
            grade: null,
            feedback: ''
        },
        {
            id: Date.now() + 102,
            userEmail: 'student@nextstep.ru',
            studentName: 'Алексей Студентов',
            courseName: 'Основы философии',
            blockName: 'Блок 3',
            assignmentTitle: 'Эссе',
            fileName: 'essay.docx',
            fileData: '',
            submitted: true,
            submittedAt: now,
            reviewed: true,
            grade: 92,
            feedback: 'Хорошее содержание, пара ошибок.'
        }
    ];

    submissions.push(...demos);
    localStorage.setItem('nextstep_submissions', JSON.stringify(submissions));

    console.log('🎉 Алексей Студентов полностью настроен!');
})();
// ============================================================
//  demo-teacher-liza.js — Демо-аккаунт Елизаветы Лытаевой
// ============================================================
(function() {
    'use strict';

    const user = JSON.parse(localStorage.getItem('nextstep_current_user') || '{}');
    if (!user.email || user.email !== 'liza@nextstep.ru') {
        console.log('👩‍🏫 Это не Елизавета, пропускаем');
        return;
    }

    console.log('👩‍🏫 Елизавета Лытаева: загружаю данные...');

    // ============================================================
    // 1. Профиль
    // ============================================================
    const profile = {
        fullName: 'Елизавета Лытаева',
        email: 'liza@nextstep.ru',
        phone: '+7 (917) 234-56-78',
        direction: 'math',
        bio: 'Кандидат физико-математических наук, преподаватель с 8-летним стажем. Разработала 6 курсов.',
        degree: 'Кандидат наук',
        social: 'https://github.com/liza_lytaeva'
    };
    localStorage.setItem('teacher_profile_liza@nextstep.ru', JSON.stringify(profile));

    // ============================================================
    // 2. Заметки в дневнике
    // ============================================================
    const notes = [
        {
            title: 'Студенты путают интегралы',
            category: 'mistake',
            text: 'Многие не понимают разницу между определённым и неопределённым интегралом. Нужно добавить визуализацию.',
            date: new Date().toLocaleString()
        },
        {
            title: 'Курс по статистике',
            category: 'idea',
            text: 'Разработать отдельный курс по статистике для IT-специальностей.',
            date: new Date().toLocaleString()
        },
        {
            title: 'Совместный курс с Розой',
            category: 'idea',
            text: 'Обсудить создание курса "Математика для 3D-художников".',
            date: new Date().toLocaleString()
        },
        {
            title: 'Улучшить лекции по матрицам',
            category: 'improve',
            text: 'Добавить больше примеров с визуализацией определителей.',
            date: new Date().toLocaleString()
        }
    ];
    localStorage.setItem('teacher_notes_liza@nextstep.ru', JSON.stringify(notes));

    // ============================================================
    // 3. Шаблоны фидбеков
    // ============================================================
    const templates = [
        { name: 'Отлично', text: 'Работа выполнена на высоком уровне. Решение полное и верное. Оценка: 95/100' },
        { name: 'Хорошо', text: 'Хорошая работа, но есть пара моментов, которые стоит доработать. Оценка: 80/100' },
        { name: 'Нужно доработать', text: 'Есть ошибки в вычислениях. Рекомендую пересмотреть тему. Оценка: 65/100' },
        { name: 'Стандартный', text: 'Работа выполнена на среднем уровне. Соблюдены основные требования. Оценка: 75/100' }
    ];
    localStorage.setItem('teacher_feedback_templates', JSON.stringify(templates));

    // ============================================================
    // 4. Проверенные работы (15+ работ с разными оценками)
    // ============================================================
    let submissions = JSON.parse(localStorage.getItem('nextstep_submissions') || '[]');
    submissions = submissions.filter(s => s.courseName !== 'Высшая математика');

    const now = new Date().toISOString();
    const grades = [94, 78, 82, 100, 68, 75, 90, 72, 85, 80, 92, 74, 86, 69, 95];
    const students = [
        'Алексей Студентов', 'Дарья Крылова', 'Павел Громов', 'Ксения Тимофеева',
        'Иван Суворов', 'Наталья Зайцева', 'Олег Кузнецов', 'Татьяна Егорова',
        'Михаил Фролов', 'Анастасия Шевцова', 'Евгений Соловьёв', 'Людмила Козлова',
        'Денис Морозов', 'Анна Белова', 'Сергей Новиков'
    ];
    const feedbacks = [
        'Отлично! Лучшая работа в семестре.',
        'Хороший подход, но есть ошибки в вычислениях.',
        'Аккуратно, но можно было проще.',
        'Превосходно! Без единой ошибки.',
        'Много ошибок в интегралах, пересмотрите тему.',
        'Хорошая работа, но не хватает обоснований.',
        'Отлично! Ставлю 90.',
        'Есть недочёты, но в целом принято.',
        'Твёрдая четвёрка. Молодец.',
        'Хорошо, но можно лучше.',
        'Отличная работа! Глубокий анализ.',
        'Принято. Рекомендую поработать над точностью.',
        'Хороший подход. Есть куда расти.',
        'Работа выполнена аккуратно.',
        'Лучшая работа в потоке! Ставлю 95.'
    ];
    const assignments = [
        'Вычисление пределов',
        'Исследование функции',
        'Матрицы и определители',
        'Решение СЛАУ',
        'Неопределённые интегралы',
        'Определённые интегралы',
        'Применение интегралов',
        'Векторная алгебра',
        'Линейные операторы',
        'Собственные значения',
        'Кратные интегралы',
        'Криволинейные интегралы',
        'Дифференциальные уравнения',
        'Ряды и сходимость',
        'Финальная контрольная'
    ];

    for (let i = 0; i < 15; i++) {
        submissions.push({
            id: Date.now() + i,
            userEmail: `student${i+1}@nextstep.ru`,
            studentName: students[i],
            courseName: 'Высшая математика',
            blockName: `Блок ${(i % 4) + 1}`,
            assignmentTitle: assignments[i],
            fileName: `math_hw_${i+1}.pdf`,
            fileData: '',
            submitted: true,
            submittedAt: now,
            reviewed: true,
            grade: grades[i],
            feedback: feedbacks[i]
        });
    }

    // Добавляем 5 "висящих" работ (отправлены, но не проверены)
    const pendingStudents = ['Антон Грачёв', 'Вероника Лебедева', 'Денис Казаков', 'Ксения Андреева', 'Илья Семёнов'];
    const pendingAssignments = ['Пределы и непрерывность', 'Матричный метод', 'Интегрирование по частям', 'Дифференциал функции', 'Статистический анализ'];

    for (let i = 0; i < 5; i++) {
        submissions.push({
            id: Date.now() + 1000 + i,
            userEmail: `newstudent${i+1}@nextstep.ru`,
            studentName: pendingStudents[i],
            courseName: 'Высшая математика',
            blockName: `Блок 1`,
            assignmentTitle: pendingAssignments[i],
            fileName: `hw_${i+1}.pdf`,
            fileData: '',
            submitted: true,
            submittedAt: now,
            reviewed: false,
            grade: null,
            feedback: ''
        });
    }

    localStorage.setItem('nextstep_submissions', JSON.stringify(submissions));

    // ============================================================
    // 5. Сообщения между преподавателями и студентами
    // ============================================================
    let messages = JSON.parse(localStorage.getItem('nextstep_messages') || '[]');
    messages = messages.filter(m => m.from !== 'liza@nextstep.ru' && m.to !== 'liza@nextstep.ru');

    const nowMsg = new Date().toISOString();
    const msgList = [
        {
            id: Date.now() + 100,
            from: 'liza@nextstep.ru',
            fromName: 'Елизавета Лытаева',
            fromRole: 'teacher',
            to: 'student@nextstep.ru',
            toName: 'Алексей Студентов',
            toRole: 'student',
            text: 'Алексей, по математике у тебя твёрдая четвёрка. Молодец!',
            timestamp: nowMsg,
            read: false
        },
        {
            id: Date.now() + 101,
            from: 'student@nextstep.ru',
            fromName: 'Алексей Студентов',
            fromRole: 'student',
            to: 'liza@nextstep.ru',
            toName: 'Елизавета Лытаева',
            toRole: 'teacher',
            text: 'Елизавета Лытаева, спасибо за ваш отзыв! Я пересмотрю ошибки.',
            timestamp: nowMsg,
            read: true
        },
        {
            id: Date.now() + 102,
            from: 'liza@nextstep.ru',
            fromName: 'Елизавета Лытаева',
            fromRole: 'teacher',
            to: 'roza@nextstep.ru',
            toName: 'Розалия Ахтямова',
            toRole: 'teacher',
            text: 'Роза, я согласна на совместный курс! Давай встретимся на следующей неделе.',
            timestamp: nowMsg,
            read: false
        },
        {
            id: Date.now() + 103,
            from: 'roza@nextstep.ru',
            fromName: 'Розалия Ахтямова',
            fromRole: 'teacher',
            to: 'liza@nextstep.ru',
            toName: 'Елизавета Лытаева',
            toRole: 'teacher',
            text: 'Лиза, супер! Жду встречи. Приготовлю наброски программы.',
            timestamp: nowMsg,
            read: true
        },
        {
            id: Date.now() + 104,
            from: 'liza@nextstep.ru',
            fromName: 'Елизавета Лытаева',
            fromRole: 'teacher',
            to: 'nikita@nextstep.ru',
            toName: 'Никита Орлов',
            toRole: 'teacher',
            text: 'Никита, привет! Как смотришь на курс по математической логике для философов?',
            timestamp: nowMsg,
            read: false
        },
        {
            id: Date.now() + 105,
            from: 'nikita@nextstep.ru',
            fromName: 'Никита Орлов',
            fromRole: 'teacher',
            to: 'liza@nextstep.ru',
            toName: 'Елизавета Лытаева',
            toRole: 'teacher',
            text: 'Лиз, это очень интересно! Давай обсудим детали.',
            timestamp: nowMsg,
            read: true
        }
    ];

    messages.push(...msgList);
    localStorage.setItem('nextstep_messages', JSON.stringify(messages));

    console.log('🎉 Елизавета Лытаева полностью настроена!');
})();
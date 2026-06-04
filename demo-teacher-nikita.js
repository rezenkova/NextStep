// ============================================================
//  demo-teacher-nikita.js — Демо-аккаунт Никиты Орлова
// ============================================================
(function() {
    'use strict';

    const user = JSON.parse(localStorage.getItem('nextstep_current_user') || '{}');
    if (!user.email || user.email !== 'nikita@nextstep.ru') {
        console.log('👩‍🏫 Это не Никита, пропускаем');
        return;
    }

    console.log('👩‍🏫 Никита Орлов: загружаю данные...');

    // ============================================================
    // 1. Профиль
    // ============================================================
    const profile = {
        fullName: 'Никита Орлов',
        email: 'nikita@nextstep.ru',
        phone: '+7 (917) 345-67-89',
        direction: 'philosophy',
        bio: 'Специалист в области философии и культуры речи, ведущий практик. Разработал 5 курсов.',
        degree: 'Кандидат философских наук',
        social: 'https://github.com/nikita_orlov'
    };
    localStorage.setItem('teacher_profile_nikita@nextstep.ru', JSON.stringify(profile));

    // ============================================================
    // 2. Заметки в дневнике
    // ============================================================
    const notes = [
        {
            title: 'Идея для дебатов',
            category: 'idea',
            text: 'Ввести еженедельные дебаты по философским темам. Формат: 2 команды, 3 раунда.',
            date: new Date().toLocaleString()
        },
        {
            title: 'Курс по риторике',
            category: 'idea',
            text: 'Создать модуль "Искусство убеждения" для студентов всех специальностей.',
            date: new Date().toLocaleString()
        },
        {
            title: 'Совместный курс с Лизой',
            category: 'idea',
            text: 'Обсудить с Лизой создание курса "Логика для философов".',
            date: new Date().toLocaleString()
        },
        {
            title: 'Книги по философии',
            category: 'other',
            text: 'Составить список обязательной литературы для курса по экзистенциализму.',
            date: new Date().toLocaleString()
        }
    ];
    localStorage.setItem('teacher_notes_nikita@nextstep.ru', JSON.stringify(notes));

    // ============================================================
    // 3. Шаблоны фидбеков
    // ============================================================
    const templates = [
        { name: 'Отлично', text: 'Работа выполнена на высоком уровне. Глубина мысли и аргументация — отличные! Оценка: 95/100' },
        { name: 'Хорошо', text: 'Хорошая работа, но есть пара моментов, которые стоит доработать. Оценка: 80/100' },
        { name: 'Нужно доработать', text: 'Есть ошибки в логике. Рекомендую пересмотреть тему. Оценка: 65/100' },
        { name: 'Стандартный', text: 'Работа выполнена на среднем уровне. Соблюдены основные требования. Оценка: 75/100' }
    ];
    localStorage.setItem('teacher_feedback_templates', JSON.stringify(templates));

    // ============================================================
    // 4. Проверенные работы (15+ работ с разными оценками)
    // ============================================================
    let submissions = JSON.parse(localStorage.getItem('nextstep_submissions') || '[]');
    submissions = submissions.filter(s => s.courseName !== 'Основы философии');

    const now = new Date().toISOString();
    const grades = [92, 88, 75, 96, 70, 82, 90, 78, 85, 80, 94, 76, 87, 71, 93];
    const students = [
        'Алексей Студентов', 'Мария Соколова', 'Денис Морозов', 'Полина Ветрова',
        'Илья Белов', 'Светлана Новикова', 'Евгений Ковалёв', 'Оксана Лебедева',
        'Василий Петров', 'Анна Федосеева', 'Дмитрий Романов', 'Юлия Смирнова',
        'Артём Шевченко', 'Наталья Кузнецова', 'Константин Егоров'
    ];
    const feedbacks = [
        'Лучшее эссе в группе! Глубина мысли и аргументация.',
        'Хорошая работа, но не хватает ссылок на первоисточники.',
        'Есть ошибки в логике, но в целом принято.',
        'Потрясающая работа! Ставлю 96.',
        'Многое поверхностно, нужно глубже проработать.',
        'Хорошая аргументация, работа принята.',
        'Отлично! Взвешенная позиция.',
        'Средний уровень, но принято.',
        'Хорошо. Можно было добавить больше примеров.',
        'Работа принята. Ставлю 80.',
        'Глубокий анализ. Отличная работа!',
        'Принято. Есть над чем поработать.',
        'Хорошее содержание. Молодец.',
        'Не хватает оригинальности, но работа принята.',
        'Лучшая работа в семестре! Ставлю 93.'
    ];
    const assignments = [
        'Эссе: Платон и пещера',
        'Анализ Сократа',
        'Сравнение стоицизма и эпикуреизма',
        'Средневековая философия',
        'Кант и категорический императив',
        'Гегель и диалектика',
        'Ницше и воля к власти',
        'Экзистенциализм Сартра',
        'Философия Хайдеггера',
        'Русская философия',
        'Постмодернизм и Фуко',
        'Аргументация в дебатах',
        'Финальное эссе',
        'Анализ текста Аристотеля',
        'Современная этика'
    ];

    for (let i = 0; i < 15; i++) {
        submissions.push({
            id: Date.now() + i,
            userEmail: `student${i+1}@nextstep.ru`,
            studentName: students[i],
            courseName: 'Основы философии',
            blockName: `Блок ${(i % 3) + 1}`,
            assignmentTitle: assignments[i],
            fileName: `essay_${i+1}.docx`,
            fileData: '',
            submitted: true,
            submittedAt: now,
            reviewed: true,
            grade: grades[i],
            feedback: feedbacks[i]
        });
    }

    // Добавляем 5 "висящих" работ (отправлены, но не проверены)
    const pendingStudents = ['Максим Дорофеев', 'София Карпова', 'Игорь Филиппов', 'Анастасия Борисова', 'Кирилл Евсеев'];
    const pendingAssignments = ['Анализ Сократа', 'Эссе: Философия свободы', 'Сравнение подходов', 'Логические задачи', 'Реферат по Ницше'];

    for (let i = 0; i < 5; i++) {
        submissions.push({
            id: Date.now() + 1000 + i,
            userEmail: `newstudent${i+1}@nextstep.ru`,
            studentName: pendingStudents[i],
            courseName: 'Основы философии',
            blockName: `Блок 1`,
            assignmentTitle: pendingAssignments[i],
            fileName: `hw_${i+1}.docx`,
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
    messages = messages.filter(m => m.from !== 'nikita@nextstep.ru' && m.to !== 'nikita@nextstep.ru');

    const nowMsg = new Date().toISOString();
    const msgList = [
        {
            id: Date.now() + 100,
            from: 'nikita@nextstep.ru',
            fromName: 'Никита Орлов',
            fromRole: 'teacher',
            to: 'student@nextstep.ru',
            toName: 'Алексей Студентов',
            toRole: 'student',
            text: 'Алексей, твоё эссе по философии — одно из лучших в группе! Молодец.',
            timestamp: nowMsg,
            read: false
        },
        {
            id: Date.now() + 101,
            from: 'student@nextstep.ru',
            fromName: 'Алексей Студентов',
            fromRole: 'student',
            to: 'nikita@nextstep.ru',
            toName: 'Никита Орлов',
            toRole: 'teacher',
            text: 'Никита Орлов, спасибо за ваш отзыв! Я постараюсь ещё больше.',
            timestamp: nowMsg,
            read: true
        },
        {
            id: Date.now() + 102,
            from: 'nikita@nextstep.ru',
            fromName: 'Никита Орлов',
            fromRole: 'teacher',
            to: 'roza@nextstep.ru',
            toName: 'Розалия Ахтямова',
            toRole: 'teacher',
            text: 'Роза, идея с семинаром по цифровой этике — отличная! Давай обсудим.',
            timestamp: nowMsg,
            read: false
        },
        {
            id: Date.now() + 103,
            from: 'roza@nextstep.ru',
            fromName: 'Розалия Ахтямова',
            fromRole: 'teacher',
            to: 'nikita@nextstep.ru',
            toName: 'Никита Орлов',
            toRole: 'teacher',
            text: 'Никита, я уже подготовила наброски. Скину тебе в ближайшее время.',
            timestamp: nowMsg,
            read: true
        },
        {
            id: Date.now() + 104,
            from: 'nikita@nextstep.ru',
            fromName: 'Никита Орлов',
            fromRole: 'teacher',
            to: 'liza@nextstep.ru',
            toName: 'Елизавета Лытаева',
            toRole: 'teacher',
            text: 'Лиз, курс по математической логике для философов — супер! Давай встретимся в пятницу.',
            timestamp: nowMsg,
            read: false
        },
        {
            id: Date.now() + 105,
            from: 'liza@nextstep.ru',
            fromName: 'Елизавета Лытаева',
            fromRole: 'teacher',
            to: 'nikita@nextstep.ru',
            toName: 'Никита Орлов',
            toRole: 'teacher',
            text: 'Никита, договорились! Жду в пятницу в 15:00.',
            timestamp: nowMsg,
            read: true
        }
    ];

    messages.push(...msgList);
    localStorage.setItem('nextstep_messages', JSON.stringify(messages));

    console.log('🎉 Никита Орлов полностью настроен!');
})();
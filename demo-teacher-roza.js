// ============================================================
//  demo-teacher-roza.js — Демо-аккаунт Розалии Ахтямовой
// ============================================================
(function() {
    'use strict';

    const user = JSON.parse(localStorage.getItem('nextstep_current_user') || '{}');
    if (!user.email || user.email !== 'roza@nextstep.ru') {
        console.log('👩‍🏫 Это не Розалия, пропускаем');
        return;
    }

    console.log('👩‍🏫 Розалия Ахтямова: загружаю данные...');

    // ============================================================
    // 1. Профиль
    // ============================================================
    const profile = {
        fullName: 'Розалия Ахтямова',
        email: 'roza@nextstep.ru',
        phone: '+7 (917) 123-45-67',
        direction: 'design',
        bio: 'Эксперт в области программирования и 3D-моделирования. Стаж 10 лет. Разработала 8 курсов.',
        degree: 'Кандидат технических наук',
        social: 'https://github.com/roza_akhtyamova'
    };
    localStorage.setItem('teacher_profile_roza@nextstep.ru', JSON.stringify(profile));

    // ============================================================
    // 2. Заметки в дневнике
    // ============================================================
    const notes = [
        {
            title: 'Новый курс по анимации',
            category: 'idea',
            text: 'Надо разработать курс по анимации в Blender. Модули: базовые принципы, риггинг, motion capture.',
            date: new Date().toLocaleString()
        },
        {
            title: 'Ошибка у 60% студентов',
            category: 'mistake',
            text: 'В UV-развёртке многие забывают про seams. Добавить практическое занятие.',
            date: new Date().toLocaleString()
        },
        {
            title: 'Совместный курс с Лизой',
            category: 'idea',
            text: 'Обсудить с Лизой создание курса "Математика для 3D-художников".',
            date: new Date().toLocaleString()
        },
        {
            title: 'Лучшие проекты',
            category: 'other',
            text: 'Работы Алексея Студентова по 3D — одни из лучших. Рекомендую отметить.',
            date: new Date().toLocaleString()
        }
    ];
    localStorage.setItem('teacher_notes_roza@nextstep.ru', JSON.stringify(notes));

    // ============================================================
    // 3. Шаблоны фидбеков
    // ============================================================
    const templates = [
        { name: 'Отлично', text: 'Работа выполнена на высоком уровне. Детализация и подача — отличные! Оценка: 95/100' },
        { name: 'Хорошо', text: 'Хорошая работа, но есть пара моментов, которые стоит доработать. Оценка: 80/100' },
        { name: 'Нужно доработать', text: 'Есть ошибки в технике. Рекомендую пересмотреть уроки по UV-развёртке. Оценка: 65/100' },
        { name: 'Стандартный', text: 'Работа выполнена на среднем уровне. Соблюдены основные требования. Оценка: 75/100' }
    ];
    localStorage.setItem('teacher_feedback_templates', JSON.stringify(templates));

    // ============================================================
    // 4. Проверенные работы (15+ работ с разными оценками)
    // ============================================================
    let submissions = JSON.parse(localStorage.getItem('nextstep_submissions') || '[]');
    submissions = submissions.filter(s => s.courseName !== '3D-моделирование');

    const now = new Date().toISOString();
    const grades = [98, 85, 72, 90, 65, 78, 95, 82, 70, 88, 92, 74, 86, 69, 94];
    const students = [
        'Анна Смирнова', 'Дмитрий Петров', 'Елена Козлова', 'Максим Иванов',
        'Ольга Соколова', 'Сергей Павлов', 'Юлия Морозова', 'Артём Романов',
        'Виктория Новикова', 'Константин Фёдоров', 'Анастасия Крылова', 'Павел Гусев',
        'Екатерина Носова', 'Владимир Широков', 'Татьяна Миронова'
    ];
    const feedbacks = [
        'Отличная работа! Детализация потрясающая.',
        'Хорошая модель, но можно добавить больше текстур.',
        'Есть ошибки в топологии, нужно доработать.',
        'Отлично! Лучшая работа в группе.',
        'UV-развёртка выполнена с ошибками, переделайте.',
        'Хорошо, но есть мелкие недочёты.',
        'Превосходно! Виден прогресс.',
        'Работа принята. Хороший результат.',
        'Не хватает детализации, но в целом нормально.',
        'Отлично! Ставлю 88 баллов.',
        'Твёрдая четвёрка. Молодец.',
        'Можно было лучше, но принято.',
        'Хороший подход. Есть куда расти.',
        'Плохая топология. Переделать!',
        'Отличная работа. Ставлю 94.'
    ];
    const assignments = [
        'Модель персонажа "Эльф"',
        'Текстурирование окружения',
        'Анимация ходьбы',
        'Сцена с замком',
        'Ретопология дракона',
        'UV-развёртка оружия',
        'Скульптинг лица',
        'Модель автомобиля',
        'Риггинг животного',
        'Создание ландшафта',
        'Портретная скульптура',
        'Анимация полёта',
        'Модель механизма',
        'Текстурирование одежды',
        'Финальная сцена'
    ];

    for (let i = 0; i < 15; i++) {
        submissions.push({
            id: Date.now() + i,
            userEmail: `student${i+1}@nextstep.ru`,
            studentName: students[i],
            courseName: '3D-моделирование',
            blockName: `Блок ${(i % 3) + 1}`,
            assignmentTitle: assignments[i],
            fileName: `project_${i+1}.blend`,
            fileData: '',
            submitted: true,
            submittedAt: now,
            reviewed: true,
            grade: grades[i],
            feedback: feedbacks[i]
        });
    }

    // Добавляем 5 "висящих" работ (отправлены, но не проверены)
    const pendingStudents = ['Глеб Титов', 'Ирина Румянцева', 'Станислав Веселов', 'Алина Фролова', 'Роман Сидоров'];
    const pendingAssignments = ['Модель стула', 'Сцена в лесу', 'Анимация прыжка', 'Текстура кирпича', 'Риггинг простой'];

    for (let i = 0; i < 5; i++) {
        submissions.push({
            id: Date.now() + 1000 + i,
            userEmail: `newstudent${i+1}@nextstep.ru`,
            studentName: pendingStudents[i],
            courseName: '3D-моделирование',
            blockName: `Блок 1`,
            assignmentTitle: pendingAssignments[i],
            fileName: `hw_${i+1}.blend`,
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
    messages = messages.filter(m => m.from !== 'roza@nextstep.ru' && m.to !== 'roza@nextstep.ru');

    const nowMsg = new Date().toISOString();
    const msgList = [
        {
            id: Date.now() + 100,
            from: 'roza@nextstep.ru',
            fromName: 'Розалия Ахтямова',
            fromRole: 'teacher',
            to: 'student@nextstep.ru',
            toName: 'Алексей Студентов',
            toRole: 'student',
            text: 'Алексей, твой последний проект отличный! Жду следующий.',
            timestamp: nowMsg,
            read: false
        },
        {
            id: Date.now() + 101,
            from: 'student@nextstep.ru',
            fromName: 'Алексей Студентов',
            fromRole: 'student',
            to: 'roza@nextstep.ru',
            toName: 'Розалия Ахтямова',
            toRole: 'teacher',
            text: 'Розалия Ахтямова, спасибо за отзыв! Я обязательно учту замечания.',
            timestamp: nowMsg,
            read: true
        },
        {
            id: Date.now() + 102,
            from: 'roza@nextstep.ru',
            fromName: 'Розалия Ахтямова',
            fromRole: 'teacher',
            to: 'liza@nextstep.ru',
            toName: 'Елизавета Лытаева',
            toRole: 'teacher',
            text: 'Лиза, привет! Давай сделаем совместный курс по математике для 3D-художников?',
            timestamp: nowMsg,
            read: false
        },
        {
            id: Date.now() + 103,
            from: 'liza@nextstep.ru',
            fromName: 'Елизавета Лытаева',
            fromRole: 'teacher',
            to: 'roza@nextstep.ru',
            toName: 'Розалия Ахтямова',
            toRole: 'teacher',
            text: 'Роза, отличная идея! Я как раз думала о прикладной математике в дизайне.',
            timestamp: nowMsg,
            read: true
        },
        {
            id: Date.now() + 104,
            from: 'roza@nextstep.ru',
            fromName: 'Розалия Ахтямова',
            fromRole: 'teacher',
            to: 'nikita@nextstep.ru',
            toName: 'Никита Орлов',
            toRole: 'teacher',
            text: 'Никита, может, проведём совместный семинар по цифровой этике для дизайнеров?',
            timestamp: nowMsg,
            read: false
        },
        {
            id: Date.now() + 105,
            from: 'nikita@nextstep.ru',
            fromName: 'Никита Орлов',
            fromRole: 'teacher',
            to: 'roza@nextstep.ru',
            toName: 'Розалия Ахтямова',
            toRole: 'teacher',
            text: 'Розалия, это было бы мощно! Подготовим проект и предложим декану.',
            timestamp: nowMsg,
            read: true
        }
    ];

    messages.push(...msgList);
    localStorage.setItem('nextstep_messages', JSON.stringify(messages));

    console.log('🎉 Розалия Ахтямова полностью настроена!');
})();
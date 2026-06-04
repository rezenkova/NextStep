// ============================================================
//  mobile-fix.js — Универсальный адаптивный фикс для NextStep
//  Исправляет: навигацию, клики, отзывчивость на телефонах
// ============================================================
(function() {
    'use strict';

    // 1. Определяем мобильное устройство
    const isMobile = window.innerWidth <= 900 || /Mobi|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry/i.test(navigator.userAgent);

    // Если это не телефон или планшет — ничего не делаем (работаем как на ПК)
    if (!isMobile) {
        console.log('💻 Режим ПК: адаптивный фикс не требуется');
        return;
    }

    console.log('📱 Активирован мобильный режим (фикс)');

    // ============================================================
    // 2. ФИКС НАВИГАЦИИ (превращаем блоки курсов в выпадающее меню)
    // ============================================================
    function fixNavigation() {
        // Ищем контейнер с табами (блоки курсов)
        const navContainer = document.querySelector('.blocks-nav');
        if (!navContainer) return;

        // Получаем все кнопки табов
        const tabItems = navContainer.querySelectorAll('.block-tab');
        if (tabItems.length === 0) return;

        // Создаём кнопку-гамбургер
        const menuBtn = document.createElement('button');
        menuBtn.innerText = '📖 Меню блоков';
        menuBtn.style.cssText = `
            display: block;
            width: 100%;
            padding: 14px 20px;
            background: linear-gradient(135deg, #4422CA, #22B9CA);
            color: white;
            border: none;
            border-radius: 30px;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            margin-bottom: 12px;
            box-shadow: 0 4px 12px rgba(68,34,202,0.3);
            transition: all 0.2s;
            font-family: 'Inter', sans-serif;
        `;

        // Создаём контейнер для скрытого списка
        const menuList = document.createElement('div');
        menuList.style.cssText = `
            display: none;
            flex-direction: column;
            gap: 8px;
            width: 100%;
        `;

        // Клонируем табы в список
        tabItems.forEach(tab => {
            const clone = tab.cloneNode(true);
            // Убираем классы, которые могут мешать
            clone.classList.remove('active');
            // Убираем блокировку
            clone.disabled = false;
            clone.removeAttribute('disabled');
            // Стилизуем для списка
            clone.style.cssText = `
                width: 100%;
                padding: 12px 20px;
                border-radius: 24px;
                background: white;
                border: 1px solid rgba(68,34,202,0.15);
                font-weight: 600;
                font-size: 0.9rem;
                color: #334155;
                cursor: pointer;
                transition: all 0.2s;
                font-family: 'Inter', sans-serif;
            `;
            // Добавляем эффект при наведении
            clone.addEventListener('mouseenter', function() {
                this.style.background = '#f5f3ff';
                this.style.borderColor = '#4422CA';
            });
            clone.addEventListener('mouseleave', function() {
                this.style.background = 'white';
                this.style.borderColor = 'rgba(68,34,202,0.15)';
            });
            // Добавляем обработчик клика
            clone.addEventListener('click', function(e) {
                e.stopPropagation();
                // Ищем оригинальную кнопку и эмулируем клик
                const originalBtn = document.querySelector(`.block-tab[data-idx="${this.dataset.idx}"]`);
                if (originalBtn) originalBtn.click();
                // Закрываем меню
                menuList.style.display = 'none';
                menuBtn.innerText = '📖 Меню блоков';
            });
            menuList.appendChild(clone);
        });

        // Очищаем контейнер и вставляем новую структуру
        navContainer.innerHTML = '';
        navContainer.style.display = 'flex';
        navContainer.style.flexDirection = 'column';
        navContainer.style.alignItems = 'stretch';
        navContainer.style.padding = '12px';
        navContainer.style.background = 'rgba(255,255,255,0.7)';
        navContainer.style.backdropFilter = 'blur(8px)';
        navContainer.style.borderRadius = '30px';
        navContainer.style.border = '1px solid rgba(68,34,202,0.1)';

        navContainer.appendChild(menuBtn);
        navContainer.appendChild(menuList);

        // Логика открытия/закрытия меню
        menuBtn.onclick = function() {
            const isOpen = menuList.style.display === 'flex';
            menuList.style.display = isOpen ? 'none' : 'flex';
            menuBtn.innerText = isOpen ? '📖 Меню блоков' : '✖ Закрыть меню';
        };
    }

    // ============================================================
    // 3. ФИКС КЛИКОВ (убираем задержки и «залипания»)
    // ============================================================
    function fixTouchEvents() {
        // Находим все интерактивные элементы
        const interactiveElements = document.querySelectorAll(
            '.video-card, .lecture-item, .quiz-card, .assignment-card, .course-card, .block-tab, .nav-item, .btn-primary, .btn-outline, .course-btn, .enroll-btn, .details-btn, .submit-assignment, .cancel-assignment, .complete-block-btn, .certificate-btn, .back-to-courses'
        );

        interactiveElements.forEach(el => {
            // Убеждаемся, что курсор — pointer
            el.style.cursor = 'pointer';

            // Добавляем обработчик touchstart, чтобы клик срабатывал мгновенно
            el.addEventListener('touchstart', function(e) {
                // Не блокируем стандартное поведение, просто даём знать браузеру
                // что это интерактивный элемент
            }, { passive: true });

            // Исправляем проблему двойного клика на некоторых элементах
            el.addEventListener('click', function(e) {
                // Если это ссылка с href, разрешаем стандартное поведение
                if (this.tagName === 'A' && this.href) {
                    return;
                }
                // Если это кнопка, разрешаем
                if (this.tagName === 'BUTTON') {
                    return;
                }
                // Для остальных элементов — предотвращаем возможные конфликты
                e.stopPropagation();
            });
        });
    }

    // ============================================================
    // 4. ФИКС МОДАЛЬНЫХ ОКОН (чтобы не зависали на телефоне)
    // ============================================================
    function fixModals() {
        const modals = document.querySelectorAll('.modal, .course-modal, .chat-modal, .settings-modal');
        modals.forEach(modal => {
            // Добавляем обработчик, чтобы закрытие по клику вне окна работало на телефоне
            modal.addEventListener('touchstart', function(e) {
                if (e.target === this) {
                    // Пытаемся найти кнопку закрытия внутри
                    const closeBtn = this.querySelector('.close-modal, .close-settings, .close-chat, .popup-close');
                    if (closeBtn) closeBtn.click();
                    else if (typeof closeModal === 'function') closeModal();
                    else this.style.display = 'none';
                }
            }, { passive: true });
        });
    }

    // ============================================================
    // 5. ФИКС КНОПОК «ПОДРОБНЕЕ» И «ЗАПИСАТЬСЯ» В КАТАЛОГЕ
    // ============================================================
    function fixCatalogButtons() {
        const buttons = document.querySelectorAll('.details-btn, .enroll-btn');
        buttons.forEach(btn => {
            btn.addEventListener('touchstart', function(e) {
                // Просто даём сигнал браузеру, что элемент интерактивный
                this.click();
            }, { passive: true });
        });
    }

    // ============================================================
    // 6. ЗАПУСК ВСЕХ ФИКСОВ
    // ============================================================
    function init() {
        // Ждём загрузки DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(applyFixes, 300);
            });
        } else {
            setTimeout(applyFixes, 300);
        }
    }

    function applyFixes() {
        fixNavigation();
        fixTouchEvents();
        fixModals();
        fixCatalogButtons();
        console.log('✅ Мобильные фиксы применены');
    }

    init();

})();
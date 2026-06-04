// ========== ЕДИНАЯ СИСТЕМА СИНХРОНИЗАЦИИ ДЛЯ ВСЕХ КУРСОВ ==========
(function() {
    console.log('[Sync] Загрузка системы синхронизации...');
    
    function showMessage(msg, isError) {
        let div = document.getElementById('global-sync-message');
        if (!div) {
            div = document.createElement('div');
            div.id = 'global-sync-message';
            div.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#1e293b;color:white;padding:12px 24px;border-radius:40px;z-index:99999;font-size:0.85rem;box-shadow:0 4px 15px rgba(0,0,0,0.2);transition:opacity 0.3s;';
            document.body.appendChild(div);
        }
        div.style.backgroundColor = isError ? '#dc2626' : '#1e293b';
        div.textContent = msg;
        div.style.opacity = '1';
        setTimeout(() => { div.style.opacity = '0'; }, 3000);
    }
    
    // Маппинг курсов
    const courseKeys = {
        '3D-моделирование': 'course3d_final',
        'Высшая математика': 'courseMath_final',
        'Основы философии': 'coursePhilo_final',
        'HTML-вёрстка': 'courseHtml_final',
        'Бизнес-планирование': 'courseBusiness_final',
        'Теория вероятностей': 'courseProbTheory_final',
        'Оптимизация приложений': 'courseOptimization_final',
        'Культура речи': 'courseSpeech_final',
        'Безопасность IT': 'courseSecurity_final'
    };
    
    window.forceSyncAll = function() {
        try {
            const user = JSON.parse(localStorage.getItem('nextstep_current_user') || '{}');
            if (!user.email) {
                console.log('[Sync] Нет пользователя');
                return false;
            }
            
            const submissions = JSON.parse(localStorage.getItem('nextstep_submissions') || '[]');
            const userSubs = submissions.filter(s => s.userEmail === user.email);
            let totalUpdated = 0;
            
            for (const [courseName, storageKey] of Object.entries(courseKeys)) {
                const saved = localStorage.getItem(storageKey);
                if (!saved) continue;
                
                try {
                    let blocks = JSON.parse(saved);
                    let courseUpdated = false;
                    
                    for (let block of blocks) {
                        if (block.assignments) {
                            for (let assignment of block.assignments) {
                                const sub = userSubs.find(s => 
                                    s.assignmentTitle === assignment.title && 
                                    s.courseName === courseName
                                );
                                if (sub) {
                                    if (sub.reviewed && !assignment.reviewed) {
                                        assignment.reviewed = true;
                                        assignment.submitted = true;
                                        assignment.feedback = sub.feedback || '';
                                        assignment.grade = sub.grade;
                                        courseUpdated = true;
                                        totalUpdated++;
                                    } else if (sub.submitted && !assignment.submitted) {
                                        assignment.submitted = true;
                                        courseUpdated = true;
                                        totalUpdated++;
                                    }
                                }
                            }
                        }
                    }
                    
                    if (courseUpdated) {
                        localStorage.setItem(storageKey, JSON.stringify(blocks));
                    }
                } catch(e) { console.warn(`[Sync] Ошибка ${storageKey}:`, e); }
            }
            
            // Обновляем прогресс в "Мои курсы"
            let myCourses = JSON.parse(localStorage.getItem('nextstep_my_courses') || '[]');
            let coursesUpdated = false;
            
            for (let course of myCourses) {
                const storageKey = courseKeys[course.courseTitle];
                if (storageKey) {
                    const saved = localStorage.getItem(storageKey);
                    if (saved) {
                        try {
                            const blocks = JSON.parse(saved);
                            const completed = blocks.filter(b => b.completed === true).length;
                            const total = blocks.length;
                            const newProgress = Math.round((completed / total) * 100);
                            if (course.progress !== newProgress) {
                                course.progress = newProgress;
                                coursesUpdated = true;
                            }
                            if (newProgress >= 100 && !course.completed) {
                                course.completed = true;
                                coursesUpdated = true;
                            }
                        } catch(e) {}
                    }
                }
            }
            
            if (coursesUpdated) {
                localStorage.setItem('nextstep_my_courses', JSON.stringify(myCourses));
            }
            
            if (totalUpdated > 0 || coursesUpdated) {
                showMessage(`✅ Синхронизация: обновлено ${totalUpdated} заданий`);
            } else {
                showMessage(`🔄 Синхронизация выполнена`);
            }
            
            window.dispatchEvent(new CustomEvent('data-synced', { detail: { updated: totalUpdated } }));
            return true;
            
        } catch(e) {
            console.error('[Sync] Ошибка:', e);
            showMessage(`❌ Ошибка: ${e.message}`, true);
            return false;
        }
    };
    
    // Автосинхронизация
    setTimeout(() => { window.forceSyncAll(); }, 500);
    
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) setTimeout(() => window.forceSyncAll(), 100);
    });
    
    window.addEventListener('storage', (e) => {
        if (e.key === 'nextstep_submissions' || e.key?.startsWith('course')) {
            setTimeout(() => window.forceSyncAll(), 100);
        }
    });
    
    setInterval(() => window.forceSyncAll(), 15000);
    
    console.log('[Sync] Система синхронизации запущена');
})();
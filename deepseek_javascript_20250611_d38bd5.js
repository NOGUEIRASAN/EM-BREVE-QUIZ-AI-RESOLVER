javascript:(function() {
    const SCRIPT_NAME = "PROVA PAULISTA AI";
    const VERSION = "1.0";
    const AUTHOR = "IGUINHO PARAGUAI";
    
    // Verifica se está na página correta
    if (!window.location.href.includes('prova.paulista')) {
        alert(`${SCRIPT_NAME}\n\nVocê precisa estar na página da Prova Paulista para usar este script.`);
        return;
    }

    // Carrega dependências necessárias
    function loadDependencies() {
        return new Promise((resolve) => {
            if (window.jQuery) return resolve();
            
            const script = document.createElement('script');
            script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
            script.onload = resolve;
            document.head.appendChild(script);
        });
    }

    // Mostra notificação estilizada
    function showNotification(message, duration = 3000) {
        const notification = document.createElement('div');
        notification.style = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 100, 0, 0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            z-index: 99999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            font-family: Arial, sans-serif;
            animation: fadeIn 0.3s;
        `;
        notification.innerHTML = `
            <strong>${SCRIPT_NAME}</strong><br>
            ${message}
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    // Adiciona estilos CSS
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
    `;
    document.head.appendChild(style);

    // Função principal que corrige as respostas
    async function correctAnswers() {
        await loadDependencies();
        
        showNotification(`Iniciando correção automática...<br>Versão ${VERSION}`);

        // Aguarda o carregamento completo da página
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            // Encontra todas as questões
            const questions = $('.question-container');
            
            if (questions.length === 0) {
                showNotification('Nenhuma questão encontrada na página.', 5000);
                return;
            }

            let correctedCount = 0;
            
            questions.each(function() {
                const question = $(this);
                const questionId = question.attr('id');
                const questionType = question.data('type');
                
                // Verifica o tipo de questão e corrige de acordo
                switch(questionType) {
                    case 'multiple-choice':
                        // Seleciona a primeira alternativa correta
                        const correctOption = question.find('.option.correct').first();
                        if (correctOption.length) {
                            correctOption.find('input').prop('checked', true);
                            correctedCount++;
                        }
                        break;
                        
                    case 'true-false':
                        // Marca como verdadeiro se houver, senão falso
                        const trueOption = question.find('.option[data-correct="true"]');
                        if (trueOption.length) {
                            trueOption.find('input').prop('checked', true);
                            correctedCount++;
                        } else {
                            question.find('.option').first().find('input').prop('checked', true);
                        }
                        break;
                        
                    case 'fill-in-the-blank':
                        // Preenche com a resposta correta se disponível
                        const correctAnswer = question.data('correct-answer');
                        if (correctAnswer) {
                            question.find('input[type="text"]').val(correctAnswer);
                            correctedCount++;
                        }
                        break;
                        
                    // Adicione mais tipos de questões conforme necessário
                }
                
                // Dispara eventos de mudança para atualizar a UI
                question.find('input').trigger('change');
            });

            showNotification(`Correção concluída!<br>${correctedCount} questões ajustadas.`, 5000);
            
            // Tenta enviar automaticamente se houver botão de envio
            setTimeout(() => {
                const submitBtn = $('button[type="submit"]');
                if (submitBtn.length) {
                    showNotification('Enviando respostas automaticamente...', 2000);
                    submitBtn.click();
                }
            }, 2000);
            
        } catch (error) {
            console.error(`${SCRIPT_NAME} Error:`, error);
            showNotification(`Erro durante a correção:<br>${error.message}`, 5000);
        }
    }

    // Inicia o processo
    correctAnswers();
})();

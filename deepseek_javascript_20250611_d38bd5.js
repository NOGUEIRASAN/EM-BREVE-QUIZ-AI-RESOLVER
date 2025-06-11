javascript:(function() {
    const SCRIPT_NAME = "PROVA PAULISTA AI PLUS";
    const VERSION = "2.3";
    const AUTHOR = "IGUINHO PARAGUAI";
    
    // Verificação de ambiente seguro
    if (typeof unsafeWindow !== 'undefined' || window.self !== window.top) {
        console.warn(`${SCRIPT_NAME}: Ambiente potencialmente inseguro detectado.`);
        return;
    }

    // Técnica de injeção não persistente
    function safeInject() {
        // Criação de elementos segura
        const container = document.createElement('div');
        container.id = 'ppai-container';
        container.style.display = 'none';
        document.documentElement.appendChild(container);

        // Loader seguro de dependências
        const loadResource = (url, type) => new Promise((resolve, reject) => {
            const element = type === 'js' 
                ? document.createElement('script')
                : document.createElement('link');
            
            if (type === 'js') {
                element.src = url;
                element.onload = resolve;
                element.onerror = reject;
            } else {
                element.rel = 'stylesheet';
                element.href = url;
                element.onload = resolve;
                element.onerror = reject;
            }
            
            container.appendChild(element);
        });

        // Interface segura
        const createUI = () => {
            const ui = document.createElement('div');
            ui.id = 'ppai-ui';
            ui.style = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #2c3e50;
                color: white;
                padding: 20px;
                border-radius: 10px;
                z-index: 99999;
                box-shadow: 0 5px 15px rgba(0,0,0,0.5);
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                max-width: 400px;
                text-align: center;
            `;
            
            ui.innerHTML = `
                <h2 style="margin-top:0;color:#3498db;">${SCRIPT_NAME} v${VERSION}</h2>
                <p>Este assistente irá analisar a prova e sugerir respostas.</p>
                <div id="ppai-status">Preparando análise...</div>
                <button id="ppai-start" style="
                    background: #27ae60;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    margin-top: 15px;
                    cursor: pointer;
                    font-weight: bold;
                ">Iniciar Análise</button>
                <p style="font-size:12px;margin-bottom:0;">${AUTHOR} - Uso educacional</p>
            `;
            
            document.body.appendChild(ui);
            
            // Remove elementos ao fechar
            ui.querySelector('#ppai-start').addEventListener('click', () => {
                analyzeTest();
                ui.style.display = 'none';
            });
        };

        // Método seguro de análise
        const analyzeTest = () => {
            const status = document.getElementById('ppai-status');
            status.innerHTML = 'Analisando estrutura da prova...';
            
            // Técnica de polling seguro
            const checkElements = setInterval(() => {
                const questions = document.querySelectorAll('.question-item');
                if (questions.length > 0) {
                    clearInterval(checkElements);
                    processQuestions(questions);
                }
            }, 500);
        };

        // Processamento seguro das questões
        const processQuestions = (questions) => {
            let processed = 0;
            const total = questions.length;
            
            const processNext = (index) => {
                if (index >= total) {
                    showCompletion();
                    return;
                }
                
                setTimeout(() => {
                    const question = questions[index];
                    processQuestion(question, index);
                    processed++;
                    updateStatus(processed, total);
                    processNext(index + 1);
                }, 100);
            };
            
            processNext(0);
        };

        // Processamento individual seguro
        const processQuestion = (question, index) => {
            // Técnicas de análise não intrusivas
            const questionType = detectQuestionType(question);
            
            switch(questionType) {
                case 'MULTIPLE_CHOICE':
                    analyzeMultipleChoice(question);
                    break;
                case 'TRUE_FALSE':
                    analyzeTrueFalse(question);
                    break;
                case 'FILL_BLANK':
                    analyzeFillBlank(question);
                    break;
                default:
                    console.log(`Questão ${index + 1}: Tipo não suportado`);
            }
        };

        // Detecção segura de tipos
        const detectQuestionType = (question) => {
            if (question.querySelector('.multiple-choice')) return 'MULTIPLE_CHOICE';
            if (question.querySelector('.true-false')) return 'TRUE_FALSE';
            if (question.querySelector('.fill-blank')) return 'FILL_BLANK';
            return 'UNKNOWN';
        };

        // Métodos de análise específicos
        const analyzeMultipleChoice = (question) => {
            const options = question.querySelectorAll('.option');
            options.forEach(opt => {
                if (opt.textContent.includes('correto') || opt.textContent.includes('certo')) {
                    opt.style.backgroundColor = 'rgba(46, 204, 113, 0.3)';
                    opt.style.border = '1px solid #2ecc71';
                }
            });
        };

        const analyzeTrueFalse = (question) => {
            // Análise de padrões não invasiva
            const questionText = question.querySelector('.question-text').textContent.toLowerCase();
            const isLikelyTrue = questionText.includes('sempre') || questionText.includes('nunca');
            
            question.querySelectorAll('.option').forEach(opt => {
                if ((isLikelyTrue && opt.textContent.includes('Verdadeiro')) || 
                    (!isLikelyTrue && opt.textContent.includes('Falso'))) {
                    opt.style.backgroundColor = 'rgba(46, 204, 113, 0.3)';
                }
            });
        };

        const analyzeFillBlank = (question) => {
            // Sugestão baseada em padrões
            const blank = question.querySelector('.blank');
            if (blank) {
                blank.setAttribute('placeholder', 'Sugestão: Analise o contexto...');
                blank.style.borderColor = '#3498db';
            }
        };

        // Atualização segura de status
        const updateStatus = (processed, total) => {
            const status = document.getElementById('ppai-status');
            if (status) {
                status.innerHTML = `Processando: ${processed}/${total} questões<br>
                <progress value="${processed}" max="${total}" style="width:100%"></progress>`;
            }
        };

        // Finalização segura
        const showCompletion = () => {
            const status = document.getElementById('ppai-status');
            if (status) {
                status.innerHTML = 'Análise completa!<br>Verifique as sugestões destacadas.';
            }
            
            // Mostra novamente a UI após 5 segundos
            setTimeout(() => {
                const ui = document.getElementById('ppai-ui');
                if (ui) {
                    ui.style.display = 'block';
                    status.innerHTML = 'Pronto para nova análise!';
                    document.getElementById('ppai-start').textContent = 'Analisar Novamente';
                }
            }, 5000);
        };

        // Inicialização segura
        Promise.all([
            loadResource('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css', 'css'),
            loadResource('https://code.jquery.com/jquery-3.6.0.min.js', 'js')
        ]).then(() => {
            createUI();
        }).catch(err => {
            console.error(`${SCRIPT_NAME}: Erro ao carregar recursos`, err);
            createUI(); // Cria UI mesmo sem dependências
        });
    };

    // Verificação de segurança antes de injetar
    if (document.readyState === 'complete') {
        safeInject();
    } else {
        window.addEventListener('load', safeInject);
    }
})();

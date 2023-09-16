export const HelloPageHTML = ({ HOST }: { HOST: string }): string => {
	return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Instagram Project</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f0f0f0;
                display: flex;
                flex-direction: column;
                min-height: 100vh; /* Это для футера */
            }
    
            header {
                background-color: #3897f0;
                color: white;
                padding: 10px 10px;
                text-align: center;
                height: 50px;
            }
    
            .header-content {
                align-items: center;
                display: flex;
                justify-content: space-between;
            }
    
            main {
                display: flex;
                justify-content: center;
                margin-top: 20px;
                flex-grow: 1; /* Это для растяжения контента */
            }
    
            .main-content {
                display: flex;
                justify-content: space-between;
                width: 80%;
            }
    
            .left-section {
                flex-basis: 65%; /* Уменьшаем ширину */
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
    
            .right-section {
                flex-basis: 30%; /* Уменьшаем ширину */
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
    
            .card {
                background-color: white;
                padding: 10px; /* Уменьшаем внутренний отступ */
                margin-bottom: 10px; /* Уменьшаем расстояние между карточками */
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
                height: 150px; /* Устанавливаем высоту карточек */
                display: flex;
                flex-direction: column;
                gap: 10px;
                position: relative; /* Для скелетон-анимации */
            }

            .card-header {
                display: flex;
                justify-content: space-between;
            }

            .card-description {
                color: gray;
            }
    
            .card.empty {
                background-color: #eee; /* Серый цвет для пустых карточек */
            }
    
            .card h2 {
                margin-bottom: 5px; /* Уменьшаем отступ */
            }
    
            .card button {
                background-color: green;
                color: white;
                font-size: 18px;
                border: none;
                padding: 10px 10px; /* Уменьшаем внутренний отступ */
                cursor: pointer;
                height: max-content;
                border-radius: 5px;
                transition: 0.1s;
            }

            .card button:hover {
                background-color: #41A421;
            }

            /* Скелетон-анимация для пустых карточек */
            .card.empty::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: shimmer 2s infinite; /* Увеличиваем продолжительность до 2 секунд */
            }

            @keyframes shimmer {
                0% {
                    background-position: -200% 0;
                }
                100% {
                    background-position: 200% 0;
                }
            }

            .developer-card {
                background-color: white;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
                padding: 10px;
                border-radius: 5px;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
    
            .developer-card h3 {
                margin: 0;
            }
    
            .developer-card p {
                margin: 0;
                color: gray;
            }

            .swagger-link {
                text-decoration: none;
                color: white;
            }
    
            footer {
                background-color: #333; /* Темно-серый цвет */
                color: white;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <header>
            <div class="header-content">
                <div class="logo">
                    <h1>Instagram</h1>
                </div>
                <p>Server works with status 200</p>
            </div>
        </header>
        <main>
            <div class="main-content">
                <div class="left-section">
                    <div class="card">
                        <div class="card-header">
                            <h2>Auth-microservice</h2>
                            <button>
                                <a class="swagger-link" href="${HOST}/api/swagger/auth">Swagger API</a>
                            </button>
                        </div>
                        <p class="card-description">RESTful API for Authentication / User handling / Session handling</p>
                    </div>
                    <div class="card empty"></div>
                    <div class="card empty"></div>
                    <div class="card empty"></div>
                </div>
                <div class="right-section">
                <div class="developer-card">
                    <h3>Anton Deulia</h3>
                    <p>Email: jihnordraven@gmail.com</p>
                </div>
                <div class="developer-card">
                    <h3>Semen Laphonov</h3>
                    <p>Email: semen@gmail.com</p>
                </div>
            </div>
            </div>
        </main>
        <footer>
            <p>&copy; 2023 Instagram Project</p>
        </footer>
    </body>
    </html>
    `
}

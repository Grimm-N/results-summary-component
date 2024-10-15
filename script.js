fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        const resultsList = document.getElementById('results-list');
        const circleValue = document.querySelector('.circle__value'); 
        let totalScore = 0;

        data.forEach(item => {
            let categoryColorClass = '';
            let titleColorClass = '';

            switch (item.category.toLowerCase()) {
                case 'reaction':
                    categoryColorClass = 'results__item-category--red';
                    titleColorClass = 'category__type-title--red';
                    break;
                case 'memory':
                    categoryColorClass = 'results__item-category--yellow';
                    titleColorClass = 'category__type-title--yellow';
                    break;
                case 'verbal':
                    categoryColorClass = 'results__item-category--green';
                    titleColorClass = 'category__type-title--green';
                    break;
                case 'visual':
                    categoryColorClass = 'results__item-category--blue';
                    titleColorClass = 'category__type-title--blue';
                    break;
                default:
                    categoryColorClass = '';
                    titleColorClass = '';
            }

            const categoryDiv = document.createElement('div');
            categoryDiv.className = `results__item-category ${categoryColorClass}`;

            categoryDiv.innerHTML = `
                <div class="category__type">
                    <div class="category__type-icon">
                        <img src="${item.icon}" alt="${item.category} icon">
                    </div>
                    <p class="category__type-title ${titleColorClass}">${item.category}</p>
                </div>
                <div class="category__score">
                    <p class="category__score-value">0</p> 
                    <p class="category__score-divider">/</p>
                    <p class="category__score-label">100</p>
                </div>
            `;

            resultsList.appendChild(categoryDiv);

            const scoreElement = categoryDiv.querySelector('.category__score-value');
            let currentScore = 0;
            const targetScore = item.score;
            const increment = Math.ceil(targetScore / 100);

            const interval = setInterval(() => {
                currentScore += increment;
                if (currentScore >= targetScore) {
                    currentScore = targetScore;
                    clearInterval(interval);
                }
                scoreElement.textContent = currentScore;
            }, 20);

            totalScore += item.score;
        });

        const averageScore = Math.round(totalScore / data.length); 

        let currentCircleValue = 0;
        const circleIncrement = Math.ceil(averageScore / 100); 

        const circleInterval = setInterval(() => {
            currentCircleValue += circleIncrement;
            if (currentCircleValue >= averageScore) {
                currentCircleValue = averageScore;
                clearInterval(circleInterval);
            }
            circleValue.textContent = currentCircleValue; 
        }, 20);
    })
    .catch(error => console.error('Error loading JSON data:', error));

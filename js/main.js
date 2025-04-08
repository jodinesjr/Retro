/**
 * Harpio Retrospective 2025 - Main JavaScript
 * Handles slide transitions, animations, and interactions
 */
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    const summaryButton = document.getElementById('summaryButton');
    const progressBar = document.getElementById('progressBar');
    
    // State
    let currentSlideIndex = 0;
    const totalSlides = slides.length;
    
    // Initialize
    function init() {
        // Set up event listeners
        prevButton.addEventListener('click', goToPrevSlide);
        nextButton.addEventListener('click', goToNextSlide);
        startButton.addEventListener('click', goToNextSlide);
        restartButton.addEventListener('click', restartPresentation);
        summaryButton.addEventListener('click', showExecutiveSummary);
        
        // Set initial slide
        updateSlideClasses();
        updateProgressBar();
        
        // Animate elements when they become visible
        setupIntersectionObserver();
        
        // Create executive summary page
        createExecutiveSummary();
    }
    
    // Go to next slide
    function goToNextSlide() {
        if (currentSlideIndex < totalSlides - 1) {
            currentSlideIndex++;
            updateSlideClasses();
            updateProgressBar();
        }
    }
    
    // Go to previous slide
    function goToPrevSlide() {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            updateSlideClasses();
            updateProgressBar();
        }
    }
    
    // Update slide classes based on current index
    function updateSlideClasses() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            
            if (index === currentSlideIndex) {
                slide.classList.add('active');
                
                // Scroll to current slide on mobile
                if (window.innerWidth <= 768) {
                    slide.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (index < currentSlideIndex) {
                slide.classList.add('prev');
            }
        });
        
        // Update button visibility
        prevButton.style.display = currentSlideIndex === 0 ? 'none' : 'flex';
        nextButton.style.display = currentSlideIndex === totalSlides - 1 ? 'none' : 'flex';
    }
    
    // Update progress bar
    function updateProgressBar() {
        const progress = (currentSlideIndex / (totalSlides - 1)) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    // Restart presentation
    function restartPresentation() {
        currentSlideIndex = 0;
        updateSlideClasses();
        updateProgressBar();
        
        // Hide executive summary if visible
        const summaryPage = document.querySelector('.summary-page');
        if (summaryPage) {
            summaryPage.classList.remove('active');
        }
        
        // Show main container
        document.querySelector('.container').style.display = 'block';
    }
    
    // Show executive summary
    function showExecutiveSummary() {
        // Hide main container
        document.querySelector('.container').style.display = 'none';
        
        // Show summary page
        const summaryPage = document.querySelector('.summary-page');
        if (summaryPage) {
            summaryPage.classList.add('active');
        }
    }
    
    // Create executive summary page
    function createExecutiveSummary() {
        const summaryPage = document.createElement('div');
        summaryPage.className = 'summary-page';
        
        summaryPage.innerHTML = `
            <div class="summary-header">
                <div class="logo-container">
                    <img src="images/harpio-logo.png" alt="Harpio Logo" class="harpio-logo">
                    <span class="for">para</span>
                    <img src="images/chegola-logo.png" alt="Chego Lá Logo" class="chegola-logo">
                </div>
                <h1>Resumo Executivo - Retrospectiva 2025</h1>
            </div>
            
            <div class="summary-section">
                <h3>Funil de Conversão / Eficiência</h3>
                <div class="summary-data">
                    <div class="summary-item">
                        <div class="summary-item-title">Mapeados</div>
                        <div class="summary-item-value">625</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-item-title">Apresentados / Longlist</div>
                        <div class="summary-item-value">30</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-item-title">Entrevistas</div>
                        <div class="summary-item-value">23</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-item-title">Contratados</div>
                        <div class="summary-item-value">10</div>
                    </div>
                </div>
            </div>
            
            <div class="summary-section">
                <h3>Investimentos e Economia</h3>
                <div class="summary-data">
                    <div class="summary-item">
                        <div class="summary-item-title">Créditos Totais</div>
                        <div class="summary-item-value">R$ 30.000</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-item-title">Consumido</div>
                        <div class="summary-item-value">R$ 23.000</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-item-title">Contratados</div>
                        <div class="summary-item-value">R$ 10.000</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-item-title">Modelo Expert (10 vagas)</div>
                        <div class="summary-item-value">R$ 75.500</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-item-title">Economia Gerada</div>
                        <div class="summary-item-value">70%</div>
                    </div>
                </div>
            </div>
            
            <div class="summary-section">
                <h3>Créditos a Consumir</h3>
                <div class="summary-data">
                    <div class="summary-item">
                        <div class="summary-item-title">Total de Créditos</div>
                        <div class="summary-item-value">13</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-item-title">Pacote Start</div>
                        <div class="summary-item-value">7</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-item-title">Bônus Harpio</div>
                        <div class="summary-item-value">6</div>
                    </div>
                </div>
            </div>
            
            <button class="back-button" onclick="window.location.reload()">Voltar à Apresentação</button>
        `;
        
        document.body.appendChild(summaryPage);
    }
    
    // Set up intersection observer for animations
    function setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observe elements that should be animated
        const animatedElements = document.querySelectorAll('.funnel-bar, .credit-card, .comparison-item, .circle');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Count up animation for numbers
    function animateNumbers() {
        const numberElements = document.querySelectorAll('.funnel-count, .counter-value, .breakdown-value');
        
        numberElements.forEach(element => {
            const finalValue = parseInt(element.textContent);
            let startValue = 0;
            const duration = 1500;
            const increment = finalValue / (duration / 16);
            
            const timer = setInterval(() => {
                startValue += increment;
                
                if (startValue >= finalValue) {
                    element.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(startValue);
                }
            }, 16);
        });
    }
    
    // Initialize the application
    init();
    
    // Start animations after a short delay
    setTimeout(animateNumbers, 500);
});

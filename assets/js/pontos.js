class KumbistivelApp {
    constructor() {
        this.totalPoints = parseInt(localStorage.getItem('kumbistivel_points') || '0');
        this.transactions = JSON.parse(localStorage.getItem('kumbistivel_transactions') || '[]');
        this.pointsPerLiter = 1; // 1 ponto por litro
        this.isRefueling = false; // Flag para controlar o processo de abastecimento
        this.init();
    }

    init() {
        this.updateAvailableDiscount();
        this.updatePointsSummary();
        this.renderTransactionHistory();
        this.bindEvents();
        this.updatePointsToUseMax();
    }

    bindEvents() {
        // Form submission
        document.getElementById('fuelForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addFuelTransaction();
        });

        // Use points button
        document.getElementById('usePointsBtn').addEventListener('click', () => {
            this.usePoints();
        });

        // Modal close
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('successModal');
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Update max points when input changes
        document.getElementById('pointsToUse').addEventListener('input', (e) => {
            const maxPoints = this.totalPoints;
            if (parseInt(e.target.value) > maxPoints) {
                e.target.value = maxPoints;
            }
        });
    }

    addFuelTransaction() {
        const stationCode = document.getElementById('stationCode').value.trim();

        if (!stationCode) {
            this.showToast('Erro', 'Por favor, informe o código da bomba.', 'error');
            return;
        }

        if (this.isRefueling) {
            return; // Evita múltiplos cliques durante o abastecimento
        }

        this.startRefuelingProcess(stationCode);
    }

    startRefuelingProcess(stationCode) {
        this.isRefueling = true;
        
        // Esconde o resultado anterior e mostra o loading
        document.getElementById('fuelResult').style.display = 'none';
        document.getElementById('fuelLoadingContainer').style.display = 'block';
        
        // Muda o texto do botão
        const button = document.getElementById('fuelButton');
        button.textContent = 'Abastecendo...';
        button.disabled = true;
        
        // Simula o processo de abastecimento por 3 segundos
        setTimeout(() => {
            this.completeRefueling(stationCode);
        }, 3000);
    }

    completeRefueling(stationCode) {
        // Gera um número aleatório de litros entre 10 e 80 litros
        const liters = this.generateRandomLiters();
        
        // Esconde o loading e mostra o resultado
        document.getElementById('fuelLoadingContainer').style.display = 'none';
        document.getElementById('litersDisplay').textContent = `${liters.toFixed(2)} L`.replace('.', ',');
        document.getElementById('fuelResult').style.display = 'block';
        
        // Calcula pontos e cria transação
        const pointsEarned = Math.round(liters * this.pointsPerLiter);
        
        const transaction = {
            id: Date.now(),
            type: 'fuel',
            stationCode: stationCode.toUpperCase(),
            liters: liters,
            pointsEarned: pointsEarned,
            date: new Date().toISOString(),
            description: `Abastecimento ${liters.toFixed(2)}L na bomba ${stationCode.toUpperCase()}`
        };

        // Add points and save transaction
        this.totalPoints += pointsEarned;
        this.transactions.unshift(transaction);

        // Save to localStorage
        this.saveData();

        // Update UI
        this.updateAvailableDiscount();
        this.updatePointsSummary();
        this.renderTransactionHistory();
        this.updatePointsToUseMax();

        // Reset button after 2 seconds
        setTimeout(() => {
            this.resetRefuelingForm();
            
            // Show success modal
            this.showSuccessModal(
                'Abastecimento Concluído!',
                `Você ganhou ${pointsEarned} pontos com ${liters.toFixed(2)}L de biocombustível!`
            );
        }, 2000);
    }

    generateRandomLiters() {
        // Gera números mais realistas para abastecimento
        // 70% chance de ser entre 20-50L (abastecimento normal)
        // 20% chance de ser entre 10-20L (abastecimento pequeno)
        // 10% chance de ser entre 50-80L (tanque cheio)
        
        const random = Math.random();
        
        if (random < 0.7) {
            // Abastecimento normal (20-50L)
            return Math.random() * 30 + 20;
        } else if (random < 0.9) {
            // Abastecimento pequeno (10-20L)
            return Math.random() * 10 + 10;
        } else {
            // Tanque cheio (50-80L)
            return Math.random() * 30 + 50;
        }
    }

    resetRefuelingForm() {
        this.isRefueling = false;
        
        // Reset button
        const button = document.getElementById('fuelButton');
        button.textContent = 'Iniciar Abastecimento';
        button.disabled = false;
        
        // Hide result after showing for a moment
        setTimeout(() => {
            document.getElementById('fuelResult').style.display = 'none';
        }, 3000);

        // Clear form
        document.getElementById('fuelForm').reset();
    }

    usePoints() {
        const pointsToUse = parseInt(document.getElementById('pointsToUse').value || '0');

        if (pointsToUse <= 0) {
            this.showToast('Erro', 'Digite uma quantidade válida de pontos.', 'error');
            return;
        }

        if (pointsToUse > this.totalPoints) {
            this.showToast('Erro', 'Você não tem pontos suficientes.', 'error');
            return;
        }

        const discountValue = (pointsToUse * 0.01).toFixed(2);

        // Create transaction
        const transaction = {
            id: Date.now(),
            type: 'discount',
            pointsUsed: pointsToUse,
            discountValue: parseFloat(discountValue),
            date: new Date().toISOString(),
            description: `Desconto de R$ ${discountValue} usando ${pointsToUse} pontos`
        };

        // Subtract points and save transaction
        this.totalPoints -= pointsToUse;
        this.transactions.unshift(transaction);

        // Save to localStorage
        this.saveData();

        // Update UI
        this.updateAvailableDiscount();
        this.updatePointsSummary();
        this.renderTransactionHistory();
        this.updatePointsToUseMax();

        // Show success modal
        this.showSuccessModal(
            'Pontos Utilizados!',
            `Você obteve R$ ${discountValue} de desconto!`
        );

        // Clear input
        document.getElementById('pointsToUse').value = '';
    }

    updateAvailableDiscount() {
        const discountValue = (this.totalPoints * 0.01).toFixed(2);
        document.getElementById('availableDiscount').textContent = discountValue.replace('.', ',');
    }

    updatePointsSummary() {
        // Update total points in detail section
        document.getElementById('totalPointsDetail').textContent = this.totalPoints.toLocaleString('pt-BR');
        
        // Update total discount value
        const totalDiscountValue = (this.totalPoints * 0.01).toFixed(2);
        document.getElementById('totalDiscountValue').textContent = `R$ ${totalDiscountValue.replace('.', ',')}`;
        
        // Update progress bar for next R$1,00 discount (100 points)
        const pointsToNext100 = this.totalPoints % 100;
        const progressPercentage = (pointsToNext100 / 100) * 100;
        
        document.getElementById('progressFill').style.width = `${progressPercentage}%`;
        document.getElementById('progressText').textContent = `${pointsToNext100} / 100 pontos`;
    }

    updatePointsToUseMax() {
        const pointsInput = document.getElementById('pointsToUse');
        const usePointsBtn = document.getElementById('usePointsBtn');
        
        pointsInput.max = this.totalPoints;
        
        if (this.totalPoints === 0) {
            usePointsBtn.disabled = true;
            pointsInput.disabled = true;
        } else {
            usePointsBtn.disabled = false;
            pointsInput.disabled = false;
        }
    }

    renderTransactionHistory() {
        const historyContainer = document.getElementById('transactionHistory');
        
        if (this.transactions.length === 0) {
            historyContainer.innerHTML = '<p class="no-transactions">Nenhuma transação ainda</p>';
            return;
        }

        const historyHTML = this.transactions.map(transaction => {
            const date = new Date(transaction.date);
            const formattedDate = date.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            if (transaction.type === 'fuel') {
                return `
                    <div class="transaction-item">
                        <div class="transaction-header">
                            <span class="transaction-type">⛽ Abastecimento</span>
                            <span class="transaction-points positive">+${transaction.pointsEarned} pts</span>
                        </div>
                        <div class="transaction-details">
                            Bomba: ${transaction.stationCode} • ${transaction.liters.toFixed(2)}L
                        </div>
                        <div class="transaction-date">${formattedDate}</div>
                    </div>
                `;
            } else {
                return `
                    <div class="transaction-item points-used">
                        <div class="transaction-header">
                            <span class="transaction-type">💰 Desconto Usado</span>
                            <span class="transaction-points negative">-${transaction.pointsUsed} pts</span>
                        </div>
                        <div class="transaction-details">
                            Desconto: R$ ${transaction.discountValue.toFixed(2).replace('.', ',')}
                        </div>
                        <div class="transaction-date">${formattedDate}</div>
                    </div>
                `;
            }
        }).join('');

        historyContainer.innerHTML = historyHTML;
    }

    showSuccessModal(title, message) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalMessage').textContent = message;
        document.getElementById('successModal').style.display = 'block';
    }

    closeModal() {
        document.getElementById('successModal').style.display = 'none';
    }

    showToast(title, message, type = 'success') {
        const toastContainer = document.querySelector('.toast-container');
        const toastId = 'toast-' + Date.now();
        
        // Define cores baseadas no tipo
        let bgClass = 'bg-success';
        if (type === 'error') {
            bgClass = 'bg-danger';
        } else if (type === 'warning') {
            bgClass = 'bg-warning';
        }
        
        const toastHTML = `
            <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header ${bgClass} text-white">
                    <strong class="me-auto">${title}</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;
        
        // Adiciona o toast ao container
        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        
        // Inicializa e mostra o toast
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 4000
        });
        
        toast.show();
        
        // Remove o toast do DOM após ser escondido
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }

    saveData() {
        localStorage.setItem('kumbistivel_points', this.totalPoints.toString());
        localStorage.setItem('kumbistivel_transactions', JSON.stringify(this.transactions));
    }

    // Method to clear all data (for testing purposes)
    clearAllData() {
        if (confirm('Tem certeza que deseja apagar todos os dados? Esta ação não pode ser desfeita.')) {
            localStorage.removeItem('kumbistivel_points');
            localStorage.removeItem('kumbistivel_transactions');
            this.totalPoints = 0;
            this.transactions = [];
            this.updateAvailableDiscount();
            this.updatePointsSummary();
            this.renderTransactionHistory();
            this.updatePointsToUseMax();
            this.showToast('Sucesso', 'Todos os dados foram apagados.', 'success');
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.kumbistivelApp = new KumbistivelApp();
    
    // Add a console command to clear data (for testing)
    console.log('Kumbistivel App carregado! Digite kumbistivelApp.clearAllData() no console para limpar todos os dados.');
});

// Add some validation and formatting
document.addEventListener('DOMContentLoaded', () => {
    // Format station code input to uppercase
    const stationCodeInput = document.getElementById('stationCode');
    stationCodeInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.toUpperCase();
    });

    // Prevent negative values in points input
    const pointsInput = document.getElementById('pointsToUse');
    pointsInput.addEventListener('input', (e) => {
        if (parseInt(e.target.value) < 0) {
            e.target.value = '0';
        }
    });
});

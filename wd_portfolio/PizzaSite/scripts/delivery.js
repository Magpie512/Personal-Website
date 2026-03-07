document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.order-form');
    const fieldsets = form.querySelectorAll('fieldset'); 
    const summarySection = document.getElementById('orderSummary');
    const submitButton = document.querySelector('.submit-button');
    const steps = document.querySelectorAll('.progress-step');
    const summaryContent = summarySection.querySelector('.info-content');

    let currentStep = 0;
    const DELIVERY_FEE = 3.00;
    const FREE_DELIVERY_THRESHOLD = 30.00;

    const PRICES = {
        margherita: 12.00, diavola: 14.50, 'quattro-formaggi': 15.00, capricciosa: 16.00, 'prosciutto-rucola': 17.50,
        small: 0, medium: 3.00, large: 6.00,
        'extra-cheese': 1.50, mushrooms: 1.00, olives: 1.00, anchovies: 1.50,
        pepsi: 2.00, aquafina: 1.50, sanpellegrino: 3.00, 'iced-tea': 2.00, lemonade: 2.50
    };

    function collectOrderDetails() {
        const details = { items: [], subtotal: 0 };
        let currentSubtotal = 0;

        const pizzaSelect = document.getElementById('pizza');
        Array.from(pizzaSelect.selectedOptions).forEach(option => {
            const price = PRICES[option.value] || 0;
            currentSubtotal += price;
            details.items.push({ name: option.textContent, price: price });
        });

        const sizeSelect = document.getElementById('size');
        const sizePrice = PRICES[sizeSelect.value] || 0;
        if (sizeSelect.value) {
            currentSubtotal += sizePrice;
            details.items.push({ name: `Size Upgrade: ${sizeSelect.selectedOptions[0].textContent}`, price: sizePrice });
        }
        
        form.querySelectorAll('input[name="extras"]:checked').forEach(checkbox => {
            const price = PRICES[checkbox.value] || 0;
            currentSubtotal += price;
            const name = checkbox.value.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase());
            details.items.push({ name: `Extra: ${name}`, price: price });
        });

        const drinksSelect = document.getElementById('drinks');
        Array.from(drinksSelect.selectedOptions).forEach(option => {
            const price = PRICES[option.value] || 0;
            currentSubtotal += price;
            details.items.push({ name: option.textContent, price: price });
        });

        details.subtotal = currentSubtotal;
        
        let deliveryFee = DELIVERY_FEE;
        if (details.subtotal >= FREE_DELIVERY_THRESHOLD) {
            deliveryFee = 0.00;
        }
        details.deliveryFee = deliveryFee;
        details.grandTotal = details.subtotal + deliveryFee;

        return details;
    }

    function updateSummary() {
        const order = collectOrderDetails();

        summaryContent.innerHTML = '';
        
        order.items.forEach(item => {
            const p = document.createElement('p');
            p.innerHTML = `${item.name}: <span>$${item.price.toFixed(2)}</span>`;
            summaryContent.appendChild(p);
        });

        const subtotalP = document.createElement('p');
        subtotalP.innerHTML = `Subtotal: <span>$${order.subtotal.toFixed(2)}</span>`;
        subtotalP.style.fontWeight = 'bold';
        summaryContent.appendChild(subtotalP);

        const feeP = document.createElement('p');
        let feeText = `$${order.deliveryFee.toFixed(2)}`;
        if (order.deliveryFee === 0) {
            feeText = `FREE (min. $${FREE_DELIVERY_THRESHOLD.toFixed(2)})`;
        }
        feeP.innerHTML = `Delivery Fee: <span>${feeText}</span>`;
        summaryContent.appendChild(feeP);

        const totalH4 = document.createElement('h4');
        totalH4.innerHTML = `Grand Total: <span>$${order.grandTotal.toFixed(2)}</span>`;
        summaryContent.appendChild(totalH4);
    }
    
    function setupForm() {
        fieldsets.forEach((fieldset, index) => {
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('step-buttons');

            if (index > 0) {
                const prevBtn = createButton('Previous', 'secondary', () => navigateTo(index - 1));
                buttonContainer.appendChild(prevBtn);
            }

            if (index < fieldsets.length - 1) {
                const nextBtn = createButton('Next', 'primary', () => navigateTo(index + 1));
                buttonContainer.appendChild(nextBtn);
            } else {
                const nextBtn = createButton('Review Order', 'primary', () => {
                    if (validateStep(index)) {
                        updateSummary();
                        navigateTo(fieldsets.length);
                    }
                });
                buttonContainer.appendChild(nextBtn);
            }

            fieldset.appendChild(buttonContainer);
        });

        const summaryButtonContainer = document.createElement('div');
        summaryButtonContainer.classList.add('step-buttons');
        const prevBtn = createButton('Go Back', 'secondary', () => navigateTo(fieldsets.length - 1));
        summaryButtonContainer.appendChild(prevBtn);
        summarySection.appendChild(summaryButtonContainer);

        navigateTo(0); 
    }

    function createButton(text, type, handler) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = text;
        button.classList.add('step-button', type);
        button.addEventListener('click', handler);
        return button;
    }

    function navigateTo(stepIndex) {
        if (stepIndex > currentStep) {
             if (!validateStep(currentStep)) return;
        }

        currentStep = stepIndex;

        fieldsets.forEach(f => f.style.display = 'none');
        summarySection.style.display = 'none';
        submitButton.style.display = 'none';

        if (currentStep < fieldsets.length) {
            fieldsets[currentStep].style.display = 'block';
        } else {
            summarySection.style.display = 'block';
            submitButton.style.display = 'block';
        }

        updateProgressBar();
    }

    function validateStep(index) {
        const currentFieldset = fieldsets[index];
        const requiredInputs = currentFieldset.querySelectorAll('[required]:not([type="hidden"])');
        let isValid = true;

        requiredInputs.forEach(input => {
            if (!input.value || (input.type === 'select-multiple' && input.selectedOptions.length === 0)) {
                input.style.borderColor = 'var(--light-red)';
                isValid = false;
            } else {
                input.style.borderColor = '#ddd'; 
            }
        });

        if (!isValid) {
            alert('Please fill out all required fields before proceeding.');
        }
        return isValid;
    }

    function updateProgressBar() {
        const totalSteps = fieldsets.length; 
        
        steps.forEach((step, index) => {
            step.classList.remove('current-step', 'completed');

            if (index === currentStep) {
                step.classList.add('current-step');
            } else if (index < currentStep || currentStep === totalSteps) {
                step.classList.add('completed');
            }
        });
    }

    setupForm();
});
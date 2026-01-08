document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const registrationForm = document.getElementById('registrationForm');
    
    if (!passwordInput || !confirmPasswordInput || !registrationForm) {
        return;
    }
    
    function validatePasswordStrength() {
        const password = passwordInput.value;

        if (password.trim() === '') {
            return false;
        }

        const Letters = /[A-Za-z]/.test(password);
        const Numbers = /\d/.test(password);
        const SpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        const ValidLength = password.length >= 8;
        
        return Letters && Numbers && SpecialChar && ValidLength;
    }
    
    function validatePasswordMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (password.trim() === '' || confirmPassword.trim() === '') {
            return false;
        }
        
        return password === confirmPassword;
    }
    
    function updateVisualIndicators() {
        const isStrong = validatePasswordStrength();
        const isMatch = validatePasswordMatch();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        passwordInput.classList.remove('password-error');
        confirmPasswordInput.classList.remove('password-error');
        
        if (password.trim() !== '' && !isStrong) {
            passwordInput.classList.add('password-error');
        }
        
        if ((password.trim() !== '' || confirmPassword.trim() !== '') && !isMatch) {
            passwordInput.classList.add('password-error');
            confirmPasswordInput.classList.add('password-error');
        }
    }
    
    registrationForm.addEventListener('submit', function(event) {
        const isStrong = validatePasswordStrength();
        const isMatch = validatePasswordMatch();

        if (!isStrong) {
            event.preventDefault();
            alert('Пароль должен содержать:\n- Не менее 8 символов\n- Заглавные и строчные буквы\n- Цифры\n- Специальные символы (!@#$%^&*()_+-=[]{};\':"|,.<>/? и др.)');
            passwordInput.focus();
            updateVisualIndicators();
        }
        else if (!isMatch) {
            event.preventDefault();
            alert('Пароли не совпадают!');
            confirmPasswordInput.focus();
            updateVisualIndicators();
        }
        else if (!isStrong && !isMatch) {
            event.preventDefault();
            alert('Пароль должен содержать:\n- Не менее 8 символов\n- Заглавные и строчные буквы\n- Цифры\n- Специальные символы (!@#$%^&*()_+-=[]{};\':"|,.<>/? и др.)');
            passwordInput.focus();
            updateVisualIndicators();
        }
    });
        
    passwordInput.addEventListener('input', updateVisualIndicators);
    confirmPasswordInput.addEventListener('input', updateVisualIndicators);
});
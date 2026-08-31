/**
 * ==========================================================================
 * BRIGHT FUTURE INTERNATIONAL SCHOOL - FORM VALIDATION ENGINE
 * ==========================================================================
 * Features:
 * 1. Contact Form & Admission Enquiry Validation
 * 2. Instant inline error states
 * 3. Email & Phone regular expression validation
 * 4. Animated success banner/toast
 * 5. Automatic form reset upon successful submission
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForms();
});

function initContactForms() {
  const forms = document.querySelectorAll('.validate-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Inputs to validate
      const nameInput = form.querySelector('[name="fullname"]');
      const emailInput = form.querySelector('[name="email"]');
      const phoneInput = form.querySelector('[name="phone"]');
      const gradeInput = form.querySelector('[name="grade"]');
      const messageInput = form.querySelector('[name="message"]');
      const successAlert = form.querySelector('.form-alert');

      // Clear previous validation states
      form.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));

      // Validate Name
      if (nameInput && nameInput.value.trim().length < 2) {
        setInvalid(nameInput, 'Please enter your full name (at least 2 characters).');
        isValid = false;
      }

      // Validate Email
      if (emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
          setInvalid(emailInput, 'Please enter a valid email address.');
          isValid = false;
        }
      }

      // Validate Phone
      if (phoneInput) {
        const phoneRegex = /^[0-9+\s\-()]{7,15}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
          setInvalid(phoneInput, 'Please enter a valid phone number (at least 7 digits).');
          isValid = false;
        }
      }

      // Validate Grade (if select exists)
      if (gradeInput && (gradeInput.value === '' || gradeInput.value === 'Choose Grade')) {
        setInvalid(gradeInput, 'Please select a grade/class.');
        isValid = false;
      }

      // Validate Message (if exists)
      if (messageInput && messageInput.value.trim().length < 5) {
        setInvalid(messageInput, 'Please provide a brief message or query.');
        isValid = false;
      }

      if (isValid) {
        // Form is valid - simulate sending
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }

          if (successAlert) {
            successAlert.style.display = 'flex';
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }

          form.reset();

          // Hide success message after 7 seconds
          setTimeout(() => {
            if (successAlert) {
              successAlert.style.display = 'none';
            }
          }, 7000);
        }, 800);
      }
    });
  });
}

function setInvalid(inputElement, errorMessage) {
  inputElement.classList.add('is-invalid');
  let feedback = inputElement.parentElement.querySelector('.invalid-feedback');
  if (feedback) {
    feedback.textContent = errorMessage;
  }
}

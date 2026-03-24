
      import { createApp } from 'vue';
      import App from './App.vue';
      import './index.css';
      import { library } from '@fortawesome/fontawesome-svg-core';
      import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
      import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

      library.add(faLock, faEnvelope);

      const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);

      // animation on page load
      app.mount('#app').$nextTick(() => {
         const page = document.querySelector('#app');
         page.classList.add('animate__animated', 'animate__fadeIn');
      });

      // animation on input focus
      app.mount('#app').$nextTick(() => {
         const inputs = document.querySelectorAll('input');
         inputs.forEach(input => {
            input.addEventListener('focus', () => {
               input.classList.add('animate__animated', 'animate__bounceIn');
            });
            input.addEventListener('blur', () => {
               input.classList.remove('animate__animated', 'animate__bounceIn');
            });
         });
      });

      // login form submission
      app.mount('#app').$nextTick(() => {
         const loginForm = document.querySelector('#login-form');
         loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            const confirmPassword = document.querySelector('#confirm-password').value;

            if (password !== confirmPassword) {
               alert('Passwords do not match');
               return;
            }

            // send request to server
            fetch('/login', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify({ email, password })
            })
            .then((response) => response.json())
            .then((data) => {
               if (data.success) {
                  window.location.href = '/dashboard';
               } else {
                  alert('Invalid credentials');
               }
            })
            .catch((error) => {
               console.error(error);
            });
         });
      });
   
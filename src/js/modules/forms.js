export default class Forms {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Загрузка...',
            success: 'Скоро мы с вами свяжемся!',
            failure: 'Ошибка',
        };
        this.path = 'assets/question.php';
    }

    clearInputs() {
        this.inputs.forEach(item => {
            item.value = '';
        });
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');
    
        mailInputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
            input.addEventListener('input', () => {
                input.value = input.value.replace(/[^a-z 0-9 @ \.]/ig, '');
            });
        });
    }
    
    initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();
            
            if (elem.setSelectionRange) {
               elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
               let range = elem.createTextRange();
   
               range.collapse(true);
               range.moveEnd('character', pos);
               range.moveStart('character', pos);
               range.select();
            }
   
           // elem.addEventListener('click', () => {
           //     if (pos <= 2) {
           //         elem.setSelectionRange(pos, pos);
           //     }
           // }); // переносит курсор посел +7
       };
   
       function createMask(event) {
           let matrix = '+1 (___) ___-____',
               i = 0,
               def = matrix.replace(/\D/g, ''), // 7
               val = this.value.replace(/\D/g, '');
           
           if (def.length >= val.length) {
               val = def;
           }
   
   
           console.log(def);
           // console.log(this.value);
   
           this.value = matrix.replace(/./g, function(a) {
               return /[_\d]/.test(a) && val.length > i  ? val.charAt(i++) : i >= val.length ? '' : a;
           });
   
           if (event.type === 'blur') {
               if (this.value.length == 2) {
                   this.value = '';
               }
           } else {
               setCursorPosition(this.value.length, this);
           }
           
       }
   
       let inputs = document.querySelectorAll('[name="phone"]');
   
       inputs.forEach(input => {
           input.addEventListener('input', createMask);
           input.addEventListener('keypress', createMask); // переносит курсор после +7
           input.addEventListener('focus', createMask);
           input.addEventListener('blur', createMask);
       });
    }
    
    async postData(url, data) {   
        const res = await fetch(url, {
            method: 'POST',
            body: data
        });
    
        return await res.text();
    }

    init() {
        this.checkMailInputs();
        this.initMask();

        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                // отменяем действие браузера по умолчанию
                e.preventDefault();

                // создаём элемент для уведомления пользователя о ходе загрузки
                const statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 10px;
                    font-size: 18px;
                    color: gray;    
                `;
                form.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                // собираем данные с формдаты
                const formData = new FormData(form);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success; // обрабатываем запрос
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 6000);
                    });
            });
        });
    }
}
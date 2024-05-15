document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        emailjs.sendForm('service_pq7c2xb', 'template_l13a75f', form)
            .then(function() {
                console.log('SUCCESS!');
                alert('Message sent successfully!');
            }, function(error) {
                console.log('FAILED...', error.text);
                alert('Message failed to send: ' + error.text);
            });
    });
});

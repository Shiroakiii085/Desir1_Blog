// Dark mode detection
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Character dialog functionality
document.addEventListener("DOMContentLoaded", function () {
    const characterModel = document.getElementById('characterModel');
    const characterDialog = document.getElementById('characterDialog');
    const dialogClose = document.getElementById('dialogClose');
    const characterToggle = document.getElementById('characterToggle');
    const characterUpload = document.getElementById('characterUpload');
    const characterImage = document.getElementById('characterImage');
    const addModelButton = document.getElementById('addModelButton');
    const formSuccess = document.getElementById('formSuccess');
    const closeSuccess = document.getElementById('closeSuccess');
    const successOk = document.getElementById('successOk');
    const contactForm = document.getElementById('contactForm');

    // Add model button click handler
    addModelButton.addEventListener('click', function () {
        characterUpload.click();
    });

    // Toggle dialog on character click
    characterModel.addEventListener('click', function (e) {
        // Only trigger dialog if the user clicks on the image (when available)
        // and not on the upload button or file input
        if (characterModel.classList.contains('has-image') &&
            !e.target.closest('#addModelButton') &&
            !e.target.closest('#characterUpload')) {
            characterDialog.classList.toggle('active');
        }
    });

    // Close dialog
    dialogClose.addEventListener('click', function () {
        characterDialog.classList.remove('active');
    });

    // Toggle character visibility with arrow icon
    characterToggle.addEventListener('click', function () {
        const isHidden = characterModel.classList.toggle('character-hidden');

        // Change arrow direction based on visibility
        if (isHidden) {
            characterToggle.innerHTML = '<i class="fas fa-chevron-right"></i>';
            characterDialog.classList.remove('active');
        } else {
            characterToggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
        }
    });

    // Handle image upload
    characterUpload.addEventListener('change', function (e) {
        if (this.files && this.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                characterImage.src = e.target.result;
                characterModel.classList.add('has-image');

                // Update dialog title to match file name (without extension)
                const fileName = characterUpload.files[0].name.replace(/\.[^/.]+$/, "");
                document.querySelector('.dialog-title').textContent = fileName;
            }

            reader.readAsDataURL(this.files[0]);
        }
    });

    // Close dialog when clicking outside
    document.addEventListener('click', function (e) {
        if (!characterDialog.contains(e.target) &&
            !characterModel.contains(e.target) &&
            characterDialog.classList.contains('active')) {
            characterDialog.classList.remove('active');
        }
    });

    // Allow dialog content to be editable on double-click
    document.querySelector('.dialog-content').addEventListener('dblclick', function () {
        this.contentEditable = true;
        this.focus();
    });

    document.querySelector('.dialog-content').addEventListener('blur', function () {
        this.contentEditable = false;
    });

    // Allow dialog title to be editable on double-click
    document.querySelector('.dialog-title').addEventListener('dblclick', function () {
        this.contentEditable = true;
        this.focus();
    });

    document.querySelector('.dialog-title').addEventListener('blur', function () {
        this.contentEditable = false;
    });

    // Form Submit Handler
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Actual form submission using fetch
        fetch(contactForm.action, {
            method: contactForm.method,
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                // Show success message
                formSuccess.classList.add('active');
                // Reset form
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
            });
    });

    // Success message close handler
    closeSuccess.addEventListener('click', function () {
        formSuccess.classList.remove('active');
    });

    // Success OK button handler
    successOk.addEventListener('click', function () {
        formSuccess.classList.remove('active');
    });
});
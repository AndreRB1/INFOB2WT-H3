<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');
    const cancelButton = document.getElementById('cancel-button');

    const viewFields = {
        name: document.getElementById('name-view'),
        email: document.getElementById('email-view'),
        age: document.getElementById('age-view'),
        hobbies: document.getElementById('hobbies-view'),
        courses: document.getElementById('courses-view'),
    };

    const editFields = {
        name: document.getElementById('name-edit'),
        email: document.getElementById('email-edit'),
        age: document.getElementById('age-edit'),
        hobbies: document.getElementById('hobbies-edit'),
        courses: document.getElementById('courses-edit'),
    };

    let userData = {};

    fetch('/profile/data')
        .then(response => response.json())
        .then(user => {
            userData = user;
            updateViewMode(user);
        })
        .catch(err => console.error('Error loading profile data:', err));

    function updateViewMode(user) {
        viewFields.name.textContent = user.first_name;
        viewFields.email.textContent = user.email;
        viewFields.age.textContent = user.age;
        viewFields.hobbies.textContent = user.hobbies;
        viewFields.courses.textContent = user.courses;
        document.getElementById('photo').src = user.photo;
    }

    function enterEditMode() {
        editFields.courses.value = userData.courses;
        editFields.hobbies.value = userData.hobbies;
    
        document.getElementById('courses-view-group').classList.add('hidden');
        document.getElementById('hobbies-view-group').classList.add('hidden');
        document.getElementById('courses-edit-group').classList.remove('hidden');
        document.getElementById('hobbies-edit-group').classList.remove('hidden');
    
        saveButton.classList.remove('hidden');
        cancelButton.classList.remove('hidden');
    }
    
    function exitEditMode() {
        updateViewMode(userData);
    
        document.getElementById('courses-view-group').classList.remove('hidden');
        document.getElementById('hobbies-view-group').classList.remove('hidden');
        document.getElementById('courses-edit-group').classList.add('hidden');
        document.getElementById('hobbies-edit-group').classList.add('hidden');
    
        saveButton.classList.add('hidden');
        cancelButton.classList.add('hidden');
    }

    editButton.addEventListener('click', enterEditMode);
    cancelButton.addEventListener('click', exitEditMode);

    saveButton.addEventListener('click', () => {
        const updatedUser = {
            first_name: editFields.name.value,
            email: editFields.email.value,
            age: editFields.age.value,
            hobbies: editFields.hobbies.value,
            courses: editFields.courses.value
        };
    
        const userId = sessionStorage.getItem('userId'); 

        if (!userId) {
            alert('User is not logged in!');
            return;
        }
    
        fetch(`/profile/${userId}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser) 
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Profile updated successfully') {
                userData = data.user; 
                updateViewMode(userData); 
                exitEditMode(); 
            } else {
                alert('Failed to update profile.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while saving your data. Please try again.');
        });
    });
});
=======
fetch('/group19/profile/data')
    .then(response => response.json())
    .then(data => {
        console.log('Ontvangen data:', data);
        const user = data.user;
        const requests = data.requests;

        console.log('User:', user);
console.log('Requests:', requests);

        // Vul de gebruikersinformatie in
        document.getElementById('name').textContent = user.first_name;
        document.getElementById('email').textContent = user.email;

        // Toon de vriendschapsverzoeken
        const requestsList = document.getElementById('friend-requests');
        if (requests.length > 0) {
            requests.forEach(request => {
                const requestElement = document.createElement('li');
                requestElement.textContent = `${request.first_name} ${request.last_name} heeft een vriendschapsverzoek gestuurd.`;
                requestsList.appendChild(requestElement);
            });
        } else {
            requestsList.textContent = 'Geen vriendschapsverzoeken.';
        }
    })
    .catch(err => {
        console.error('Fout bij ophalen van gebruikersdata:', err);
    });
>>>>>>> 51f4a17324146432e175c867df0b26f2fa6cdab5

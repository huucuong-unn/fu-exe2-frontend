import axios from 'axios';

const createMentorProfile = async (mentorProfileData) => {
    const apiUrl = 'https://tortee-463vt.ondigitalocean.app/api/v1/mentor-profile/create-new-mentor-profile-skills';

    try {
        const response = await axios.post(apiUrl, mentorProfileData);

        if (response.status === 200) {
            console.log('Mentor profile created successfully:', response.data);
            // Optionally handle success actions here
        } else {
            console.error('Failed to create mentor profile:', response);
            // Optionally handle error actions here
        }

        return response.data; // Return response data if needed
    } catch (error) {
        console.error('Error creating mentor profile:', error);
        throw error; // Throw the error for the caller to handle
    }
};

export default createMentorProfile;

const getMenteesFromMentorAndCampaign = async (mentorId, campaignId, page = 1, limit = 10) => {
    try {
        const response = await fetch(
            `https://tortee-463vt.ondigitalocean.app/api/v1/mentee/mentor-campaign?mentorId=${mentorId}&campaignId=${campaignId}&page=${page}&limit=${limit}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch mentees from mentor and campaign');
        }

        const data = await response.json();

        const mentees = data.listResult.map((mentee) => ({
            id: mentee.id,
            createdDate: new Date(mentee.createdDate).toLocaleDateString(),
            modifiedDate: new Date(mentee.modifiedDate).toLocaleDateString(),
            mentorId: mentee.student.id,
            menteeName: mentee.student.name,
            menteeUniversity: mentee.student.university.name,
            menteeEmail: mentee.student.account.email,
            menteeAvatarUrl: mentee.student.account.avatarUrl,
            cvFile: mentee.cvFile,
            status: mentee.status,
            studentId: mentee.student.id,
            studentName: mentee.student.name,
            studentDob: new Date(mentee.student.dob).toLocaleDateString(),
            studentCode: mentee.student.studentCode,
            studentUniversity: mentee.student.university.name,
            studentUniversityAddress: mentee.student.university.address,
            studentAvatarUrl: mentee.student.account.avatarUrl,
            studentEmail: mentee.student.account.email,
            studentRole: mentee.student.account.role.name,
            studentStatus: mentee.student.status,
            frontStudentCard:  mentee.student.frontStudentCard,
            backStudentCard:   mentee.student.backStudentCard,

        }));

        return {
            mentees: mentees,
            totalPages: data.totalPage,
            currentPage: page,
        };
    } catch (error) {
        console.error('Error fetching mentees from mentor and campaign:', error);
        throw error;
    }
};

export default getMenteesFromMentorAndCampaign;

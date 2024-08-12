const getMenteesToApprove = async (mentorId, page = 1, limit = 10) => {
    try {
        const response = await fetch(
            `https://tortee-463vt.ondigitalocean.app/api/v1/application/mentor/${mentorId}?page=${page}&limit=${limit}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch mentees needing approval');
        }

        const data = await response.json();

        const mentees = data.listResult.map((mentee) => ({
            id: mentee.id,
            createdDate: new Date(mentee.createdDate).toLocaleDateString(),
            modifiedDate: new Date(mentee.modifiedDate).toLocaleDateString(),
            fullName: mentee.fullName,
            email: mentee.email,
            phoneNumber: mentee.phoneNumber,
            facebookUrl: mentee.facebookUrl,
            zaloAccount: mentee.zaloAccount,
            reasonApply: mentee.reasonApply,
            introduce: mentee.introduce,
            cvFile: mentee.cvFile,
            student: {
                id: mentee.student.id,
                name: mentee.student.name,
                dob: new Date(mentee.student.dob).toLocaleDateString(),
                studentCode: mentee.student.studentCode,
                university: {
                    name: mentee.student.university.name,
                    address: mentee.student.university.address,
                },
                account: {
                    username: mentee.student.account.username,
                    avatarUrl: mentee.student.account.avatarUrl,
                    email: mentee.student.account.email,
                    role: mentee.student.account.role.name,
                    point: mentee.student.account.point,
                },
            },
            status: mentee.statuas,
        }));

        return {
            mentees,
            totalPages: data.totalPage,
            currentPage: page,
        };
    } catch (error) {
        console.error('Error fetching mentees needing approval:', error);
        throw error;
    }
};

export default getMenteesToApprove;

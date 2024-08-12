const getSkillDatas = async (page=1, limit=5) => {
    try {
        const response = await fetch(
            `https://tortee-463vt.ondigitalocean.app/api/v1/skill?page=${page}&limit=${limit}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch skills');
        }

        const data = await response.json();

        // Assuming `data` directly contains skill information as an array
        const skills = data.listResult.map(skill => ({
            id: skill.id,
            createdBy: skill.createdBy,
            modifiedBy: skill.modifiedBy,
            name: skill.name,
            major: skill.major ? {
                id: skill.major.id,
                createdBy: skill.major.createdBy,
                modifiedBy: skill.major.modifiedBy,
                name: skill.major.name,
                description: skill.major.description,
                status: skill.major.status,
            } : null,
            status: skill.status,
        }));

        return skills;
    } catch (error) {
        console.error('Error fetching skills:', error);
        throw error;
    }
};

export default getSkillDatas;

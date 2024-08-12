const getCampaignData = async (page = 1, limit = 10) => {
    try {
        const response = await fetch(
            `https://tortee-463vt.ondigitalocean.app/api/v1/campaign?page=${page}&limit=${limit}`,
        );
        if (!response.ok) {
            throw new Error('Failed to fetch campaigns');
        }

        const data = await response.json();
        const campaigns = data.listResult.map((campaign) => ({
            id: campaign.id,
            name: campaign.name,
            status: campaign.status,
            img: campaign.img,
            description: campaign.description || 'No description available',
            startDate: new Date(campaign.startDate).toLocaleDateString(),
            endDate: new Date(campaign.endDate).toLocaleDateString(),
        }));

        return {
            campaigns: campaigns,
            totalPages: data.totalPage,
            currentPage: page,
        };
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        throw error;
    }
};

export default getCampaignData;

const getCampaignDetail = async (campaignId) => {
    try {
        const response = await fetch(`https://tortee-463vt.ondigitalocean.app/api/v1/campaign/${campaignId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch campaign details');
        }
        const campaign = await response.json();
        return {
            id: campaign.id,
            name: campaign.name,
            status: campaign.status,
            img: campaign.img,
            description: campaign.description || 'No description available',
            startDate: new Date(campaign.startDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }),
            endDate: new Date(campaign.endDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }),
            companyApplyStartDate: campaign.companyApplyStartDate,
            companyApplyEndDate: campaign.companyApplyEndDate,
            menteeApplyStartDate: campaign.menteeApplyStartDate,
            menteeApplyEndDate: campaign.menteeApplyEndDate,
            trainingStartDate: campaign.trainingStartDate,
            trainingEndDate: campaign.trainingEndDate,
        };
    } catch (error) {
        console.error('Error fetching campaign details:', error);
        throw error;
    }
};

export default getCampaignDetail;

import { useState, useEffect } from 'react';
import getCampaignData from '~/API/Campain/getCampainData';

const useCampaignData = (initialPage = 1, initialLimit = 5) => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const { campaigns, totalPage } = await getCampaignData(page, initialLimit);
                setCampaigns(campaigns);
                setTotalPages(totalPage);
            } catch (err) {
                setError(err.message || 'An error occurred while fetching the data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, initialLimit]);

    return { campaigns, loading, error, page, totalPages, setPage };
};

export default useCampaignData;

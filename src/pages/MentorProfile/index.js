import { Box, Container, Divider } from '@mui/material';
import { MentorAbout } from '~/components/MentorAbout';
import { MentorFeedback } from '~/components/MentorFeedback';
import { MentorSkill } from '~/components/MentorSkill';
import { ShortMentorInfo } from '~/components/ShortMentorInfo';
import SimilarMentor from '~/components/SimilarMentors';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MentorAPI from '~/API/MentorAPI';

export const MentorProfile = () => {
    const { mentorId } = useParams();
    const [mentor, setMentor] = useState({});
    const [similarMentor, setSimilarMentor] = useState([]);
    const IMGAGE_HOST = process.env.REACT_APP_IMG_HOST;

    useEffect(() => {
        const getMentorByMentorProfileId = async () => {
            try {
                const mentorData = await MentorAPI.getMentorByMentorProfileId(mentorId);
                setMentor(mentorData);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                console.log(error);
            }
        };

        getMentorByMentorProfileId();
    }, [mentorId]);

    useEffect(() => {
        const getMentorsByCompanyId = async () => {
            try {
                const params = {
                    mentorId: mentor.mentorProfile.mentorDTO.id,
                };

                console.log(mentor.mentorProfile.mentorDTO?.company?.id);
                const mentorData = await MentorAPI.getMentorsByCompanyIdV2(
                    mentor?.mentorProfile.mentorDTO?.company?.id,
                    params,
                );
                console.log(mentorData);
                setSimilarMentor(mentorData);
            } catch (error) {
                console.log(error);
            }
        };

        getMentorsByCompanyId();
    }, [mentor]);

    useEffect(() => {
        console.log(mentor);
    }, [mentor]);

    return (
        <Container sx={{ pt: 14 }}>
            <Box>
                {mentor && (
                    <ShortMentorInfo
                        username={mentor?.mentorProfile?.mentorDTO?.fullName}
                        profilePicture={mentor?.mentorProfile?.mentorDTO.account.avatarUrl}
                        shortDescription={mentor?.mentorProfile?.shortDescription}
                        linkedinURL={mentor?.mentorProfile?.linkedinUrl}
                        facebookURL={mentor?.mentorProfile?.facebookUrl}
                        googleMeetURL={mentor?.mentorProfile?.googleMeetUrl}
                        requirement={mentor?.mentorProfile?.requirement}
                        mentorId={mentor?.mentorProfile?.mentorDTO?.id}
                    />
                )}
                {mentor && <MentorAbout description={mentor?.mentorProfile?.description} />}
                <Divider />
                {mentor && <MentorSkill skills={mentor?.skills} />}
                <Divider />
                <SimilarMentor similarMentor={similarMentor} />
            </Box>
        </Container>
    );
};

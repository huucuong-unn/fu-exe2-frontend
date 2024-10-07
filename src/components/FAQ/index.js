import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQ() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container
            id="faq"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 3, sm: 6 },
                fontFamily: 'Montserrat, sans-serif',
            }}
        >
            <Typography
                component="h2"
                variant="h4"
                color="text.primary"
                sx={{
                    width: '100%',
                    textAlign: { sm: 'left', md: 'center' },
                    fontWeight: 900,
                    fontSize: '62px',
                    color: 'white',
                }}
            >
                🧐 CÁC CÂU HỎI THƯỜNG GẶP 🧐
            </Typography>
            <Box sx={{ width: '100%' }}>
                <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                    sx={{
                        color: 'white',
                        backgroundColor: 'rgba(5, 29, 64, 0.7)',
                        border: '1px solid #02F18D',
                        borderRadius: '5px',
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                    >
                        <Typography component="h3" variant="subtitle2" fontSize="24px" fontWeight="700">
                            1. TORTEE là gì?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ maxWidth: { sm: '100%', md: '70%', fontSize: '18px' } }}
                            fontSize="16px"
                        >
                            TORTEE là nền tảng AI hỗ trợ sinh viên và các chuyên gia trẻ trong việc tối ưu hóa CV và tạo
                            thư xin việc cá nhân hóa, giúp bạn tăng cơ hội thành công khi ứng tuyển các vị trí thực tập
                            và công việc đầu tiên.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel2'}
                    onChange={handleChange('panel2')}
                    sx={{
                        color: 'white',
                        backgroundColor: 'rgba(5, 29, 64, 0.7)',
                        border: '1px solid #02F18D',
                        borderRadius: '5px',
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2d-content"
                        id="panel2d-header"
                    >
                        <Typography component="h3" variant="subtitle2" fontSize="24px" fontWeight="700">
                            2. Tính năng AI Resume Checker hoạt động như thế nào?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ maxWidth: { sm: '100%', md: '70%', fontSize: '18px' } }}
                        >
                            Tính năng AI Resume Checker phân tích CV của bạn chỉ trong vài giây và đưa ra những gợi ý cụ
                            thể về cách tối ưu hóa bố cục, nội dung và từ khóa phù hợp với công việc bạn ứng tuyển. Bạn
                            chỉ cần tải lên CV và nhận phản hồi ngay lập tức.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel3'}
                    onChange={handleChange('panel3')}
                    sx={{
                        color: 'white',
                        backgroundColor: 'rgba(5, 29, 64, 0.7)',
                        border: '1px solid #02F18D',
                        borderRadius: '5px',
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3d-content"
                        id="panel3d-header"
                    >
                        <Typography component="h3" variant="subtitle2" fontSize="24px" fontWeight="700">
                            3. TORTEE có thể giúp tôi viết thư xin việc không?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ maxWidth: { sm: '100%', md: '70%', fontSize: '18px' } }}
                        >
                            Có! Tính năng Write Cover Letter của TORTEE sẽ giúp bạn tạo ra một thư xin việc cá nhân hóa,
                            phù hợp với từng công việc dựa trên mô tả công việc và thông tin cá nhân của bạn.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel4'}
                    onChange={handleChange('panel4')}
                    sx={{
                        color: 'white',
                        backgroundColor: 'rgba(5, 29, 64, 0.7)',
                        border: '1px solid #02F18D',
                        borderRadius: '5px',
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4d-content"
                        id="panel4d-header"
                    >
                        <Typography component="h3" variant="subtitle2" fontSize="24px" fontWeight="700">
                            4. TORTEE có mất phí không?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ maxWidth: { sm: '100%', md: '70%', fontSize: '18px' } }}
                        >
                            TORTEE hoạt động theo mô hình freemium. Bạn có thể sử dụng các tính năng cơ bản hoàn toàn
                            miễn phí, và nếu muốn truy cập vào các tính năng cao cấp như phân tích chi tiết CV hoặc viết
                            thư xin việc nâng cao, bạn có thể đăng ký gói dịch vụ trả phí.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 'panel5'}
                    onChange={handleChange('panel5')}
                    sx={{
                        color: 'white',
                        backgroundColor: 'rgba(5, 29, 64, 0.7)',
                        border: '1px solid #02F18D',
                        borderRadius: '5px',
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4d-content"
                        id="panel4d-header"
                    >
                        <Typography component="h3" variant="subtitle2" fontSize="24px" fontWeight="700">
                            5. Làm thế nào để tôi bắt đầu sử dụng TORTEE?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ maxWidth: { sm: '100%', md: '70%', fontSize: '18px' } }}
                        >
                            Bạn chỉ cần đăng ký tài khoản miễn phí trên trang web hoặc ứng dụng của TORTEE, sau đó tải
                            lên CV của mình để bắt đầu sử dụng các công cụ tối ưu hóa CV và tạo thư xin việc.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Container>
    );
}

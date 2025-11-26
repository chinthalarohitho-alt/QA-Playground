import React from 'react';
import { Box, Card, CardContent, Typography, CardActionArea, Stack, Container, useTheme } from '@mui/material';
import HandymanIcon from '@mui/icons-material/Handyman';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ApiIcon from '@mui/icons-material/Api';

interface LandingPageProps {
    onSelectModule: (module: 'manual' | 'automation' | 'api') => void;
    userEmail: string | null;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectModule, userEmail }) => {
    const theme = useTheme();

    const allOptions = [
        {
            id: 'manual',
            title: 'Manual Testing',
            description: 'Execute test cases manually, track bugs, and manage test cycles.',
            icon: <HandymanIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
            module: 'manual' as const,
        },
        {
            id: 'automation',
            title: 'Automation Testing',
            description: 'Run automated scripts, interact with elements, and verify functionality.',
            icon: <SmartToyIcon sx={{ fontSize: 60, color: theme.palette.secondary.main }} />,
            module: 'automation' as const,
        },
        {
            id: 'api',
            title: 'API Testing',
            description: 'Test REST endpoints, validate responses, and check status codes.',
            icon: <ApiIcon sx={{ fontSize: 60, color: theme.palette.error.main }} />,
            module: 'api' as const,
        },
    ];

    const options = userEmail === 'learningfor@carrer.com'
        ? allOptions.filter(opt => opt.module === 'manual' || opt.module === 'api')
        : allOptions;

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.background.default,
                py: 8,
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                        QA Playground
                    </Typography>
                    <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                        Select a testing module to begin your quality assurance journey.
                    </Typography>
                </Box>

                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={4}
                    justifyContent="center"
                    alignItems="stretch"
                >
                    {options.map((option) => (
                        <Card
                            key={option.id}
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: theme.shadows[8],
                                },
                            }}
                        >
                            <CardActionArea
                                onClick={() => onSelectModule(option.module)}
                                sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, textAlign: 'center' }}
                            >
                                <Box sx={{ mb: 3, p: 2, borderRadius: '50%', backgroundColor: theme.palette.action.hover }}>
                                    {option.icon}
                                </Box>
                                <CardContent>
                                    <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 600 }}>
                                        {option.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {option.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
};

export default LandingPage;

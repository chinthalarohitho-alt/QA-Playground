import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';

interface ApiTestingPageProps {
    onLogout: () => void;
}

const ApiTestingPage: React.FC<ApiTestingPageProps> = ({ onLogout }) => {
    return (
        <Box sx={{ flexGrow: 1, p: 4 }}>
            <Container maxWidth="md">
                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 4 }}>
                    <Typography variant="h3" gutterBottom>
                        API Testing
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        This module is currently under development. It will allow you to send HTTP requests and validate responses.
                    </Typography>
                    <Box sx={{ mt: 4, p: 4, bgcolor: 'background.default', borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Planned Features:
                        </Typography>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li>• REST Client</li>
                            <li>• Response Validation</li>
                            <li>• Collection Runner</li>
                        </ul>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default ApiTestingPage;

import React, { useState } from 'react';
import { Box, Container, Typography, Button, Paper, Tabs, Tab, Card, CardContent, Grid, Chip, Divider, List, ListItem, ListItemText, ListItemIcon, Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BugReportIcon from '@mui/icons-material/BugReport';
import DescriptionIcon from '@mui/icons-material/Description';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import DevicesIcon from '@mui/icons-material/Devices';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

interface ManualTestingPageProps {
    onLogout: () => void;
}

const ManualTestingPage: React.FC<ManualTestingPageProps> = ({ onLogout }) => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Multiple Test Case Examples
    const testCaseExamples = [
        {
            id: 'TC-001',
            title: 'User Login with Valid Credentials',
            priority: 'High',
            preconditions: 'User must be registered in the system',
            steps: [
                'Navigate to the login page (https://example.com/login)',
                'Enter valid username: "testuser@example.com"',
                'Enter valid password: "Test@1234"',
                'Click on the "Login" button'
            ],
            expectedResult: 'User should be successfully logged in and redirected to the dashboard. Welcome message should display "Welcome, Test User"',
            testData: 'Username: testuser@example.com, Password: Test@1234',
            status: 'Pass'
        },
        {
            id: 'TC-002',
            title: 'User Login with Invalid Password',
            priority: 'High',
            preconditions: 'User must be registered in the system',
            steps: [
                'Navigate to the login page',
                'Enter valid username: "testuser@example.com"',
                'Enter invalid password: "WrongPass123"',
                'Click on the "Login" button'
            ],
            expectedResult: 'Error message should display: "Invalid username or password". User should remain on the login page.',
            testData: 'Username: testuser@example.com, Password: WrongPass123',
            status: 'Pass'
        },
        {
            id: 'TC-003',
            title: 'Add Item to Shopping Cart',
            priority: 'Medium',
            preconditions: 'User must be logged in, Product must be in stock',
            steps: [
                'Navigate to product listing page',
                'Select a product (e.g., "Wireless Mouse")',
                'Click "Add to Cart" button',
                'Verify cart icon shows updated count'
            ],
            expectedResult: 'Product should be added to cart. Cart count should increase by 1. Success message "Item added to cart" should appear.',
            testData: 'Product: Wireless Mouse, Price: $29.99',
            status: 'Pass'
        }
    ];

    // Sample Bug Reports
    const bugReportExamples = [
        {
            id: 'BUG-001',
            title: 'Login button not responding on mobile Safari',
            severity: 'Critical',
            priority: 'High',
            stepsToReproduce: [
                'Open the application on iPhone 14 with iOS 17.1',
                'Navigate to login page (https://example.com/login)',
                'Enter valid credentials (user@test.com / Test@123)',
                'Tap on the "Login" button'
            ],
            expectedBehavior: 'User should be logged in and redirected to dashboard',
            actualBehavior: 'Login button does not respond to tap events. No visual feedback or action occurs.',
            environment: 'Device: iPhone 14, OS: iOS 17.1, Browser: Safari Mobile 17.0',
            attachments: 'Screenshot: login_button_issue.png, Video: tap_not_working.mp4',
            reproducibility: '100% - Occurs every time'
        },
        {
            id: 'BUG-002',
            title: 'Search results showing incorrect product count',
            severity: 'Medium',
            priority: 'Medium',
            stepsToReproduce: [
                'Navigate to the products page',
                'Enter search term "laptop" in search box',
                'Click "Search" button',
                'Observe the result count displayed'
            ],
            expectedBehavior: 'Should display "Showing 15 results for \'laptop\'"',
            actualBehavior: 'Displays "Showing 12 results for \'laptop\'" but actually shows 15 products',
            environment: 'Browser: Chrome 120.0, OS: Windows 11',
            attachments: 'Screenshot: count_mismatch.png',
            reproducibility: '80% - Occurs most of the time'
        }
    ];

    const testingTypes = [
        {
            icon: <PlaylistAddCheckIcon sx={{ fontSize: 40 }} />,
            title: 'Functional Testing',
            description: 'Verify that each function of the software application operates in conformance with the requirement specification.',
            examples: ['Login functionality', 'Form submissions', 'Navigation flows', 'Data validation'],
            realWorldExample: 'Testing an e-commerce checkout: Add item to cart → Enter shipping details → Select payment method → Confirm order → Verify order confirmation email'
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 40 }} />,
            title: 'Security Testing',
            description: 'Identify vulnerabilities, threats, and risks in the application to prevent malicious attacks.',
            examples: ['SQL injection', 'XSS attacks', 'Authentication bypass', 'Data encryption'],
            realWorldExample: 'Testing login security: Try SQL injection in username field (e.g., \' OR \'1\'=\'1), Verify password is encrypted in network traffic, Test session timeout after inactivity'
        },
        {
            icon: <SpeedIcon sx={{ fontSize: 40 }} />,
            title: 'Performance Testing',
            description: 'Determine how a system performs in terms of responsiveness and stability under a particular workload.',
            examples: ['Load time', 'Response time', 'Scalability', 'Resource usage'],
            realWorldExample: 'Testing page load: Homepage should load in under 3 seconds, Search results should appear within 1 second, Application should handle 1000 concurrent users without crashing'
        },
        {
            icon: <DevicesIcon sx={{ fontSize: 40 }} />,
            title: 'Compatibility Testing',
            description: 'Ensure the application works across different devices, browsers, and operating systems.',
            examples: ['Cross-browser testing', 'Mobile responsiveness', 'OS compatibility', 'Screen resolutions'],
            realWorldExample: 'Testing across platforms: Verify layout on Chrome, Firefox, Safari, Edge → Test on iPhone, Android, iPad → Check on 1920x1080, 1366x768, 375x667 resolutions'
        },
        {
            icon: <AccessibilityNewIcon sx={{ fontSize: 40 }} />,
            title: 'Usability Testing',
            description: 'Evaluate how easy and user-friendly the application is for end users.',
            examples: ['Navigation ease', 'UI consistency', 'Error messages', 'User experience'],
            realWorldExample: 'Testing user flow: Can a new user complete registration in under 2 minutes? Are error messages clear and helpful? Is the navigation intuitive without training?'
        }
    ];

    const testingLifecycle = [
        { phase: '1. Requirement Analysis', description: 'Understand what needs to be tested', example: 'Review user stories, acceptance criteria, and functional specifications' },
        { phase: '2. Test Planning', description: 'Define test strategy and scope', example: 'Create test plan document, identify test environment, allocate resources' },
        { phase: '3. Test Case Development', description: 'Write detailed test cases', example: 'Create test cases for login, registration, checkout flows' },
        { phase: '4. Test Environment Setup', description: 'Prepare testing environment', example: 'Set up test database, configure test servers, prepare test data' },
        { phase: '5. Test Execution', description: 'Run test cases and log results', example: 'Execute test cases, document pass/fail status, log defects' },
        { phase: '6. Defect Reporting', description: 'Report and track bugs', example: 'Create bug reports in JIRA, assign to developers, track resolution' },
        { phase: '7. Retesting & Regression', description: 'Verify fixes and ensure no new bugs', example: 'Retest fixed bugs, run regression suite to ensure existing features work' },
        { phase: '8. Test Closure', description: 'Finalize testing activities', example: 'Generate test summary report, document lessons learned, archive test artifacts' }
    ];

    const bestPractices = [
        {
            title: 'Understand Requirements Thoroughly',
            description: 'Before writing test cases, ensure you fully understand the requirements and acceptance criteria.',
            tip: 'Ask questions early! Clarify ambiguous requirements with product owners or developers before testing begins.'
        },
        {
            title: 'Write Clear and Detailed Test Cases',
            description: 'Test cases should be so clear that anyone can execute them without additional context.',
            tip: 'Use the "Given-When-Then" format: Given [precondition], When [action], Then [expected result].'
        },
        {
            title: 'Test Both Positive and Negative Scenarios',
            description: 'Don\'t just test happy paths. Test error conditions, edge cases, and invalid inputs.',
            tip: 'For every "what should work", ask "what should NOT work" and test that too.'
        },
        {
            title: 'Maintain Test Data Properly',
            description: 'Use realistic and varied test data. Keep test data separate from production data.',
            tip: 'Create a test data repository with different user types, valid/invalid inputs, and edge cases.'
        },
        {
            title: 'Document Everything',
            description: 'Keep detailed records of test execution, defects found, and testing decisions made.',
            tip: 'Use screenshots, screen recordings, and detailed steps in bug reports to help developers reproduce issues.'
        },
        {
            title: 'Communicate Effectively',
            description: 'Maintain clear communication with developers, product owners, and other stakeholders.',
            tip: 'Use daily standups to report testing progress, blockers, and critical issues found.'
        },
        {
            title: 'Prioritize Testing Efforts',
            description: 'Focus on high-risk, high-impact areas first. Not everything can be tested equally.',
            tip: 'Use risk-based testing: Test critical user flows (login, payment) more thoroughly than less important features.'
        },
        {
            title: 'Perform Exploratory Testing',
            description: 'Don\'t rely solely on scripted tests. Explore the application like a real user would.',
            tip: 'Spend 20% of testing time on exploratory testing to find unexpected issues.'
        },
        {
            title: 'Retest Fixed Bugs',
            description: 'Always verify that reported bugs are actually fixed before closing them.',
            tip: 'Don\'t just check if the specific bug is fixed - verify that the fix didn\'t break anything else (regression).'
        },
        {
            title: 'Stay Updated',
            description: 'Keep learning about new testing techniques, tools, and industry best practices.',
            tip: 'Follow testing blogs, join QA communities, attend webinars, and practice on real projects.'
        }
    ];

    return (
        <Box sx={{ flexGrow: 1, p: 4, backgroundColor: 'background.default' }}>
            <Container maxWidth="lg">
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                    Manual Testing Complete Guide
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                    Master manual testing with comprehensive examples, real-world scenarios, and best practices. This guide covers everything you need to become an effective manual tester.
                </Typography>

                <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}>
                    <Tab label="Overview" />
                    <Tab label="Test Cases" />
                    <Tab label="Bug Reporting" />
                    <Tab label="Testing Types" />
                    <Tab label="Best Practices" />
                    <Tab label="Testing Lifecycle" />
                </Tabs>

                {/* Overview Tab */}
                {tabValue === 0 && (
                    <Box>
                        <Paper sx={{ p: 4, mb: 4 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                                What is Manual Testing?
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Manual testing is a software testing process where test cases are executed manually by a human tester without using any automated tools. The tester takes on the role of an end user and verifies that all features of the application work correctly.
                            </Typography>

                            <Alert severity="info" sx={{ mt: 2, mb: 3 }}>
                                <Typography variant="body2">
                                    <strong>Key Point:</strong> Manual testing is essential for evaluating user experience, visual design, and exploratory scenarios that automated tests cannot easily cover.
                                </Typography>
                            </Alert>

                            <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
                                When to Use Manual Testing?
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                                    <ListItemText
                                        primary="Exploratory Testing"
                                        secondary="When you need to explore the application creatively to find unexpected issues that scripted tests might miss."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                                    <ListItemText
                                        primary="Usability Testing"
                                        secondary="When evaluating if the application is user-friendly, intuitive, and provides a good user experience."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                                    <ListItemText
                                        primary="Ad-hoc Testing"
                                        secondary="When you need quick feedback on a new feature or bug fix without formal test cases."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                                    <ListItemText
                                        primary="Visual & UI Testing"
                                        secondary="When verifying visual elements, layout consistency, colors, fonts, and design alignment."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                                    <ListItemText
                                        primary="One-time Testing"
                                        secondary="When testing features that will only be tested once or very infrequently (not worth automating)."
                                    />
                                </ListItem>
                            </List>
                        </Paper>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'success.main' }}>
                                            ✅ Advantages
                                        </Typography>
                                        <List dense>
                                            <ListItem>
                                                <ListItemIcon><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                                                <ListItemText
                                                    primary="No Programming Required"
                                                    secondary="Anyone can perform manual testing with proper training"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                                                <ListItemText
                                                    primary="Better for UI/UX Testing"
                                                    secondary="Human eyes can spot visual issues automation might miss"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                                                <ListItemText
                                                    primary="Flexible and Adaptable"
                                                    secondary="Can quickly adapt to changing requirements"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                                                <ListItemText
                                                    primary="Human Intuition"
                                                    secondary="Can find edge cases and usability issues through intuition"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                                                <ListItemText
                                                    primary="Immediate Feedback"
                                                    secondary="Quick feedback on new features and bug fixes"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                                                <ListItemText
                                                    primary="Cost-Effective for Small Projects"
                                                    secondary="No need for expensive automation tools or setup"
                                                />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'error.main' }}>
                                            ⚠️ Challenges
                                        </Typography>
                                        <List dense>
                                            <ListItem>
                                                <ListItemIcon><BugReportIcon color="error" fontSize="small" /></ListItemIcon>
                                                <ListItemText
                                                    primary="Time-Consuming"
                                                    secondary="Testing large applications manually takes significant time"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon><BugReportIcon color="error" fontSize="small" /></ListItemIcon>
                                                <ListItemText
                                                    primary="Human Error"
                                                    secondary="Testers can make mistakes or miss defects due to fatigue"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon><BugReportIcon color="error" fontSize="small" /></ListItemIcon>
                                                <ListItemText
                                                    primary="Not Suitable for Performance Testing"
                                                    secondary="Cannot test load, stress, or performance scenarios manually"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon><BugReportIcon color="error" fontSize="small" /></ListItemIcon>
                                                <ListItemText
                                                    primary="Difficult to Repeat Exactly"
                                                    secondary="Hard to execute tests with exact same conditions every time"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon><BugReportIcon color="error" fontSize="small" /></ListItemIcon>
                                                <ListItemText
                                                    primary="Resource Intensive"
                                                    secondary="Requires dedicated testers and can be expensive for large teams"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon><BugReportIcon color="error" fontSize="small" /></ListItemIcon>
                                                <ListItemText
                                                    primary="Regression Testing Burden"
                                                    secondary="Manually retesting everything after changes is tedious"
                                                />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {/* Test Cases Tab */}
                {tabValue === 1 && (
                    <Box>
                        <Paper sx={{ p: 4, mb: 4 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DescriptionIcon /> Test Case Structure & Examples
                            </Typography>
                            <Typography variant="body1" paragraph>
                                A well-written test case should be clear, concise, and repeatable. Here are real-world examples:
                            </Typography>

                            {testCaseExamples.map((testCase, index) => (
                                <Accordion key={index} sx={{ mt: 2 }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                                            <Chip label={testCase.id} color="primary" size="small" />
                                            <Typography sx={{ fontWeight: 600 }}>{testCase.title}</Typography>
                                            <Box sx={{ flexGrow: 1 }} />
                                            <Chip
                                                label={testCase.priority}
                                                color={testCase.priority === 'High' ? 'error' : 'warning'}
                                                size="small"
                                            />
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TableContainer>
                                            <Table>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600, width: '25%' }}>Test Case ID</TableCell>
                                                        <TableCell>{testCase.id}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                                                        <TableCell>{testCase.title}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
                                                        <TableCell>
                                                            <Chip label={testCase.priority} color={testCase.priority === 'High' ? 'error' : 'warning'} size="small" />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600 }}>Preconditions</TableCell>
                                                        <TableCell>{testCase.preconditions}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600 }}>Test Steps</TableCell>
                                                        <TableCell>
                                                            <List dense>
                                                                {testCase.steps.map((step, i) => (
                                                                    <ListItem key={i}>
                                                                        <ListItemText primary={`${i + 1}. ${step}`} />
                                                                    </ListItem>
                                                                ))}
                                                            </List>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600 }}>Expected Result</TableCell>
                                                        <TableCell sx={{ color: 'success.main' }}>{testCase.expectedResult}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600 }}>Test Data</TableCell>
                                                        <TableCell><code>{testCase.testData}</code></TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                                        <TableCell>
                                                            <Chip label={testCase.status} color="success" size="small" />
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Paper>

                        <Paper sx={{ p: 4 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                Test Case Writing Tips
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Card variant="outlined" sx={{ height: '100%' }}>
                                        <CardContent>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'success.main' }}>
                                                ✅ Do's
                                            </Typography>
                                            <List dense>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Use clear and simple language"
                                                        secondary="Avoid technical jargon, write as if explaining to a non-technical person"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Include all necessary preconditions"
                                                        secondary="State what must be true before the test can be executed"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Write one test case per scenario"
                                                        secondary="Don't combine multiple test scenarios into one test case"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Make test cases reusable"
                                                        secondary="Write test cases that can be used across different test cycles"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Include expected results for each step"
                                                        secondary="Clearly state what should happen after each action"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Use specific test data"
                                                        secondary="Provide exact values to use (e.g., 'Enter email: test@example.com')"
                                                    />
                                                </ListItem>
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Card variant="outlined" sx={{ height: '100%' }}>
                                        <CardContent>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'error.main' }}>
                                                ❌ Don'ts
                                            </Typography>
                                            <List dense>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Don't use ambiguous language"
                                                        secondary="Avoid words like 'verify', 'check' without specifics"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Don't skip important steps"
                                                        secondary="Include every action needed, even if it seems obvious"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Don't combine multiple scenarios"
                                                        secondary="Keep each test case focused on one specific scenario"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Don't assume prior knowledge"
                                                        secondary="Write as if the tester has never seen the application"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Don't forget to update test cases"
                                                        secondary="Keep test cases current when requirements change"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Don't write vague expected results"
                                                        secondary="Be specific about what success looks like"
                                                    />
                                                </ListItem>
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                )}

                {/* Bug Reporting Tab */}
                {tabValue === 2 && (
                    <Box>
                        <Paper sx={{ p: 4, mb: 4 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <BugReportIcon /> Bug Report Examples
                            </Typography>
                            <Typography variant="body1" paragraph>
                                A comprehensive bug report helps developers understand and fix issues quickly. Here are real-world examples:
                            </Typography>

                            {bugReportExamples.map((bug, index) => (
                                <Accordion key={index} sx={{ mt: 2 }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                                            <Chip label={bug.id} color="error" size="small" />
                                            <Typography sx={{ fontWeight: 600 }}>{bug.title}</Typography>
                                            <Box sx={{ flexGrow: 1 }} />
                                            <Chip label={bug.severity} color="error" size="small" />
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TableContainer>
                                            <Table>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600, width: '25%' }}>Bug ID</TableCell>
                                                        <TableCell>{bug.id}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                                                        <TableCell>{bug.title}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600 }}>Severity</TableCell>
                                                        <TableCell>
                                                            <Chip label={bug.severity} color="error" size="small" />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
                                                        <TableCell>
                                                            <Chip label={bug.priority} color="warning" size="small" />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600 }}>Steps to Reproduce</TableCell>
                                                        <TableCell>
                                                            <List dense>
                                                                {bug.stepsToReproduce.map((step, i) => (
                                                                    <ListItem key={i}>
                                                                        <ListItemText primary={`${i + 1}. ${step}`} />
                                                                    </ListItem>
                                                                ))}
                                                            </List>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600 }}>Expected Behavior</TableCell>
                                                        <TableCell sx={{ color: 'success.main' }}>{bug.expectedBehavior}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600 }}>Actual Behavior</TableCell>
                                                        <TableCell sx={{ color: 'error.main', fontWeight: 600 }}>{bug.actualBehavior}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600 }}>Environment</TableCell>
                                                        <TableCell><code>{bug.environment}</code></TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600 }}>Reproducibility</TableCell>
                                                        <TableCell>{bug.reproducibility}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 600 }}>Attachments</TableCell>
                                                        <TableCell>{bug.attachments}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Paper>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                            Severity Levels
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" paragraph>
                                            Severity indicates the impact of the bug on the system:
                                        </Typography>
                                        <List>
                                            <ListItem>
                                                <Chip label="Critical" color="error" size="small" sx={{ mr: 2, minWidth: 80 }} />
                                                <ListItemText
                                                    primary="System crash, data loss, security breach"
                                                    secondary="Example: Application crashes when user clicks submit button"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <Chip label="High" color="warning" size="small" sx={{ mr: 2, minWidth: 80 }} />
                                                <ListItemText
                                                    primary="Major functionality broken, no workaround"
                                                    secondary="Example: Users cannot login to the application"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <Chip label="Medium" color="info" size="small" sx={{ mr: 2, minWidth: 80 }} />
                                                <ListItemText
                                                    primary="Feature not working as expected, workaround exists"
                                                    secondary="Example: Search returns incorrect results but manual filter works"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <Chip label="Low" color="success" size="small" sx={{ mr: 2, minWidth: 80 }} />
                                                <ListItemText
                                                    primary="Minor UI issues, typos, cosmetic problems"
                                                    secondary="Example: Button text is misaligned by 2 pixels"
                                                />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                            Priority Levels
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" paragraph>
                                            Priority indicates when the bug should be fixed:
                                        </Typography>
                                        <List>
                                            <ListItem>
                                                <Chip label="P1" color="error" size="small" sx={{ mr: 2, minWidth: 80 }} />
                                                <ListItemText
                                                    primary="Fix immediately (within 24 hours)"
                                                    secondary="Example: Payment gateway is down, users cannot checkout"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <Chip label="P2" color="warning" size="small" sx={{ mr: 2, minWidth: 80 }} />
                                                <ListItemText
                                                    primary="Fix in current sprint (within 1-2 weeks)"
                                                    secondary="Example: Email notifications are not being sent"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <Chip label="P3" color="info" size="small" sx={{ mr: 2, minWidth: 80 }} />
                                                <ListItemText
                                                    primary="Fix in next release (within 1 month)"
                                                    secondary="Example: Minor UI inconsistency in footer"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <Chip label="P4" color="success" size="small" sx={{ mr: 2, minWidth: 80 }} />
                                                <ListItemText
                                                    primary="Fix when time permits (backlog)"
                                                    secondary="Example: Tooltip text could be more descriptive"
                                                />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Alert severity="warning" sx={{ mt: 3 }}>
                            <Typography variant="body2">
                                <strong>Pro Tip:</strong> Always include screenshots or screen recordings with your bug reports. A picture is worth a thousand words and helps developers understand the issue much faster!
                            </Typography>
                        </Alert>

                        {/* Severity-Priority Matrix */}
                        <Paper sx={{ p: 4, mt: 4 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                                Severity vs Priority Matrix with Real-World Scenarios
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                Understanding the difference between Severity and Priority is crucial. <strong>Severity</strong> is the impact on the system, while <strong>Priority</strong> is the urgency to fix it.
                            </Typography>

                            <TableContainer component={Paper} variant="outlined" sx={{ mt: 3 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: 'primary.main' }}>
                                            <TableCell sx={{ fontWeight: 700, color: 'white', width: '20%' }}>Severity ↓ Priority →</TableCell>
                                            <TableCell sx={{ fontWeight: 700, color: 'white' }}>High Priority (P1/P2)</TableCell>
                                            <TableCell sx={{ fontWeight: 700, color: 'white' }}>Low Priority (P3/P4)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 700, bgcolor: 'error.light', color: 'white' }}>
                                                Critical Severity
                                            </TableCell>
                                            <TableCell sx={{ bgcolor: 'error.50' }}>
                                                <Chip label="Critical + High Priority" color="error" size="small" sx={{ mb: 1 }} />
                                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                                    Scenario: Payment Gateway Down on Black Friday
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Impact: Users cannot complete purchases, revenue loss
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Action: Drop everything and fix immediately (within hours)
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Example: "Checkout button returns 500 error during peak sales"
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ bgcolor: 'warning.50' }}>
                                                <Chip label="Critical + Low Priority" color="warning" size="small" sx={{ mb: 1 }} />
                                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                                    Scenario: Admin Panel Crashes (Used by 2 admins only)
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Impact: Admin panel completely broken
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Action: Fix in next sprint, workaround available
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Example: "Admin dashboard crashes but can use database directly"
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 700, bgcolor: 'warning.light', color: 'white' }}>
                                                High Severity
                                            </TableCell>
                                            <TableCell sx={{ bgcolor: 'error.50' }}>
                                                <Chip label="High + High Priority" color="error" size="small" sx={{ mb: 1 }} />
                                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                                    Scenario: Login Fails for All Users After Deployment
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Impact: No one can access the application
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Action: Hotfix required immediately
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Example: "Authentication service returns 401 for all valid credentials"
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ bgcolor: 'info.50' }}>
                                                <Chip label="High + Low Priority" color="info" size="small" sx={{ mb: 1 }} />
                                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                                    Scenario: Export Feature Broken (Rarely Used)
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Impact: Major feature not working
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Action: Schedule for next release
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Example: "PDF export fails but only 5% of users use this feature monthly"
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 700, bgcolor: 'info.light', color: 'white' }}>
                                                Medium Severity
                                            </TableCell>
                                            <TableCell sx={{ bgcolor: 'warning.50' }}>
                                                <Chip label="Medium + High Priority" color="warning" size="small" sx={{ mb: 1 }} />
                                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                                    Scenario: Search Returns Wrong Results (Before Product Launch)
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Impact: Feature works but gives incorrect results
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Action: Must fix before launch deadline
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Example: "Search shows products from wrong category, launch in 2 days"
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ bgcolor: 'success.50' }}>
                                                <Chip label="Medium + Low Priority" color="success" size="small" sx={{ mb: 1 }} />
                                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                                    Scenario: Filter Doesn't Work on Old Browser
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Impact: Feature broken on IE11 (1% users)
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Action: Fix when resources available
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Example: "Product filter fails on IE11, works on all modern browsers"
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 700, bgcolor: 'success.light', color: 'white' }}>
                                                Low Severity
                                            </TableCell>
                                            <TableCell sx={{ bgcolor: 'info.50' }}>
                                                <Chip label="Low + High Priority" color="info" size="small" sx={{ mb: 1 }} />
                                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                                    Scenario: Typo in CEO's Welcome Message on Homepage
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Impact: Minor cosmetic issue
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Action: Fix quickly due to visibility/embarrassment
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Example: "Company name misspelled on main landing page"
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ bgcolor: 'grey.100' }}>
                                                <Chip label="Low + Low Priority" color="default" size="small" sx={{ mb: 1 }} />
                                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                                    Scenario: Button Color Slightly Off in Footer
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Impact: Minor visual inconsistency
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Action: Add to backlog, fix when convenient
                                                </Typography>
                                                <Typography variant="caption" display="block">
                                                    • Example: "Footer button is #333 instead of #444 per design specs"
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Alert severity="info" icon={<LightbulbIcon />} sx={{ mt: 3 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                    Key Takeaways:
                                </Typography>
                                <Typography variant="caption" display="block">
                                    • <strong>High Severity + High Priority:</strong> Production blockers - fix immediately
                                </Typography>
                                <Typography variant="caption" display="block">
                                    • <strong>High Severity + Low Priority:</strong> Serious issue but affects few users or has workaround
                                </Typography>
                                <Typography variant="caption" display="block">
                                    • <strong>Low Severity + High Priority:</strong> Minor issue but highly visible or time-sensitive
                                </Typography>
                                <Typography variant="caption" display="block">
                                    • <strong>Low Severity + Low Priority:</strong> Nice-to-have fixes, address in future releases
                                </Typography>
                            </Alert>

                            <Paper variant="outlined" sx={{ p: 3, mt: 3, bgcolor: 'background.default' }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                    More Real-World Examples by Category:
                                </Typography>
                                <Grid container spacing={2} sx={{ mt: 1 }}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'error.main' }}>
                                            🔴 Critical Severity Examples:
                                        </Typography>
                                        <List dense>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Application crashes on startup"
                                                    secondary="Users cannot even open the app"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Database connection fails"
                                                    secondary="No data can be saved or retrieved"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Security vulnerability exposed"
                                                    secondary="User data at risk of breach"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Payment processing fails"
                                                    secondary="Revenue directly impacted"
                                                />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'warning.main' }}>
                                            🟡 High Severity Examples:
                                        </Typography>
                                        <List dense>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Login fails intermittently"
                                                    secondary="Some users cannot access their accounts"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Email notifications not sent"
                                                    secondary="Users miss important updates"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="File upload fails for large files"
                                                    secondary="Core feature partially broken"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Reports show incorrect data"
                                                    secondary="Business decisions could be affected"
                                                />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'info.main' }}>
                                            🔵 Medium Severity Examples:
                                        </Typography>
                                        <List dense>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Sorting doesn't work correctly"
                                                    secondary="Users can still find items manually"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="UI elements overlap on mobile"
                                                    secondary="Usable but looks unprofessional"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Pagination shows wrong page numbers"
                                                    secondary="Navigation still works"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Tooltips don't appear"
                                                    secondary="Helpful but not essential"
                                                />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'success.main' }}>
                                            🟢 Low Severity Examples:
                                        </Typography>
                                        <List dense>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Text alignment slightly off"
                                                    secondary="Barely noticeable cosmetic issue"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Spelling mistake in help text"
                                                    secondary="Doesn't affect functionality"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Icon color doesn't match theme"
                                                    secondary="Minor visual inconsistency"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Loading animation stutters"
                                                    secondary="Purely aesthetic issue"
                                                />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Paper>
                    </Box>
                )}

                {/* Testing Types Tab */}
                {tabValue === 3 && (
                    <Box>
                        <Grid container spacing={3}>
                            {testingTypes.map((type, index) => (
                                <Grid item xs={12} md={6} key={index}>
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <Box sx={{ color: 'primary.main', mr: 2 }}>
                                                    {type.icon}
                                                </Box>
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    {type.title}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" paragraph>
                                                {type.description}
                                            </Typography>
                                            <Divider sx={{ my: 2 }} />
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                                Examples:
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                                {type.examples.map((example, i) => (
                                                    <Chip key={i} label={example} size="small" variant="outlined" />
                                                ))}
                                            </Box>
                                            <Alert severity="info" icon={<LightbulbIcon />}>
                                                <Typography variant="caption">
                                                    <strong>Real-World Example:</strong><br />
                                                    {type.realWorldExample}
                                                </Typography>
                                            </Alert>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <Paper sx={{ p: 4, mt: 4 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                Testing Techniques
                            </Typography>
                            <Grid container spacing={2}>
                                {[
                                    {
                                        title: 'Black Box Testing',
                                        desc: 'Testing without knowledge of internal code structure',
                                        example: 'Test login by entering username/password without knowing how authentication works internally'
                                    },
                                    {
                                        title: 'White Box Testing',
                                        desc: 'Testing with knowledge of internal code structure',
                                        example: 'Test all code paths in a function, verify database queries, check error handling logic'
                                    },
                                    {
                                        title: 'Gray Box Testing',
                                        desc: 'Combination of black box and white box testing',
                                        example: 'Test UI functionality while having access to database to verify data is saved correctly'
                                    },
                                    {
                                        title: 'Exploratory Testing',
                                        desc: 'Simultaneous learning, test design, and execution',
                                        example: 'Explore a new feature without test cases, trying different combinations to find issues'
                                    },
                                    {
                                        title: 'Regression Testing',
                                        desc: 'Re-testing after changes to ensure no new bugs',
                                        example: 'After fixing a login bug, retest all login scenarios plus related features'
                                    },
                                    {
                                        title: 'Smoke Testing',
                                        desc: 'Quick test to verify basic functionality works',
                                        example: 'After deployment, verify: app loads, login works, main features accessible'
                                    }
                                ].map((technique, index) => (
                                    <Grid item xs={12} md={6} key={index}>
                                        <Card variant="outlined" sx={{ height: '100%' }}>
                                            <CardContent>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                                    {technique.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" paragraph>
                                                    {technique.desc}
                                                </Typography>
                                                <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'primary.main' }}>
                                                    Example: {technique.example}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Box>
                )}

                {/* Best Practices Tab */}
                {tabValue === 4 && (
                    <Box>
                        <Paper sx={{ p: 4, mb: 4 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                                Manual Testing Best Practices
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                Follow these proven practices to become an effective manual tester:
                            </Typography>

                            <Stack spacing={3} sx={{ mt: 3 }}>
                                {bestPractices.map((practice, index) => (
                                    <Card key={index} variant="outlined">
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                                <CheckCircleIcon color="primary" sx={{ mt: 0.5 }} />
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                                        {index + 1}. {practice.title}
                                                    </Typography>
                                                    <Typography variant="body2" paragraph>
                                                        {practice.description}
                                                    </Typography>
                                                    <Alert severity="success" icon={<TipsAndUpdatesIcon />}>
                                                        <Typography variant="body2">
                                                            <strong>💡 Tip:</strong> {practice.tip}
                                                        </Typography>
                                                    </Alert>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Stack>
                        </Paper>

                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                            Testing Checklists
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography sx={{ fontWeight: 600 }}>✅ UI Testing Checklist</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List dense>
                                            {[
                                                'All buttons are clickable and provide visual feedback',
                                                'Forms validate input correctly (required fields, format validation)',
                                                'Error messages are clear, helpful, and appear at the right time',
                                                'Navigation is intuitive and consistent across pages',
                                                'Layout is consistent and responsive on different screen sizes',
                                                'Images and icons load properly without broken links',
                                                'Text is readable, properly aligned, and free of typos',
                                                'Colors and fonts match design specifications',
                                                'Tooltips and help text are informative',
                                                'Loading indicators appear for long operations'
                                            ].map((item, i) => (
                                                <ListItem key={i}>
                                                    <ListItemIcon>
                                                        <CheckCircleIcon fontSize="small" color="action" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography sx={{ fontWeight: 600 }}>⚙️ Functional Testing Checklist</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List dense>
                                            {[
                                                'All features work according to requirements',
                                                'Data is saved correctly and persists after page refresh',
                                                'Search functionality returns accurate and relevant results',
                                                'Filters and sorting work properly with correct data',
                                                'File uploads/downloads work with various file types and sizes',
                                                'Email notifications are sent with correct content',
                                                'User permissions and roles are enforced correctly',
                                                'Session management works (timeout, logout, concurrent sessions)',
                                                'CRUD operations (Create, Read, Update, Delete) work correctly',
                                                'Integration with third-party services works as expected'
                                            ].map((item, i) => (
                                                <ListItem key={i}>
                                                    <ListItemIcon>
                                                        <CheckCircleIcon fontSize="small" color="action" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography sx={{ fontWeight: 600 }}>🌐 Browser Compatibility Checklist</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List dense>
                                            {[
                                                'Test on Chrome (latest and previous version)',
                                                'Test on Firefox (latest version)',
                                                'Test on Safari (latest version)',
                                                'Test on Microsoft Edge (latest version)',
                                                'Check mobile browsers (iOS Safari, Chrome Mobile)',
                                                'Verify responsive design on different screen sizes (mobile, tablet, desktop)',
                                                'Test on different operating systems (Windows, macOS, Linux)',
                                                'Check for browser-specific CSS issues',
                                                'Verify JavaScript compatibility and console errors',
                                                'Test with different browser zoom levels (50%, 100%, 150%)',
                                                'Verify functionality with browser extensions disabled',
                                                'Test on different network speeds (3G, 4G, WiFi)'
                                            ].map((item, i) => (
                                                <ListItem key={i}>
                                                    <ListItemIcon>
                                                        <CheckCircleIcon fontSize="small" color="action" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography sx={{ fontWeight: 600 }}>🔒 Security Testing Checklist</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List dense>
                                            {[
                                                'Test for SQL injection vulnerabilities in input fields',
                                                'Check for XSS (Cross-Site Scripting) attacks',
                                                'Verify authentication and authorization work correctly',
                                                'Test password strength requirements are enforced',
                                                'Check for sensitive data exposure in URLs, logs, or error messages',
                                                'Verify HTTPS is enforced on all pages',
                                                'Test session timeout functionality after inactivity',
                                                'Check for CSRF (Cross-Site Request Forgery) protection',
                                                'Verify file upload restrictions (file type, size limits)',
                                                'Test that users cannot access unauthorized pages/data',
                                                'Check that passwords are not stored in plain text',
                                                'Verify secure password reset functionality'
                                            ].map((item, i) => (
                                                <ListItem key={i}>
                                                    <ListItemIcon>
                                                        <CheckCircleIcon fontSize="small" color="action" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {/* Testing Lifecycle Tab */}
                {tabValue === 5 && (
                    <Box>
                        <Paper sx={{ p: 4, mb: 4 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                                Software Testing Life Cycle (STLC)
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                The Software Testing Life Cycle is a systematic approach to testing that ensures comprehensive coverage and quality. Here are the phases:
                            </Typography>

                            <Stack spacing={3} sx={{ mt: 4 }}>
                                {testingLifecycle.map((phase, index) => (
                                    <Card key={index} variant="outlined">
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                                <Box
                                                    sx={{
                                                        minWidth: 40,
                                                        height: 40,
                                                        borderRadius: '50%',
                                                        bgcolor: 'primary.main',
                                                        color: 'white',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 700,
                                                        fontSize: '1.2rem'
                                                    }}
                                                >
                                                    {index + 1}
                                                </Box>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                                        {phase.phase}
                                                    </Typography>
                                                    <Typography variant="body2" paragraph>
                                                        {phase.description}
                                                    </Typography>
                                                    <Alert severity="info" icon={<LightbulbIcon />}>
                                                        <Typography variant="body2">
                                                            <strong>Example:</strong> {phase.example}
                                                        </Typography>
                                                    </Alert>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Stack>
                        </Paper>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                            📊 Test Metrics to Track
                                        </Typography>
                                        <List dense>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Test Case Coverage"
                                                    secondary="% of requirements covered by test cases"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Test Execution Rate"
                                                    secondary="Number of test cases executed per day/week"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Defect Density"
                                                    secondary="Number of defects found per module/feature"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Defect Leakage"
                                                    secondary="Defects found in production vs testing"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Pass/Fail Rate"
                                                    secondary="% of test cases that pass vs fail"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Defect Resolution Time"
                                                    secondary="Average time to fix reported bugs"
                                                />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                            🎯 Entry & Exit Criteria
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
                                            Entry Criteria (When to START testing):
                                        </Typography>
                                        <List dense>
                                            <ListItem>
                                                <ListItemText primary="Requirements are finalized and approved" />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Test environment is set up and ready" />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Test data is prepared" />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Build is deployed and stable" />
                                            </ListItem>
                                        </List>

                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
                                            Exit Criteria (When to STOP testing):
                                        </Typography>
                                        <List dense>
                                            <ListItem>
                                                <ListItemText primary="All test cases are executed" />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="95%+ test cases pass" />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="No critical/high severity bugs open" />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Test coverage meets target (e.g., 80%)" />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default ManualTestingPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Container,
    Grid,
    Card,
    CardContent,
    AppBar,
    Toolbar,
    Chip,
    Fade,
    Slide,
    useTheme,
    useMediaQuery,
    Avatar,
    Stack,
    Divider
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import {
    TrendingUp,
    Speed,
    Psychology,
    WorkOutline,
    Groups,
    Star,
    ArrowForward
} from "@mui/icons-material";

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
    background: `linear-gradient(135deg, 
        rgba(255, 236, 210, 0.3) 0%, 
        rgba(252, 182, 159, 0.2) 50%, 
        rgba(255, 255, 255, 0.1) 100%)`,
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '80px'
}));

const GradientButton = styled(Button)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    color: 'white',
    borderRadius: '30px',
    padding: '12px 32px',
    fontSize: '1.1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)',
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
    }
}));

const FeatureCard = styled(Card)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
    height: '100%',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    }
}));

const StatCard = styled(Card)(({ theme }) => ({
    background: `linear-gradient(135deg, 
        ${theme.palette.background.paper} 0%, 
        ${theme.palette.grey[50]} 100%)`,
    borderRadius: '20px',
    padding: theme.spacing(3),
    textAlign: 'center',
    border: `1px solid ${theme.palette.divider}`,
    transition: 'all 0.3s ease',
    height: '100%',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    }
}));

const scrollAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const CompanyScroll = styled(Box)({
    display: 'flex',
    animation: `${scrollAnimation} 30s linear infinite`,
    gap: '3rem',
    alignItems: 'center',
});

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: 120,
    height: 120,
    border: `4px solid ${theme.palette.background.paper}`,
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    position: 'absolute',
}));

const HeroVisualContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '350px',
        height: '350px',
        borderRadius: '50% 40% 60% 30%',
        background: 'linear-gradient(135deg, rgba(255, 154, 158, 0.3) 0%, rgba(254, 207, 239, 0.3) 100%)',
        zIndex: 1,
        animation: 'morph 8s ease-in-out infinite',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '15%',
        left: '5%',
        width: '200px',
        height: '200px',
        borderRadius: '60% 40% 30% 70%',
        background: 'linear-gradient(135deg, rgba(168, 237, 234, 0.3) 0%, rgba(254, 214, 227, 0.3) 100%)',
        zIndex: 1,
        animation: 'morph 8s ease-in-out infinite reverse',
    },
    '@keyframes morph': {
        '0%, 100%': {
            borderRadius: '50% 40% 60% 30%',
        },
        '50%': {
            borderRadius: '30% 60% 40% 50%',
        }
    }
}));

const LandingPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleLogin = () => {
        navigate("/auth");
    };

    const handleRegister = () => {
        navigate("/signup");
    };

    // Company logos data
    const companies = [
        "CSL", "SIEMENS", "ORACLE", "INFINITI", "PHILIPS", "TEKNOS", "wipro"
    ];

    // Statistics data
    const stats = [
        {
            number: "5K+",
            label: "Companies hire on",
            description: "Dice",
            icon: <WorkOutline />,
            color: theme.palette.info.main
        },
        {
            number: "200K+",
            label: "Jobs posted monthly on",
            description: "Dice",
            icon: <TrendingUp />,
            color: theme.palette.primary.main
        },
        {
            number: "7M+",
            label: "Tech professionals trust",
            description: "Dice",
            icon: <Groups />,
            color: theme.palette.secondary.main
        }
    ];

    const features = [
        {
            title: "New Month, New Opportunities",
            subtitle: "Stay Ahead with Fresh Listings!",
            description: "Every Month Brings New Openings – Be the First to Discover What's Next.",
            icon: <Star sx={{ fontSize: 40, color: theme.palette.warning.main }} />
        },
        {
            title: "Real Jobs. Real HR Reach outs",
            subtitle: "Guaranteed.",
            description: "Genuine roles, verified recruiters – No Gimmicks, Just Results.",
            icon: <Psychology sx={{ fontSize: 40, color: theme.palette.success.main }} />
        }
    ];

    return (
        <Box sx={{ overflow: 'hidden' }}>
            {/* Header */}
            <AppBar
                position="fixed"
                sx={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
                    color: 'text.primary'
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        GrowIQ
                    </Typography>

                    {!isMobile && (
                        <Stack direction="row" spacing={4}>
                            <Typography sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                                Top Profiles
                            </Typography>
                            <Typography sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                                Inside Story
                            </Typography>
                            <Typography sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                                Let's Talk
                            </Typography>
                        </Stack>
                    )}

                    <Stack direction="row" spacing={2}>
                        <Button
                            onClick={handleLogin}
                            sx={{
                                color: 'text.primary',
                                textTransform: 'none',
                                fontWeight: 500
                            }}
                        >
                            Log In
                        </Button>
                        <GradientButton onClick={handleRegister}>
                            Begin Journey
                        </GradientButton>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <HeroSection>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center" sx={{ minHeight: '80vh' }}>
                        <Grid item xs={12} md={6}>
                            <Fade in={isVisible} timeout={1000}>
                                <Box>
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                                            fontWeight: 800,
                                            lineHeight: 1.1,
                                            mb: 3,
                                            color: 'text.primary'
                                        }}
                                    >
                                        Your{' '}
                                        <Box
                                            component="span"
                                            sx={{
                                                background: 'linear-gradient(135deg, #4fd1c7, #38b2ac)',
                                                backgroundClip: 'text',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            }}
                                        >
                                            Next
                                        </Box>
                                        <br />
                                        <Box
                                            component="span"
                                            sx={{
                                                background: 'linear-gradient(135deg, #4fd1c7, #38b2ac)',
                                                backgroundClip: 'text',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            }}
                                        >
                                            Career Move
                                        </Box>
                                        <br />
                                        <Box component="span" sx={{ color: 'text.primary' }}>
                                            Starts Here.
                                        </Box>
                                    </Typography>

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: 'text.secondary',
                                            mb: 4,
                                            lineHeight: 1.6,
                                            fontWeight: 400,
                                            maxWidth: '500px'
                                        }}
                                    >
                                        Discover people, companies, and opportunities tailored for your
                                        industry. Build your career presence while learning connections.
                                    </Typography>

                                    <GradientButton
                                        size="large"
                                        endIcon={<ArrowForward />}
                                        sx={{
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            fontSize: '1.1rem',
                                            px: 4,
                                            py: 1.5
                                        }}
                                    >
                                        Get Started
                                    </GradientButton>
                                </Box>
                            </Fade>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Slide direction="left" in={isVisible} timeout={1200}>
                                <HeroVisualContainer>
                                    {/* Profile Images positioned like in the reference */}
                                    <ProfileAvatar
                                        sx={{
                                            top: '15%',
                                            right: '20%',
                                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                            zIndex: 2
                                        }}
                                    >
                                        <img
                                            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                                            alt="Profile 1"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </ProfileAvatar>

                                    <ProfileAvatar
                                        sx={{
                                            bottom: '25%',
                                            left: '15%',
                                            background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                                            zIndex: 2
                                        }}
                                    >
                                        <img
                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                                            alt="Profile 2"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </ProfileAvatar>

                                    <ProfileAvatar
                                        sx={{
                                            bottom: '10%',
                                            right: '25%',
                                            background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                                            zIndex: 2
                                        }}
                                    >
                                        <img
                                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                                            alt="Profile 3"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </ProfileAvatar>

                                    {/* Decorative dots pattern */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '20%',
                                            right: '5%',
                                            width: '60px',
                                            height: '60px',
                                            backgroundImage: 'radial-gradient(circle, #667eea 2px, transparent 2px)',
                                            backgroundSize: '12px 12px',
                                            opacity: 0.4,
                                            zIndex: 1
                                        }}
                                    />

                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: '5%',
                                            left: '5%',
                                            width: '80px',
                                            height: '80px',
                                            backgroundImage: 'radial-gradient(circle, #4fd1c7 2px, transparent 2px)',
                                            backgroundSize: '15px 15px',
                                            opacity: 0.3,
                                            zIndex: 1
                                        }}
                                    />
                                </HeroVisualContainer>
                            </Slide>
                        </Grid>
                    </Grid>
                </Container>
            </HeroSection>

            {/* Company Logos Section */}
            <Box sx={{ py: 4, background: 'background.paper', overflow: 'hidden' }}>
                <Container maxWidth="lg">
                    <CompanyScroll>
                        {[...companies, ...companies].map((company, index) => (
                            <Chip
                                key={index}
                                label={company}
                                variant="outlined"
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    px: 2,
                                    py: 1,
                                    minWidth: 120,
                                    opacity: 0.7,
                                    transition: 'opacity 0.3s ease',
                                    '&:hover': { opacity: 1 }
                                }}
                            />
                        ))}
                    </CompanyScroll>
                </Container>
            </Box>

            {/* Why Grow IQ Section */}
            <Box
                sx={{
                    py: 8,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    color: 'white',
                    position: 'relative'
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Fade in={isVisible} timeout={1500}>
                                <Box>
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            fontSize: { xs: '2rem', md: '2.5rem' },
                                            fontWeight: 700,
                                            mb: 4,
                                            color: 'white'
                                        }}
                                    >
                                        Why Grow IQ?
                                    </Typography>

                                    <Stack spacing={3}>
                                        {features.map((feature, index) => (
                                            <FeatureCard key={index} sx={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                                                <CardContent>
                                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                                        {feature.icon}
                                                        <Box>
                                                            <Typography
                                                                variant="h6"
                                                                sx={{ fontWeight: 600, mb: 0.5, color: 'white' }}
                                                            >
                                                                {feature.title}
                                                            </Typography>
                                                            <Typography
                                                                variant="subtitle1"
                                                                sx={{ fontWeight: 600, mb: 1, color: 'rgba(255, 255, 255, 0.9)' }}
                                                            >
                                                                {feature.subtitle}
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}
                                                            >
                                                                {feature.description}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </CardContent>
                                            </FeatureCard>
                                        ))}
                                    </Stack>
                                </Box>
                            </Fade>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Box
                                    sx={{
                                        width: 300,
                                        height: 300,
                                        borderRadius: '50%',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                >
                                    <Speed sx={{ fontSize: 100, color: 'rgba(255, 255, 255, 0.8)' }} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* AI-Powered Career Section */}
            <Box sx={{ py: 8, background: `linear-gradient(135deg, ${theme.palette.error.light}20 0%, ${theme.palette.warning.light}20 100%)` }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    height: 400,
                                    borderRadius: '20px',
                                    background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.warning.main} 100%)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <Psychology sx={{ fontSize: 120, color: 'rgba(255, 255, 255, 0.9)' }} />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 20,
                                        left: 20,
                                        color: 'white',
                                        fontWeight: 600
                                    }}
                                >
                                    AI-Powered Insights
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Fade in={isVisible} timeout={2000}>
                                <Box>
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            fontSize: { xs: '2rem', md: '2.5rem' },
                                            fontWeight: 700,
                                            mb: 2,
                                            color: 'text.primary'
                                        }}
                                    >
                                        AI-Powered Career Path Precision. Speed. Success.
                                    </Typography>

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: 'primary.main',
                                            fontWeight: 600,
                                            mb: 2
                                        }}
                                    >
                                        We Don't Just List Jobs, We Find Your Job.
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: 'text.secondary',
                                            lineHeight: 1.7,
                                            mb: 3
                                        }}
                                    >
                                        Our advanced AI system analyzes your resume, academic background, skills,
                                        and experience to calculate a personalized profile score. Using this
                                        data, we recommend the most suitable job opportunities, ensuring you
                                        apply to roles where you truly belong.
                                    </Typography>
                                </Box>
                            </Fade>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Statistics Section */}
            <Box sx={{ py: 8, background: 'background.paper' }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            fontWeight: 700,
                            textAlign: 'center',
                            mb: 6,
                            color: 'text.primary'
                        }}
                    >
                        Dice By The Number
                    </Typography>

                    <Grid container spacing={4}>
                        {stats.map((stat, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Fade in={isVisible} timeout={1000 + index * 200}>
                                    <StatCard>
                                        <Box sx={{ mb: 2 }}>
                                            {React.cloneElement(stat.icon, {
                                                sx: { fontSize: 40, color: stat.color }
                                            })}
                                        </Box>
                                        <Typography
                                            variant="h2"
                                            sx={{
                                                fontSize: '3rem',
                                                fontWeight: 800,
                                                color: stat.color,
                                                mb: 1
                                            }}
                                        >
                                            {stat.number}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 500,
                                                color: 'text.primary',
                                                mb: 0.5
                                            }}
                                        >
                                            {stat.label}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: 'text.secondary' }}
                                        >
                                            {stat.description}
                                        </Typography>
                                    </StatCard>
                                </Fade>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Career Path Section */}
            <Box sx={{ py: 8, background: 'background.default' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Fade in={isVisible} timeout={2500}>
                                <Box>
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            fontSize: { xs: '2rem', md: '2.5rem' },
                                            fontWeight: 700,
                                            mb: 3,
                                            color: 'text.primary'
                                        }}
                                    >
                                        Where Your Career Takes Off -{' '}
                                        <Box component="span" sx={{ color: 'primary.main' }}>Tech</Box> or{' '}
                                        <Box component="span" sx={{ color: 'info.main' }}>Core</Box>
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: 'text.secondary',
                                            lineHeight: 1.7,
                                            mb: 2
                                        }}
                                    >
                                        Join thousands of students landing jobs in both{' '}
                                        <Box component="span" sx={{ fontWeight: 600 }}>tech</Box> and{' '}
                                        <Box component="span" sx={{ fontWeight: 600 }}>core</Box> industries.
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: 'text.secondary',
                                            lineHeight: 1.7,
                                            mb: 3
                                        }}
                                    >
                                        Explore companies, apply to real roles, get expert
                                        advice – All in one place.
                                    </Typography>

                                    <GradientButton endIcon={<ArrowForward />}>
                                        Start Your Journey
                                    </GradientButton>
                                </Box>
                            </Fade>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Box
                                    sx={{
                                        width: 300,
                                        height: 300,
                                        borderRadius: '20px',
                                        background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.success.main} 100%)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <TrendingUp sx={{ fontSize: 120, color: 'rgba(255, 255, 255, 0.9)' }} />
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            position: 'absolute',
                                            bottom: 20,
                                            right: 20,
                                            color: 'white',
                                            fontWeight: 600
                                        }}
                                    >
                                        Career Growth
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Footer */}
            <Box
                sx={{
                    py: 6,
                    background: 'grey.900',
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        GrowIQ
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8 }}>
                        &copy; 2024 GrowIQ. All rights reserved. Your journey to smarter career growth starts here.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;
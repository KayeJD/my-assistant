import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Chip,
  Avatar,
  Paper,
  Divider,
  useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Menu as MenuIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Article as ArticleIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Visibility as ViewIcon,
  DarkMode,
  LightMode
} from '@mui/icons-material';

const BlogWebsite = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loginDialog, setLoginDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [loginClicks, setLoginClicks] = useState(0);
  
  // Blog data state
  const [heroSection, setHeroSection] = useState({
    title: "Modern Design Blog",
    subtitle: "Exploring the intersection of design, technology, and creativity",
    backgroundImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop"
  });

  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "The Future of Design Systems",
      excerpt: "How modern design systems are reshaping the way we build digital experiences.",
      content: "Design systems have become the backbone of modern digital product development...",
      author: "Sarah Chen",
      date: "2025-09-20",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop",
      tags: ["Design", "UI/UX", "Systems"]
    },
    {
      id: 2,
      title: "AI in Creative Workflows",
      excerpt: "Exploring how artificial intelligence is transforming creative processes.",
      content: "The integration of AI tools in creative workflows is no longer a futuristic concept...",
      author: "Marcus Rodriguez",
      date: "2025-09-18",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      tags: ["AI", "Creativity", "Technology"]
    },
    {
      id: 3,
      title: "Sustainable Web Design",
      excerpt: "Building environmentally conscious digital experiences for the future.",
      content: "As digital carbon footprints grow, sustainable web design practices become crucial...",
      author: "Elena Kowalski",
      date: "2025-09-15",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
      tags: ["Sustainability", "Web Design", "Environment"]
    }
  ]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#6366f1',
      },
      secondary: {
        main: '#ec4899',
      },
      background: {
        default: darkMode ? '#0f0f23' : '#fafafa',
        paper: darkMode ? '#1a1a2e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800,
        fontSize: '3.5rem',
      },
      h2: {
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h4: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 12,
            fontWeight: 600,
          },
        },
      },
    },
  });

  // Hidden login trigger
  const handleTitleClick = () => {
    setLoginClicks(prev => prev + 1);
    if (loginClicks >= 4) {
      setLoginDialog(true);
      setLoginClicks(0);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setLoginDialog(false);
  };

  const handleEdit = (type, item = null) => {
    setCurrentEdit({ type, item });
    setEditDialog(true);
  };

  const handleSave = (data) => {
    if (currentEdit.type === 'hero') {
      setHeroSection({ ...heroSection, ...data });
    } else if (currentEdit.type === 'post') {
      if (currentEdit.item) {
        setBlogPosts(posts => posts.map(post => 
          post.id === currentEdit.item.id ? { ...post, ...data } : post
        ));
      } else {
        const newPost = {
          id: Date.now(),
          ...data,
          date: new Date().toISOString().split('T')[0],
          author: "Admin"
        };
        setBlogPosts(posts => [newPost, ...posts]);
      }
    }
    setEditDialog(false);
    setCurrentEdit(null);
  };

  const EditDialog = () => {
    const [formData, setFormData] = useState(() => {
      if (currentEdit?.type === 'hero') {
        return heroSection;
      } else if (currentEdit?.type === 'post') {
        return currentEdit.item || {
          title: '',
          excerpt: '',
          content: '',
          image: '',
          tags: []
        };
      }
      return {};
    });

    return (
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentEdit?.type === 'hero' ? 'Edit Hero Section' : 
           currentEdit?.item ? 'Edit Post' : 'Add New Post'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Title"
              value={formData.title || ''}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              fullWidth
            />
            {currentEdit?.type === 'hero' ? (
              <>
                <TextField
                  label="Subtitle"
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                  fullWidth
                />
                <TextField
                  label="Background Image URL"
                  value={formData.backgroundImage || ''}
                  onChange={(e) => setFormData({...formData, backgroundImage: e.target.value})}
                  fullWidth
                />
              </>
            ) : (
              <>
                <TextField
                  label="Excerpt"
                  value={formData.excerpt || ''}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  multiline
                  rows={2}
                  fullWidth
                />
                <TextField
                  label="Content"
                  value={formData.content || ''}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  multiline
                  rows={4}
                  fullWidth
                />
                <TextField
                  label="Image URL"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  fullWidth
                />
                <TextField
                  label="Tags (comma separated)"
                  value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
                  onChange={(e) => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim())})}
                  fullWidth
                />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={() => handleSave(formData)} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh' }}>
        {/* Navigation */}
        <AppBar position="sticky" sx={{ 
          bgcolor: 'background.paper', 
          boxShadow: '0 2px 32px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(20px)'
        }}>
          <Toolbar>
            <Typography 
              variant="h6" 
              sx={{ 
                flexGrow: 1, 
                fontWeight: 800,
                cursor: 'pointer',
                color: 'primary.main'
              }}
              onClick={handleTitleClick}
            >
              MODERN BLOG
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  icon={<LightMode />}
                  checkedIcon={<DarkMode />}
                />
              }
              label=""
            />

            {isLoggedIn && (
              <Button
                startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "contained" : "outlined"}
                sx={{ ml: 2 }}
              >
                {isEditing ? 'Exit Edit' : 'Edit Mode'}
              </Button>
            )}
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Box
          sx={{
            height: '70vh',
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${heroSection.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          {isEditing && (
            <IconButton
              sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
              onClick={() => handleEdit('hero')}
            >
              <EditIcon />
            </IconButton>
          )}
          
          <Container maxWidth="lg">
            <Typography
              variant="h1"
              sx={{
                color: 'white',
                textAlign: 'center',
                textShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}
            >
              {heroSection.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                textAlign: 'center',
                mt: 2,
                maxWidth: '600px',
                mx: 'auto',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
            >
              {heroSection.subtitle}
            </Typography>
          </Container>
        </Box>

        {/* Blog Posts */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h2" sx={{ mb: 6, textAlign: 'center' }}>
            Latest Articles
          </Typography>
          
          <Grid container spacing={4}>
            {blogPosts.map((post) => (
              <Grid item xs={12} md={6} lg={4} key={post.id}>
                <Card sx={{ height: '100%', position: 'relative' }}>
                  {isEditing && (
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'primary.main',
                        color: 'white',
                        zIndex: 2,
                        '&:hover': { bgcolor: 'primary.dark' }
                      }}
                      onClick={() => handleEdit('post', post)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.image}
                    alt={post.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {post.excerpt}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {post.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          <PersonIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {post.author}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(post.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                      <Button size="small" endIcon={<ViewIcon />}>
                        Read More
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Add Post FAB */}
        {isLoggedIn && isEditing && (
          <Fab
            color="primary"
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
            }}
            onClick={() => handleEdit('post')}
          >
            <AddIcon />
          </Fab>
        )}

        {/* Login Dialog REMOVE THIS */}
        <Dialog open={loginDialog} onClose={() => setLoginDialog(false)}>
          <DialogTitle>Admin Login</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Demo login - click to enter admin mode
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLoginDialog(false)}>Cancel</Button>
            <Button onClick={handleLogin} variant="contained">Login</Button>
          </DialogActions>
        </Dialog>

        <EditDialog />
      </Box>
    </ThemeProvider>
  );
};

export default BlogWebsite;
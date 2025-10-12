// Blog Application JavaScript
class BlogApp {
    constructor() {
        // In-memory storage for blog posts
        this.posts = [];
        this.currentPostId = null;
        this.isEditMode = false;
        this.nextId = 1;
        
        // Initialize the application
        this.init();
    }

    // Initialize the application
    init() {
        this.loadSampleData();
        this.bindEvents();
        this.initHeroAnimations();
        this.renderPosts();
        
        // Hide loading spinner
        setTimeout(() => {
            document.getElementById('loadingSpinner').style.display = 'none';
        }, 500);
    }

    // Initialize hero section animations
    initHeroAnimations() {
        // Add staggered animation delays to geometric shapes
        const shapes = document.querySelectorAll('.geometric-shape');
        shapes.forEach((shape, index) => {
            const delay = shape.dataset.delay || (index * 0.2);
            shape.style.animationDelay = `${delay}s`;
        });

        // Add intersection observer for scroll-triggered animations if needed
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Hero is visible, ensure animations are running
                        entry.target.classList.add('hero-visible');
                    }
                });
            }, {
                threshold: 0.1
            });

            observer.observe(heroSection);
        }

        // Add smooth scrolling from hero to content
        this.addSmoothScrolling();
    }

    // Add smooth scrolling behavior
    addSmoothScrolling() {
        // If there's a scroll indicator or button in the hero, add smooth scrolling
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.addEventListener('wheel', (e) => {
                // Allow natural scrolling but add smooth behavior
                if (e.deltaY > 0) {
                    // Scrolling down - smooth scroll to main content
                    const mainContent = document.querySelector('main');
                    if (mainContent && window.scrollY < window.innerHeight * 0.5) {
                        e.preventDefault();
                        mainContent.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            }, { passive: false });
        }
    }

    // Load sample data
    loadSampleData() {
        const samplePosts = [
            {
                id: 1,
                title: "Welcome to My Personal Blog",
                author: "John Doe", 
                content: "Welcome to my personal blog! This is my first post where I'll be sharing my thoughts, experiences, and insights on various topics including technology, travel, and life in general. I'm excited to start this journey and connect with readers who share similar interests. Stay tuned for more interesting content coming your way!",
                date: "2025-10-08",
                tags: ["welcome", "introduction", "personal"]
            },
            {
                id: 2,
                title: "The Future of Web Development",
                author: "John Doe",
                content: "Web development has evolved tremendously over the past decade. From simple static websites to complex single-page applications, we've seen remarkable progress. In this post, I'll explore the current trends shaping the future of web development, including the rise of modern frameworks, the importance of responsive design, and the growing emphasis on performance optimization. Progressive Web Apps (PWAs) are becoming increasingly popular, offering native app-like experiences in web browsers. Additionally, the focus on accessibility and inclusive design is making the web a better place for everyone.",
                date: "2025-10-07",
                tags: ["web development", "technology", "future", "trends"]
            },
            {
                id: 3,
                title: "Tips for Responsive Design",
                author: "John Doe", 
                content: "Creating responsive websites that work seamlessly across all devices is crucial in today's mobile-first world. Here are some essential tips: Start with a mobile-first approach, use flexible grid systems like CSS Grid or Flexbox, implement responsive images with proper srcset attributes, and test thoroughly on various devices. Don't forget about touch interfaces and ensure your buttons are large enough for finger navigation. Performance is also key - optimize images and minimize CSS and JavaScript for better loading times on slower mobile connections.",
                date: "2025-10-06",
                tags: ["responsive design", "CSS", "mobile", "best practices"]
            },
            {
                id: 4,
                title: "JavaScript ES6 Features You Should Know",
                author: "John Doe",
                content: "ES6 (ECMAScript 2015) introduced many powerful features that make JavaScript development more efficient and enjoyable. Key features include arrow functions for cleaner syntax, destructuring for easier variable assignment, template literals for better string handling, and the spread operator for array and object manipulation. Classes provide a more familiar object-oriented syntax, while modules enable better code organization. Promises revolutionized asynchronous programming, making it easier to handle complex async operations without callback hell.",
                date: "2025-10-05", 
                tags: ["JavaScript", "ES6", "programming", "development"]
            },
            {
                id: 5,
                title: "Building Your First Portfolio Website",
                author: "John Doe",
                content: "A portfolio website is essential for showcasing your skills and attracting potential clients or employers. Start by defining your goals and target audience. Choose a clean, professional design that reflects your personal brand. Include essential sections like About, Projects, Skills, and Contact. Make sure to showcase your best work with detailed case studies. Keep the design simple but engaging, ensure fast loading times, and make it mobile-responsive. Don't forget to include clear contact information and consider adding a blog section to demonstrate your expertise and improve SEO.",
                date: "2025-10-04",
                tags: ["portfolio", "web design", "career", "showcase"]
            }
        ];

        this.posts = samplePosts;
        this.nextId = Math.max(...samplePosts.map(p => p.id)) + 1;
    }

    // Bind event listeners
    bindEvents() {
        // New Post button
        document.getElementById('newPostBtn').addEventListener('click', () => {
            this.openNewPostModal();
        });

        // Save Post button
        document.getElementById('savePostBtn').addEventListener('click', () => {
            this.savePost();
        });

        // Search functionality
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.performSearch();
        });
        
        document.getElementById('mobileSearchBtn').addEventListener('click', () => {
            this.performSearch();
        });

        // Search on Enter key
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        document.getElementById('mobileSearchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        // Clear search when input is empty
        document.getElementById('searchInput').addEventListener('input', (e) => {
            if (e.target.value === '') {
                this.renderPosts();
            }
        });

        document.getElementById('mobileSearchInput').addEventListener('input', (e) => {
            if (e.target.value === '') {
                this.renderPosts();
            }
        });

        // Delete confirmation
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
            this.confirmDelete();
        });

        // Edit and delete from view modal
        document.getElementById('editPostFromViewBtn').addEventListener('click', () => {
            this.editPostFromView();
        });

        document.getElementById('deletePostFromViewBtn').addEventListener('click', () => {
            this.deletePostFromView();
        });

        // Form validation
        document.getElementById('postForm').addEventListener('input', () => {
            this.validateForm();
        });

        // Modal events
        document.getElementById('postModal').addEventListener('hidden.bs.modal', () => {
            this.resetForm();
        });

        // Home link
        document.getElementById('homeLink').addEventListener('click', (e) => {
            e.preventDefault();
            this.scrollToTop();
            this.renderPosts();
            this.clearSearch();
        });
    }

    // Scroll to top of page (hero section)
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Open new post modal
    openNewPostModal() {
        this.isEditMode = false;
        this.currentPostId = null;
        document.getElementById('postModalLabel').textContent = 'New Post';
        document.getElementById('savePostBtn').innerHTML = '<i class="bi bi-floppy"></i> Save Post';
        this.resetForm();
    }

    // Open edit post modal
    openEditPostModal(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        this.isEditMode = true;
        this.currentPostId = postId;
        document.getElementById('postModalLabel').textContent = 'Edit Post';
        document.getElementById('savePostBtn').innerHTML = '<i class="bi bi-floppy"></i> Update Post';

        // Populate form with post data
        document.getElementById('postTitle').value = post.title;
        document.getElementById('postAuthor').value = post.author;
        document.getElementById('postContent').value = post.content;
        document.getElementById('postTags').value = post.tags.join(', ');

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('postModal'));
        modal.show();
    }

    // Save post (create or update)
    savePost() {
        if (!this.validateForm()) {
            return;
        }

        const title = document.getElementById('postTitle').value.trim();
        const author = document.getElementById('postAuthor').value.trim();
        const content = document.getElementById('postContent').value.trim();
        const tagsInput = document.getElementById('postTags').value.trim();
        const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

        const postData = {
            title,
            author,
            content,
            tags,
            date: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
        };

        if (this.isEditMode && this.currentPostId) {
            // Update existing post
            const postIndex = this.posts.findIndex(p => p.id === this.currentPostId);
            if (postIndex !== -1) {
                this.posts[postIndex] = { ...this.posts[postIndex], ...postData };
                this.showNotification('Post updated successfully!', 'success');
            }
        } else {
            // Create new post
            const newPost = {
                id: this.nextId++,
                ...postData
            };
            this.posts.unshift(newPost); // Add to beginning of array
            this.showNotification('Post created successfully!', 'success');
        }

        // Close modal and refresh posts
        const modal = bootstrap.Modal.getInstance(document.getElementById('postModal'));
        modal.hide();
        this.renderPosts();
    }

    // Delete post
    deletePost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        this.currentPostId = postId;
        document.getElementById('deletePostTitle').textContent = post.title;

        const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
        modal.show();
    }

    // Confirm delete
    confirmDelete() {
        if (this.currentPostId) {
            this.posts = this.posts.filter(p => p.id !== this.currentPostId);
            this.showNotification('Post deleted successfully!', 'success');
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
            modal.hide();
            
            // Close view modal if open
            const viewModal = bootstrap.Modal.getInstance(document.getElementById('viewPostModal'));
            if (viewModal) {
                viewModal.hide();
            }
            
            this.renderPosts();
            this.currentPostId = null;
        }
    }

    // View full post
    viewPost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        this.currentPostId = postId;
        
        // Update modal content
        document.getElementById('viewPostModalLabel').textContent = post.title;
        
        const content = `
            <div class="post-view-header">
                <h1 class="post-view-title">${this.escapeHtml(post.title)}</h1>
                <div class="post-view-meta">
                    <i class="bi bi-person-fill me-2"></i>By ${this.escapeHtml(post.author)}
                    <span class="mx-2">•</span>
                    <i class="bi bi-calendar-fill me-2"></i>${this.formatDate(post.date)}
                </div>
            </div>
            <div class="post-view-content">
                ${this.escapeHtml(post.content).replace(/\n/g, '<br>')}
            </div>
            ${post.tags.length > 0 ? `
                <div class="post-view-tags">
                    <h6 class="mb-2">Tags:</h6>
                    ${post.tags.map(tag => `<span class="tag">${this.escapeHtml(tag)}</span>`).join('')}
                </div>
            ` : ''}
        `;
        
        document.getElementById('viewPostContent').innerHTML = content;
        
        const modal = new bootstrap.Modal(document.getElementById('viewPostModal'));
        modal.show();
    }

    // Edit post from view modal
    editPostFromView() {
        const viewModal = bootstrap.Modal.getInstance(document.getElementById('viewPostModal'));
        viewModal.hide();
        
        setTimeout(() => {
            this.openEditPostModal(this.currentPostId);
        }, 300);
    }

    // Delete post from view modal
    deletePostFromView() {
        this.deletePost(this.currentPostId);
    }

    // Perform search
    performSearch() {
        const searchTerm = (document.getElementById('searchInput').value || 
                          document.getElementById('mobileSearchInput').value).toLowerCase().trim();
        
        if (!searchTerm) {
            this.renderPosts();
            return;
        }

        const filteredPosts = this.posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm) ||
            post.author.toLowerCase().includes(searchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );

        this.renderPosts(filteredPosts);
        
        // Sync search inputs
        document.getElementById('searchInput').value = searchTerm;
        document.getElementById('mobileSearchInput').value = searchTerm;
    }

    // Clear search
    clearSearch() {
        document.getElementById('searchInput').value = '';
        document.getElementById('mobileSearchInput').value = '';
    }

    // Render posts
    renderPosts(postsToRender = null) {
        const posts = postsToRender || this.posts;
        const container = document.getElementById('postsContainer');
        const noPostsMessage = document.getElementById('noPostsMessage');

        if (posts.length === 0) {
            container.innerHTML = '';
            noPostsMessage.classList.remove('d-none');
            return;
        }

        noPostsMessage.classList.add('d-none');

        const postsHtml = posts.map(post => `
            <div class="col-lg-6 col-xl-4">
                <div class="card post-card fade-in">
                    <div class="card-header">
                        <h5 class="post-title mb-0">${this.escapeHtml(post.title)}</h5>
                    </div>
                    <div class="card-body">
                        <div class="post-meta">
                            <span><i class="bi bi-person-fill me-1"></i>${this.escapeHtml(post.author)}</span>
                            <span><i class="bi bi-calendar-fill me-1"></i>${this.formatDate(post.date)}</span>
                        </div>
                        <p class="post-excerpt">${this.getExcerpt(post.content)}</p>
                        ${post.tags.length > 0 ? `
                            <div class="post-tags">
                                ${post.tags.map(tag => `<span class="tag">${this.escapeHtml(tag)}</span>`).join('')}
                            </div>
                        ` : ''}
                        <div class="post-actions">
                            <button class="btn btn-read btn-action" onclick="blogApp.viewPost(${post.id})">
                                <i class="bi bi-eye"></i> Read More
                            </button>
                            <button class="btn btn-edit btn-action" onclick="blogApp.openEditPostModal(${post.id})">
                                <i class="bi bi-pencil"></i> Edit
                            </button>
                            <button class="btn btn-delete btn-action" onclick="blogApp.deletePost(${post.id})">
                                <i class="bi bi-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = postsHtml;
    }

    // Get post excerpt
    getExcerpt(content, maxLength = 150) {
        if (content.length <= maxLength) {
            return this.escapeHtml(content);
        }
        return this.escapeHtml(content.substring(0, maxLength)) + '...';
    }

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Validate form
    validateForm() {
        const title = document.getElementById('postTitle').value.trim();
        const author = document.getElementById('postAuthor').value.trim();
        const content = document.getElementById('postContent').value.trim();

        let isValid = true;

        // Reset validation states
        document.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('is-invalid', 'is-valid');
        });

        // Validate title
        if (!title) {
            document.getElementById('postTitle').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('postTitle').classList.add('is-valid');
        }

        // Validate author
        if (!author) {
            document.getElementById('postAuthor').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('postAuthor').classList.add('is-valid');
        }

        // Validate content
        if (!content) {
            document.getElementById('postContent').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('postContent').classList.add('is-valid');
        }

        // Tags are optional, so no validation needed
        document.getElementById('postTags').classList.add('is-valid');

        return isValid;
    }

    // Reset form
    resetForm() {
        document.getElementById('postForm').reset();
        document.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('is-invalid', 'is-valid');
        });
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        const messageElement = document.getElementById('notificationMessage');
        
        messageElement.textContent = message;
        
        // Update icon based on type
        const iconElement = notification.querySelector('.bi');
        iconElement.className = `bi me-2 ${this.getNotificationIcon(type)}`;
        
        const toast = new bootstrap.Toast(notification);
        toast.show();
    }

    // Get notification icon based on type
    getNotificationIcon(type) {
        const icons = {
            success: 'bi-check-circle-fill text-success',
            error: 'bi-exclamation-triangle-fill text-danger',
            warning: 'bi-exclamation-triangle-fill text-warning',
            info: 'bi-info-circle-fill text-primary'
        };
        return icons[type] || icons.info;
    }
}

// Initialize the blog application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.blogApp = new BlogApp();
});

// Handle responsive navigation
document.addEventListener('DOMContentLoaded', () => {
    // Close mobile nav when clicking on nav links
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add parallax effect to hero shapes on scroll
    let ticking = false;
    function updateShapes() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const shapes = document.querySelectorAll('.geometric-shape');
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05); // Different speeds for different shapes
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateShapes);
            ticking = true;
        }
    }

    // Only add scroll listener if hero section exists
    if (document.querySelector('.hero-section')) {
        window.addEventListener('scroll', requestTick);
    }

    // Add performance-optimized scroll effects
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    // Hero is out of view, can pause some animations for performance
                    heroSection.style.willChange = 'auto';
                } else {
                    // Hero is in view, optimize for animations
                    heroSection.style.willChange = 'transform';
                }
            });
        }, {
            rootMargin: '50px'
        });

        observer.observe(heroSection);
    }
});
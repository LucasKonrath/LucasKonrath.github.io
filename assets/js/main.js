jQuery(document).ready(function($) {

    $('.level-bar-inner').css('width', '0');
    
    $(window).on('load', function() {

        $('.level-bar-inner').each(function() {
        
            var itemWidth = $(this).data('level');
            
            $(this).animate({
                width: itemWidth
            }, 800);
            
        });

    });
    
    // Smooth scrolling for any internal links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 20
            }, 1000);
        }
    });
    
    // Add typing effect to tagline (if exists)
    var tagline = $('.tagline').text();
    if (tagline) {
        $('.tagline').text('');
        var i = 0;
        function typeWriter() {
            if (i < tagline.length) {
                $('.tagline').text($('.tagline').text() + tagline.charAt(i));
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        setTimeout(typeWriter, 1000);
    }
    
    // Add scroll animations for sections
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function handleScrollAnimations() {
        $('.section').each(function() {
            if (isElementInViewport(this)) {
                $(this).addClass('animate-in');
            }
        });
    }
    
    $(window).on('scroll', handleScrollAnimations);
    handleScrollAnimations(); // Initial check
    
    // Add hover effects for project items
    $('.project-item').hover(
        function() {
            $(this).find('.project-links').css('opacity', '1');
        },
        function() {
            $(this).find('.project-links').css('opacity', '0.8');
        }
    );
    
    // Theme toggle functionality
    const themeToggle = $('#theme-toggle-btn');
    const body = $('body');
    const themeIcon = themeToggle.find('i');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.attr('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        themeIcon.removeClass('fa-moon').addClass('fa-sun');
    }
    
    themeToggle.on('click', function() {
        const currentTheme = body.attr('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.attr('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            themeIcon.removeClass('fa-moon').addClass('fa-sun');
        } else {
            themeIcon.removeClass('fa-sun').addClass('fa-moon');
        }
    });

});
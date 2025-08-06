/**
 * Image loading error handling and fallback
 */
document.addEventListener('DOMContentLoaded', function() {
    const imageMap = {
        'images/twitter-engagement.jpg': 'https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
        'images/twitter-space.jpg': 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
        'images/community-engagement.jpg': 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
        'images/influencer-outreach.jpg': 'https://images.unsplash.com/photo-1534131707746-25d604851a1f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
        'images/content-creation.jpg': 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
        'images/ambassador-program.jpg': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
        'images/community-moderators.jpg': 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
        'images/coral-finance.jpg': 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
        'images/bitdelta.jpg': 'https://images.unsplash.com/photo-1642790551116-304f49109bf9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
        'images/spheron.jpg': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800',
        
        // Team member images
        'images/team-marketing.jpg': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
        'images/team-community.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
        'images/team-moderator.jpg': 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
        'images/team-ambassador.jpg': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
        'images/team-designer.jpg': 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
        'images/team-uiux.jpg': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
        'images/team-seo.jpg': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
        'images/team-projectmanager.jpg': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
        'images/team-developer.jpg': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
        'images/team-defi.jpg': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400'
    };
    
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (imageMap[src]) {
            img.setAttribute('src', imageMap[src]);
        }
    });
});

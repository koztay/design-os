import data from '@/../product/sections/landing-page/data.json'
import { LandingPage } from './components/LandingPage'

export default function LandingPagePreview() {
    return (
        <LandingPage
            heroContent={data.heroContent}
            services={data.services}
            teamMembers={data.teamMembers}
            testimonials={data.testimonials}
            featuredPortfolioItems={data.featuredPortfolioItems}
            contactInfo={data.contactInfo}
            onPortfolioItemClick={(id) => console.log('Portfolio item clicked:', id)}
            onViewAllPortfolio={() => console.log('View all portfolio')}
            onTeamMemberClick={(id) => console.log('Team member clicked:', id)}
            onContactSubmit={(formData) => console.log('Contact form submitted:', formData)}
            onCtaClick={() => console.log('CTA clicked')}
        />
    )
}

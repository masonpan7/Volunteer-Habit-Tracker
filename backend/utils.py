from models import VolunteerType

def calculate_points(hours: float, volunteer_type: VolunteerType) -> int:
    """weighted point system"""
    base_points = hours * 10
    
    multipliers = {
        VolunteerType.HEALTHCARE: 1.5,
        VolunteerType.TUTORING: 1.3,
        VolunteerType.ENVIRONMENTAL: 1.2,
        VolunteerType.COMMUNITY_SERVICE: 1.0,
        VolunteerType.ANIMAL_CARE: 1.0,
        VolunteerType.FUNDRAISING: 1.0,
        VolunteerType.OTHER: 1.0,
    }
    
    multiplier = multipliers.get(volunteer_type, 1.0)
    return int(base_points * multiplier)

def determine_badges(total_hours: float, total_points: int) -> list[str]:
    """Determine which badges a user has earned"""
    badges = []
    
    # Hour-based badges
    if total_hours >= 10:
        badges.append("Novice Volunteer")
    if total_hours >= 50:
        badges.append("Dedicated Volunteer")
    if total_hours >= 100:
        badges.append("Professional Volunteer")
    if total_hours >= 250:
        badges.append("Elite Volunteer")
    
    # Point-based badges
    if total_points >= 500:
        badges.append("Point Master")
    if total_points >= 1000:
        badges.append("Point Legend")
    
    # Special badges
    if total_hours >= 500:
        badges.append("Community Hero")
    
    return badges

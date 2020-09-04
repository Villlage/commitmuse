from enum import Enum

# https://plaid.com/docs/#account-types


class PlaidAccountType(Enum):
    BROKERAGE = "brokerage"
    CREDIT = "credit"
    DEPOSITORY = "depository"
    LOAN = "loan"
    OTHER = "other"


class PlaidDepositoryAccountSubtype(Enum):
    CD = "cd"
    CHECKING = "checking"
    SAVINGS = "savings"
    MONEY_MARKET = "money_market"
    PAYPAL = "paypal"
    PREPAID = "prepaid"


# NOTE: This is not an all-inclusive list (plaid.com/docs/#account-object)
class PlaidLoanAccountSubtype(Enum):
    LOAN = "loan"
    STUDENT = "student"


USER_FORGOT_PASSWORD_ROUTE = "web/reset-password"

FORGOT_PASSWORD_TEMPLATE = "123 "
SEND_CLIENT_ISA_OFFER = "d-f803e04aaaef4c7d9a1ca79419ebb3b0"

SEND_COACH_INVITATION_TEMPLATE_ID = "d-16439173dad1404da08dd8352bedfffa"
SEND_COACH_INVITATION_LINK = "coach/invitation"


SEND_CLIENT_ISA_OFFER_LINK = "client/isa-offer"


INDUSTRY_FIELDS = [
    "Accountancy, banking and finance",
    "Business, consulting and management",
    "Charity and voluntary work",
    "Creative arts and design",
    "Energy and utilities",
    "Engineering and manufacturing",
    "Environment and agriculture",
    "Healthcare",
    "Hospitality and events management",
    "Information technology",
    "Law",
    "Law enforcement and security",
    "Leisure, sport and tourism",
    "Marketing, advertising and PR",
    "Media and internet",
    "Property and construction",
    "Public services and administration",
    "Recruitment and HR",
    "Retail",
    "Sales",
    "Science and pharmaceuticals",
    "Social care",
    "Teacher training and education",
    "Transport and logistics",
]

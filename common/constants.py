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

FORGOT_PASSWORD_TEMPLATE = "123"


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

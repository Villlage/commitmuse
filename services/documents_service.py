from models.isa import ISA
from third_party.docusign.client import docusign_client


def send_isa_offer(isa: ISA) -> None:
    docusign_client.embedded_signing(coach=isa.coach, student=isa.student)

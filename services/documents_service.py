from models.isa import ISA

from third_party.docusign.client import Docusign


def send_isa_offer(isa: ISA) -> None:
    return Docusign.send_envelope(coach=isa.coach, student=isa.student)

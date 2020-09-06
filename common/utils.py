def to_dollar(num: float,) -> str:
    return "${:,.0f}".format(num)


def to_percentage(num: float) -> str:
    return f"{num}%"

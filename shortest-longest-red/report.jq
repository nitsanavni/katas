def total:
    [.[0],.[-1]]|map(.value)|.[-1]-.[0];

def windows:
    "w";

map(to_entries|.[]) |
{
    total: total,
    windows: windows
}
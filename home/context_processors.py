# myapp/context_processors.py
from toiec.settings import domainBackend
def global_data(request):
    return {
        'domain': domainBackend
    }

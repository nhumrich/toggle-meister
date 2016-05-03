

class AuthenticationError(Exception):
    def __init__(self, code):
        super().__init__()
        self.code = code


def authenticate(request):
    return

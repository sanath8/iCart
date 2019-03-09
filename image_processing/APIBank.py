class APIBank:
    def __init__(self):
        self.base_url = 'http://www.betafaceapi.com/service.svc'
        self.api_key = 'd45fd466-51e2-4701-8da8-04351c872236'
        self.api_secret = '171e8465-f548-401d-b63b-caf0dc28df5f'
    def provide(self):
        return {
            'base_url' : self.base_url,
            'api_key' : self.api_key,
            'api_secret' : self.api_secret
                }
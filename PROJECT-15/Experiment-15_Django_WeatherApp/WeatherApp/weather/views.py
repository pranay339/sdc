import requests
from django.shortcuts import render

def index(request):
    if request.method == "POST":
        city = request.POST['city']
        api_key = "159e96d8936ead30d67d0437a85c63f9"
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
        res = requests.get(url).json()

        print(res)  # Add this to check the actual response

        if 'main' in res:
            temp = res['main']['temp']
            weather = res['weather'][0]['description']
        else:
            temp = "Not Found"
            weather = "Invalid city name"

        context = {
            'city': city,
            'temperature': temp,
            'description': weather
        }
        return render(request, 'weather/index.html', context)

    return render(request, 'weather/index.html')

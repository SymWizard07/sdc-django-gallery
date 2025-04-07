from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Artwork
import json

@csrf_exempt  # For simplicity in development. Use CSRF token in production.
def gallery_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        title = data.get('title')
        author = data.get('author')
        image_data = data.get('image_data')

        if title and author and image_data:
            Artwork.objects.create(title=title, author=author, image_data=image_data)

        return JsonResponse({'status': 'success'})

    artworks = Artwork.objects.order_by('-created_at')
    return render(request, 'web_gallery_app/gallery.html', {'artworks': artworks})
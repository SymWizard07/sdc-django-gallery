from django.db import models

class Artwork(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    image_data = models.TextField()  # Base64-encoded image
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} by {self.author}"

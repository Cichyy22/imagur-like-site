from django.db import models
import base64

class Comment(models.Model):
    client_id = models.ForeignKey('Client', on_delete=models.CASCADE, related_name='comments')
    post_id = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='comments')
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('post_id',)


class Favorite(models.Model):
    client_id = models.ForeignKey('Client', on_delete=models.CASCADE, related_name='favorites')
    post_id = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='favorites')
    liked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('liked_at',)


class Post(models.Model):
    title = models.CharField(max_length=30)
    image = models.TextField(blank=True)
    # tags =
    creator_id = models.ForeignKey('Client', related_name='posts', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def set_image(self, data):
        self.image = base64.encodebytes(data)

    def get_image(self):
        return base64.decodebytes(self.image)

    data = property(get_image, set_image)

    class Meta:
        ordering = ('title',)

class Client(models.Model):
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=30)
    email = models.CharField(max_length=30, unique=True)

    class Meta:
        ordering = ('username',)

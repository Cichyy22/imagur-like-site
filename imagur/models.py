from django.db import models
import base64


class Comment(models.Model):
    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='comments')
    post_id = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='comments')
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('post_id',)


class Favorite(models.Model):
    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='favorites')
    post_id = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='favorites')
    liked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('liked_at',)


class Post(models.Model):
    title = models.CharField(max_length=60)
    image = models.TextField(blank=True)
    # tags =
    owner = models.ForeignKey('auth.User', related_name='posts', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def set_image(self, data):
        self.image = base64.encodebytes(data)

    def get_image(self):
        return base64.decodebytes(self.image)

    data = property(get_image, set_image)

    class Meta:
        ordering = ('title',)



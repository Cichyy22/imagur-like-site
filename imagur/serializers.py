from rest_framework import serializers
from imagur.models import Comment, Favorite, Post, Client


class ClientsSerializer(serializers.HyperlinkedModelSerializer):
    username = serializers.CharField(max_length=30, )
    password = serializers.CharField(max_length=30, )
    email = serializers.CharField(max_length=30, )
    posts = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='post-detail')
    comments = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='comment-detail')
    favorites = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='favorite-detail')


    class Meta:
        model = Client
        fields = ['pk', 'url', 'username', 'password', 'email', 'posts', 'comments', 'favorites']


class PostsSerializer(serializers.HyperlinkedModelSerializer):
    title = serializers.CharField(max_length=30, )
    image = serializers.CharField()
    creator_id = ClientsSerializer(many=False, read_only=True).data

    class Meta:
        model = Post
        fields = ['pk', 'url', 'title', 'image', 'creator_id', 'created_at']


class CommentsSerializer(serializers.HyperlinkedModelSerializer):
    client_id = ClientsSerializer(many=False, read_only=True).data
    post_id = PostsSerializer(many=False, read_only=True).data
    comment = serializers.CharField()

    class Meta:
        model = Comment
        fields = ['pk', 'url', 'client_id', 'post_id', 'comment', 'created_at']


class FavoritesSerializer(serializers.HyperlinkedModelSerializer):
    client_id = ClientsSerializer(many=False, read_only=True).data
    post_id = PostsSerializer(many=False, read_only=True).data

    class Meta:
        model = Favorite
        fields = ['pk', 'url', 'client_id', 'post_id']




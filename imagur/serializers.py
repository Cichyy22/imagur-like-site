from rest_framework import serializers
from imagur.models import Comment, Favorite, Post
from django.contrib.auth.models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    posts = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='post-detail')
    comments = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='comment-detail')
    favorites = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='favorite-detail')

    class Meta:
        model = User
        fields = ['url', 'pk', 'username', 'posts', 'comments', 'favorites']


class PostsSerializer(serializers.HyperlinkedModelSerializer):
    title = serializers.CharField(max_length=60, )
    owner = serializers.ReadOnlyField(source='owner.username')
    # creator_id = UserSerializer(many=False, read_only=True).data
    favorites = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='favorite-detail')
    comments = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='comment-detail')

    class Meta:
        model = Post
        fields = ['pk', 'url', 'title', 'owner', 'image', 'created_at', 'favorites', 'comments']

    def validate_title(self, value):
        if len(value) > 60:
            raise serializers.ValidationError("Title field can have only 60 characters!", )
        if len(value) == 0:
            raise serializers.ValidationError("Title field can not be empty!", )
        return value


class CommentsSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    # creator_id = UserSerializer(many=False, read_only=True).data
    post_id = PostsSerializer(many=False, read_only=True).data
    comment = serializers.CharField()

    class Meta:
        model = Comment
        fields = ['pk', 'url', 'owner', 'post_id', 'comment', 'created_at']

    def validate_comment(self, value):
        if len(value) == 0:
            raise serializers.ValidationError("Comment can not be empty!", )
        return value


class FavoritesSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    # creator_id = UserSerializer(many=False, read_only=True).data
    post_id = PostsSerializer(many=False, read_only=True).data

    class Meta:
        model = Favorite
        fields = ['pk', 'url', 'owner', 'post_id']




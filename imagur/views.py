from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
from imagur.serializers import PostsSerializer, CommentsSerializer, FavoritesSerializer, UserSerializer
from imagur.models import Post, Comment, Favorite
from django.contrib.auth.models import User


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostsSerializer
    name = 'post-list'

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostsSerializer
    name = 'post-detail'


class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentsSerializer
    name = 'comment-list'

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentsSerializer
    name = 'comment-detail'


class FavoriteList(generics.ListCreateAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoritesSerializer
    name = 'favorite-list'

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class FavoriteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoritesSerializer
    name = 'favorite-detail'


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    name = 'user-list'


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    name = 'user-detail'


class ApiRoot(generics.GenericAPIView):
    name = 'api-root'

    def get(self, request, *args, **kwargs):
        return Response({
            'post': reverse(PostList.name, request=request),
            'comment': reverse(CommentList.name, request=request),
            'favorite': reverse(FavoriteList.name, request=request),
            'users': reverse(UserList.name, request=request)
        })

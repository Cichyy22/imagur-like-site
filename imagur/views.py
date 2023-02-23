from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
from imagur.serializers import ClientsSerializer, PostsSerializer, CommentsSerializer, FavoritesSerializer
from imagur.models import Client, Post, Comment, Favorite


class ClientList(generics.ListCreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientsSerializer
    name = 'client-list'


class ClientDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientsSerializer
    name = 'client-detail'


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostsSerializer
    name = 'post-list'


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostsSerializer
    name = 'post-detail'


class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentsSerializer
    name = 'comment-list'


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentsSerializer
    name = 'comment-detail'


class FavoriteList(generics.ListCreateAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoritesSerializer
    name = 'favorite-list'


class FavoriteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoritesSerializer
    name = 'favorite-detail'


class ApiRoot(generics.GenericAPIView):
    name = 'api-root'

    def get(self, request, *args, **kwargs):
        return Response({
            'clients': reverse(ClientList.name, request=request),
            'post': reverse(PostList.name, request=request),
            'comment': reverse(CommentList.name, request=request),
            'favorite': reverse(FavoriteList.name, request=request),
        })

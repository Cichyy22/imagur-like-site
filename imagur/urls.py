from django.urls import path
from . import views

urlpatterns = [
    path('clients', views.ClientList.as_view(), name=views.ClientList.name),
    path('clients/<int:pk>', views.ClientDetail.as_view(), name=views.ClientDetail.name),
    path('posts', views.PostList.as_view(), name=views.PostList.name),
    path('posts/<int:pk>', views.PostDetail.as_view(), name=views.PostDetail.name),
    path('comments', views.CommentList.as_view(), name=views.CommentList.name),
    path('comments/<int:pk>', views.CommentDetail.as_view(), name=views.CommentDetail.name),
    path('favorite', views.FavoriteList.as_view(), name=views.FavoriteList.name),
    path('favorite/<int:pk>', views.FavoriteDetail.as_view(), name=views.FavoriteDetail.name),
    path('', views.ApiRoot.as_view(), name=views.ApiRoot.name),
    ]

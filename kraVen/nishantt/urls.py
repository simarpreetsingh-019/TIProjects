"""
URL configuration for nishantt project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from krsna.views import get_warranty_info, settings_view, helpcenter, marketwarrranties, warranty_detail , profile  
urlpatterns = [
    path('admin/', admin.site.urls),
    path('warranty/<str:user_address>/', get_warranty_info, name='get_warranty_info'),
    path('settings/', settings_view, name='settings'),
    path('helpcenter/', helpcenter, name='helpcenter'),
    path('marketwarranties/', marketwarrranties, name='marketwarranties'),
    path('warranty_detail/', warranty_detail, name='warranty_detail'),
    path('profile/', profile, name='profile')  
]



from django.conf.urls import url
from django.views.generic import TemplateView

urlpatterns = [
	url(r'^snake', 
		TemplateView.as_view(template_name='sp_games/snakeexample.html')),
	url(r'^flappy', 
		TemplateView.as_view(template_name='sp_games/flappybirdexample.html')),
	url(r'^$', TemplateView.as_view(template_name='sp_games/index.html'))
]

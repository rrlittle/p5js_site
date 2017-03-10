from django.conf.urls import url
from django.views.generic import TemplateView

urlpatterns = [
	url(r'^snake', TemplateView.as_view(template_name='sp_games/snake.html')),
	url(r'^tetris', TemplateView.as_view(template_name='sp_games/tetris.html')),
]

from django.urls import path
from .views import Vocabulary,VocabularyDetail
urlpatterns = [
    
    path('vocabulary',Vocabulary.as_view()),
    path('vocabunary/word/<int:id>',VocabularyDetail.as_view())
    
]

from django.urls import path
from .views import Vocabulary,VocabularyDetail,Login,RoadMap,Exams,ExamDetail,Dashboard,VocabularyAdd
urlpatterns = [
    path('vocabulary',Vocabulary.as_view()),
    path('vocabulary/add',VocabularyAdd.as_view()),
    path('roadmap',RoadMap.as_view()),
    path('dashboard',Dashboard.as_view()),
    path('exams',Exams.as_view()),
    path('exams/<int:id>',ExamDetail.as_view()),
    path('vocabulary/word/<int:id>',VocabularyDetail.as_view()),
    path('login/',Login.as_view()),
]
